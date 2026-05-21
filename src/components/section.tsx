import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("px-[60px] py-20 max-md:px-5 max-md:py-12", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-[60px] text-center">
      {label && (
        <span className="mb-4 block text-xs uppercase tracking-[3px] text-gold">
          {label}
        </span>
      )}
      <h2 className="mb-5 font-serif text-[38px] text-charcoal">{title}</h2>
      {subtitle && (
        <p className="mx-auto max-w-[600px] text-[17px] text-ink-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-gradient-to-br from-brand-blue to-brand-blue-light px-[60px] py-[100px] text-center max-md:px-5">
      <h1 className="mb-5 font-serif text-5xl text-white max-md:text-4xl">
        {title}
      </h1>
      <p className="mx-auto max-w-[600px] text-lg text-white/80">{subtitle}</p>
    </div>
  );
}
