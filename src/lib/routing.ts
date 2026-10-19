import type { Category } from '@/data/products'

// Page identifiers used by the state router in App.tsx.
export type Page = 'home' | Category | 'about' | 'contact' | 'members' | 'product'

type StaticPage = Exclude<Page, 'product'>

// Canonical URL path for each non-product page. Product pages are /product/{id}.
const PAGE_TO_PATH: Record<StaticPage, string> = {
  home: '/',
  coffee: '/coffee',
  'green-coffee': '/green-coffee',
  'home-equipment': '/home-equipment',
  'commercial-equipment': '/commercial-equipment',
  training: '/training',
  consulting: '/consulting',
  about: '/about',
  contact: '/contact',
  members: '/members',
}

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([page, path]) => [path, page as StaticPage]),
) as Record<string, StaticPage>

export interface Route {
  page: Page
  productId: string | null
}

/** Map a page (+ optional product id) to its URL path. */
export function pathFor(page: Page, productId?: string | null): string {
  if (page === 'product' && productId) return `/product/${encodeURIComponent(productId)}`
  return PAGE_TO_PATH[page as StaticPage] ?? '/'
}

/** Parse a URL pathname back into page state. Unknown paths fall back to home. */
export function parsePath(pathname: string): Route {
  let path = pathname.replace(/\/+$/, '')
  if (path === '') path = '/'
  if (path.startsWith('/product/')) {
    const id = decodeURIComponent(path.slice('/product/'.length))
    return { page: 'product', productId: id || null }
  }
  return { page: PATH_TO_PAGE[path] ?? 'home', productId: null }
}
