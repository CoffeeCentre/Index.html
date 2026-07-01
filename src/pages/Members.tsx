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
            space at Forest Hill — training, roasting, consulting, and building
            what comes next in London specialty.
          </p>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {MEMBERS.length === 0 ? (
          <EmptyState onJoin={handleJoinClick} />
        ) : (
          <>
            {activeCategories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-10">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      {MEMBERS.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-3">
              Introduce yourself
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Working out of Forest Hill?
            </h2>
            <p className="text-muted-foreground mb-7 max-w-lg mx-auto">
              If you roast, train, consult or brew here and would like to be
              featured, send us a short bio and a photo — we'll add you to the
              wall.
            </p>
            <Button
              onClick={handleJoinClick}
              className="bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs px-10 py-6"
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

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="bg-card border border-border/60 p-6 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <MemberAvatar member={member} />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight truncate">
            {member.name}
          </h3>
          <div className="text-sm text-muted-foreground mt-0.5 truncate">
            {member.role}
            {member.company && <> · {member.company}</>}
          </div>
          <div className="mt-2 inline-block text-[10px] font-sans-alt uppercase tracking-[0.18em] text-copper">
            {member.category}
            {member.location && <> · {member.location}</>}
          </div>
        </div>
      </div>

      {member.bio && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {member.bio}
        </p>
      )}

      {member.quote && (
        <p className="text-sm italic text-foreground border-l-2 border-copper pl-3 mb-3">
          "{member.quote}"
        </p>
      )}

      {member.link && (
        <a
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-sans-alt uppercase tracking-[0.16em] text-foreground hover:text-copper transition-colors border-b border-foreground/30 hover:border-copper pb-0.5 self-start"
        >
          Visit
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </article>
  )
}

function MemberAvatar({ member }: { member: Member }) {
  if (member.image) {
    return (
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="w-16 h-16 rounded-full object-cover shrink-0 border border-border"
      />
    )
  }
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-secondary/60 text-foreground font-serif text-lg"
      aria-hidden
    >
      {initials(member.name)}
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
