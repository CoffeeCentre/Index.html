import { useState, useEffect, createContext, useContext } from 'react'
import { CartProvider } from '@/contexts/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartSheet } from '@/components/CartSheet'
import { NewsletterModal } from '@/components/NewsletterModal'
import { Home } from '@/pages/Home'
import { CategoryPage } from '@/pages/CategoryPage'
import { ProductPage } from '@/pages/ProductPage'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Members } from '@/pages/Members'
import { productById } from '@/data/products'
import type { Category } from '@/data/products'

type Page = 'home' | Category | 'about' | 'contact' | 'members' | 'product'

// Context: pop the newsletter modal
interface NewsletterContextValue {
  openNewsletter: () => void
}
const NewsletterContext = createContext<NewsletterContextValue | null>(null)
export const useNewsletter = () => {
  const ctx = useContext(NewsletterContext)
  if (!ctx) throw new Error('useNewsletter must be used within NewsletterContext')
  return ctx
}

// Context: prefill the Contact form when navigating from a specific product/page
export interface ContactPrefill {
  interest?: string // matches one of the "I'm interested in" dropdown options
  subject?: string  // product/course name — gets prepended to the message field
}
interface ContactPrefillContextValue {
  prefill: ContactPrefill | null
  setPrefill: (p: ContactPrefill | null) => void
  consumePrefill: () => ContactPrefill | null
}
const ContactPrefillContext = createContext<ContactPrefillContextValue | null>(null)
export const useContactPrefill = () => {
  const ctx = useContext(ContactPrefillContext)
  if (!ctx) throw new Error('useContactPrefill must be used within ContactPrefillContext')
  return ctx
}

function AppInner() {
  const [page, setPage] = useState<Page>('home')
  const [productId, setProductId] = useState<string | null>(null)
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [newsletterShown, setNewsletterShown] = useState(false)
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null)

  const consumePrefill = () => {
    const p = contactPrefill
    setContactPrefill(null)
    return p
  }

  const navigate = (p: 'home' | Category | 'about' | 'contact' | 'members') => {
    setPage(p)
    setProductId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToProduct = (id: string) => {
    setProductId(id)
    setPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Open the newsletter modal almost immediately on page load (only once per session).
  // 500ms delay so the page paints first — instant-feeling but not jarring.
  useEffect(() => {
    if (newsletterShown) return
    const timer = setTimeout(() => {
      setNewsletterOpen(true)
      setNewsletterShown(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [newsletterShown])

  // Also trigger on exit-intent (mouse leaves toward the top of the page)
  useEffect(() => {
    if (newsletterShown) return
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setNewsletterOpen(true)
        setNewsletterShown(true)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [newsletterShown])

  useEffect(() => {
    const titles: Record<Exclude<Page, 'product'>, string> = {
      home: 'Coffee Centre London — Specialty Coffee & Equipment',
      coffee: 'Roasted Coffee — Coffee Centre London',
      'green-coffee': 'Green Coffee — Coffee Centre London',
      'home-equipment': 'Home Equipment — Coffee Centre London',
      'commercial-equipment': 'Commercial Equipment — Coffee Centre London',
      training: 'Training & Courses — Coffee Centre London',
      consulting: 'Consulting — Coffee Centre London',
      about: 'About — Coffee Centre London',
      contact: 'Contact — Coffee Centre London',
      members: 'Members — Coffee Centre London',
    }
    if (page === 'product' && productId) {
      const p = productById(productId)
      document.title = p ? `${p.name} — Coffee Centre London` : 'Product — Coffee Centre London'
    } else if (page !== 'product') {
      document.title = titles[page]
    }
  }, [page, productId])

  const headerPage = page === 'product' ? 'home' : page

  return (
    <NewsletterContext.Provider value={{ openNewsletter: () => setNewsletterOpen(true) }}>
      <ContactPrefillContext.Provider
        value={{
          prefill: contactPrefill,
          setPrefill: setContactPrefill,
          consumePrefill,
        }}
      >
        <div className="min-h-screen flex flex-col bean-pattern">
          <Header currentPage={headerPage} navigate={navigate} />
          <main className="flex-1">
            {page === 'home' && <Home navigate={navigate} navigateToProduct={navigateToProduct} />}
            {(page === 'coffee' ||
              page === 'green-coffee' ||
              page === 'home-equipment' ||
              page === 'commercial-equipment' ||
              page === 'training' ||
              page === 'consulting') && (
              <CategoryPage
                category={page}
                navigate={navigate}
                navigateToProduct={navigateToProduct}
              />
            )}
            {page === 'product' && productId && (
              <ProductPage
                productId={productId}
                navigate={navigate}
                navigateToProduct={navigateToProduct}
              />
            )}
            {page === 'about' && <About navigate={navigate} />}
            {page === 'members' && <Members navigate={navigate} />}
            {page === 'contact' && <Contact />}
          </main>
          <Footer navigate={navigate} />
          <CartSheet navigate={navigate} />
          <NewsletterModal open={newsletterOpen} onOpenChange={setNewsletterOpen} />
        </div>
      </ContactPrefillContext.Provider>
    </NewsletterContext.Provider>
  )
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

export default App
