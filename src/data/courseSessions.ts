/**
 * Scheduled sessions for training courses.
 * Dates are ISO YYYY-MM-DD. For multi-day courses, both startDate
 * and endDate are set (inclusive).
 *
 * Capacity is per-session: `spotsTotal` is the room cap, `spotsBooked`
 * is how many seats have sold. `spotsTotal - spotsBooked` = available.
 */
export interface CourseSession {
  id: string
  courseId: string
  startDate: string
  endDate?: string
  spotsTotal: number
  spotsBooked: number
}

export const COURSE_SESSIONS: CourseSession[] = [
  // ---------- MAY 2026 ----------
  { id: 's-may-18', courseId: 'tr-barista-foundation', startDate: '2026-05-18', spotsTotal: 8, spotsBooked: 6 },
  { id: 's-may-20', courseId: 'tr-brewing-foundation', startDate: '2026-05-20', spotsTotal: 8, spotsBooked: 4 },
  { id: 's-may-23', courseId: 'tr-sensory-foundation', startDate: '2026-05-23', spotsTotal: 8, spotsBooked: 5 },
  { id: 's-may-25', courseId: 'tr-barista-intermediate', startDate: '2026-05-25', endDate: '2026-05-26', spotsTotal: 6, spotsBooked: 3 },
  { id: 's-may-28', courseId: 'tr-barista-foundation', startDate: '2026-05-28', spotsTotal: 8, spotsBooked: 2 },
  { id: 's-may-30', courseId: 'tr-brewing-foundation', startDate: '2026-05-30', spotsTotal: 8, spotsBooked: 1 },

  // ---------- JUNE 2026 ----------
  { id: 's-jun-01', courseId: 'tr-sensory-foundation', startDate: '2026-06-01', spotsTotal: 8, spotsBooked: 7 },
  { id: 's-jun-03', courseId: 'tr-barista-foundation', startDate: '2026-06-03', spotsTotal: 8, spotsBooked: 4 },
  { id: 's-jun-06', courseId: 'tr-brewing-foundation', startDate: '2026-06-06', spotsTotal: 8, spotsBooked: 2 },
  { id: 's-jun-08', courseId: 'tr-barista-professional', startDate: '2026-06-08', endDate: '2026-06-10', spotsTotal: 5, spotsBooked: 2 },
  { id: 's-jun-13', courseId: 'tr-barista-foundation', startDate: '2026-06-13', spotsTotal: 8, spotsBooked: 3 },
  { id: 's-jun-15', courseId: 'tr-roasting-intermediate', startDate: '2026-06-15', endDate: '2026-06-16', spotsTotal: 4, spotsBooked: 1 },
  { id: 's-jun-17', courseId: 'tr-sensory-foundation', startDate: '2026-06-17', spotsTotal: 8, spotsBooked: 3 },
  { id: 's-jun-20', courseId: 'tr-brewing-foundation', startDate: '2026-06-20', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-jun-22', courseId: 'tr-q-grader', startDate: '2026-06-22', endDate: '2026-06-27', spotsTotal: 6, spotsBooked: 4 },
  { id: 's-jun-29', courseId: 'tr-barista-intermediate', startDate: '2026-06-29', endDate: '2026-06-30', spotsTotal: 6, spotsBooked: 1 },

  // ---------- JULY 2026 ----------
  { id: 's-jul-01', courseId: 'tr-brewing-foundation', startDate: '2026-07-01', spotsTotal: 8, spotsBooked: 2 },
  { id: 's-jul-04', courseId: 'tr-barista-foundation', startDate: '2026-07-04', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-jul-08', courseId: 'tr-sensory-foundation', startDate: '2026-07-08', spotsTotal: 8, spotsBooked: 1 },
  { id: 's-jul-11', courseId: 'tr-barista-foundation', startDate: '2026-07-11', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-jul-13', courseId: 'tr-roasting-intermediate', startDate: '2026-07-13', endDate: '2026-07-14', spotsTotal: 4, spotsBooked: 0 },
  { id: 's-jul-15', courseId: 'tr-brewing-foundation', startDate: '2026-07-15', spotsTotal: 8, spotsBooked: 1 },
  { id: 's-jul-18', courseId: 'tr-sensory-foundation', startDate: '2026-07-18', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-jul-20', courseId: 'tr-barista-foundation', startDate: '2026-07-20', spotsTotal: 8, spotsBooked: 1 },
  { id: 's-jul-25', courseId: 'tr-barista-foundation', startDate: '2026-07-25', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-jul-27', courseId: 'tr-barista-intermediate', startDate: '2026-07-27', endDate: '2026-07-28', spotsTotal: 6, spotsBooked: 0 },

  // ---------- AUGUST 2026 ----------
  { id: 's-aug-01', courseId: 'tr-barista-foundation', startDate: '2026-08-01', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-aug-05', courseId: 'tr-sensory-foundation', startDate: '2026-08-05', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-aug-08', courseId: 'tr-brewing-foundation', startDate: '2026-08-08', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-aug-10', courseId: 'tr-barista-professional', startDate: '2026-08-10', endDate: '2026-08-12', spotsTotal: 5, spotsBooked: 0 },
  { id: 's-aug-15', courseId: 'tr-barista-foundation', startDate: '2026-08-15', spotsTotal: 8, spotsBooked: 0 },
  { id: 's-aug-17', courseId: 'tr-q-grader', startDate: '2026-08-17', endDate: '2026-08-22', spotsTotal: 6, spotsBooked: 0 },
  { id: 's-aug-29', courseId: 'tr-brewing-foundation', startDate: '2026-08-29', spotsTotal: 8, spotsBooked: 0 },
]

// ---------- Helpers ----------

/** Returns the YYYY-MM-DD string from a Date in local time. */
export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** True if the session occupies this date (single or multi-day). */
export function sessionCoversDate(session: CourseSession, isoDate: string): boolean {
  if (!session.endDate) return session.startDate === isoDate
  return isoDate >= session.startDate && isoDate <= session.endDate
}

/** Get all sessions that include the given date. */
export function sessionsOnDate(isoDate: string): CourseSession[] {
  return COURSE_SESSIONS.filter((s) => sessionCoversDate(s, isoDate))
}

/** Days available for a session. */
export function spotsLeft(session: CourseSession): number {
  return Math.max(0, session.spotsTotal - session.spotsBooked)
}

/** Format a session's date range as a short string. */
export function formatSessionDates(session: CourseSession): string {
  const start = new Date(session.startDate + 'T00:00:00')
  if (!session.endDate || session.endDate === session.startDate) {
    return start.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }
  const end = new Date(session.endDate + 'T00:00:00')
  const sameMonth = start.getMonth() === end.getMonth()
  if (sameMonth) {
    return `${start.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' })}`
  }
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
}
