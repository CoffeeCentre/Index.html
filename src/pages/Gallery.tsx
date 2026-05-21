import { PageHero, Section, SectionHeader } from "@/components/section";
import {
  BeansIcon,
  CoffeeCupIcon,
  DiamondIcon,
  PaletteIcon,
  PlusFrameIcon,
  StarIcon,
  SteamIcon,
  UserIcon,
} from "@/components/icons";

const ITEMS = [
  CoffeeCupIcon,
  DiamondIcon,
  PaletteIcon,
  UserIcon,
  StarIcon,
  PlusFrameIcon,
  SteamIcon,
  BeansIcon,
];

export default function Gallery() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A glimpse into life at Coffee Centre London"
      />
      <section className="p-0">
        <div className="grid grid-cols-4 gap-1 max-md:grid-cols-2">
          {ITEMS.map((Icon, i) => (
            <button
              key={i}
              className="flex aspect-square items-center justify-center bg-cream transition-opacity hover:opacity-80"
              aria-label={`Gallery image ${i + 1}`}
            >
              <Icon className="h-10 w-10 fill-gold" />
            </button>
          ))}
        </div>
      </section>
      <Section>
        <SectionHeader
          label="Follow Us"
          title="@coffeecentrelondon"
          subtitle="Follow us on Instagram for daily updates, behind-the-scenes content, and coffee inspiration"
        />
      </Section>
    </>
  );
}
