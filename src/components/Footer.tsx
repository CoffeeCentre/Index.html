import { MapPin, Mail, Phone } from 'lucide-react'
import { Logo } from './Logo'
import type { Category } from '@/data/products'
import { useNewsletter } from '@/App'

interface FooterProps {
  navigate: (page: 'home' | Category | 'about' | 'contact') => void
}

export function Footer({ navigate }: FooterProps) {
  const { openNewsletter } = useNewsletter()
  return (
    <footer className="bg-forest-deep text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Logo light />
            <p className="mt-5 text-sm/relaxed opacity-80 max-w-xs">
              A London roastery and equipment supplier. We source, roast, and supply
              for cafés, offices, and home enthusiasts who care about the cup.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><button onClick={() => navigate('home-equipment')} className="hover:text-copper transition-colors">Home Equipment</button></li>
              <li><button onClick={() => navigate('training')} className="hover:text-copper transition-colors">Training & Courses</button></li>
              <li><button onClick={() => navigate('consulting')} className="hover:text-copper transition-colors">Consulting</button></li>
              <li><button onClick={() => navigate('coffee')} className="hover:text-copper transition-colors">Roasted Coffee</button></li>
              <li><button onClick={() => navigate('green-coffee')} className="hover:text-copper transition-colors">Green Coffee</button></li>
              <li><button onClick={() => navigate('commercial-equipment')} className="hover:text-copper transition-colors">Commercial</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><button onClick={() => navigate('about')} className="hover:text-copper transition-colors">About</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-copper transition-colors">Contact</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-copper transition-colors">Wholesale Enquiries</button></li>
              <li><button onClick={() => navigate('commercial-equipment')} className="hover:text-copper transition-colors">Trade</button></li>
              <li><button onClick={openNewsletter} className="hover:text-copper transition-colors">Newsletter</button></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-4">
              Visit & Get in Touch
            </h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-copper" />
                <span>Unit 1, Forest Hill Business Centre<br/>Clyde Vale, London SE23 3JF</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-copper" />
                <a href="mailto:Coffee@foresthill.coffee" className="hover:text-copper">Coffee@foresthill.coffee</a>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-copper" />
                <a href="tel:+447514131830" className="hover:text-copper">07514 131 830</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs opacity-70 font-sans-alt uppercase tracking-[0.12em]">
          <span>© {new Date().getFullYear()} Coffee Centre London · All rights reserved</span>
          <span className="opacity-80">A London Roastery</span>
        </div>
      </div>
    </footer>
  )
}
