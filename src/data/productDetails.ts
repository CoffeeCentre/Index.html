/**
 * Full product details (galleries + HTML descriptions) for home equipment.
 * Sourced from the live Shopify store at brewing.coffeecentre.london.
 * Kept in a separate file so the main products.ts stays readable.
 */

const CDN = 'https://cdn.shopify.com/s/files/1/1027/4445/7541/files'
const img = (filename: string) => `${CDN}/${filename}`

export interface ProductDetail {
  images: string[]
  descriptionHtml: string
}

import { GEISHA_NATURAL_LOT_4_IMG } from './images/geishaNatural'

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  'gc-geisha-natural-lot-4': {
    images: [GEISHA_NATURAL_LOT_4_IMG],
    descriptionHtml: `
      <p><strong>Panamanian Geisha at 1,550 MASL.</strong> A standout natural-processed lot from Finca Esther in Boquete, Chiriquí — sourced through Summit Specialty Coffee.</p>
      <p>Geisha (or "Gesha") from Boquete has become one of the most celebrated cup profiles in specialty coffee. The high-altitude microclimate gives the variety its signature florals and tea-like clarity, while the natural process here layers in fermented stone fruit and tropical sweetness.</p>
      <h3>Lot specs</h3>
      <ul>
        <li><strong>Origin:</strong> Boquete, Chiriquí — Panama</li>
        <li><strong>Farm:</strong> Finca Esther</li>
        <li><strong>Variety:</strong> Geisha</li>
        <li><strong>Process:</strong> Natural</li>
        <li><strong>Altitude:</strong> 1,550 MASL</li>
        <li><strong>Lot:</strong> 4</li>
        <li><strong>Importer:</strong> Summit Specialty Coffee</li>
        <li><strong>Format:</strong> 1 kg — green / unroasted</li>
      </ul>
      <h3>Who it's for</h3>
      <p>Home roasters, training programmes, and small-batch roastery production runs. Sample roasts available on request — get in touch if you'd like a cupping profile or a custom roast before committing to a larger volume.</p>
      <p><em>Stocks are limited. Once this lot is sold, it's gone.</em></p>
    `,
  },
  'baratza-encore-esp-pro': {
    images: [
      img('ZCG595BLK2GUK1A.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-LS2.jpg?v=1776873211'),
      img('ZCG595BLK2GUK1A-2.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-3.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-4.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-LS1.jpg?v=1776873211'),
      img('ZCG595BLK2GUK1A-LS3.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-LS4.jpg?v=1776873210'),
      img('ZCG595BLK2GUK1A-LS5.jpg?v=1776873211'),
    ],
    descriptionHtml: `<p><strong>Take Control of Your Daily Grind.</strong></p>
<p>Say hello to the Encore ESP Pro — the newest addition to our best-selling Encore™ series, built for coffee lovers who believe the grind really matters. With its stepless grind adjustment system, you're not stuck choosing between clicks. You're free to dial in the perfect grind with near-infinite precision — from fine-tuned espresso to breezy pour-over and everything in between.</p>
<p>No limits. No guesswork. Just smooth, intuitive control that transforms your daily grind into a daily craft.</p>
<p>And it doesn't stop there. The integrated flow-control disk takes consistency up a notch, while Anti-Static Technology keeps your counter cleaner. Add Auto-Stop Grinding for hassle-free single dosing and a 0.1-second precision timer for repeatable perfection — because your coffee routine deserves accuracy as much as artistry.</p>
<h4>Near-Infinite Grind Possibilities</h4>
<p>Our first grinder with a smooth, stepless adjustment delivers our highest grind resolution yet, paired with a new flow control disk that keeps your grind as precise as you need — from espresso fine to cold brew coarse.</p>
<h4>Grind with Precision</h4>
<p>Multitask with two efficient modes that let you grind hands-free: Single Dose Mode with auto-stop grinding and Timer Mode with 0.1 second dosing accuracy.</p>
<h4>Seamlessly Clean Grinds</h4>
<p>Ion-generation technology reduces grind retention and static, keeping your grounds where you want them. The removable flow control disk carefully controls the flow of beans to the burrs for consistent grind quality throughout the dose. The digital display enhances accessibility for dialling in grind setting, dosing method, and grind time — even on early mornings.</p>
<h4>Specifications</h4>
<ul>
  <li>Dimensions (W×D×H): 13 × 15 × 34 cm</li>
  <li>Construction: Anodized cast zinc &amp; durable ABS</li>
  <li>Weight: 3.84 kg</li>
  <li>Burrs: 40 mm Conical (M2), tool-less quick-release</li>
  <li>Bean hopper: 300 g (with hopper) / 45 g (single-dose)</li>
  <li>Grounds bin: 120 g</li>
  <li>Speed: 1.3 g/sec (#10) – 2.2 g/sec (#30)</li>
  <li>No-load burr speed: 550 RPM</li>
  <li>Manufactured &amp; assembled in Taiwan</li>
  <li>Warranty: 1 year manufacturer</li>
</ul>`,
  },
  'comandante-c40-hammerhead': {
    images: [
      img('4522.jpg?v=1776873217'),
      img('4522-01.jpg?v=1776873217'),
      img('4522-02.jpg?v=1776873217'),
      img('4522-03.jpg?v=1776873218'),
      img('4522-04.jpg?v=1776873218'),
      img('4522-05.jpg?v=1776873218'),
      img('4522-06.jpg?v=1776873217'),
    ],
    descriptionHtml: `<h4>Begin with the burr</h4>
<p>Burrs are usually treated like commodity items — functional and standardised. They're tucked away inside the grinder, rarely celebrated, seldom questioned. But what if the burr geometry held the key to unlocking hidden taste potential — something roast curves or brew methods can't fully reveal?</p>
<p>For over a decade, Comandante® founder Bernd Braune has been working on innovative concepts for conical burr sets. At our Bavarian Burr Lab, our engineers have been pushing the boundaries of machining technology and developing pioneering tooling to achieve them.</p>
<p>Lab Series gives you more freedom to experiment and explore flavour possibilities. Global brewing styles and taste preferences are subjective and, like coffee itself, wonderfully diverse. Embrace this diversity, confidently explore what tastes best to you, and enjoy not just the result, but also the journey getting there.</p>
<h4>Hammerhead — a burr like no other</h4>
<p>The Hammerhead burr is forged with a distinctive <strong>Hexagonal Block Blade geometry</strong>, inspired by the iconic shape of the hammerhead shark.</p>
<p>It's engineered to handle the size and density of larger beans like Pacamara with remarkable precision, elevating their full-bodied sweetness and fruit-forward complexity.</p>
<p>This funky-looking thing is a versatile, high-performance burr that delivers outstanding grind quality — whether you're brewing a chunky Pacamara, a petite heirloom, or anything in between. It embodies the precision and performance that define Comandante®.</p>
<h4>Engineered for a lifetime</h4>
<p>Every Comandante® C40 grinder is meticulously crafted by our expert team and built to last, using carefully selected materials. Its iconic shape has become synonymous with quality and world-class grind performance — a timeless, clean design created in the name of flavour clarity.</p>`,
  },
  'comandante-c40-nitro': {
    images: [
      img('4728.jpg?v=1776873216'),
      img('4728-01.jpg?v=1776873216'),
      img('4728-02.jpg?v=1776873216'),
      img('4728-03.jpg?v=1776873217'),
      img('4728-04.jpg?v=1776873217'),
      img('4728-05.jpg?v=1776873216'),
      img('4728-06.jpg?v=1776873216'),
    ],
    descriptionHtml: `<h4>Begin with the burr</h4>
<p>Burrs are usually treated like commodity items — functional and standardised. They're tucked away inside the grinder, rarely celebrated, seldom questioned. But what if the burr geometry held the key to unlocking hidden taste potential — something roast curves or brew methods can't fully reveal?</p>
<p>For over a decade, Comandante® founder Bernd Braune has been working on innovative concepts for conical burr sets. At our Bavarian Burr Lab, our engineers have been pushing the boundaries of machining technology and developing pioneering tooling to achieve them.</p>
<p>Lab Series gives you more freedom to experiment and explore flavour possibilities. Global brewing styles and taste preferences are subjective and, like coffee itself, wonderfully diverse. Embrace this diversity, confidently explore what tastes best to you, and enjoy not just the result, but also the journey getting there.</p>
<h4>The benchmark Comandante</h4>
<p>The Nitro blade burr is the standard against which all other manual grinders are measured. Made from Comandante's proprietary <strong>NITRO REX®</strong> high-performance stainless steel — razor-sharp, exceptionally durable, and fully washable. Versatile across espresso, filter, French press, and everything in between.</p>
<h4>Engineered for a lifetime</h4>
<p>Every Comandante® C40 grinder is meticulously crafted by our expert team and built to last, using carefully selected materials. Its iconic shape has become synonymous with quality and world-class grind performance — a timeless, clean design created in the name of flavour clarity.</p>`,
  },
  'comandante-c40-tigershark': {
    images: [
      img('4727-01.jpg?v=1776873215'),
      img('4727--03.jpg?v=1776873215'),
      img('4727--04.jpg?v=1776873215'),
      img('4727--05.jpg?v=1776873215'),
      img('4727--06.jpg?v=1776873215'),
      img('4727--07.jpg?v=1776873215'),
      img('4727-02.jpg?v=1776873215'),
    ],
    descriptionHtml: `<h4>Begin with the Burr</h4>
<p>Burrs are usually treated like commodity items — functional and standardised. They're tucked away inside the grinder, rarely celebrated, seldom questioned. But what if the burr geometry held the key to unlocking hidden taste potential — something roast curves or brew methods can't fully reveal?</p>
<p>For over a decade, Comandante® founder Bernd Braune has been working on innovative concepts for conical burr sets. At our Bavarian Burr Lab, our engineers have been pushing the boundaries of machining technology and developing pioneering tooling to achieve them.</p>
<p>Lab Series gives you more freedom to experiment and explore flavour possibilities. Global brewing styles and taste preferences are subjective and, like coffee itself, wonderfully diverse. Embrace this diversity, confidently explore what tastes best to you, and enjoy not just the result, but also the journey getting there.</p>
<h4>Tigershark — for clarity hunters</h4>
<p>Tigershark features a unique <strong>Double Shark-Tip Blade Structure</strong>, inspired by the bite of a tiger shark. It cuts, slices and fractures with striking efficiency — whether it's a Nordic roast or field grain. Crafted from our high-performance stainless steel <strong>NITRO REX®</strong>, it's razor-sharp, incredibly durable, and fully washable. No worries, no compromises.</p>
<h4>Engineered for a lifetime</h4>
<p>Every Comandante® C40 grinder is meticulously crafted by our expert team and built to last, using carefully selected materials. Its iconic shape has become synonymous with quality and world-class grind performance — a timeless, clean design created in the name of flavour clarity.</p>`,
  },
  'hario-lyra-black': {
    images: [
      img('EKC-80-B.jpg?v=1776873218'),
      img('EKC-80-B-LS2.jpg?v=1776873219'),
      img('EKC-80-B-LS1.jpg?v=1776873218'),
      img('EKC-80-B-LS5.jpg?v=1776873219'),
      img('EKC-80-B-LS3.jpg?v=1776873219'),
      img('EKC-80-B-LS4.jpg?v=1776873219'),
    ],
    descriptionHtml: `<h4>A Light Balance of Usability and Functionality</h4>
<p>The Lyra Electric Kettle has been newly designed for coffee brewing, offering both ease of use and advanced functionality.</p>
<p>With 1°C temperature control, one-touch boiling, stopwatch and timer functions, Lyra is equipped with all the features you need. Its lightweight body and ergonomic handle make it easy to use, while the gooseneck spout allows for precise, delicate pouring.</p>
<h4>Key Features</h4>
<p><strong>Gooseneck Spout</strong><br>The slim, curved spout gives precise control and allows you to pour close to the coffee grounds, just like a professional.</p>
<p><strong>Ergonomic Handle</strong><br>Designed to suit different grip styles, with smooth edges for comfort. The cross-section, shaped between a circle and a square, distributes the weight across the fingers.</p>
<p><strong>Ultra-Lightweight Body</strong><br>The kettle body weighs about 0.53 kg — one of the lightest in its class. This helps reduce fatigue during brewing.</p>
<p><strong>Slim Profile for Stability</strong><br>The narrow body reduces water movement inside, keeping the centre of gravity stable while pouring.</p>
<p><strong>1°C Temperature Control</strong><br>Adjustable from 38°C to 100°C in 1°C steps for accurate temperature management.</p>
<p><strong>One-Touch Boil</strong><br>Brings water to a full boil with a single button.</p>
<p><strong>Keep Warm &amp; Auto-KEEP</strong><br>Holds the set temperature for 15 minutes. Reheats automatically to your chosen temperature whenever the kettle is returned to the base.</p>
<p><strong>Preset Function</strong><br>Save up to five preferred temperature settings for quick use.</p>
<p><strong>Stopwatch &amp; Timer</strong><br>The stopwatch supports pour-over brewing; the timer is useful for French press or tea.</p>
<h4>Specifications</h4>
<ul>
  <li>Article: ECK-80-B</li>
  <li>Power: 1200 W</li>
  <li>Capacity: 0.3 – 0.8 L</li>
  <li>Dimensions: W 280 × D 157 × H 210 mm</li>
  <li>Weight: 1.1 kg</li>
  <li>Cord length: 1.2 m</li>
  <li>Materials: Stainless steel (body &amp; spout), ABS resin (handle), silicone rubber gasket</li>
  <li>Country of Origin: China</li>
</ul>`,
  },
  'hario-lyra-white': {
    images: [
      img('EKC-80-W.jpg?v=1776873219'),
      img('EKC-80-W-LS5.jpg?v=1776873220'),
      img('EKC-80-W-LS3.jpg?v=1776873220'),
      img('EKC-80-W-LS4.jpg?v=1776873220'),
      img('EKC-80-W-LS1.jpg?v=1776873220'),
      img('EKC-80-W-LS2.jpg?v=1776873220'),
    ],
    descriptionHtml: `<h4>A Light Balance of Usability and Functionality</h4>
<p>The Lyra Electric Kettle has been newly designed for coffee brewing, offering both ease of use and advanced functionality.</p>
<p>With 1°C temperature control, one-touch boiling, stopwatch and timer functions, Lyra is equipped with all the features you need. Its lightweight body and ergonomic handle make it easy to use, while the gooseneck spout allows for precise, delicate pouring.</p>
<h4>Key Features</h4>
<p><strong>Gooseneck Spout</strong><br>The slim, curved spout gives precise control and allows you to pour close to the coffee grounds, just like a professional.</p>
<p><strong>Ergonomic Handle</strong><br>Designed to suit different grip styles, with smooth edges for comfort.</p>
<p><strong>Ultra-Lightweight Body</strong><br>The kettle body weighs about 0.53 kg — one of the lightest in its class.</p>
<p><strong>1°C Temperature Control</strong><br>Adjustable from 38°C to 100°C in 1°C steps for accurate temperature management.</p>
<p><strong>Keep Warm &amp; Auto-KEEP</strong><br>Holds the set temperature for 15 minutes. Reheats automatically when returned to the base.</p>
<p><strong>Stopwatch &amp; Timer</strong><br>The stopwatch supports pour-over brewing; the timer is useful for French press or tea.</p>
<h4>Specifications</h4>
<ul>
  <li>Article: ECK-80-W</li>
  <li>Power: 1200 W</li>
  <li>Capacity: 0.3 – 0.8 L</li>
  <li>Dimensions: W 280 × D 157 × H 210 mm</li>
  <li>Weight: 1.1 kg</li>
  <li>Cord length: 1.2 m</li>
  <li>Country of Origin: China</li>
</ul>`,
  },
  'wilfa-uniform-evo': {
    images: [
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Adapter-in-use_portafilter.jpg?v=1776873221'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Front_DarkBG.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Top.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Brush-in-use.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Grinding-steps.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Scale-in-use.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Knives_sf.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Front.jpg?v=1776873221'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Angle_DarkBG_sf.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Angle_DarkBG.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Anti-static.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Split_sf.jpg?v=1776873221'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Detail_Adapters-fit-portafilter.jpg?v=1776873222'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Angled.jpg?v=1776873222'),
    ],
    descriptionHtml: `<p><strong>Uniform Evo is the coffee grinder for those who want full control over the flavour in every cup.</strong></p>
<ul>
  <li>64 mm flat burr knives ensure even and precise grinding</li>
  <li>41 settings + micro adjustments — grind from coarse to espresso and Turkish coffee</li>
  <li>Integrated precision scale in the lid with 0.1 g accuracy</li>
  <li>Grind directly into a portafilter with included adapters — perfect for espresso</li>
</ul>
<p><em>* Portafilters not included. Photos showing portafilters are for adapter reference only.</em></p>
<h4>Precision in every detail</h4>
<p>Experience the difference with consistent and precise grinding. Equipped with 64 mm wide flat burrs in stainless steel, Uniform Evo ensures exceptionally even grinding. The design minimises heat build-up, preserving the coffee's natural aromas — a key factor for a rich and flavourful cup.</p>
<h4>41 grinding levels + micro adjustments</h4>
<p>Different brewing methods require different grind levels — from ultra-fine Turkish coffee to coarse for French press. With 41 settings and 10 micro-adjustments, you can fine-tune for Turkish, espresso, percolator, filter, French press, and steep.</p>
<h4>Grind directly into the portafilter</h4>
<p>Two portafilter adapters (51–53 mm and 58 mm) are included, allowing you to grind straight into the basket for barista-quality espresso at home.</p>
<h4>Integrated precision scale</h4>
<p>Perfect coffee starts with the right dose. Uniform Evo has a rechargeable precision scale integrated into the lid, weighing with 0.1 g accuracy. Built-in timer for optimal brewing and a heat-resistant silicone cover. Connect it to the Wilfa SVART app via Bluetooth to easily calculate the right coffee-to-water ratio.</p>
<h4>ECBC-approved</h4>
<p>Uniform Evo is one of the few coffee grinders in Europe to be ECBC-certified by the European Coffee Brewing Centre — confirming that the grinder meets strict requirements for grinding precision.</p>
<h4>Specifications</h4>
<ul>
  <li>64 mm flat burr knives in stainless steel</li>
  <li>2 espresso portafilter adapters: 51–53 mm and 58 mm</li>
  <li>Metal coffee container — minimises static electricity</li>
  <li>Automatic stop sensor with timer function</li>
  <li>Dimensions: 15 × 15 × 29 cm</li>
  <li>Weight: 3.7 kg</li>
  <li>Article: CG4B-S150</li>
  <li>Warranty: Industry-leading 5-year warranty</li>
</ul>`,
  },
  'wilfa-performance-bundle': {
    images: [
      img('Wilfa-Compact-Thermal_WCTBUNDLE04.jpg?v=1776873223'),
      img('CM9B-T125-LS_8d6e5b45-11be-4334-8a64-ec7abe986352.jpg?v=1776873223'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Angle_DarkBG_sf_379f2ccc-9d86-4591-98e7-ebccace7bdb2.jpg?v=1776873223'),
      img('CM9B-T125_e6c04dc6-bc8c-49a0-82c6-efc244d5349d.jpg?v=1776873223'),
      img('Coffee-grinder_Uniform-Evo_CG4B-S125_Angled_86795b75-6577-48d7-a78b-97411ba3e28c.jpg?v=1776873223'),
    ],
    descriptionHtml: `<p><strong>Bundle &amp; Save with the Wilfa Performance Thermo Coffee Maker and Uniform Evo Coffee Grinder Bundle from Wilfa and Brewed by Hand.</strong></p>
<p>This limited time, exclusive bundle offer includes:</p>
<h4>1 × Wilfa Performance Thermo Coffee Maker (CM9B-T125)</h4>
<p>High-performance coffee maker with stainless steel thermo jug. Advanced technology guarantees perfect brewing temperature from the first to the last drop. Developed in Norway, in collaboration with world-leading baristas.</p>
<h4>1 × Wilfa Uniform Evo Coffee Grinder (CG4B-S150)</h4>
<p>Full control over the flavour in every cup.</p>
<ul>
  <li>64 mm flat burr knives ensure even and precise grinding</li>
  <li>41 settings + micro adjustments — coarse to espresso and Turkish coffee</li>
  <li>Integrated precision scale in the lid with 0.1 g accuracy</li>
  <li>Grind directly into a portafilter with included adapters</li>
</ul>`,
  },
  // Mahlkönig EK43 — official product photos aren't included here. Add them
  // by uploading via Shopify (then list cdn.shopify.com URLs below), or by
  // dropping files into public/ and referencing /img/... paths. Don't pull
  // them straight from mahlkoenig.com without dealer permission.
  'ce-mahlkonig-ek43': {
    images: [],
    descriptionHtml: `
      <h4>Why the EK43</h4>
      <p>Built in Germany as a production-shop grinder, the EK43 became the de-facto reference for filter brewing in specialty coffee after its breakthrough at the World Brewers Cup. It is in roasteries, championship setups and high-volume specialty bars worldwide — the grinder cafés benchmark every other filter grinder against.</p>
      <h4>What you're getting</h4>
      <ul>
        <li><strong>98 mm flat steel burrs</strong> — the dimension that defines its cup quality</li>
        <li><strong>High-torque German-built motor</strong> — runs all day in a busy bar or roastery</li>
        <li><strong>Stepless grind adjustment</strong> — micro-precision dialling from cupping to espresso</li>
        <li><strong>Direct-grind dispensing</strong> — straight into bag, brewer or basket depending on variant</li>
      </ul>
      <h4>What we add</h4>
      <ul>
        <li>Bar consultation — match the EK43 spec and variant to your menu, volume and workflow</li>
        <li>On-site install, commissioning and burr alignment on delivery</li>
        <li>Ongoing service, parts and burr replacements</li>
      </ul>
      <p><em>POA — speak to us for a fully-installed quote. Authorised supply, full Mahlkönig warranty.</em></p>
    `,
  },
}
