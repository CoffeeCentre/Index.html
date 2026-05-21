import { Award, Leaf, Globe, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Category } from '@/data/products'

interface AboutProps {
  navigate: (page: 'home' | Category | 'about' | 'contact') => void
}

export function About({ navigate }: AboutProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-deep text-primary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 16 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i * 67) % 800}
                cy={(i * 53) % 400}
                rx="14" ry="22"
                fill="hsl(28 60% 55%)"
                transform={`rotate(${(i * 31) % 360} ${(i * 67) % 800} ${(i * 53) % 400})`}
              />
            ))}
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-4">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Coffee, done with<br/><span className="italic" style={{ color: 'hsl(28 60% 65%)' }}>actual care.</span>
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">
            We're a small team of roasters, baristas, and engineers who got tired of watching
            great coffee end up in bad cups. So we built something better.
          </p>
        </div>
      </section>

      {/* Founder section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] max-w-sm mx-auto">
            <div className="absolute inset-0 bg-copper/20 -rotate-3"></div>
            <div className="absolute inset-2 bg-coffee-bean">
              <svg viewBox="0 0 200 250" className="w-full h-full">
                <circle cx="100" cy="90" r="42" fill="hsl(28 40% 70%)"/>
                <path d="M 60 80 Q 60 50 100 47 Q 140 50 140 80 Q 140 64 100 58 Q 60 64 60 80" fill="hsl(25 30% 18%)"/>
                <ellipse cx="86" cy="92" rx="3" ry="3.5" fill="hsl(25 30% 18%)"/>
                <ellipse cx="114" cy="92" rx="3" ry="3.5" fill="hsl(25 30% 18%)"/>
                <path d="M 88 110 Q 100 116 112 110" stroke="hsl(25 30% 18%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M 55 145 Q 55 250 100 250 Q 145 250 145 145 L 132 138 Q 100 152 68 138 Z" fill="hsl(38 33% 96%)"/>
                <line x1="100" y1="145" x2="100" y2="250" stroke="hsl(28 60% 45%)" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">
            Founder · Q Grader
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            "Good coffee shouldn't<br/>be exclusive or expensive."
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4">
            After five years as Head of Coffee at one of London's biggest department stores,
            I'd mastered the luxury end. But the real challenge was scaling that care —
            bringing the same precision to brands serving thousands of cups, not dozens.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4">
            Coffee Centre London exists to raise the bar for everyday coffee. Proper quality at
            a fair price for any brand with ambition — and any home enthusiast who wants the
            same kit cafés use.
          </p>
          <p className="text-sm font-sans-alt uppercase tracking-[0.18em] text-copper mt-6">
            — Founder, Q Grader · Cup of Excellence International Judge
          </p>
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">
              What we stand for
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold">Six things we won't compromise on.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '01', icon: Award, title: 'Serious about sourcing', body: 'Q Grader and Cup of Excellence International Judge. We taste hundreds of coffees so you don\'t have to.' },
              { num: '02', icon: Leaf, title: 'Certified organic', body: 'Soil Association certified manufacturer. Not just a handler — we actually make the stuff.' },
              { num: '03', icon: Globe, title: 'Direct relationships', body: 'We work with hundreds of producers worldwide. Real names. Real partnerships. Fair prices.' },
              { num: '04', icon: Users, title: 'Done it before', body: 'Set up roasteries and brands in the UK, Dubai, US, and India. We\'ve been around the block.' },
              { num: '05', icon: Award, title: 'Tested under pressure', body: 'UK Coffee Roasting Championship finalist. Not just talk — judged on it.' },
              { num: '06', icon: Leaf, title: 'No house brand', body: 'For wholesale clients, we don\'t compete with you. Your brand, our roasting.' },
            ].map((v, i) => (
              <div key={i} className="border-l-2 border-copper/40 pl-5 py-2">
                <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
                  {v.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Want to work with us?</h2>
        <p className="text-muted-foreground mb-8">
          Whether you're starting a café, launching a coffee brand, or just want better beans at home —
          we'd love to hear from you.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => navigate('contact')}
            className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
          >
            Get in Touch
          </Button>
          <Button
            onClick={() => navigate('coffee')}
            variant="outline"
            className="rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-6"
          >
            Shop Coffee
          </Button>
        </div>
      </section>
    </div>
  )
}
