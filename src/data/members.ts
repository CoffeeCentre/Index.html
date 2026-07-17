/**
 * Members / community roll-call for the Members page.
 *
 * Add one entry per person you want to introduce. The order in the MEMBERS
 * array is the render order on the page. Photos live in public/img/members/
 * (400×400 or larger square, JPEG or PNG) and are referenced as
 * `/img/members/first-lastname.jpg`.
 *
 * Legal note: use real names, real bios, and real photos with permission
 * from each person. Do NOT ship fictional members — the fake-testimonials
 * gotcha in CLAUDE.md applies here too.
 */

export type MemberCategory =
  | 'Café'
  | 'Roaster'
  | 'Trainee'
  | 'Consultant'
  | 'Home brewer'
  | 'Guest tutor'
  | 'Wholesale'

export interface Member {
  id: string // kebab-case, used as React key + anchor
  name: string
  role: string // job title / how they describe themselves
  company?: string // business or brand they represent
  category: MemberCategory
  location?: string // 'Peckham, London' etc.
  bio: string // full story; separate paragraphs with a blank line (\n\n)
  image?: string // /img/members/*.jpg — falls back to a large initials monogram
  link?: string // Instagram / website — opens in new tab
  quote?: string // optional pull-quote shown large alongside the story
}

export const MEMBERS: Member[] = [
  {
    id: 'nico-ovni',
    name: 'Nico',
    role: 'Coffee Roaster · CQI Q Arabica Grader · Industrial Engineer',
    company: 'OVNI Coffee',
    category: 'Roaster',
    image: '/img/members/nico.jpg',
    bio:
      'Nico is a coffee roaster, Industrial Engineer, CQI Q Arabica Grader, and the founder of OVNI Coffee — a small but globally driven coffee project built around rare origins, high-level coffees, and cups with real personality.\n\n' +
      'His roasting journey has taken him through Argentina, Spain, Australia, and the UK, shaping a perspective that mixes technical precision with a wider cultural view of coffee. Through OVNI, he has been building a different kind of coffee company: one that cares as much about the story, identity, and emotional impact of a coffee as it does about quality in the cup.\n\n' +
      'His work brings together rigor, curiosity, and a willingness to challenge the usual codes of the industry. At Coffee Centre London, he adds an international and distinctive approach rooted in both deep coffee knowledge and long-term creative vision.',
    link: 'https://www.ovni.coffee',
  },
  {
    id: 'romain-rb',
    name: 'Romain',
    role: 'Specialty Coffee Professional · Roaster · Educator',
    company: 'RB Coffee for Music',
    category: 'Roaster',
    image: '/img/members/romain.jpg',
    bio:
      'Romain is a specialty coffee professional with over 10 years of experience across coffee roasting, barista operations, coffee education, and recipe development. Trained by Bartosz Ciepaj, former Head of Coffee at Harrods and UK Coffee Roasting Champion, Romain built his expertise within one of the UK\'s most demanding luxury hospitality environments. At the Harrods Roastery, he played a key role in coffee quality, barista training, and recipe development, supporting a coffee programme that supplied more than 30 cafés and restaurants, trained over 100 baristas, and produced approximately 33 tonnes of coffee annually.\n\n' +
      'Throughout his career, Romain has contributed to bespoke coffee experiences and signature recipes for globally recognised names including Dior, Prada, Jimmy Choo, The Macallan, Baccarat Bar, Studio Frantzén, and World Pastry Champion Angelo Musa. His work is driven by a passion for excellence, consistency, and innovation, combining technical expertise with a deep understanding of hospitality and specialty coffee.\n\n' +
      'Alongside his career in coffee, Romain is the founder of RB Coffee for Music, a platform dedicated to bringing together specialty coffee and live music through unique experiences that celebrate craftsmanship, creativity, and community. As a member of Forest Hill Coffee Centre, Romain brings this same depth of expertise and passion for the craft to the local coffee community.',
    link: 'https://rbcoffeeformusic.com',
  },
  {
    id: 'matthew-album',
    name: 'Matthew Robley-Siemonsma',
    role: 'Roaster · Consultant · 2× SCA UK Roasting Champion',
    company: 'Album',
    category: 'Roaster',
    bio:
      "Matthew has been working in specialty coffee in London since 2009, having first got into it as a home enthusiast a couple of years earlier. Before that his background was in fine art and music, and some of that has found its way back into his coffee work over the years. He's held key roles at some of London's legendary coffee businesses doing a bit of everything: sourcing, roasting, developing menus, training teams, and building new shops from scratch. That experience is the basis of his consulting work today, helping coffee businesses with operations, projects, growth and quality. In 2016 and 2017 he won the SCA UK Roasting Championships two years in a row, and placed 3rd at the World Roasting Championships in Shanghai.\n\n" +
      "In 2021 he started Album, a somewhat 'underground' roastery focusing on careful curation of coffees and careful roasting, aiming for sweetness and complexity while keeping things clean and clear in the cup. Each coffee is paired with cover artwork from a specific collaboration with an artist or designer, printed across the packaging formats, a bit like a record sleeve, so Album works a bit like a gallery or publisher as well as a roastery. A new coffee and a new artwork come out every month, slowly building into a kind of archive, which is part of where the name comes from. Album has remained a 'nomadic' roastery since the beginning, and Matthew is a resident member of Coffee Centre London, roasting from its facility in Forest Hill.",
    link: 'https://albumcoffee.com',
  },
]

// Category order for optional filter chips (empty categories are hidden).
export const MEMBER_CATEGORY_ORDER: MemberCategory[] = [
  'Roaster',
  'Café',
  'Consultant',
  'Wholesale',
  'Guest tutor',
  'Trainee',
  'Home brewer',
]

export const membersByCategory = (cat: MemberCategory) =>
  MEMBERS.filter((m) => m.category === cat)

export const memberById = (id: string) => MEMBERS.find((m) => m.id === id)
