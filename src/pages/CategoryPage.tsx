import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { productsByCategory, CATEGORIES } from '@/data/products'
import type { Category } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { CourseCalendar } from '@/components/CourseCalendar'
import { Button } from '@/components/ui/button'

interface CategoryPageProps {
  category: Category
  navigate: (page: 'home' | Category | 'about' | 'contact') => void
  navigateToProduct: (id: string) => void
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

export function CategoryPage({ category, navigate, navigateToProduct }: CategoryPageProps) {
  const meta = CATEGORIES.find((c) => c.id === category)!
  const all = productsByCategory(category)
  const [sort, setSort] = useState<SortKey>('featured')
  const [roastFilter, setRoastFilter] = useState<string | null>(null)

  const isCoffee = category === 'coffee' || category === 'green-coffee'

  const roasts = useMemo(() => {
    if (!isCoffee) return []
    return Array.from(new Set(all.map((p) => p.roast).filter(Boolean)))
  }, [all, isCoffee])

  const filtered = useMemo(() => {
    let list = [...all]
    if (roastFilter) list = list.filter((p) => p.roast === roastFilter)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [all, sort, roastFilter])

  return (
    <div>
      {/* Category Hero */}
      <section className="bg-forest-deep text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i * 67) % 800}
                cy={(i * 47) % 300}
                rx="10" ry="16"
                fill="hsl(28 60% 55%)"
                transform={`rotate(${(i * 31) % 360} ${(i * 67) % 800} ${(i * 47) % 300})`}
              />
            ))}
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate('home')}
            className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper opacity-80 hover:opacity-100 mb-6 inline-flex items-center gap-1.5"
          >
            ← Back to Home
          </button>
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">
            {category === 'coffee' && 'Single Origins & Blends'}
            {category === 'green-coffee' && 'Unroasted · For Home Roasters'}
            {category === 'home-equipment' && 'For the Home Barista'}
            {category === 'commercial-equipment' && 'Trade · Wholesale'}
            {category === 'training' && 'SCA · CQI · Bespoke'}
            {category === 'consulting' && 'Concept · Design · Operations'}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">{meta.label}</h1>
          <p className="text-base md:text-lg opacity-85 max-w-2xl">{meta.tagline}</p>
          <div className="mt-6 text-sm opacity-70 font-sans-alt uppercase tracking-[0.12em]">
            {all.length} {category === 'training' ? 'Courses' : category === 'consulting' ? 'Services' : 'Products'}
          </div>
        </div>
      </section>

      {/* Course calendar (Training only) */}
      {category === 'training' && (
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
                ✦ Upcoming Sessions
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold mb-3">
                Book your seat
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Pick a date below to see which course is running and reserve your spot. We run small groups — usually 4–8 per session.
              </p>
            </div>
            <CourseCalendar />
          </div>
        </section>
      )}

      {/* Toolbar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {isCoffee && roasts.length > 0 && (
              <>
                <span className="text-xs font-sans-alt uppercase tracking-[0.16em] text-muted-foreground mr-2">Roast:</span>
                <button
                  onClick={() => setRoastFilter(null)}
                  className={`text-xs font-sans-alt uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
                    !roastFilter ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-copper'
                  }`}
                >
                  All
                </button>
                {roasts.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoastFilter(r ?? null)}
                    className={`text-xs font-sans-alt uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
                      roastFilter === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-copper'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </>
            )}
            {category === 'commercial-equipment' && (
              <div className="bg-copper/15 text-foreground border border-copper/40 px-3 py-1.5 text-xs font-sans-alt uppercase tracking-[0.14em]">
                Trade pricing available · <button onClick={() => navigate('contact')} className="text-copper underline hover:no-underline">Contact us</button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs font-sans-alt uppercase tracking-[0.16em] text-muted-foreground">Sort:</label>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none bg-background border border-border pl-3 pr-8 py-1.5 text-xs font-sans-alt uppercase tracking-[0.14em] focus:outline-none focus:border-copper"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products match those filters.</p>
            <Button
              onClick={() => setRoastFilter(null)}
              variant="outline"
              className="mt-4 rounded-none"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigateToProduct(p.id)}
                onEnquire={() => navigate('contact')}
              />
            ))}
          </div>
        )}
      </section>

      {/* Category-specific info band */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          {category === 'coffee' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">How we roast</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Small batches. Big difference.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every coffee is profiled, cupped, and dialled in before it goes into a bag. We roast to order
                in small batches on a custom 60kg drum — and ship within 48 hours of roasting.
              </p>
            </>
          )}
          {category === 'green-coffee' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">For home roasters</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Sample lots & full sacks.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work directly with hundreds of producers worldwide. Buying for a micro-roastery?
                Get in touch about full 60kg or 70kg sacks and pre-shipment samples.
              </p>
            </>
          )}
          {category === 'home-equipment' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">Buy with confidence</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">2-year warranty. UK servicing.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every machine we stock has been tested in our own roastery. If something breaks,
                we've got engineers across the UK who can sort it.
              </p>
            </>
          )}
          {category === 'commercial-equipment' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">For the trade</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Lease, finance, or buy outright.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Opening a café? We supply, install, train, and service. Speak to us about lease options
                and bundle pricing for full bar setups.
              </p>
              <Button
                onClick={() => navigate('contact')}
                className="mt-6 bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
              >
                Get a Quote
              </Button>
            </>
          )}
          {category === 'training' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">Industry-recognised training</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Taught by champions. Recognised worldwide.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Every course is delivered by industry-leading tutors — including UK roasting and barista
                competition finalists and CQI-licensed Q Graders. SCA and CQI certifications are
                recognised by employers and trade bodies in over 80 countries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mt-8 text-left">
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">All Levels</div>
                  <div className="text-sm">Foundation, Intermediate, Professional — no experience required for entry-level courses.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Champion Tutors</div>
                  <div className="text-sm">Roasting and barista competition finalists, plus licensed CQI Q Grader instructors.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Your Place or Ours</div>
                  <div className="text-sm">Train at our London workshop, or we'll deliver bespoke training at your café, hotel or office.</div>
                </div>
              </div>
              <Button
                onClick={() => navigate('contact')}
                className="mt-8 bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
              >
                Enquire About Bespoke Training
              </Button>
            </>
          )}
          {category === 'consulting' && (
            <>
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">We study every case</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">One team. Concept to opening day.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Every coffee project is different. We work with cafés, hotels, offices, retail brands
                and roasters — taking each on its own terms. Pick the modules you need, or hand us
                the whole brief and we'll handle it end-to-end.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 text-left">
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Concept</div>
                  <div className="text-sm">Brand, positioning, menu, customer journey.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Space Design</div>
                  <div className="text-sm">Floor plans, bar layout, workflow engineering.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Equipment</div>
                  <div className="text-sm">Machine selection, sourcing, trade pricing.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Suppliers</div>
                  <div className="text-sm">Roasters, green coffee, dairy, packaging.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">SOPs</div>
                  <div className="text-sm">Operational procedures and staff handbooks.</div>
                </div>
                <div className="border-l-2 border-copper pl-4">
                  <div className="font-sans-alt text-[10px] uppercase tracking-[0.18em] text-copper mb-1">Audit</div>
                  <div className="text-sm">Reviews and optimisation for live venues.</div>
                </div>
              </div>
              <Button
                onClick={() => navigate('contact')}
                className="mt-8 bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
              >
                Book a Consultation
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
