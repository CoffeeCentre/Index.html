import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/events", label: "Events" },
];

const PROGRAMS = [
  { to: "/courses", label: "Barista Skills" },
  { to: "/courses", label: "Sensory Skills" },
  { to: "/courses", label: "Brewing" },
  { to: "/courses", label: "Q Grader" },
];

const SOCIAL = ["Instagram", "Facebook", "LinkedIn", "Newsletter"];

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal px-[60px] py-[60px] max-md:px-5">
      <div className="mb-10 grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-md:grid-cols-1">
        <div>
          <h3 className="mb-4 font-serif text-[22px] text-white">
            Coffee Centre London
          </h3>
          <p className="text-sm leading-[1.7] text-white/60">
            London's premier SCA & CQI approved training facility. Elevating
            coffee professionals through world-class education.
          </p>
        </div>
        <FooterColumn title="Quick Links">
          {QUICK_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="text-sm text-white/60 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Programs">
          {PROGRAMS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="text-sm text-white/60 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Connect">
          {SOCIAL.map((label) => (
            <li key={label}>
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-gold"
              >
                {label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-[30px] max-md:flex-col max-md:gap-2">
        <p className="text-[13px] text-white/40">
          © 2026 Coffee Centre London. All rights reserved.
        </p>
        <p className="text-[13px] text-white/40">
          Unit 1, Forest Hill Business Centre, London SE23
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-5 text-[13px] uppercase tracking-[1px] text-gold">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}
