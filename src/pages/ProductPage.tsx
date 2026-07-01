import { useState, useMemo } from 'react'
import { ArrowLeft, ArrowRight, Plus, Minus, Star, Truck, ShieldCheck, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { CourseCalendar } from '@/components/CourseCalendar'
import { productById, productsByCategory, buildShopifyCartUrl } from '@/data/products'
import type { Category } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useContactPrefill } from '@/App'

interface ProductPageProps {
  productId: string
  navigate: (page: 'home' | Category | 'about' | 'contact' | 'members') => void
  navigateToProduct: (id: string) => void
}

export function ProductPage({ productId, navigate, navigateToProduct }: ProductPageProps) {
  const product = productById(productId)
  const { add, setOpen } = useCart()
  const { setPrefill } = useContactPrefill()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  // Map product category to the Contact form's "I'm interested in" option
  const handleEnquire = () => {
    if (!product) return navigate('contact')
    const interestMap: Partial<Record<Category, string>> = {
      'training': 'Training',
      'consulting': 'Consulting',
      'commercial-equipment': 'Commercial equipment',
      'home-equipment': 'Home equipment',
      'green-coffee': 'Green coffee',
      'coffee': 'Retail coffee',
    }
    setPrefill({
      interest: interestMap[product.category],
      subject: product.name,
    })
    navigate('contact')
  }

  // Related products: same category, different id
  const related = useMemo(() => {
    if (!product) return []
    return productsByCategory(product.category)
      .filter((p) => p.id !== product.id && p.image && !p.soldOut)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold mb-3">Product not found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find that product. It may have moved.</p>
        <Button
          onClick={() => navigate('home')}
          className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
        >
          Back to Home
        </Button>
      </div>
    )
  }

  const displayPrice = product.salePrice ?? product.price
  const hasGallery = product.images && product.images.length > 0
  const gallery = product.images ?? (product.image ? [product.image] : [])
  const canCheckout = product.variantId && !product.soldOut

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product)
    setOpen(true)
  }

  const handleBuyNow = () => {
    if (!canCheckout) return
    const url = buildShopifyCartUrl([{ variantId: product.variantId, quantity: qty }])
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const categoryLabel: Record<Category, string> = {
    'coffee': 'Roasted Coffee',
    'green-coffee': 'Green Coffee',
    'home-equipment': 'Home Equipment',
    'commercial-equipment': 'Commercial Equipment',
    'training': 'Training & Courses',
    'consulting': 'Consulting',
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[11px] font-sans-alt uppercase tracking-[0.16em]">
          <button onClick={() => navigate('home')} className="text-muted-foreground hover:text-copper transition-colors">
            Home
          </button>
          <span className="text-muted-foreground/40">/</span>
          <button onClick={() => navigate(product.category)} className="text-muted-foreground hover:text-copper transition-colors">
            {categoryLabel[product.category]}
          </button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>
      </div>

      {/* Main detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <button
          onClick={() => navigate(product.category)}
          className="flex items-center gap-1.5 text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground hover:text-copper mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {categoryLabel[product.category]}
        </button>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* GALLERY */}
          <div className="lg:col-span-7">
            {hasGallery ? (
              <Gallery
                images={gallery}
                alt={product.name}
                activeIdx={activeImg}
                onChange={setActiveImg}
              />
            ) : (
              <div className="aspect-[4/5] bg-card border border-border flex items-center justify-center text-muted-foreground text-sm">
                No image available
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="lg:col-span-5">
            {/* Vendor / badges */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {product.badge && (
                <span className={`text-[10px] uppercase font-sans-alt tracking-[0.18em] px-2.5 py-1 ${
                  product.soldOut
                    ? 'bg-foreground/80 text-background'
                    : product.badge === 'Sale'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-copper text-accent-foreground'
                }`}>
                  {product.badge}
                </span>
              )}
              <span className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">
                {categoryLabel[product.category]}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-copper text-copper'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} / 5
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-border">
              {product.price === 0 ? (
                <span className="text-3xl font-semibold">POA</span>
              ) : (
                <>
                  {product.priceFrom && (
                    <span className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">
                      from
                    </span>
                  )}
                  <span className={`text-3xl font-semibold ${product.salePrice ? 'text-destructive' : 'text-foreground'}`}>
                    £{displayPrice.toFixed(2)}
                  </span>
                  {product.salePrice && (
                    <span className="text-base text-muted-foreground line-through">
                      £{product.price.toFixed(2)}
                    </span>
                  )}
                  {product.unit && (
                    <span className="text-sm text-muted-foreground font-sans-alt uppercase tracking-wider">
                      / {product.unit}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Training info pills */}
            {product.category === 'training' && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.courseBody && (
                  <InfoPill label="Body" value={product.courseBody} />
                )}
                {product.courseLevel && (
                  <InfoPill label="Level" value={product.courseLevel} />
                )}
                {product.duration && (
                  <InfoPill label="Duration" value={product.duration} />
                )}
                {product.location && (
                  <InfoPill label="Location" value={product.location} />
                )}
              </div>
            )}

            {/* Consulting scope */}
            {product.consultingScope && (
              <div className="mb-6">
                <div className="font-sans-alt text-[11px] uppercase tracking-[0.18em] text-copper mb-2.5">
                  What's included
                </div>
                <ul className="space-y-1.5">
                  {product.consultingScope.map((s, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-copper mt-0.5">→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity + CTAs */}
            {!product.soldOut && product.price > 0 && product.category !== 'consulting' && (
              <div className="space-y-3">
                {product.variantId && (
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">
                      Qty
                    </span>
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center font-medium">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Button
                    onClick={handleAdd}
                    className="flex-1 bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {product.category === 'training' ? 'Add to Basket' : 'Add to Basket'}
                  </Button>
                  {canCheckout && (
                    <Button
                      onClick={handleBuyNow}
                      variant="outline"
                      className="flex-1 bg-copper hover:bg-copper/90 text-accent-foreground border-copper rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6"
                    >
                      Buy Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Sold out */}
            {product.soldOut && (
              <Button
                disabled
                className="w-full bg-muted text-muted-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6 cursor-not-allowed"
              >
                Sold Out
              </Button>
            )}

            {/* Enquire / POA */}
            {(product.category === 'consulting' || product.price === 0) && !product.soldOut && (
              <>
                <Button
                  onClick={handleEnquire}
                  className="w-full bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6"
                >
                  {product.id === 'tr-bespoke-onsite'
                    ? 'Enquire About Bespoke Training'
                    : product.category === 'consulting'
                    ? 'Enquire About This Service'
                    : 'Enquire'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                {product.id === 'tr-bespoke-onsite' && (
                  <div className="mt-3 bg-secondary/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed">
                    <div className="font-sans-alt uppercase tracking-[0.16em] text-foreground text-[10px] mb-1">
                      What happens next
                    </div>
                    Share your goals, group size, and preferred dates. We'll come back within one working day with a tailored programme and a quote — no cart, no auto-bookings.
                  </div>
                )}
              </>
            )}

            {/* Trust badges */}
            <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3 text-[11px]">
              <div className="flex items-start gap-1.5">
                <Truck className="w-3.5 h-3.5 text-copper mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Free UK delivery</div>
                  <div className="text-muted-foreground">Orders over £40</div>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-copper mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">14-day returns</div>
                  <div className="text-muted-foreground">No questions</div>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-copper mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">2-yr warranty</div>
                  <div className="text-muted-foreground">All equipment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CALENDAR (training only) */}
      {product.category === 'training' && product.id !== 'tr-bespoke-onsite' && (
        <section className="bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="mb-8 max-w-2xl">
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
                Upcoming Dates
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Pick a session
              </h2>
              <p className="text-sm text-muted-foreground">
                Only dates for this course are shown. Browse forward to find one that suits you.
              </p>
            </div>
            <CourseCalendar filterCourseId={product.id} />
          </div>
        </section>
      )}

      {/* FULL DESCRIPTION */}
      {product.descriptionHtml && (
        <section className="bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-3">
              About this product
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Specifications & details</h2>
            <div
              className="prose-coffee"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-3">
            You may also like
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">More from {categoryLabel[product.category]}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigateToProduct(p.id)}
                onEnquire={() => navigate('contact')}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-card px-3 py-2">
      <div className="text-[9px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  )
}

function Gallery({
  images,
  alt,
  activeIdx,
  onChange,
}: {
  images: string[]
  alt: string
  activeIdx: number
  onChange: (i: number) => void
}) {
  const safeIdx = Math.min(activeIdx, images.length - 1)
  const prev = () => onChange((safeIdx - 1 + images.length) % images.length)
  const next = () => onChange((safeIdx + 1) % images.length)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative bg-white border border-border overflow-hidden group">
        <div className="aspect-square">
          <img
            src={images[safeIdx]}
            alt={alt}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/85 backdrop-blur hover:bg-copper hover:text-accent-foreground border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/85 backdrop-blur hover:bg-copper hover:text-accent-foreground border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 right-3 bg-background/85 backdrop-blur border border-border px-2 py-1 text-[10px] font-sans-alt uppercase tracking-[0.18em]">
              {safeIdx + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => onChange(i)}
              className={`aspect-square bg-white border-2 overflow-hidden transition-all ${
                i === safeIdx
                  ? 'border-copper'
                  : 'border-border opacity-70 hover:opacity-100 hover:border-foreground/40'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
