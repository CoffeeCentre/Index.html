import { NavLink } from "react-router-dom";
import { CoffeeCupIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/events", label: "Events" },
  { to: "/membership", label: "Membership" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="bg-charcoal">
      <div className="flex items-center justify-between bg-gold px-10 py-2 text-[13px] text-charcoal max-md:px-5">
        <span>SCA & CQI Approved Training Centre</span>
        <a
          href="mailto:admin@coffeecentre.london"
          className="text-charcoal no-underline hover:underline"
        >
          admin@coffeecentre.london
        </a>
      </div>
      <div className="flex items-center justify-between px-10 py-5 max-md:px-5">
        <NavLink to="/" className="flex items-center gap-4">
          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gold">
            <CoffeeCupIcon className="h-[30px] w-[30px] fill-charcoal" />
          </span>
          <span className="text-white">
            <span className="block font-serif text-[22px] font-semibold tracking-[1px]">
              COFFEE CENTRE
            </span>
            <span className="block text-[11px] uppercase tracking-[2px] text-gold">
              London
            </span>
          </span>
        </NavLink>
        <nav className="flex gap-[30px] max-md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "group relative text-sm font-medium uppercase tracking-[1px] text-white transition-colors hover:text-gold",
                  isActive && "text-gold",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-[5px] left-0 h-[2px] bg-gold transition-[width] duration-300",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
