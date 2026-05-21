import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/section";
import {
  BeansIcon,
  CoffeeCupIcon,
  DiamondIcon,
  EspressoIcon,
  GearIcon,
  PaletteIcon,
  SealIcon,
  SparkleIcon,
  StarIcon,
  SteamIcon,
} from "@/components/icons";

const PROGRAMS = [
  {
    icon: EspressoIcon,
    title: "SCA Barista Skills",
    description:
      "From Foundation to Professional level, master espresso extraction, milk techniques, and workflow efficiency.",
    price: "From £250",
  },
  {
    icon: DiamondIcon,
    title: "SCA Sensory Skills",
    description:
      "Develop your palate with systematic training in flavour identification and coffee evaluation techniques.",
    price: "From £295",
  },
  {
    icon: SteamIcon,
    title: "SCA Brewing",
    description:
      "Master manual brewing methods, extraction science, and recipe development for filter coffee excellence.",
    price: "From £275",
  },
  {
    icon: BeansIcon,
    title: "SCA Roasting",
    description:
      "Learn roast profiling, sample roasting, and quality control on professional equipment.",
    price: "From £395",
  },
  {
    icon: StarIcon,
    title: "Q Grader Certification",
    description:
      "The gold standard in coffee quality assessment. Intensive 6-day programme with CQI certification.",
    price: "£2,500",
  },
  {
    icon: PaletteIcon,
    title: "Green Coffee",
    description:
      "Understand coffee origins, processing methods, and sourcing strategies for quality green beans.",
    price: "From £325",
  },
];

const STATS = [
  { number: "500+", label: "Students Trained" },
  { number: "15+", label: "SCA Certifications" },
  { number: "20+", label: "Years Experience" },
  { number: "100%", label: "Pass Rate" },
];

const CREDENTIALS = [
  {
    icon: SealIcon,
    title: "SCA Premier Campus",
    description: "Specialty Coffee Association approved training facility",
  },
  {
    icon: GearIcon,
    title: "CQI Licensed",
    description: "Coffee Quality Institute certification centre",
  },
  {
    icon: SparkleIcon,
    title: "AST Trainers",
    description: "Authorised SCA Trainers with industry credentials",
  },
  {
    icon: DiamondIcon,
    title: "Q Grader Instructors",
    description: "Certified Q Instructors for professional calibration",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex h-[600px] items-center overflow-hidden bg-gradient-to-br from-charcoal to-charcoal-light">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(201, 169, 98, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(44, 74, 94, 0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-[700px] px-20 max-md:px-10">
          <div className="mb-6 inline-block bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[2px] text-charcoal">
            SCA Premier Campus
          </div>
          <h1 className="mb-5 font-serif text-[52px] leading-[1.2] text-white max-md:text-[38px]">
            Master the Art & Science of{" "}
            <span className="text-gold">Specialty Coffee</span>
          </h1>
          <p className="mb-9 text-lg leading-[1.7] text-white/80">
            London's only SCA & CQI approved training centre. From barista
            foundations to Q Grader certification, elevate your coffee career
            with world-class education.
          </p>
          <div className="flex gap-4 max-md:flex-col">
            <Button asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Book a Tour</Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-[-50px] top-1/2 hidden h-[550px] w-[550px] -translate-y-1/2 items-center justify-center md:flex">
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23c9a962' opacity='0.1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='%23c9a962' opacity='0.15'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%23c9a962' opacity='0.2'/%3E%3C/svg%3E\") center/contain no-repeat",
            }}
          >
            <div className="flex h-[350px] w-[350px] items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-light shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <CoffeeCupIcon className="h-[150px] w-[150px] fill-gold" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-8 bg-brand-blue px-[60px] py-12 max-md:grid-cols-2 max-md:px-5">
        {STATS.map((s) => (
          <div key={s.label} className="text-center text-white">
            <span className="block font-serif text-5xl text-gold">
              {s.number}
            </span>
            <span className="text-sm uppercase tracking-[1px] opacity-90">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <Section>
        <SectionHeader
          label="Our Programs"
          title="Professional Coffee Certifications"
          subtitle="Industry-recognised qualifications delivered by certified trainers with real-world experience"
        />
        <div className="grid grid-cols-3 gap-[30px] max-[1200px]:grid-cols-2 max-md:grid-cols-1">
          {PROGRAMS.map((p) => (
            <article
              key={p.title}
              className="border border-cream-dark bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex h-[200px] items-center justify-center bg-cream">
                <p.icon className="h-20 w-20 fill-gold" />
              </div>
              <div className="p-6">
                <h3 className="mb-2.5 font-serif text-xl text-charcoal">
                  {p.title}
                </h3>
                <p className="mb-5 text-sm text-ink-muted">{p.description}</p>
                <div className="flex items-center justify-between border-t border-cream-dark pt-4">
                  <span className="text-lg font-semibold text-brand-blue">
                    {p.price}
                  </span>
                  <Link
                    to="/courses"
                    className="text-[13px] font-semibold uppercase tracking-[1px] text-gold no-underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeader
          label="Credentials"
          title="Internationally Recognised Standards"
        />
        <div className="grid grid-cols-4 gap-10 max-md:grid-cols-2">
          {CREDENTIALS.map((c) => (
            <div key={c.title} className="text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_5px_20px_rgba(0,0,0,0.05)]">
                <c.icon className="h-10 w-10 fill-gold" />
              </div>
              <h4 className="mb-2 text-sm uppercase tracking-[1px] text-charcoal">
                {c.title}
              </h4>
              <p className="text-[13px] text-ink-muted">{c.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
