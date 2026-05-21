import { useState, useMemo } from 'react'
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContactPrefill } from '@/App'

const INTEREST_OPTIONS = [
  'Retail coffee',
  'Wholesale / Private label',
  'Green coffee',
  'Home equipment',
  'Commercial equipment',
  'Training',
  'Consulting',
  'Other',
] as const

export function Contact() {
  const { consumePrefill } = useContactPrefill()
  const [submitted, setSubmitted] = useState(false)

  // Consume any prefill on first render (won't change on subsequent renders)
  const initial = useMemo(() => consumePrefill(), [])

  const [interest, setInterest] = useState<string>(
    initial?.interest && INTEREST_OPTIONS.includes(initial.interest as typeof INTEREST_OPTIONS[number])
      ? initial.interest
      : 'Retail coffee',
  )
  const [message, setMessage] = useState<string>(
    initial?.subject ? `I'd like to enquire about: ${initial.subject}\n\n` : '',
  )

  return (
    <div>
      <section className="bg-forest-deep text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i * 73) % 800}
                cy={(i * 41) % 300}
                rx="10" ry="16"
                fill="hsl(28 60% 55%)"
                transform={`rotate(${(i * 31) % 360} ${(i * 73) % 800} ${(i * 41) % 300})`}
              />
            ))}
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">
            Let's talk coffee
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Get in touch.</h1>
          <p className="text-lg opacity-85 max-w-xl mx-auto">
            Wholesale enquiries, custom blends, equipment quotes, or just a question — drop us a line.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-12 gap-10">
        {/* Form */}
        <div className="md:col-span-7">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          {submitted ? (
            <div className="bg-card border border-copper/40 p-8 text-center">
              <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">Thank you</div>
              <h3 className="text-2xl font-semibold mb-2">Message received.</h3>
              <p className="text-muted-foreground">We'll get back to you within one working day.</p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-6 rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs"
              >
                Send Another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">First Name *</label>
                  <input required type="text" className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"/>
                </div>
                <div>
                  <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">Last Name</label>
                  <input type="text" className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"/>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">Email *</label>
                <input required type="email" className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">Company</label>
                  <input type="text" className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"/>
                </div>
                <div>
                  <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">Phone</label>
                  <input type="tel" className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"/>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">I'm interested in</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm"
                >
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={interest === 'Training' || interest === 'Consulting'
                    ? "Tell us about your team, your venue, dates that suit you, and what you'd like to cover..."
                    : "How can we help?"}
                  className="w-full px-3 py-2.5 bg-card border border-border focus:outline-none focus:border-copper text-sm resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-10 py-6"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="md:col-span-5">
          <div className="bg-card border border-border p-6 md:p-8 mb-6">
            <h3 className="text-lg font-semibold mb-5 border-b border-border pb-3">Contact details</h3>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">Visit us</div>
                  <div className="text-sm mt-1">Unit 1, Forest Hill Business Centre<br/>Clyde Vale, London SE23 3JF</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">Email</div>
                  <a href="mailto:Coffee@foresthill.coffee" className="text-sm mt-1 block hover:text-copper">Coffee@foresthill.coffee</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">Phone</div>
                  <a href="tel:+447514131830" className="text-sm mt-1 block hover:text-copper">07514 131 830</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">WhatsApp</div>
                  <a
                    href="https://wa.me/447514131830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm mt-1 block hover:text-copper"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-coffee-bean text-primary-foreground p-6">
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">Opening Hours</div>
            <div className="text-sm space-y-1.5 opacity-90">
              <div className="flex justify-between"><span>Mon – Fri</span><span>8:00 – 17:00</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>9:00 – 14:00</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
