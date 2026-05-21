# Coffee Centre London — Claude Code Context

E-commerce site for **Coffee Centre London** (brewing.coffeecentre.london). Single-page React app that bundles to one self-contained HTML file. Live Shopify store connected via MCP for real product data and cart-permalink checkout.

## Quick start

```bash
pnpm install                                    # install deps
pnpm dev                                        # local dev server (http://localhost:5173)
npx tsc --noEmit --skipLibCheck \
  --ignoreDeprecations 6.0                      # type check before bundling
bash scripts/bundle-artifact.sh                 # build single-file bundle.html (~720KB)
```

The bundle script (`scripts/bundle-artifact.sh`) uses Parcel + html-inline. It outputs `bundle.html` in the project root — a fully self-contained HTML file you can open directly in a browser.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS 3.4** with custom HSL palette in `src/index.css`
- **shadcn/ui** — 40+ primitives pre-installed at `src/components/ui/`
- **embla-carousel-react** — hero carousel
- **lucide-react v1.14.0** — icons (⚠️ this version is missing `Instagram` — use inline SVG, see `Footer.tsx`)
- **Parcel + html-inline** — single-file artifact bundler

## Routing

State-based, no react-router. Page state in `App.tsx`:

```ts
type Page = 'home' | 'coffee' | 'green-coffee' | 'home-equipment' | 'commercial-equipment' | 'training' | 'consulting' | 'about' | 'contact' | 'product'
```

`App.tsx` holds the page state plus `productId` for the detail-page view. A `navigate` and `navigateToProduct` function are threaded down through props.

## Cross-cutting state (React Context)

Two contexts live in `App.tsx` and are exported as hooks:

```ts
useNewsletter()       // -> { openNewsletter }
useContactPrefill()   // -> { prefill, setPrefill, consumePrefill }
```

- **`useNewsletter()`** lets any component pop the newsletter modal (used by Footer link and the Home page CTA).
- **`useContactPrefill()`** is how Enquire buttons pass context to the Contact form. When clicked on a product card/page, the component calls `setPrefill({ interest, subject })` then navigates to Contact. The Contact page calls `consumePrefill()` on mount to initialise its dropdown and seed the message field. Single-shot — consumed prefills don't stick around.

## File structure

```
src/
├── App.tsx                            # State router + 2 contexts (newsletter, contact prefill)
├── main.tsx, index.css                # Prose-coffee styles for HTML descriptions
├── contexts/CartContext.tsx           # Cart respects salePrice
├── data/
│   ├── products.ts                    # Catalog + BRAND + buildShopifyCartUrl + productById
│   ├── productDetails.ts              # Galleries + descriptionHtml for Home Equipment + Geisha
│   ├── courseSessions.ts              # 33 sessions May-Aug 2026
│   └── images/geishaNatural.ts        # Base64-embedded Geisha product photo (220KB data URL)
├── components/
│   ├── Header.tsx                     # 9-item nav, auto-hides on scroll-down, publishes --header-offset CSS var
│   ├── Footer.tsx                     # Address + newsletter link + inline Instagram SVG
│   ├── HeroCarousel.tsx               # 4 slides, embla, Ken Burns zoom, progress bar
│   ├── Logo.tsx                       # Shopify CDN logo with SVG fallback
│   ├── ProductCard.tsx                # Auto-sets contact prefill when Enquire clicked
│   ├── CartSheet.tsx                  # Shopify cart-permalink checkout, sale prices, skipped-items notice
│   ├── CourseCalendar.tsx             # Interactive month grid + per-date sessions, filterable by courseId
│   ├── NewsletterModal.tsx            # 6 topic chips, red Close pill, auto-opens 500ms after load
│   └── ui/                            # shadcn primitives (dialog, checkbox, button, etc.)
└── pages/
    ├── Home.tsx                       # Carousel + best-sellers + trust + categories + reviews + newsletter CTA
    ├── CategoryPage.tsx               # Grid + (for Training) inline CourseCalendar above grid
    ├── ProductPage.tsx                # Gallery + price + descriptionHtml + per-course calendar + related
    ├── About.tsx                      # Generic founder story (placeholder — needs real copy)
    └── Contact.tsx                    # Reads ContactPrefill on mount via useMemo
```

## Design system

Palette in `src/index.css` as HSL CSS variables (cream + warm near-black + brick red):

- `--background` `36 33% 94%` — cream
- `--foreground` `20 18% 10%` — warm near-black
- `--accent` / `--copper` `0 65% 42%` — brick red (the only accent colour)
- `--forest-deep` `20 25% 7%` — deep warm near-black (footer, dark sections, newsletter modal header)
- `--coffee-bean` `20 20% 14%` — secondary dark sections

`copper`, `forest-deep`, `coffee-bean` are **also** registered in `tailwind.config.js` so `bg-copper`, `hover:bg-copper`, `text-forest-deep` etc. all work as utilities. **Don't forget this** — earlier in development a bunch of hover states were silently broken because the colours were only in CSS, not in Tailwind's config.

Typography: Georgia serif for headlines/body, Helvetica Neue / sans-alt for small-caps labels (`.font-sans-alt`).

CSS var `--header-offset` is published by `Header.tsx` via a `useEffect` measuring its own height. Currently no sticky elements consume it — wire up if you add a sticky filter bar etc.

## Shopify integration

**Store**: brewing.coffeecentre.london (Basic plan, GBP).
**Owner email for product-self-knowledge MCPs**: not needed.

**CDN base** for product images and brand assets:
```
https://cdn.shopify.com/s/files/1/1027/4445/7541/files/
```
Use this directly — don't route through the storefront domain (rate-limited).

**Checkout flow**: `buildShopifyCartUrl(items)` in `data/products.ts` constructs a Shopify cart permalink (`/cart/{variantId}:{qty},...`). The CartSheet "Checkout on Shopify" button opens this in a new tab — pre-fills the basket on the live Shopify store, customer completes payment there. Items without a `variantId` (training sessions, consulting services, the Geisha green coffee) are filtered out and shown in a "X items booked separately" notice in the cart.

**Useful MCP tools** (require Shopify connector enabled):
- `Shopify:search_products` — find by query/vendor/tag
- `Shopify:get-product` — single product by GID
- `Shopify:create-product` — push new products to the store
- `Shopify:get-shop-info` — store details

## Catalog status

### 6 categories total

**1. Home Equipment** — 8 real Shopify products, full descriptionHtml + galleries (5-14 images each):
| Product | Price | Variant ID |
|---|---|---|
| Baratza Encore ESP Pro | £249.95 | 57755823112517 |
| Comandante C40 MK4 Hammerhead | £265 | 57755823571269 |
| Comandante C40 MK4 Nitro | £265 | 57755823472965 |
| Comandante C40 MK4 Tigershark | £265 SOLD OUT | 57755823407429 |
| Hario Lyra Kettle Black | £220 | 57755823669573 |
| Hario Lyra Kettle White | £220 | 57755823735109 |
| Wilfa Performance Bundle | £575 (compare £689) | 57755823964485 |
| Wilfa Uniform Evo Grinder | £359 | 57755823866181 |

**2. Training** — 8 courses (certificate SVG fallback + Unsplash imagery):
- SCA Barista Foundation / Intermediate / Professional (£225 / £495 / £1095)
- SCA Brewing Foundation (£225)
- SCA Roasting Intermediate (£895)
- SCA Sensory Foundation (£225)
- CQI Q Arabica Grader (£2495, 6 days)
- Bespoke On-Site / Workshop (POA — routes to Contact, no cart)

**3. Consulting** — 7 services (blueprint SVG fallback):
- Concept Development (£2500+)
- Space & Layout (£3500+)
- Equipment Sourcing (£750+)
- Supplier & Sourcing (£950+)
- SOPs & Training Setup (£1250+)
- Operations Audit (£600+)
- Full Project (POA)

All consulting → Enquire / Contact (no cart).

**4. Green Coffee** — 1 real product:
- **Geisha Natural Lot 4 — Finca Esther, Panama** — £60/kg, image embedded as base64 data URL in `src/data/images/geishaNatural.ts`. No Shopify variant yet, so it's "Enquire to buy" not "Add to cart".

**5. Roasted Coffee** — empty, treated as "Coming Soon" by the category page.

**6. Commercial Equipment** — placeholder enquire-only items.

### Draft Shopify products NOT YET on the site
Available to add when ready: Baratza Encore ESP White (£159.95), Wilfa Zense Bundle black/white (£286.20 each), Wilfa Uni Mini Scale (£50), AeroPress (£40).

## Course calendar (`src/components/CourseCalendar.tsx`)

6×7 month grid, Monday-start. Prev/next month nav (prev disabled at current month). Legend: copper = available, orange = filling, grey = sold out. Each date can show up to 3 session dots. Clicking a date opens a side panel with session cards (course name, dates, price, spots left, Book Seat button).

Booking adds a session-specific cart line keyed `{course}__{sessionId}` with display name `{Course} — {formatted dates}`. 33 hardcoded sessions May-Aug 2026 in `data/courseSessions.ts`. Bespoke is excluded entirely (no sessions).

Used in two places:
- Training category page — full calendar above the grid
- Each training ProductPage — filtered to that course's sessions only

## Hero carousel quirks

`HeroCarousel.tsx` has two layout types:
- **SplitSlide** (slides 1, 2, 4) — product photo in a white container left/right, text content opposite side. Uses `object-contain` with `p-4 md:p-6` padding so product photos display fully without cropping.
- **FullBleedSlide** (slide 3, Comandante) — image fills the entire hero with dark gradient overlay and text on top. Uses `object-cover` for immersive crop.

Behaviours: auto-advance 7s, pause on hover, Ken Burns slow zoom on active image, staggered entrance animations (eyebrow → headline → description → buttons → badge), animated progress bar with numbered indicators, slide counter top-right, prev/next arrows on hover, keyboard nav (← / →), touch swipe.

## Newsletter modal (`src/components/NewsletterModal.tsx`)

- **Auto-opens 500ms after page load** (was 18s, then exit-intent — user requested ASAP)
- Manual triggers: Home "Choose Your Topics & Subscribe" button, Footer "Newsletter" link
- **Compact single-screen design (~520px tall)** — no scroll required
- **Red "× Close" pill top-right** — solid copper background, white X icon + "Close" text, ring + shadow. IMPORTANT CSS: uses `[&>button:last-of-type]:hidden` on `DialogContent` to hide **only** the default Radix close while keeping the custom one visible. **Earlier bug:** using `[&>button]:hidden` hid both, so the close button looked invisible.
- Dark forest-deep header band with bean pattern, "First to Know" eyebrow, "Join the club" headline
- First name + email side-by-side
- 6 topic chip buttons in 2-col mobile / 3-col desktop grid:
  Roasted Coffee, Green Coffee, Brewing Equipment, Training & Courses, Trade & Wholesale, Consulting & Insights
- Defaults: coffee + equipment + training pre-selected
- "Select all / Clear all" toggle
- Inline "Sales & special offers" checkbox
- Success state shows tick + "Welcome to the club, {name}." with topic summary

**No 10% off references anywhere** — all removed per user request.
**Submission does nothing yet** — needs Klaviyo or similar email service hookup (see Pending below).

## Contact page (`src/pages/Contact.tsx`)

Pulls from `useContactPrefill()` via `useMemo` on mount. Consumes any pending prefill — sets the "I'm interested in" dropdown to the matched value and seeds the message field with `"I'd like to enquire about: {productName}\n\n"`. Message placeholder also adapts for Training/Consulting enquiries.

Dropdown options: Retail coffee, Wholesale / Private label, Green coffee, Home equipment, Commercial equipment, Training, Consulting, Other.

**Form submission does nothing yet** — needs backend hookup.

## Business info

- **Address**: Unit 1, Forest Hill Business Centre, Clyde Vale, London SE23 3JF
- **Email**: Coffee@foresthill.coffee
- **Phone**: 07514 131 830
- **WhatsApp**: wa.me/447514131830

## Pending work

### Backend integration
1. **Newsletter** — wire `NewsletterModal.handleSubmit` to Klaviyo (recommended), Shopify Email, or Mailchimp. Klaviyo is the strong recommendation because the 6 topic chips map naturally to Profile Properties for segmentation. Owner needs to provide a Klaviyo Public API Key (`pk_...`).
2. **Contact form** — same situation as newsletter. `Contact.tsx` form submission currently just sets local state.

### Content
3. **Replace fake homepage testimonials** — James R., Priya K., Tom W., "320+ reviews" badge — these are fictional. Real UK ASA/Trading Standards risk. Either gather real customer quotes or remove the section entirely.
4. **About page** — generic founder bio, cartoon SVG portrait. Needs real founder story + photo.
5. **Tutor names** — currently placeholders like "UK Roasting Championship competitors". Owner has real tutor credentials to plug in.
6. **Real workshop photos** for Training (currently Unsplash stock).

### Catalog
7. **Push Geisha Natural Lot 4 to Shopify** — currently site-only with base64 image. When ready, create as Shopify product so it gets a variant ID and full cart checkout. £60 / 1kg.
8. **Add 5 draft Shopify products** to the site catalog: Baratza Encore ESP White, Wilfa Zense Black/White Bundles, Wilfa Uni Mini Scale, AeroPress.
9. **Wilfa Bundle compare-at price** — site shows £575 / £689. Set compare-at on Shopify side to £689 so the cart permalink checkout shows the strikethrough natively.

### Theme (Shopify side, not React)
10. **Hero image positioning** on the live Shopify storefront — user wants the "coffee-beans-dropping-on-white-background.png" image to display without cropping in the theme's hero section. Fix is in Shopify admin → Online Store → Themes → Customize → click hero section → adjust "Image position" / "Focal point" / set height to "Adapt to image". Not a React change.

## Technical gotchas

- **No browser storage** (`localStorage` / `sessionStorage`) anywhere — Claude.ai artifact environment doesn't support it. The newsletter "shown once" gate is React state only. When deploying to a real environment, add a `sessionStorage` gate so the modal doesn't re-appear on every page reload.
- **Shopify CDN URLs aren't fetchable from sandbox** — `cdn.shopify.com` is not in network allowlists, so `curl` / `web_fetch` will fail. For new product photos you need to add to the site, either upload them directly via Claude or have the user drag-drop into chat.
- **The default Radix Dialog close button** is `text-foreground` (warm near-black) which renders invisible against dark headers. If you add another dialog with a dark header, either restyle the default close or hide it and add your own visible variant (see NewsletterModal).
- **Custom Tailwind colours** must be registered in **both** `index.css` (as CSS vars) AND `tailwind.config.js` (in `extend.colors`) — otherwise utility classes like `hover:bg-copper` silently fail.
- **`isEnquireOnly` logic** in `ProductCard.tsx` catches `price === 0`, `category === 'consulting'`, `badge === 'Enquire'`, `badge === 'Coming Soon'`. Any of these makes the product show "Enquire" instead of "Book / Add to Cart" and hides the floating + button.

## Iteration history (brief — for context on design choices)

- Started from a foresthillcoffee.com clone (forest green + amber palette)
- Rebranded to **Coffee Centre London** with British "Centre" spelling
- Palette swapped to current cream + warm near-black + brick red from a user-supplied screenshot
- Pivoted from editorial layout to sales-focused (promo strip, hero carousel, best sellers, reviews, newsletter incentive)
- Hero progressed: dark with image overlay → cream with image card → multi-slide carousel with Ken Burns + alternating layouts
- Header fade-on-scroll-down was added, then refined (80px buffer, 6px threshold, 300ms)
- Cart had a salePrice bug — was using `price` instead of `salePrice ?? price`. Fixed; Wilfa Bundle correctly rings at £575 now
- Newsletter went through 3 redesigns: full-screen splash → 18s-delay box → compact 500ms auto-open with topic chips, no 10% off
- Bespoke training originally went through the cart Book flow; refactored to route through Contact with prefill
