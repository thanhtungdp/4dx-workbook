import { stickyNoteColors, type StickyNote, type StickyNoteColor } from '../utils/stickyNotes'

const STICKY_NOTES_STORAGE_KEY = '4dx_masscom_sticky_notes_v1'

function isStickyNoteColor(value: unknown): value is StickyNoteColor {
  return typeof value === 'string' && stickyNoteColors.some((item) => item.id === value)
}

function normalizeNote(note: unknown): StickyNote | null {
  if (!note || typeof note !== 'object') return null

  const candidate = note as Record<string, unknown>
  if (typeof candidate.id !== 'string') return null

  return {
    id: candidate.id,
    color: isStickyNoteColor(candidate.color) ? candidate.color : 'yellow',
    content: typeof candidate.content === 'string' ? candidate.content : '',
    createdAt: typeof candidate.createdAt === 'number' ? candidate.createdAt : Date.now(),
    updatedAt: typeof candidate.updatedAt === 'number' ? candidate.updatedAt : Date.now(),
  }
}

export function readStickyNotes(): StickyNote[] {
  try {
    const raw = localStorage.getItem(STICKY_NOTES_STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data.flatMap((note) => normalizeNote(note) ?? []) : []
  } catch {
    return []
  }
}

export function writeStickyNotes(notes: StickyNote[]) {
  localStorage.setItem(STICKY_NOTES_STORAGE_KEY, JSON.stringify(notes))
}
