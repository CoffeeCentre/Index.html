import { PageHero, Section } from "@/components/section";
import { cn } from "@/lib/utils";

const DAY_NAMES = ["M", "T", "W", "T", "F", "S", "S"];

// Feb 2026 starts on a Sunday — first row leads with 6 empty cells.
const CALENDAR: ({ day: number; hasEvent?: boolean } | null)[] = [
  null, null, null, null, null, null, { day: 1 },
  { day: 2 }, { day: 3 }, { day: 4 }, { day: 5, hasEvent: true }, { day: 6, hasEvent: true }, { day: 7 }, { day: 8 },
  { day: 9 }, { day: 10 }, { day: 11 }, { day: 12, hasEvent: true }, { day: 13, hasEvent: true }, { day: 14 }, { day: 15 },
  { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20, hasEvent: true }, { day: 21 }, { day: 22 },
];

const EVENTS = [
  {
    day: 5,
    month: "FEB",
    type: "SCA Course",
    title: "Barista Skills Foundation",
    details: "9:00 AM - 5:00 PM • 6 spots remaining",
  },
  {
    day: 12,
    month: "FEB",
    type: "Workshop",
    title: "Latte Art Masterclass",
    details: "6:00 PM - 9:00 PM • Members Priority",
  },
  {
    day: 20,
    month: "FEB",
    type: "Cupping",
    title: "Public Cupping Session",
    details: "11:00 AM - 1:00 PM • Free for Members",
  },
];

export default function Events() {
  return (
    <>
      <PageHero
        title="Events & Calendar"
        subtitle="Upcoming courses, workshops, and community events"
      />
      <Section>
        <div className="grid grid-cols-[300px_1fr] gap-10 max-md:grid-cols-1">
          <aside className="bg-cream p-[30px]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-lg">February 2026</h3>
              <div className="flex gap-2.5">
                <button
                  className="h-[30px] w-[30px] bg-charcoal text-white"
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button
                  className="h-[30px] w-[30px] bg-charcoal text-white"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {DAY_NAMES.map((d, i) => (
                <span
                  key={i}
                  className="py-2.5 text-[11px] uppercase text-ink-muted"
                >
                  {d}
                </span>
              ))}
              {CALENDAR.map((cell, i) =>
                cell === null ? (
                  <span key={i} className="p-2.5 text-sm opacity-30" />
                ) : (
                  <button
                    key={i}
                    className={cn(
                      "p-2.5 text-sm transition-colors hover:bg-gold hover:text-charcoal",
                      cell.hasEvent && "bg-brand-blue text-white",
                    )}
                  >
                    {cell.day}
                  </button>
                ),
              )}
            </div>
          </aside>
          <div>
            {EVENTS.map((e) => (
              <article
                key={e.title}
                className="mb-5 grid grid-cols-[100px_1fr] border border-cream-dark"
              >
                <div className="bg-gold p-5 text-center">
                  <span className="block font-serif text-4xl text-charcoal">
                    {e.day}
                  </span>
                  <span className="text-xs uppercase tracking-[1px] text-charcoal">
                    {e.month}
                  </span>
                </div>
                <div className="p-5">
                  <span className="mb-2.5 inline-block bg-cream px-3 py-1 text-[11px] uppercase tracking-[1px] text-charcoal">
                    {e.type}
                  </span>
                  <h3 className="mb-2.5 font-serif text-xl text-charcoal">
                    {e.title}
                  </h3>
                  <p className="text-sm text-ink-muted">{e.details}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
