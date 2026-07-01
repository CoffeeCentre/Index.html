/**
 * Instagram feed Netlify Function.
 *
 * GET /.netlify/functions/instagram?limit=6
 *   -> { posts: [{ id, mediaUrl, mediaType, permalink, caption, timestamp }] }
 *
 * Requires two Netlify env vars (Site config → Environment variables):
 *   INSTAGRAM_ACCESS_TOKEN — long-lived user access token (60-day life)
 *   INSTAGRAM_USER_ID      — the Instagram Business/Creator account id
 *
 * Response is cached at Netlify's edge for 15 min via Netlify-CDN-Cache-Control
 * so we stay well under Meta's 200 calls/hour app rate limit.
 */

import type { Handler } from '@netlify/functions'

interface IgPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

interface IgResponse {
  data: IgPost[]
  paging?: { next?: string }
}

export const handler: Handler = async (event) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!token || !userId) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify({
        posts: [],
        configured: false,
        message: 'Instagram not configured — set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in Netlify.',
      }),
    }
  }

  const limit = Math.min(
    Math.max(parseInt(event.queryStringParameters?.limit ?? '6', 10) || 6, 1),
    18,
  )

  const fields = [
    'id',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'caption',
    'timestamp',
  ].join(',')

  const url =
    `https://graph.instagram.com/${userId}/media` +
    `?fields=${fields}&limit=${limit}&access_token=${token}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      const errBody = await res.text()
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posts: [],
          configured: true,
          error: `Instagram API returned ${res.status}`,
          detail: errBody.slice(0, 300),
        }),
      }
    }

    const data = (await res.json()) as IgResponse
    const posts = data.data.map((p) => ({
      id: p.id,
      mediaType: p.media_type,
      mediaUrl: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      permalink: p.permalink,
      caption: p.caption,
      timestamp: p.timestamp,
    }))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache on Netlify's edge for 15 min; serve stale up to 1 hour while
        // revalidating. Keeps our request rate ~4/hour worst case.
        'Netlify-CDN-Cache-Control':
          'public, max-age=900, stale-while-revalidate=3600',
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify({ posts, configured: true }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        posts: [],
        configured: true,
        error: err instanceof Error ? err.message : 'Unknown error',
      }),
    }
  }
}
