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
  // Add your first member entry here. Pattern:
  //
  // {
  //   id: 'jane-doe',
  //   name: 'Jane Doe',
  //   role: 'Head Roaster',
  //   company: 'Small Fry Coffee Co.',
  //   category: 'Roaster',
  //   location: 'Peckham, London',
  //   bio: 'Roasts single origins on our production drum on Thursdays. Focuses on East African washed lots and long-cool profiles.',
  //   image: '/img/members/jane-doe.jpg',
  //   link: 'https://instagram.com/smallfrycoffee',
  //   quote: 'The EK43 upstairs changed how I dial in filter.',
  // },
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
