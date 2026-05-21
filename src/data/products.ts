export type Category = 'coffee' | 'home-equipment' | 'green-coffee' | 'commercial-equipment' | 'training' | 'consulting'

import { GEISHA_NATURAL_LOT_4_IMG } from './images/geishaNatural'

export type CourseLevel = 'Foundation' | 'Intermediate' | 'Professional' | 'Bespoke'
export type CourseBody = 'SCA' | 'CQI' | 'Custom'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  salePrice?: number
  priceFrom?: boolean // when true, displays as "from £X"
  unit?: string
  origin?: string
  roast?: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark'
  notes?: string[]
  description: string
  badge?: string
  rating?: number
  image?: string
  images?: string[] // Full gallery for product detail page
  descriptionHtml?: string // Full HTML description for product detail page
  productUrl?: string
  variantId?: string // Shopify ProductVariant ID for cart permalink checkout
  soldOut?: boolean
  // Training-specific
  courseBody?: CourseBody
  courseLevel?: CourseLevel
  duration?: string
  tutor?: string
  location?: 'Workshop' | 'On-Site' | 'Workshop or On-Site'
  // Consulting-specific
  consultingScope?: string[]
  consultingFormat?: string
}

export const CATEGORIES: { id: Category; label: string; tagline: string; image: string }[] = [
  {
    id: 'home-equipment',
    label: 'Home Equipment',
    tagline: 'Grinders, kettles & brewers from the best names in coffee',
    image: '',
  },
  {
    id: 'training',
    label: 'Training & Courses',
    tagline: 'SCA & CQI certified courses with UK\'s top tutors',
    image: '',
  },
  {
    id: 'consulting',
    label: 'Consulting',
    tagline: 'End-to-end coffee project consulting — concept to opening day',
    image: '',
  },
  {
    id: 'coffee',
    label: 'Roasted Coffee',
    tagline: 'Single origins & signature blends, roasted weekly',
    image: '',
  },
  {
    id: 'green-coffee',
    label: 'Green Coffee',
    tagline: 'Unroasted specialty beans for home & micro-roasters',
    image: '',
  },
  {
    id: 'commercial-equipment',
    label: 'Commercial Equipment',
    tagline: 'Café-grade machines, grinders & accessories',
    image: '',
  },
]

const CDN = 'https://cdn.shopify.com/s/files/1/1027/4445/7541/files'
const STORE = 'https://brewing.coffeecentre.london/products'

export const PRODUCTS: Product[] = [
  // Home Equipment — real catalogue
  {
    id: 'baratza-encore-esp-pro',
    name: 'Baratza Encore ESP Pro',
    category: 'home-equipment',
    price: 249.95,
    description: 'Entry-level espresso and filter grinder from Baratza. 40mm conical burrs with 40 micro-adjustable steps in the espresso range — a serious upgrade for home baristas.',
    image: `${CDN}/ZCG595BLK2GUK1A.jpg?v=1776873210&width=600`,
    productUrl: `${STORE}/baratza-encore-esp-pro`,
    variantId: '57755823112517',
    badge: 'Best Seller',
    rating: 4.8,
  },
  {
    id: 'comandante-c40-hammerhead',
    name: 'Comandante C40 MK4 Hammerhead',
    category: 'home-equipment',
    price: 265.0,
    description: 'Comandante C40 MK4 with the Lab Series Hammerhead burr — built for filter coffee, AeroPress, and pour-over. Aerospace-grade steel burrs, beautifully made.',
    image: `${CDN}/4522.jpg?v=1776873217&width=600`,
    productUrl: `${STORE}/comandante-lab-series-c40-mk4-hammerhead-blade-burr-coffee-grinder`,
    variantId: '57755823571269',
    rating: 4.9,
  },
  {
    id: 'comandante-c40-nitro',
    name: 'Comandante C40 MK4 Nitro',
    category: 'home-equipment',
    price: 265.0,
    description: 'Comandante C40 MK4 with the Nitro blade burr — versatile grinder for espresso, filter, and everything in between. The standard Comandante benchmark.',
    image: `${CDN}/4728.jpg?v=1776873216&width=600`,
    productUrl: `${STORE}/comandante-lab-series-c40-mk4-nitro-blade-burr-coffee-grinder`,
    variantId: '57755823472965',
    rating: 4.9,
  },
  {
    id: 'comandante-c40-tigershark',
    name: 'Comandante C40 MK4 Tigershark',
    category: 'home-equipment',
    price: 265.0,
    description: 'The Tigershark burr brings serious clarity and sweetness for light-roasted filter coffee. The connoisseur\'s Comandante.',
    image: `${CDN}/4727-01.jpg?v=1776873215&width=600`,
    productUrl: `${STORE}/comandante-lab-series-c40-mk4-tigershark-burr-coffee-grinder`,
    variantId: '57755823407429',
    soldOut: true,
    badge: 'Sold Out',
  },
  {
    id: 'hario-lyra-black',
    name: 'Hario Lyra Electric Kettle — Black',
    category: 'home-equipment',
    price: 220.0,
    description: '800ml gooseneck electric drip kettle from Hario. Precision pour, variable temperature, and a hold setting — the brewing essential for pour-over.',
    image: `${CDN}/EKC-80-B.jpg?v=1776873218`,
    productUrl: `${STORE}/hario-lyra-electric-coffee-drip-kettle-800ml-black`,
    variantId: '57755823669573',
    rating: 4.7,
  },
  {
    id: 'hario-lyra-white',
    name: 'Hario Lyra Electric Kettle — White',
    category: 'home-equipment',
    price: 220.0,
    description: '800ml gooseneck electric drip kettle from Hario in white. Precision pour, variable temperature, and a hold setting.',
    image: `${CDN}/EKC-80-W.jpg?v=1776873219`,
    productUrl: `${STORE}/hario-lyra-electric-coffee-drip-kettle-800ml-white`,
    variantId: '57755823735109',
    rating: 4.7,
  },
  {
    id: 'wilfa-performance-bundle',
    name: 'Wilfa Performance Thermo + Uniform Evo Bundle',
    category: 'home-equipment',
    price: 689.0,
    salePrice: 575.0,
    description: 'Filter coffee, sorted. Wilfa Performance Thermo brewer paired with the Uniform Evo grinder. Save £114 on the bundle.',
    image: `${CDN}/Wilfa-Compact-Thermal_WCTBUNDLE04.jpg?v=1776873223`,
    productUrl: `${STORE}/wilfa-performance-thermo-coffee-maker-and-uniform-evo-coffee-grinder-bundle`,
    variantId: '57755823964485',
    badge: 'Sale',
  },
  {
    id: 'wilfa-uniform-evo',
    name: 'Wilfa Uniform Evo Grinder',
    category: 'home-equipment',
    price: 359.0,
    description: 'Norwegian-designed flat burr grinder with stepless adjustment. Built for clean, well-extracted filter coffee at home.',
    image: `${CDN}/Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Adapter-in-use_portafilter.jpg?v=1776873221`,
    productUrl: `${STORE}/wilfa-uniform-evo-coffee-grinder`,
    variantId: '57755823866181',
    rating: 4.8,
  },

  // Roasted Coffee — coming soon placeholders
  {
    id: 'rc-1',
    name: 'House Blend — Coming Soon',
    category: 'coffee',
    price: 14.5,
    unit: '250g',
    roast: 'Medium',
    notes: ['Milk chocolate', 'Caramel', 'Toasted almond'],
    description: 'Our signature daily drinker — coming soon. Balanced, sweet, approachable.',
    badge: 'Coming Soon',
  },
  {
    id: 'rc-2',
    name: 'Ethiopia Yirgacheffe — Coming Soon',
    category: 'coffee',
    price: 16.8,
    unit: '250g',
    origin: 'Yirgacheffe, Ethiopia',
    roast: 'Light',
    notes: ['Jasmine', 'Bergamot', 'Peach'],
    description: 'Washed Ethiopian single origin — coming soon.',
    badge: 'Coming Soon',
  },
  {
    id: 'rc-3',
    name: 'Colombia Huila — Coming Soon',
    category: 'coffee',
    price: 15.2,
    unit: '250g',
    origin: 'Huila, Colombia',
    roast: 'Medium',
    notes: ['Red apple', 'Brown sugar', 'Cocoa'],
    description: 'Sweet, well-rounded Colombian — coming soon.',
    badge: 'Coming Soon',
  },
  {
    id: 'rc-4',
    name: 'Brazil Cerrado Espresso — Coming Soon',
    category: 'coffee',
    price: 13.8,
    unit: '250g',
    origin: 'Cerrado, Brazil',
    roast: 'Medium-Dark',
    notes: ['Dark chocolate', 'Hazelnut', 'Maple'],
    description: 'Built for espresso — coming soon.',
    badge: 'Coming Soon',
  },

  // Green Coffee — real stock + coming soon placeholders
  {
    id: 'gc-geisha-natural-lot-4',
    name: 'Geisha Natural Lot 4 — Finca Esther, Panama',
    category: 'green-coffee',
    price: 60.0,
    unit: '1kg',
    origin: 'Boquete, Chiriquí — Panama',
    notes: ['Floral', 'Stone fruit', 'Tropical'],
    description: 'Panamanian Geisha from Finca Esther at 1,550 MASL. Natural processed, 1kg of unroasted green beans. Limited lot via Summit Specialty Coffee.',
    image: GEISHA_NATURAL_LOT_4_IMG,
    rating: 5,
    badge: 'New',
  },

  // Commercial Equipment — enquire / coming soon
  {
    id: 'ce-1',
    name: 'Commercial 2-Group Espresso — Enquire',
    category: 'commercial-equipment',
    price: 6850,
    description: 'Two-group commercial machines from leading brands. Speak to us about your café setup — full install, training, and service available.',
    badge: 'Enquire',
  },
  {
    id: 'ce-2',
    name: 'Commercial 3-Group Espresso — Enquire',
    category: 'commercial-equipment',
    price: 9200,
    description: 'Three-group machines for high-volume sites. Full bar consultation, install, and ongoing service.',
    badge: 'Enquire',
  },
  {
    id: 'ce-3',
    name: 'Commercial Grinder — Enquire',
    category: 'commercial-equipment',
    price: 1450,
    description: 'On-demand and doser commercial grinders. We help you match the right grinder to your machine and bean.',
    badge: 'Enquire',
  },
  {
    id: 'ce-4',
    name: 'Drum Roaster — Enquire',
    category: 'commercial-equipment',
    price: 38500,
    description: 'New and used drum roasters from 1kg to 60kg. Speak to us about lead times, financing and install.',
    badge: 'Enquire',
  },
  {
    id: 'ce-mahlkonig-ek43',
    name: 'Mahlkönig EK43 Commercial Grinder — Enquire',
    category: 'commercial-equipment',
    price: 2495,
    description: '98 mm flat-burr commercial grinder. The industry reference for filter brewing at scale — found in roasteries, championship setups and high-volume specialty bars. Speak to us about install, calibration and service.',
    productUrl: 'https://www.mahlkoenig.com/products/ek43',
    badge: 'Enquire',
  },

  // Training & Courses
  {
    id: 'tr-barista-foundation',
    name: 'SCA Barista Skills — Foundation',
    category: 'training',
    price: 225,
    description: 'Your first formal qualification as a barista. Covers grinder calibration, espresso extraction, milk steaming and basic latte art. Includes the official SCA exam and certificate.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Foundation',
    duration: '1 day',
    location: 'Workshop',
    notes: ['Espresso fundamentals', 'Milk technique', 'Workflow & hygiene'],
    badge: 'Most Popular',
    rating: 4.9,
  },
  {
    id: 'tr-barista-intermediate',
    name: 'SCA Barista Skills — Intermediate',
    category: 'training',
    price: 495,
    description: 'Take your craft to the next level. Recipe refinement, advanced milk texturing, café workflow under pressure, customer service principles and shop economics.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Intermediate',
    duration: '2 days',
    location: 'Workshop',
    notes: ['Recipe development', 'Free-pour latte art', 'Service standards'],
    rating: 4.8,
  },
  {
    id: 'tr-barista-professional',
    name: 'SCA Barista Skills — Professional',
    category: 'training',
    price: 1095,
    description: 'The highest SCA barista qualification. Café design, business planning, staff training, competition-grade preparation. Taught by championship-level competitors.',
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Professional',
    duration: '3 days',
    tutor: 'Taught by UK Barista finalists',
    location: 'Workshop',
    badge: 'Pro Level',
  },
  {
    id: 'tr-brewing-foundation',
    name: 'SCA Brewing — Foundation',
    category: 'training',
    price: 225,
    description: 'Master filter, pour-over and immersion methods. Brew ratios, grind size, water chemistry — everything that makes filter coffee taste right.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Foundation',
    duration: '1 day',
    location: 'Workshop',
    notes: ['V60 & Chemex', 'Brew ratios', 'Water chemistry basics'],
    rating: 4.9,
  },
  {
    id: 'tr-roasting-intermediate',
    name: 'SCA Roasting — Intermediate',
    category: 'training',
    price: 895,
    description: 'Profile development, roast curve analysis, defect identification and production planning. Taught on a real production drum roaster — not a demo unit.',
    image: 'https://images.unsplash.com/photo-1452826640566-9ec5249bf65d?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Intermediate',
    duration: '2 days',
    tutor: 'Taught by UK Roasting Championship competitors',
    location: 'Workshop',
    notes: ['Profile design', 'Curve analysis', 'Cupping & defect ID'],
    badge: 'Champion-Led',
  },
  {
    id: 'tr-sensory-foundation',
    name: 'SCA Sensory Skills — Foundation',
    category: 'training',
    price: 225,
    description: 'Train your palate. Sensory mechanics, descriptive vocabulary, cupping protocol and tasting calibration. The foundation for every other coffee skill.',
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=800&auto=format&fit=crop&q=80',
    courseBody: 'SCA',
    courseLevel: 'Foundation',
    duration: '1 day',
    location: 'Workshop',
    notes: ['Cupping protocol', 'Flavour wheel', 'Calibration tasting'],
    rating: 4.9,
  },
  {
    id: 'tr-q-grader',
    name: 'CQI Q Arabica Grader',
    category: 'training',
    price: 2495,
    description: 'The gold-standard certification for green coffee professionals. Six days of intensive cupping, sensory calibration and exams across olfactory, organic acids, triangulation and 5-coffee evaluation. Pass and you are a licensed Q Grader.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    courseBody: 'CQI',
    courseLevel: 'Professional',
    duration: '6 days',
    tutor: 'CQI-licensed Q Grader instructors',
    location: 'Workshop',
    badge: 'Certification',
    notes: ['22 separate exams', 'Three-year licence', 'Industry standard'],
  },
  {
    id: 'tr-bespoke-onsite',
    name: 'Bespoke Training — On-Site or Workshop',
    category: 'training',
    price: 0,
    description: 'Fully customised training built around your team and your equipment. Delivered at our London workshop or directly at your café, hotel, or office. Speak to us about a programme — group rates available.',
    image: 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=800&auto=format&fit=crop&q=80',
    courseBody: 'Custom',
    courseLevel: 'Bespoke',
    duration: 'Flexible',
    tutor: 'Matched to your needs',
    location: 'Workshop or On-Site',
    badge: 'POA',
  },

  // Consulting Services
  {
    id: 'cs-concept',
    name: 'Concept Development',
    category: 'consulting',
    price: 2500,
    priceFrom: true,
    description: 'From idea to brand. We work with you on positioning, name, story, customer journey and menu architecture. The strategic foundation every great café needs.',
    consultingScope: ['Brand positioning', 'Customer journey', 'Menu architecture', 'Pricing strategy'],
    consultingFormat: '4–6 weeks',
    badge: 'Most Popular',
  },
  {
    id: 'cs-space-design',
    name: 'Space Design & Workflow',
    category: 'consulting',
    price: 3500,
    priceFrom: true,
    description: 'Bar layout, customer flow, staff movement, plumbing and power requirements. We collaborate with your architect or refer ours. Every centimetre of your bar engineered to serve more cups, faster.',
    consultingScope: ['Floor plan & bar layout', 'Workflow design', 'Power & plumbing spec', 'Architect collaboration'],
    consultingFormat: '6–10 weeks',
  },
  {
    id: 'cs-equipment-spec',
    name: 'Equipment Specification',
    category: 'consulting',
    price: 750,
    priceFrom: true,
    description: 'The right machines for your menu, volume and budget. We spec espresso machines, grinders, filtration, brewers and ancillary kit — and we have the trade relationships to get you proper pricing.',
    consultingScope: ['Machine selection', 'Grinder matching', 'Water filtration', 'Trade pricing'],
    consultingFormat: '1–2 weeks',
  },
  {
    id: 'cs-supplier-sourcing',
    name: 'Supplier & Coffee Sourcing',
    category: 'consulting',
    price: 950,
    priceFrom: true,
    description: 'Introductions to vetted roasters, dairy, alt-milk, food, packaging and paper goods suppliers. We can also source green coffee directly from our origin partner network.',
    consultingScope: ['Roaster matching', 'Green coffee sourcing', 'Dairy & food suppliers', 'Packaging partners'],
    consultingFormat: '2–4 weeks',
  },
  {
    id: 'cs-sops',
    name: 'SOPs & Operational Setup',
    category: 'consulting',
    price: 1250,
    priceFrom: true,
    description: 'Standard operating procedures for every part of the bar — opening, service, closing, cleaning, calibration and emergency protocols. The manual your team will actually use.',
    consultingScope: ['Bar SOPs', 'Cleaning schedules', 'Calibration routines', 'Staff handbooks'],
    consultingFormat: '3–4 weeks',
  },
  {
    id: 'cs-site-audit',
    name: 'Site Audit & Optimisation',
    category: 'consulting',
    price: 600,
    priceFrom: true,
    description: 'Already operating? We come in, observe, taste, measure — and report back on what to change, fix, or scale. Most clients see speed and consistency improvements within a month.',
    consultingScope: ['On-site observation', 'Quality audit', 'Workflow analysis', 'Written report'],
    consultingFormat: '1 day + report',
  },
  {
    id: 'cs-full-project',
    name: 'Full Project Management',
    category: 'consulting',
    price: 0,
    description: 'End-to-end. We take your project from concept through opening — design, equipment, supply chain, hiring, training, soft launch. One point of contact, one accountable team.',
    consultingScope: ['Everything above, managed end-to-end', 'Single accountable lead', 'Weekly progress reviews', 'Opening day support'],
    consultingFormat: '4–9 months',
    badge: 'Flagship',
  },
]

// Hydrate PRODUCTS with full gallery + descriptionHtml from productDetails.ts
import { PRODUCT_DETAILS } from './productDetails'
PRODUCTS.forEach((p) => {
  const detail = PRODUCT_DETAILS[p.id]
  if (detail) {
    p.images = detail.images
    p.descriptionHtml = detail.descriptionHtml
  }
})

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)

export const productsByCategory = (cat: Category) =>
  PRODUCTS.filter((p) => p.category === cat)

export const BRAND = {
  name: 'Coffee Centre London',
  shortName: 'Coffee Centre',
  logoUrl: `${CDN}/COFFEE_CENTRE_LOGO_1.png?v=1777984489&width=600`,
  heroImage: `${CDN}/coffee-beans-dropping-on-white-background.png?v=1777986723&width=2000`,
  shopifyUrl: 'https://brewing.coffeecentre.london',
}

/**
 * Build a Shopify cart permalink URL from a list of cart items.
 * Uses Shopify's `/cart/{variantId}:{qty},...` format which pre-fills the
 * Shopify cart so the customer can complete checkout there.
 * Items without a variantId (e.g. training courses, consulting) are skipped.
 *
 * Returns null when no checkout-able items exist.
 */
export function buildShopifyCartUrl(
  items: { variantId?: string; quantity: number }[],
): string | null {
  const parts = items
    .filter((i) => i.variantId && i.quantity > 0)
    .map((i) => `${i.variantId}:${i.quantity}`)
  if (parts.length === 0) return null
  return `${BRAND.shopifyUrl}/cart/${parts.join(',')}`
}
