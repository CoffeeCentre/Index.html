import { useState } from 'react'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Mail, Check, X, Tag } from 'lucide-react'

interface NewsletterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Topic {
  id: string
  label: string
}

const TOPICS: Topic[] = [
  { id: 'coffee', label: 'Roasted Coffee' },
  { id: 'green-coffee', label: 'Green Coffee' },
  { id: 'equipment', label: 'Brewing Equipment' },
  { id: 'training', label: 'Training & Courses' },
  { id: 'trade', label: 'Trade & Wholesale' },
  { id: 'consulting', label: 'Consulting & Insights' },
]

export function NewsletterModal({ open, onOpenChange }: NewsletterModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(
    new Set(['coffee', 'equipment', 'training']),
  )
  const [includeOffers, setIncludeOffers] = useState(true)

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allSelected = selectedTopics.size === TOPICS.length
  const toggleAll = () => {
    setSelectedTopics(allSelected ? new Set() : new Set(TOPICS.map((t) => t.id)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('success')
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => setStep('form'), 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* `[&>button:last-of-type]:hidden` hides ONLY the default low-contrast close X (Radix renders it last).
          Our custom Close button (declared first) stays visible. */}
      <DialogContent className="max-w-xl bg-background border-border p-0 rounded-none gap-0 [&>button:last-of-type]:hidden overflow-hidden">
        {/* Prominent close button — red pill with "Close" label, top right of header */}
        <DialogClose
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 px-3 py-2 bg-copper hover:bg-copper/90 text-accent-foreground shadow-lg transition-all hover:scale-[1.03] ring-2 ring-background/40 font-sans-alt text-[11px] uppercase tracking-[0.18em]"
          aria-label="Close newsletter signup"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          Close
        </DialogClose>

        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            {/* Compact header band */}
            <div className="bg-forest-deep text-primary-foreground px-6 py-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="xMidYMid slice">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ellipse
                      key={i}
                      cx={(i * 87) % 500}
                      cy={(i * 23) % 100}
                      rx="12" ry="18"
                      fill="hsl(0 65% 55%)"
                      transform={`rotate(${(i * 41) % 360} ${(i * 87) % 500} ${(i * 23) % 100})`}
                    />
                  ))}
                </svg>
              </div>
              <div className="relative pr-24">
                <div className="inline-flex items-center gap-1.5 mb-1.5">
                  <Tag className="w-3 h-3 text-copper" />
                  <span className="font-sans-alt text-[9px] uppercase tracking-[0.22em] text-copper">
                    First to Know
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold leading-tight">
                  Join the club.
                </h2>
                <p className="text-[12px] opacity-80 mt-0.5">
                  Hand-picked emails on the topics you care about.
                </p>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Name + Email — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-card border border-border focus:outline-none focus:border-copper text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2 bg-card border border-border focus:outline-none focus:border-copper text-sm"
                  />
                </div>
              </div>

              {/* Topics as compact chips */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="block text-[10px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground">
                    Pick your topics
                  </label>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-[10px] font-sans-alt uppercase tracking-[0.16em] text-copper hover:text-foreground transition-colors"
                  >
                    {allSelected ? 'Clear all' : 'Select all'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {TOPICS.map((t) => {
                    const checked = selectedTopics.has(t.id)
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTopic(t.id)}
                        className={`text-left px-3 py-2 border text-[12px] leading-tight font-semibold transition-all flex items-center gap-2 ${
                          checked
                            ? 'border-copper bg-copper/10 text-foreground'
                            : 'border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? 'bg-copper border-copper'
                              : 'border-border bg-background'
                          }`}
                        >
                          {checked && <Check className="w-2.5 h-2.5 text-accent-foreground" strokeWidth={3} />}
                        </span>
                        <span className="truncate">{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Special offers — inline */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOffers}
                  onChange={(e) => setIncludeOffers(e.target.checked)}
                  className="sr-only peer"
                />
                <span
                  className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                    includeOffers
                      ? 'bg-copper border-copper'
                      : 'border-border bg-card'
                  }`}
                >
                  {includeOffers && <Check className="w-2.5 h-2.5 text-accent-foreground" strokeWidth={3} />}
                </span>
                <span className="text-[12px] text-foreground">
                  Also send me <strong>sales &amp; special offers</strong>
                </span>
              </label>

              {/* Submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={!email || selectedTopics.size === 0}
                  className="w-full bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
                <p className="text-[10px] text-muted-foreground text-center font-sans-alt uppercase tracking-[0.14em] mt-2">
                  Unsubscribe any time · We never share your details
                </p>
              </div>
            </div>
          </form>
        ) : (
          // Success state — compact, no scroll
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-copper/15 border border-copper flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-copper" strokeWidth={2.5} />
            </div>
            <div className="font-sans-alt text-[10px] uppercase tracking-[0.22em] text-copper mb-2">
              You're in
            </div>
            <h2 className="text-2xl font-semibold leading-tight mb-3">
              Welcome to the club{firstName ? `, ${firstName}` : ''}.
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">
              We've added <span className="text-foreground font-semibold">{email}</span> to the list.
              You'll only hear from us about the{' '}
              {selectedTopics.size === TOPICS.length
                ? 'topics you selected'
                : `${selectedTopics.size} ${selectedTopics.size === 1 ? 'topic' : 'topics'} you chose`}
              {includeOffers ? ' plus the occasional special offer.' : '.'}
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-8 py-5"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
