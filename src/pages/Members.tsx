import { useMemo, useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContactPrefill } from '@/App'
import type { Category } from '@/data/products'
import {
  MEMBERS,
  MEMBER_CATEGORY_ORDER,
  type Member,
  type MemberCategory,
} from '@/data/members'

interface MembersProps {
  navigate: (page: 'home' | Category | 'about' | 'contact' | 'members') => void
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

const paragraphs = (bio: string) =>
  bio
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

export function Members({ navigate }: MembersProps) {
  const { setPrefill } = useContactPrefill()
  const [filter, setFilter] = useState<MemberCategory | 'All'>('All')

  const activeCategories = useMemo(
    () =>
      MEMBER_CATEGORY_ORDER.filter((c) =>
        MEMBERS.some((m) => m.category === c),
      ),
    [],
  )

  const visible = useMemo(
    () => (filter === 'All' ? MEMBERS : MEMBERS.filter((m) => m.category === filter)),
    [filter],
  )

  const handleJoinClick = () => {
    setPrefill({
      interest: 'Other',
      subject: 'Feature me on the Members page',
    })
    navigate('contact')
  }

  return (
    <div>
      {/* HERO */}
      <section className="bg-forest-deep text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 300"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i * 73) % 800}
                cy={(i * 41) % 300}
                rx="10"
                ry="16"
                fill="hsl(28 60% 55%)"
                transform={`rotate(${(i * 31) % 360} ${(i * 73) % 800} ${(i * 41) % 300})`}
              />
            ))}
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.28em] text-copper mb-3">
            The community
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Members.</h1>
          <p className="text-lg opacity-85 max-w-xl mx-auto">
            The roasters, baristas, café owners and independents who use the
            space at Forest Hill — told in their own words. These are the people
            building what comes next in London specialty.
          </p>
        </div>
      </section>

      {/* STORIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {MEMBERS.length === 0 ? (
          <EmptyState onJoin={handleJoinClick} />
        ) : (
          <>
            {activeCategories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-16">
                <FilterChip
                  active={filter === 'All'}
                  onClick={() => setFilter('All')}
                >
                  All
                </FilterChip>
                {activeCategories.map((c) => (
                  <FilterChip
                    key={c}
                    active={filter === c}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </FilterChip>
                ))}
              </div>
            )}

            <div className="space-y-20 md:space-y-32">
              {visible.map((m, i) => (
                <MemberStory key={m.id} member={m} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      {MEMBERS.length > 0 && (
        <section className="bg-forest-deep text-primary-foreground py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.12]">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 300"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={(i * 91) % 800}
                  cy={(i * 57) % 300}
                  rx="10"
                  ry="16"
                  fill="hsl(28 60% 55%)"
                  transform={`rotate(${(i * 23) % 360} ${(i * 91) % 800} ${(i * 57) % 300})`}
                />
              ))}
            </svg>
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-3">
              Introduce yourself
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Working out of Forest Hill?
            </h2>
            <p className="opacity-80 mb-7 max-w-lg mx-auto">
              If you roast, train, consult or brew here and would like your story
              featured, send us a short bio and a photo — we'll add you to the
              wall.
            </p>
            <Button
              onClick={handleJoinClick}
              className="bg-copper hover:bg-copper/90 text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-10 py-6"
            >
              Get featured
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 text-[11px] font-sans-alt uppercase tracking-[0.18em] border transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-transparent text-foreground border-border hover:border-foreground/60'
      }`}
    >
      {children}
    </button>
  )
}

function MemberStory({ member, index }: { member: Member; index: number }) {
  const imageRight = index % 2 === 1
  const bodyParagraphs = paragraphs(member.bio)

  return (
    <article className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
      {/* PORTRAIT */}
      <div className={imageRight ? 'md:order-2' : 'md:order-1'}>
        <MemberPortrait member={member} />
      </div>

      {/* STORY */}
      <div className={imageRight ? 'md:order-1' : 'md:order-2'}>
        <div className="mb-5">
          <span className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper">
            Member
            {member.location && <> · {member.location}</>}
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] mb-3">
          {member.name}
        </h2>
        <div className="text-sm md:text-base text-muted-foreground mb-6">
          {member.role}
          {member.company && (
            <>
              {' '}
              ·{' '}
              <span className="text-foreground font-medium">
                {member.company}
              </span>
            </>
          )}
        </div>

        {member.quote && (
          <p className="font-serif text-xl md:text-2xl italic text-foreground border-l-2 border-copper pl-5 mb-6 leading-snug">
            "{member.quote}"
          </p>
        )}

        <div className="space-y-4 text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-prose">
          {bodyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {member.link && (
          <a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-sans-alt uppercase tracking-[0.18em] text-primary-foreground bg-primary hover:bg-copper transition-colors px-7 py-4"
          >
            Visit {member.company ?? 'website'}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}

function MemberPortrait({ member }: { member: Member }) {
  return (
    <div className="relative">
      {/* offset accent frame */}
      <div
        className="absolute -inset-2 md:-inset-3 border border-copper/40 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 -z-10"
        aria-hidden
      />
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover"
        />
      ) : (
        <div className="w-full aspect-[4/5] bg-forest-deep text-primary-foreground flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={(i * 83) % 400}
                  cy={(i * 61) % 500}
                  rx="12"
                  ry="19"
                  fill="hsl(28 60% 55%)"
                  transform={`rotate(${(i * 37) % 360} ${(i * 83) % 400} ${(i * 61) % 500})`}
                />
              ))}
            </svg>
          </div>
          <span className="relative font-serif text-7xl md:text-8xl">
            {initials(member.name)}
          </span>
        </div>
      )}
    </div>
  )
}

function EmptyState({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="max-w-xl mx-auto text-center py-8">
      <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-3">
        Coming soon
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Introductions in progress.
      </h2>
      <p className="text-muted-foreground mb-7">
        We're putting together short introductions to the roasters, trainees
        and independents currently working out of Forest Hill. Want to be one
        of the first?
      </p>
      <Button
        onClick={onJoin}
        className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-10 py-6"
      >
        Get featured
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
