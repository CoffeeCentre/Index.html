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
  bio: string // 1-2 sentences; kept short for card layout
  image?: string // /img/members/*.jpg — falls back to initials avatar
  link?: string // Instagram / website — opens in new tab
  quote?: string // optional pull-quote shown in italic
}

export const MEMBERS: Member[] = [
  {
    id: 'nico-ovni',
    name: 'Nico',
    role: 'Coffee Roaster · CQI Q Arabica Grader · Industrial Engineer',
    company: 'OVNI Coffee',
    category: 'Roaster',
    bio: 'Nico is a coffee roaster, Industrial Engineer, CQI Q Arabica Grader, and the founder of OVNI Coffee — a small but globally driven coffee project built around rare origins, high-level coffees, and cups with real personality. His roasting journey has taken him through Argentina, Spain, Australia, and the UK, shaping a perspective that mixes technical precision with a wider cultural view of coffee. Through OVNI, he has been building a different kind of coffee company: one that cares as much about the story, identity, and emotional impact of a coffee as it does about quality in the cup. His work brings together rigor, curiosity, and a willingness to challenge the usual codes of the industry. At Coffee Centre London, he adds an international and distinctive approach rooted in both deep coffee knowledge and long-term creative vision.',
    link: 'https://www.ovni.coffee',
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
