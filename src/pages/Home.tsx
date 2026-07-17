import { ArrowRight, Truck, ShieldCheck, RefreshCw, Award, Tag, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { HeroCarousel } from '@/components/HeroCarousel'
import { InstagramFeed } from '@/components/InstagramFeed'
import { CATEGORIES, PRODUCTS } from '@/data/products'
import type { Category } from '@/data/products'
import { useNewsletter } from '@/App'

interface HomeProps {
  navigate: (page: 'home' | Category | 'about' | 'contact' | 'members') => void
  navigateToProduct: (id: string) => void
}

export function Home({ navigate, navigateToProduct }: HomeProps) {
  const { openNewsletter } = useNewsletter()
  // Surface real, in-stock products first
  const realProducts = PRODUCTS.filter(
    (p) => p.image && !p.soldOut && p.badge !== 'Coming Soon' && p.badge !== 'Enquire',
  )
  const bestSellers = realProducts.slice(0, 4)

  return (
    <div>
      {/* ANNOUNCEMENT / PROMO STRIP */}
      <div className="bg-copper text-accent-foreground py-2.5 text-center text-[11px] font-sans-alt uppercase tracking-[0.22em]">
        ✦ Free UK delivery over £40 · Same-day dispatch on orders before 2pm ✦
      </div>

      <HeroCarousel navigate={navigate} />

      {/* BEST SELLERS — pulled right under hero */}
      <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
              ✦ Best Sellers
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
              What everyone's buying
            </h2>
          </div>
          <button
            onClick={() => navigate('home-equipment')}
            className="font-sans-alt text-xs uppercase tracking-[0.18em] text-foreground hover:text-copper border-b border-foreground/30 hover:border-copper pb-1 transition-colors self-start sm:self-auto"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => navigateToProduct(p.id)}
              onEnquire={() => navigate('contact')}
            />
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Free UK delivery', sub: 'On orders over £40' },
            { icon: RefreshCw, title: '14-day returns', sub: 'No-questions-asked' },
            { icon: ShieldCheck, title: '2-year warranty', sub: 'On all equipment' },
            { icon: Award, title: 'SCA & CQI approved', sub: 'Premier training centre' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">{item.title}</div>
                <div className="text-[11px] text-muted-foreground">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY — compact horizontal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
            Shop By Category
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold">Find what you need</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.filter(
            (cat) => cat.id !== 'coffee' && cat.id !== 'commercial-equipment',
          ).map((cat, i) => {
            const isDark = i % 2 === 0
            return (
              <button
                key={cat.id}
                onClick={() => navigate(cat.id)}
                className={`group relative overflow-hidden h-40 md:h-44 lg:h-48 text-left ${
                  isDark ? 'bg-forest-deep' : 'bg-coffee-bean'
                } text-primary-foreground`}
              >
                {cat.image ? (
                  <>
                    <img
                      src={cat.image}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
                  </>
                ) : (
                  <span className="absolute -bottom-6 -right-3 text-[100px] lg:text-[120px] font-bold opacity-[0.08] leading-none font-serif">
                    0{i + 1}
                  </span>
                )}
                <div className="relative h-full p-4 lg:p-5 flex flex-col justify-end">
                  <h3 className="text-base lg:text-xl font-semibold mb-1.5 leading-tight">{cat.label}</h3>
                  <div className="inline-flex items-center gap-1.5 text-[10px] lg:text-[11px] font-sans-alt uppercase tracking-[0.18em] text-copper group-hover:gap-2.5 transition-all">
                    Shop <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* INSTAGRAM — live feed via Netlify Function + Graph API */}
      <InstagramFeed limit={6} />

      {/* NEWSLETTER — topic-segmented, opens full modal */}
      <section className="bg-background py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-copper/15 border border-copper/30 px-3 py-1.5 mb-5">
            <Tag className="w-3.5 h-3.5 text-copper" />
            <span className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper">
              First to Know
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">Join the club</h2>
          <p className="text-muted-foreground mb-7 max-w-lg mx-auto">
            Sign up for first dibs on new arrivals, course dates, and brewing tips — tailored to the topics you actually care about.
          </p>
          <Button
            onClick={openNewsletter}
            className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
          >
            <Mail className="w-4 h-4 mr-2" />
            Choose Your Topics & Subscribe
          </Button>
          <p className="text-[10px] text-muted-foreground mt-3 font-sans-alt uppercase tracking-[0.14em]">
            6 topics · Pick the ones you want · Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  )
}
