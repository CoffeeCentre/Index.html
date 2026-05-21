import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/section";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  variant: "primary" | "outline";
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Explorer",
    price: "£25",
    period: "/month",
    features: [
      "Access to public cupping sessions",
      "10% discount on courses",
      "Monthly newsletter",
      "Member-only events access",
      "Online learning resources",
    ],
    cta: "Join Explorer",
    variant: "outline",
  },
  {
    name: "Professional",
    price: "£75",
    period: "/month",
    features: [
      "All Explorer benefits",
      "20% discount on courses",
      "Priority booking for courses",
      "4 hours facility access/month",
      "Guest trainer workshops",
      "Networking events",
    ],
    cta: "Join Professional",
    variant: "primary",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Professional benefits",
      "Custom training programmes",
      "Dedicated account manager",
      "Team training discounts",
      "Private facility hire",
      "Quality consultancy",
    ],
    cta: "Contact Us",
    variant: "outline",
  },
];

export default function Membership() {
  return (
    <>
      <PageHero
        title="Membership"
        subtitle="Join our community and unlock exclusive benefits"
      />
      <Section>
        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-1">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "relative border-2 border-cream-dark p-10 text-center transition-all duration-300",
                tier.featured && "scale-105 border-gold max-md:scale-100",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold px-4 py-1 text-[11px] tracking-[1px] text-charcoal">
                  MOST POPULAR
                </span>
              )}
              <h3 className="mb-2.5 font-serif text-2xl text-charcoal">
                {tier.name}
              </h3>
              <div className="mb-1 text-5xl font-semibold text-brand-blue">
                {tier.price}
                {tier.period && (
                  <span className="text-base text-ink-muted">
                    {tier.period}
                  </span>
                )}
              </div>
              <ul className="my-[30px] space-y-0 text-left">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 border-b border-cream-dark py-3 text-sm text-ink-muted"
                  >
                    <span className="font-bold text-gold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={tier.variant} className="w-full">
                {tier.cta}
              </Button>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
