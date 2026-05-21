import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/section";
import { ClockIcon, EnvelopeIcon, PinIcon } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

interface ContactItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}

const DETAILS: ContactItem[] = [
  {
    icon: PinIcon,
    title: "Address",
    body: "Unit 1, Forest Hill Business Centre\nClyde Vale, London SE23 3JF",
  },
  {
    icon: EnvelopeIcon,
    title: "Email",
    body: "admin@coffeecentre.london",
  },
  {
    icon: ClockIcon,
    title: "Opening Hours",
    body: "Monday - Friday: 9:00 - 17:00\nWeekends: By appointment",
  },
];

const SUBJECTS = [
  "Course Enquiry",
  "Corporate Training",
  "Membership",
  "Facility Hire",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch to discuss training, memberships, or facility hire"
      />
      <Section>
        <div className="grid grid-cols-2 gap-[60px] max-md:grid-cols-1">
          <div>
            <h2 className="mb-5 font-serif text-[32px] text-charcoal">
              Let's Talk Coffee
            </h2>
            <p className="mb-8 text-ink-muted">
              Whether you're looking to book a course, enquire about corporate
              training, or simply have questions about your coffee journey,
              we're here to help.
            </p>
            {DETAILS.map((d) => (
              <div key={d.title} className="mb-6 flex items-start gap-4">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center bg-cream">
                  <d.icon className="h-6 w-6 fill-gold" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm uppercase tracking-[1px] text-charcoal">
                    {d.title}
                  </h4>
                  <p className="whitespace-pre-line text-[15px] text-ink-muted">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="bg-cream p-10">
            <h3 className="mb-6 font-serif text-2xl">Send us a Message</h3>
            {submitted ? (
              <p className="text-brand-blue">
                Thanks for reaching out — we'll reply within one business day.
              </p>
            ) : (
              <>
                <div className="mb-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                  <Field label="First Name">
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Last Name">
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Email Address" className="mb-5">
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Subject" className="mb-5">
                  <select className={inputClass} defaultValue={SUBJECTS[0]}>
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" className="mb-5">
                  <textarea
                    required
                    placeholder="How can we help you?"
                    className={`${inputClass} h-[120px] resize-y`}
                  />
                </Field>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </>
            )}
          </form>
        </div>
      </Section>
      <div className="flex h-[350px] items-center justify-center bg-cream">
        <div className="text-center text-ink-muted">
          <PinIcon className="mx-auto mb-4 h-[60px] w-[60px] fill-gold" />
          <p>Interactive Google Map would be embedded here</p>
          <p className="text-[13px]">
            Forest Hill Business Centre, SE23 3JF
          </p>
        </div>
      </div>
    </>
  );
}

const inputClass =
  "w-full border border-cream-dark bg-white px-4 py-3 font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-gold";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-[13px] uppercase tracking-[1px] text-charcoal">
        {label}
      </span>
      {children}
    </label>
  );
}
