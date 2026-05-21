import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/section";
import { EspressoIcon, StarIcon } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Category = "All Courses" | "SCA" | "CQI" | "Workshops";

interface Course {
  category: Exclude<Category, "All Courses">;
  level: string;
  levelClass: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string;
  certification: string;
  price: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const COURSES: Course[] = [
  {
    category: "SCA",
    level: "Foundation",
    levelClass: "bg-brand-blue text-white",
    title: "SCA Barista Skills Foundation",
    description:
      "Perfect for beginners or those wanting to formalise their skills. Learn espresso fundamentals, milk steaming basics, and essential workflow.",
    duration: "1 Day",
    prerequisites: "None",
    certification: "SCA Certificate",
    price: "£250",
    icon: EspressoIcon,
  },
  {
    category: "SCA",
    level: "Intermediate",
    levelClass: "bg-gold text-charcoal",
    title: "SCA Barista Skills Intermediate",
    description:
      "Deepen your understanding of espresso extraction, develop advanced milk techniques, and learn troubleshooting strategies.",
    duration: "2 Days",
    prerequisites: "Foundation or equivalent",
    certification: "SCA Certificate",
    price: "£450",
    icon: EspressoIcon,
  },
  {
    category: "CQI",
    level: "Professional",
    levelClass: "bg-[#8B0000] text-white",
    title: "CQI Q Grader Course",
    description:
      "The gold standard in coffee quality assessment. Intensive 6-day programme covering sensory evaluation, green grading, and cupping protocols.",
    duration: "6 Days",
    prerequisites: "Sensory experience recommended",
    certification: "CQI Q Grader License",
    price: "£2,500",
    icon: StarIcon,
  },
];

const FILTERS: Category[] = ["All Courses", "SCA", "CQI", "Workshops"];

export default function Courses() {
  const [filter, setFilter] = useState<Category>("All Courses");

  const visible = COURSES.filter(
    (c) => filter === "All Courses" || c.category === filter,
  );

  return (
    <>
      <PageHero
        title="Professional Coffee Courses"
        subtitle="SCA & CQI certified programmes for every stage of your coffee journey"
      />
      <Section>
        <div className="mb-10 flex justify-center gap-4 max-md:flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "border border-charcoal bg-transparent px-6 py-2.5 text-[13px] uppercase tracking-[1px] transition-all duration-300 hover:bg-charcoal hover:text-white",
                filter === f && "bg-charcoal text-white",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-ink-muted">
            No courses in this category yet — check back soon.
          </p>
        ) : (
          visible.map((c) => (
            <article
              key={c.title}
              className="mb-5 grid grid-cols-[250px_1fr] border border-cream-dark max-md:grid-cols-1"
            >
              <div className="flex items-center justify-center bg-cream">
                <c.icon className="h-[100px] w-[100px] fill-gold" />
              </div>
              <div className="p-6">
                <span
                  className={cn(
                    "mb-2.5 inline-block px-3 py-1 text-[11px] uppercase tracking-[1px]",
                    c.levelClass,
                  )}
                >
                  {c.level}
                </span>
                <h3 className="mb-2.5 font-serif text-2xl text-charcoal">
                  {c.title}
                </h3>
                <p className="mb-4 text-sm text-ink-muted">{c.description}</p>
                <div className="mb-4 flex gap-[30px] text-[13px] text-ink-muted max-md:flex-col max-md:gap-1">
                  <span>
                    <strong className="text-charcoal">Duration:</strong>{" "}
                    {c.duration}
                  </span>
                  <span>
                    <strong className="text-charcoal">Prerequisites:</strong>{" "}
                    {c.prerequisites}
                  </span>
                  <span>
                    <strong className="text-charcoal">Certification:</strong>{" "}
                    {c.certification}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-cream-dark pt-4 max-md:flex-col max-md:items-start max-md:gap-3">
                  <span className="text-2xl font-semibold text-brand-blue">
                    {c.price}
                  </span>
                  <Button>Book Now</Button>
                </div>
              </div>
            </article>
          ))
        )}
      </Section>
    </>
  );
}
