import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, Star, Tag, Flame, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND, PRODUCTS } from '@/data/products'
import type { Category } from '@/data/products'
import { useCart } from '@/contexts/CartContext'

interface HeroCarouselProps {
  navigate: (page: 'home' | Category | 'about' | 'contact') => void
}

interface Slide {
  eyebrow: string
  eyebrowIcon?: typeof Flame
  headline: React.ReactNode
  description: string
  primaryCta: { label: string; onClick: () => void }
  secondaryCta?: { label: string; onClick: () => void }
  image: string
  imageAlt: string
  badge?: { label: string; price: number; oldPrice?: number }
  layout: 'text-left' | 'text-right' | 'full-bleed'
  accentTag?: string
}

const AUTOPLAY_MS = 7000

export function HeroCarousel({ navigate }: HeroCarouselProps) {
  const { add } = useCart()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  const bundle = PRODUCTS.find((p) => p.id === 'wilfa-performance-bundle')
  const baratza = PRODUCTS.find((p) => p.id === 'baratza-encore-esp-pro')
  const comandante = PRODUCTS.find((p) => p.id === 'comandante-c40-nitro')
  const hario = PRODUCTS.find((p) => p.id === 'hario-lyra-black')

  const slides: Slide[] = [
    {
      eyebrow: 'Best Seller · In Stock',
      eyebrowIcon: Star,
      accentTag: '01 — Welcome',
      headline: (
        <>
          Brew like a{' '}
          <span className="italic font-normal text-copper">barista</span>.
          <br />
          At home.
        </>
      ),
      description:
        'Professional grinders, kettles and brewers from the best names in coffee. Hand-picked by our team. Shipped same-day from London.',
      primaryCta: { label: 'Shop Now', onClick: () => navigate('home-equipment') },
      secondaryCta: {
        label: 'View Best Sellers',
        onClick: () =>
          document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' }),
      },
      image: baratza?.image || BRAND.heroImage,
      imageAlt: 'Baratza Encore ESP Pro',
      badge: baratza ? { label: 'Best Seller', price: baratza.price } : undefined,
      layout: 'text-left',
    },
    {
      eyebrow: 'Deal of the Week',
      eyebrowIcon: Flame,
      accentTag: '02 — On Sale',
      headline: (
        <>
          Save{' '}
          <span className="italic font-normal text-copper">£114</span>.
          <br />
          Filter coffee, sorted.
        </>
      ),
      description:
        'The Wilfa Performance Thermo brewer paired with the award-winning Uniform Evo grinder. Everything you need for clean, well-extracted filter coffee at home.',
      primaryCta: {
        label: 'Add to Basket',
        onClick: () => bundle && add(bundle),
      },
      secondaryCta: {
        label: 'See Details',
        onClick: () => navigate('home-equipment'),
      },
      image: bundle?.image || BRAND.heroImage,
      imageAlt: 'Wilfa Performance Bundle',
      badge: bundle
        ? { label: 'Bundle Deal', price: bundle.salePrice ?? bundle.price, oldPrice: bundle.price }
        : undefined,
      layout: 'text-right',
    },
    {
      eyebrow: 'Hand-Made in Germany',
      eyebrowIcon: Tag,
      accentTag: '03 — Featured',
      headline: (
        <>
          The grinder{' '}
          <span className="italic font-normal text-copper">connoisseurs</span>
          <br />
          swear by.
        </>
      ),
      description:
        'Comandante C40 MK4 with aerospace-grade steel burrs. Three blade options for filter, espresso, and everything in between. Built to last a lifetime.',
      primaryCta: {
        label: 'Shop Comandante',
        onClick: () => navigate('home-equipment'),
      },
      secondaryCta: {
        label: 'All Grinders',
        onClick: () => navigate('home-equipment'),
      },
      image: comandante?.image || BRAND.heroImage,
      imageAlt: 'Comandante C40 MK4',
      badge: comandante ? { label: 'From', price: 265 } : undefined,
      layout: 'full-bleed',
    },
    {
      eyebrow: 'Pour-Over Essentials',
      eyebrowIcon: Star,
      accentTag: '04 — Hario',
      headline: (
        <>
          Precision pour.{' '}
          <br />
          <span className="italic font-normal text-copper">Variable</span> temperature.
        </>
      ),
      description:
        'The Hario Lyra electric gooseneck kettle. 800ml, variable temperature control, and a hold setting that actually works. Available in black and white.',
      primaryCta: {
        label: 'Shop Kettles',
        onClick: () => navigate('home-equipment'),
      },
      secondaryCta: {
        label: 'View Both Colours',
        onClick: () => navigate('home-equipment'),
      },
      image: hario?.image || BRAND.heroImage,
      imageAlt: 'Hario Lyra Electric Kettle',
      badge: hario ? { label: 'In Stock', price: hario.price } : undefined,
      layout: 'text-left',
    },
  ]

  // Track selected slide & reset progress bar on change
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setProgressKey((k) => k + 1)
    }
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  // Auto-advance
  useEffect(() => {
    if (!emblaApi || isPaused) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [emblaApi, isPaused, selectedIndex])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((idx: number) => emblaApi?.scrollTo(idx), [emblaApi])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scrollPrev, scrollNext])

  return (
    <section
      className="relative bg-background overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Inline animation styles */}
      <style>{`
        @keyframes hero-rise {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes hero-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.12); }
        }
        @keyframes progress-fill {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .anim-rise {
          opacity: 0;
          animation: hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .anim-fade {
          opacity: 0;
          animation: hero-fade 1.2s ease-out forwards;
        }
        .anim-zoom {
          animation: hero-zoom 8s ease-out forwards;
        }
        .anim-progress {
          transform-origin: left;
          animation: progress-fill ${AUTOPLAY_MS}ms linear forwards;
        }
        .anim-progress.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => {
            const isActive = i === selectedIndex
            return (
              <div key={i} className="flex-[0_0_100%] min-w-0" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
                <SlideContent slide={slide} isActive={isActive} addBundle={() => bundle && add(bundle)} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Top-right: slide counter */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 font-sans-alt text-[10px] uppercase tracking-[0.28em] text-foreground/60 hidden sm:block">
        <span className="text-foreground">{String(selectedIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1.5 text-foreground/30">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Prev/next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center bg-background/85 hover:bg-copper hover:text-accent-foreground border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center bg-background/85 hover:bg-copper hover:text-accent-foreground border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar + numbered indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex items-center gap-3">
          {slides.map((slide, i) => {
            const isActive = i === selectedIndex
            return (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="group/dot flex-1 flex items-center gap-2 text-left"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`font-sans-alt text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-foreground' : 'text-foreground/40 group-hover/dot:text-foreground/70'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex-1 h-[2px] bg-foreground/15 overflow-hidden">
                  {isActive && (
                    <span
                      key={progressKey}
                      className={`absolute inset-0 bg-copper anim-progress ${isPaused ? 'paused' : ''}`}
                    />
                  )}
                  {!isActive && i < selectedIndex && (
                    <span className="absolute inset-0 bg-foreground/40" />
                  )}
                </span>
                <span
                  className={`hidden md:inline font-sans-alt text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-copper' : 'text-foreground/40 group-hover/dot:text-foreground/70'
                  }`}
                >
                  {slide.accentTag?.split(' — ')[1] ?? ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------------- Slide content with layout variations ----------------
function SlideContent({
  slide,
  isActive,
  addBundle,
}: {
  slide: Slide
  isActive: boolean
  addBundle: () => void
}) {
  if (slide.layout === 'full-bleed') {
    return <FullBleedSlide slide={slide} isActive={isActive} />
  }
  return <SplitSlide slide={slide} isActive={isActive} addBundle={addBundle} />
}

function SplitSlide({ slide, isActive, addBundle }: { slide: Slide; isActive: boolean; addBundle: () => void }) {
  const textFirst = slide.layout === 'text-left'
  const animKey = `${slide.headline?.toString()}-${isActive}`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
      <div
        className={`md:col-span-7 ${textFirst ? 'md:order-1' : 'md:order-2'}`}
        key={`text-${animKey}`}
      >
        {isActive && (
          <>
            <div
              className="inline-flex items-center gap-2 bg-copper/10 border border-copper/30 px-3 py-1 mb-4 anim-rise"
              style={{ animationDelay: '0.05s' }}
            >
              {slide.eyebrowIcon && <slide.eyebrowIcon className="w-3 h-3 text-copper" />}
              <span className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper">
                {slide.eyebrow}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-4 text-foreground anim-rise"
              style={{ animationDelay: '0.15s' }}
            >
              {slide.headline}
            </h1>
            <p
              className="text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed mb-6 anim-rise"
              style={{ animationDelay: '0.3s' }}
            >
              {slide.description}
            </p>
            <div
              className="flex flex-wrap gap-2.5 anim-rise"
              style={{ animationDelay: '0.45s' }}
            >
              <Button
                onClick={slide.primaryCta.onClick}
                className="bg-copper hover:bg-copper/90 text-accent-foreground rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs px-6 py-5 shadow-lg"
              >
                {slide.primaryCta.label} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              {slide.secondaryCta && (
                <Button
                  onClick={slide.secondaryCta.onClick}
                  variant="outline"
                  className="bg-transparent border-foreground/30 text-foreground hover:bg-foreground hover:text-background rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs px-6 py-5"
                >
                  {slide.secondaryCta.label}
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      <div
        className={`md:col-span-5 ${textFirst ? 'md:order-2' : 'md:order-1'}`}
        key={`img-${animKey}`}
      >
        <div className="relative overflow-hidden shadow-xl bg-white">
          <div className="overflow-hidden p-4 md:p-6">
            {isActive ? (
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full aspect-[4/3] md:aspect-[5/6] object-contain anim-zoom"
              />
            ) : (
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full aspect-[4/3] md:aspect-[5/6] object-contain"
              />
            )}
          </div>
          {slide.badge && isActive && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur p-3 md:p-4 border-t-2 border-copper anim-rise"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-sans-alt text-[9px] uppercase tracking-[0.22em] text-copper mb-0.5">
                    {slide.badge.label}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-lg font-semibold text-destructive">
                      £{slide.badge.price.toFixed(0)}
                    </span>
                    {slide.badge.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        £{slide.badge.oldPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={
                    slide.primaryCta.label === 'Add to Basket'
                      ? addBundle
                      : slide.primaryCta.onClick
                  }
                  className="bg-copper hover:bg-copper/90 text-accent-foreground rounded-none font-sans-alt uppercase tracking-[0.16em] text-[10px] px-4 py-2 h-auto shrink-0"
                >
                  {slide.primaryCta.label === 'Add to Basket' ? 'Add' : 'View'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FullBleedSlide({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  return (
    <div className="relative min-h-[480px] md:min-h-[560px] flex items-center">
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        {isActive ? (
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover anim-zoom"
          />
        ) : (
          <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover" />
        )}
        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, hsl(20 18% 10% / 0.85) 0%, hsl(20 18% 10% / 0.55) 45%, hsl(20 18% 10% / 0.15) 100%)',
          }}
        />
      </div>

      {/* Text */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 w-full">
        <div className="max-w-2xl text-primary-foreground">
          {isActive && (
            <>
              <div
                className="inline-flex items-center gap-2 bg-copper/20 border border-copper/40 px-3 py-1 mb-4 anim-rise"
                style={{ animationDelay: '0.05s' }}
              >
                {slide.eyebrowIcon && <slide.eyebrowIcon className="w-3 h-3 text-copper" />}
                <span className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper">
                  {slide.eyebrow}
                </span>
              </div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] mb-5 anim-rise"
                style={{ animationDelay: '0.15s' }}
              >
                {slide.headline}
              </h1>
              <p
                className="text-base md:text-lg opacity-85 max-w-xl leading-relaxed mb-7 anim-rise"
                style={{ animationDelay: '0.3s' }}
              >
                {slide.description}
              </p>
              <div
                className="flex flex-wrap gap-3 anim-rise"
                style={{ animationDelay: '0.45s' }}
              >
                <Button
                  onClick={slide.primaryCta.onClick}
                  className="bg-copper hover:bg-copper/90 text-accent-foreground rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs px-6 py-5 shadow-lg"
                >
                  {slide.primaryCta.label} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                {slide.secondaryCta && (
                  <Button
                    onClick={slide.secondaryCta.onClick}
                    variant="outline"
                    className="bg-transparent border-white/40 hover:bg-white/10 hover:text-primary-foreground text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs px-6 py-5"
                  >
                    {slide.secondaryCta.label}
                  </Button>
                )}
              </div>
              {slide.badge && (
                <div
                  className="inline-flex items-baseline gap-2 mt-7 anim-rise"
                  style={{ animationDelay: '0.6s' }}
                >
                  <span className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper">
                    {slide.badge.label}
                  </span>
                  <span className="text-3xl font-semibold">£{slide.badge.price.toFixed(0)}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
