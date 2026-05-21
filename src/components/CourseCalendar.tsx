import { useState, useMemo, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, Check, X, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRODUCTS } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import {
  COURSE_SESSIONS,
  toISODate,
  sessionsOnDate,
  spotsLeft,
  formatSessionDates,
} from '@/data/courseSessions'
import type { CourseSession } from '@/data/courseSessions'

// First day of week — Monday for UK convention
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface CourseCalendarProps {
  /** Restrict to sessions for one course; if undefined, shows all training sessions */
  filterCourseId?: string
}

export function CourseCalendar({ filterCourseId }: CourseCalendarProps) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  // viewYear / viewMonth (0-indexed) drive the grid
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(toISODate(today))

  // Filter the session pool if a specific course was passed
  const allSessions = useMemo(
    () =>
      filterCourseId
        ? COURSE_SESSIONS.filter((s) => s.courseId === filterCourseId)
        : COURSE_SESSIONS,
    [filterCourseId],
  )

  // Build the grid (always 6 rows × 7 cols)
  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])

  // Map: ISO date → sessions covering that date (filtered)
  const sessionsByDate = useMemo(() => {
    const map = new Map<string, CourseSession[]>()
    for (const cell of grid) {
      const matches = allSessions.filter((s) =>
        s.endDate
          ? cell.iso >= s.startDate && cell.iso <= s.endDate
          : s.startDate === cell.iso,
      )
      if (matches.length) map.set(cell.iso, matches)
    }
    return map
  }, [grid, allSessions])

  // Sessions for the currently selected date
  const selectedSessions = useMemo(() => {
    if (!selectedDate) return []
    return sessionsOnDate(selectedDate).filter(
      (s) => !filterCourseId || s.courseId === filterCourseId,
    )
  }, [selectedDate, filterCourseId])

  // If the selected date scrolls off-screen (e.g. user changed month), pick first session in view
  useEffect(() => {
    if (!selectedDate) return
    const d = new Date(selectedDate + 'T00:00:00')
    if (d.getFullYear() !== viewYear || d.getMonth() !== viewMonth) {
      // Find first day in this month that has sessions
      const firstWithSession = grid.find(
        (c) => c.inMonth && sessionsByDate.has(c.iso),
      )
      setSelectedDate(firstWithSession?.iso ?? null)
    }
  }, [viewYear, viewMonth, grid, sessionsByDate, selectedDate])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  // Min reachable month is current month (no scheduling in the past)
  const isPrevDisabled =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth())

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Calendar grid */}
      <div className="lg:col-span-7 bg-card border border-border p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-copper" />
            <span className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper">
              Schedule
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className={`w-9 h-9 flex items-center justify-center border border-border transition-colors ${
                isPrevDisabled
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-secondary hover:border-copper'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="w-9 h-9 flex items-center justify-center border border-border hover:bg-secondary hover:border-copper transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-semibold mb-5">{monthLabel}</h3>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-[10px] font-sans-alt uppercase tracking-[0.18em] text-muted-foreground text-center py-1.5"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {grid.map((cell) => {
            const sessions = sessionsByDate.get(cell.iso) ?? []
            const isToday = cell.iso === toISODate(today)
            const isSelected = selectedDate === cell.iso
            const isPast = new Date(cell.iso + 'T00:00:00') < today
            const hasSessions = sessions.length > 0
            const isInteractive = cell.inMonth && hasSessions && !isPast

            return (
              <button
                key={cell.iso}
                onClick={() => isInteractive && setSelectedDate(cell.iso)}
                disabled={!isInteractive}
                className={`
                  relative aspect-square flex flex-col items-center justify-center transition-all
                  text-sm
                  ${cell.inMonth ? '' : 'opacity-25'}
                  ${isPast ? 'text-muted-foreground/50' : ''}
                  ${isInteractive ? 'cursor-pointer hover:bg-copper/10' : 'cursor-default'}
                  ${
                    isSelected && hasSessions
                      ? 'bg-copper text-accent-foreground'
                      : hasSessions && !isPast
                      ? 'bg-background border border-copper/40'
                      : 'bg-background'
                  }
                  ${isToday && !isSelected ? 'ring-1 ring-foreground/30' : ''}
                `}
              >
                <span className={`font-semibold ${isToday && !isSelected ? 'text-copper' : ''}`}>
                  {cell.day}
                </span>
                {hasSessions && !isPast && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {sessions.slice(0, 3).map((s) => {
                      const left = spotsLeft(s)
                      const color = isSelected
                        ? 'bg-accent-foreground'
                        : left === 0
                        ? 'bg-muted-foreground/40'
                        : left <= 2
                        ? 'bg-orange-500'
                        : 'bg-copper'
                      return (
                        <span
                          key={s.id}
                          className={`w-1 h-1 rounded-full ${color}`}
                        />
                      )
                    })}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-sans-alt uppercase tracking-[0.14em] text-muted-foreground">
          <LegendDot color="bg-copper" label="Available" />
          <LegendDot color="bg-orange-500" label="Filling up" />
          <LegendDot color="bg-muted-foreground/40" label="Sold out" />
        </div>
      </div>

      {/* Selected date detail */}
      <div className="lg:col-span-5">
        <SelectedDateDetail isoDate={selectedDate} sessions={selectedSessions} />
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  )
}

function SelectedDateDetail({
  isoDate,
  sessions,
}: {
  isoDate: string | null
  sessions: CourseSession[]
}) {
  const { add, setOpen } = useCart()
  const [justAdded, setJustAdded] = useState<string | null>(null)

  if (!isoDate) {
    return (
      <div className="bg-card border border-border h-full min-h-[280px] flex items-center justify-center text-center px-6">
        <div>
          <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Pick a date
          </div>
          <p className="text-sm text-muted-foreground max-w-[14em] mx-auto leading-relaxed">
            Click a highlighted day on the calendar to see what's running.
          </p>
        </div>
      </div>
    )
  }

  const heading = new Date(isoDate + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleBook = (session: CourseSession) => {
    const course = PRODUCTS.find((p) => p.id === session.courseId)
    if (!course) return
    // Create a session-specific cart line so the date is preserved + sessions don't collide
    const sessionItem = {
      ...course,
      id: `${course.id}__${session.id}`,
      name: `${course.name} — ${formatSessionDates(session)}`,
    }
    add(sessionItem)
    setJustAdded(session.id)
    setTimeout(() => setJustAdded(null), 2500)
    setOpen(true)
  }

  return (
    <div className="bg-card border border-border p-5 md:p-6">
      <div className="font-sans-alt text-[11px] uppercase tracking-[0.22em] text-copper mb-2">
        On this date
      </div>
      <h3 className="text-xl font-semibold mb-5 leading-tight">{heading}</h3>

      {sessions.length === 0 ? (
        <div className="py-10 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center mx-auto mb-3">
            <X className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            No courses scheduled.
            <br />
            Pick another highlighted day.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => {
            const course = PRODUCTS.find((p) => p.id === s.courseId)
            if (!course) return null
            const left = spotsLeft(s)
            const isMultiDay = !!s.endDate && s.endDate !== s.startDate
            const justBooked = justAdded === s.id
            return (
              <li key={s.id} className="border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    {course.courseBody && (
                      <div className="font-sans-alt text-[9px] uppercase tracking-[0.18em] text-copper mb-1">
                        {course.courseBody}
                        {course.courseLevel && ` · ${course.courseLevel}`}
                      </div>
                    )}
                    <h4 className="text-[15px] font-semibold leading-tight">{course.name}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-semibold">£{course.price.toFixed(0)}</div>
                    {isMultiDay && (
                      <div className="text-[10px] font-sans-alt uppercase tracking-[0.14em] text-muted-foreground mt-0.5">
                        {s.endDate && diffDays(s.startDate, s.endDate) + 1} days
                      </div>
                    )}
                  </div>
                </div>
                {isMultiDay && (
                  <p className="text-[11px] font-sans-alt uppercase tracking-[0.14em] text-muted-foreground mb-2.5">
                    Runs {formatSessionDates(s)}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/60">
                  <div className="text-[11px] font-sans-alt uppercase tracking-[0.14em]">
                    {left === 0 ? (
                      <span className="text-muted-foreground">Sold out</span>
                    ) : left <= 2 ? (
                      <span className="text-orange-600">
                        Only {left} {left === 1 ? 'spot' : 'spots'} left
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {left} of {s.spotsTotal} spots open
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleBook(s)}
                    disabled={left === 0 || justBooked}
                    size="sm"
                    className={`rounded-none font-sans-alt uppercase tracking-[0.16em] text-[10px] px-4 py-2 h-auto ${
                      justBooked
                        ? 'bg-copper text-accent-foreground'
                        : 'bg-primary hover:bg-copper text-primary-foreground'
                    } ${left === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {justBooked ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5" />
                        Booked
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        Book Seat
                      </>
                    )}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// ---------- Grid building ----------

interface DayCell {
  day: number
  iso: string
  inMonth: boolean
}

/** Build a 6×7 grid of day cells covering the given month, padded with adjacent months. */
function buildMonthGrid(year: number, month: number): DayCell[] {
  const firstOfMonth = new Date(year, month, 1)
  // 0 = Mon, 6 = Sun (UK convention; default JS getDay: 0=Sun..6=Sat)
  const leadOffset = (firstOfMonth.getDay() + 6) % 7
  const start = new Date(year, month, 1 - leadOffset)

  const cells: DayCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    cells.push({
      day: d.getDate(),
      iso: toISODate(d),
      inMonth: d.getMonth() === month,
    })
  }
  return cells
}

function diffDays(startISO: string, endISO: string): number {
  const a = new Date(startISO + 'T00:00:00').getTime()
  const b = new Date(endISO + 'T00:00:00').getTime()
  return Math.round((b - a) / 86_400_000)
}
