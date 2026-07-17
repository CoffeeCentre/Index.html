import { useState, useEffect, useRef } from 'react'
import { ShoppingBag, Menu, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/contexts/CartContext'
import { Logo } from './Logo'
import type { Category } from '@/data/products'

interface HeaderProps {
  currentPage: 'home' | Category | 'about' | 'contact' | 'members'
  navigate: (page: 'home' | Category | 'about' | 'contact' | 'members') => void
}

const NAV_ITEMS: { label: string; page: HeaderProps['currentPage'] }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Equipment', page: 'home-equipment' },
  { label: 'Training', page: 'training' },
  { label: 'Consulting', page: 'consulting' },
  { label: 'Green Coffee', page: 'green-coffee' },
  { label: 'About', page: 'about' },
  { label: 'Members', page: 'members' },
  { label: 'Contact', page: 'contact' },
]

export function Header({ currentPage, navigate }: HeaderProps) {
  const { count, setOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        // Always show near the top
        setHidden(false)
      } else if (y > lastScrollY.current + 6) {
        // Scrolling down
        setHidden(true)
      } else if (y < lastScrollY.current - 6) {
        // Scrolling up
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Publish the effective header offset to a CSS variable so sticky elements
  // below (e.g. the CategoryPage filter toolbar) can rise when the header hides
  useEffect(() => {
    const setHeaderOffset = () => {
      const h = headerRef.current?.offsetHeight ?? 105
      document.documentElement.style.setProperty(
        '--header-offset',
        hidden ? '0px' : `${h}px`,
      )
    }
    setHeaderOffset()
    window.addEventListener('resize', setHeaderOffset)
    return () => window.removeEventListener('resize', setHeaderOffset)
  }, [hidden])

  const handleNavigate = (page: HeaderProps['currentPage']) => {
    setMobileOpen(false)
    navigate(page)
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border transition-[transform,opacity] duration-300 ease-out ${
        hidden ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top utility bar */}
      <div className="bg-forest-deep text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between text-[11px] font-sans-alt uppercase tracking-[0.18em]">
          <div className="flex items-center gap-1.5 opacity-90">
            <MapPin className="w-3 h-3" />
            <span className="hidden sm:inline">London Roastery · Shipping UK & EU</span>
            <span className="sm:hidden">UK & EU Shipping</span>
          </div>
          <div className="opacity-90 hidden md:block">
            Free delivery over £40 · Roasted to order
          </div>
          <div className="opacity-90">
            <a href="tel:+447514131830" className="hover:text-copper transition-colors">
              07514 131 830
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={() => navigate('home')} className="shrink-0">
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-sans-alt text-[11.5px] xl:text-[12.5px] uppercase tracking-[0.12em] xl:tracking-[0.14em]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`relative py-2 transition-colors hover:text-copper ${
                currentPage === item.page ? 'text-copper' : 'text-foreground'
              }`}
            >
              {item.label}
              {currentPage === item.page && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-copper" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-copper text-accent-foreground text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <nav className="flex flex-col gap-1 mt-8 font-sans-alt uppercase tracking-[0.14em] text-sm">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className={`text-left py-3 px-2 border-b border-border/60 hover:text-copper transition-colors ${
                      currentPage === item.page ? 'text-copper' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
