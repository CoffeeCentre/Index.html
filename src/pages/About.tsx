import { PageHero, Section, SectionHeader } from "@/components/section";
import { CoffeeCupIcon, UserIcon } from "@/components/icons";

const TEAM = [
  {
    name: "Bartosz Ciepaj",
    title: "Founder & Lead Trainer",
    bio: "Q Grader, AST, Cup of Excellence Judge. Former Head of Coffee at Harrods with 20+ years industry experience.",
  },
  {
    name: "Guest Trainers",
    title: "Industry Specialists",
    bio: "We regularly host guest trainers from across the specialty coffee world for masterclasses and workshops.",
  },
  {
    name: "Join Our Team",
    title: "Career Opportunities",
    bio: "Interested in joining Coffee Centre London? Get in touch to discuss training and career opportunities.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        title="About Coffee Centre London"
        subtitle="London's premier destination for professional coffee education since 2024"
      />
      <Section>
        <div className="grid grid-cols-2 items-center gap-[60px] max-md:grid-cols-1">
          <div className="flex h-[400px] items-center justify-center bg-cream">
            <CoffeeCupIcon className="h-[150px] w-[150px] fill-gold" />
          </div>
          <div>
            <h2 className="mb-5 font-serif text-[32px] text-charcoal">
              Our Mission
            </h2>
            <p className="mb-5 leading-[1.8] text-ink-muted">
              Coffee Centre London was founded with a singular vision: to
              provide world-class coffee education that bridges the gap between
              passion and profession.
            </p>
            <p className="mb-5 leading-[1.8] text-ink-muted">
              Located in Forest Hill, South East London, our purpose-built
              training facility combines state-of-the-art equipment with decades
              of industry expertise. We're not just teaching coffee—we're
              shaping the future of specialty coffee professionals.
            </p>
            <p className="leading-[1.8] text-ink-muted">
              As an SCA Premier Campus and CQI Licensed centre, we maintain the
              highest international standards while fostering an inclusive,
              supportive learning environment.
            </p>
          </div>
        </div>
      </Section>
      <Section className="bg-cream">
        <SectionHeader label="Leadership" title="Meet Our Team" />
        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-1">
          {TEAM.map((m) => (
            <div key={m.name} className="bg-cream p-[30px] text-center">
              <div className="mx-auto mb-5 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-charcoal">
                <UserIcon className="h-[60px] w-[60px] fill-gold" />
              </div>
              <h3 className="mb-1 font-serif text-[22px] text-charcoal">
                {m.name}
              </h3>
              <span className="mb-4 block text-[13px] uppercase tracking-[1px] text-gold">
                {m.title}
              </span>
              <p className="text-sm text-ink-muted">{m.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
