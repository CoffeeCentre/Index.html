import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/section";

const CATEGORIES = [
  {
    title: "Green Coffee",
    description:
      "Carefully sourced single origins and micro-lots from our global network of producers.",
  },
  {
    title: "Roasted Coffee",
    description:
      "Ultra-frozen specialty coffee from Forest Hill Coffee, preserved at peak freshness.",
  },
  {
    title: "Equipment",
    description:
      "Professional-grade brewing equipment and accessories, curated by our team.",
  },
];

export default function Shop() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <>
      <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-cream to-cream-dark px-5 text-center">
        <div>
          <h2 className="mb-5 font-serif text-5xl text-charcoal max-md:text-4xl">
            Shop Coming Soon
          </h2>
          <p className="mb-8 text-lg text-ink-muted">
            We're building something special. Be the first to know when our
            online shop launches.
          </p>
          {submitted ? (
            <p className="text-base font-semibold text-brand-blue">
              Thanks — we'll be in touch.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto flex max-w-[400px] gap-2.5 max-md:flex-col"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 border border-charcoal bg-white px-5 py-3.5 font-sans text-base focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button type="submit">Notify Me</Button>
            </form>
          )}
        </div>
      </div>
      <Section>
        <SectionHeader
          label="What's Coming"
          title="Premium Coffee & Equipment"
        />
        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-1">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="border border-cream-dark bg-white p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            >
              <h3 className="mb-2.5 font-serif text-xl text-charcoal">
                {c.title}
              </h3>
              <p className="text-sm text-ink-muted">{c.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
