import { useEffect, useState } from 'react'
import { Instagram, ExternalLink } from 'lucide-react'

interface InstagramPost {
  id: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  mediaUrl?: string
  permalink: string
  caption?: string
  timestamp: string
}

interface FeedResponse {
  posts: InstagramPost[]
  configured: boolean
  error?: string
}

const INSTAGRAM_HANDLE = 'coffeecentrelondon'
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`

export function InstagramFeed({ limit = 6 }: { limit?: number }) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  )

  useEffect(() => {
    let cancelled = false
    fetch(`/.netlify/functions/instagram?limit=${limit}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: FeedResponse) => {
        if (cancelled) return
        if (data.posts.length > 0) {
          setPosts(data.posts)
          setState('ready')
        } else {
          setState('fallback')
        }
      })
      .catch(() => {
        if (!cancelled) setState('fallback')
      })
    return () => {
      cancelled = true
    }
  }, [limit])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
            Follow along
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
            @{INSTAGRAM_HANDLE}
          </h2>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans-alt text-xs uppercase tracking-[0.18em] text-foreground hover:text-copper border-b border-foreground/30 hover:border-copper pb-1 transition-colors self-start sm:self-auto"
        >
          <Instagram className="w-4 h-4" />
          Follow us
        </a>
      </div>

      {state === 'loading' ? (
        <SkeletonGrid limit={limit} />
      ) : state === 'ready' ? (
        <PostGrid posts={posts} />
      ) : (
        <FallbackCard />
      )}
    </section>
  )
}

function PostGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
      {posts.map((p) => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-square overflow-hidden bg-secondary/40"
          aria-label={p.caption?.slice(0, 80) ?? 'Instagram post'}
        >
          {p.mediaUrl && (
            <img
              src={p.mediaUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-forest-deep/0 group-hover:bg-forest-deep/50 transition-colors flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>
      ))}
    </div>
  )
}

function SkeletonGrid({ limit }: { limit: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
      {Array.from({ length: limit }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-secondary/40 animate-pulse"
          aria-hidden
        />
      ))}
    </div>
  )
}

function FallbackCard() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-forest-deep text-primary-foreground p-10 md:p-14 text-center hover:bg-coffee-bean transition-colors"
    >
      <Instagram className="w-10 h-10 mx-auto mb-4 text-copper" />
      <h3 className="text-2xl md:text-3xl font-semibold mb-2">
        @{INSTAGRAM_HANDLE}
      </h3>
      <p className="opacity-85 max-w-md mx-auto mb-6">
        Behind the scenes at the roastery, cupping table snapshots, and the
        occasional latte-art win.
      </p>
      <span className="inline-flex items-center gap-2 font-sans-alt text-xs uppercase tracking-[0.18em] text-copper border-b border-copper/40 group-hover:border-copper pb-0.5">
        Follow us on Instagram
        <ExternalLink className="w-3.5 h-3.5" />
      </span>
    </a>
  )
}
