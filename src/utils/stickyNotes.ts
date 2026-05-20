export const stickyNoteColors = [
  { id: 'yellow', label: 'Vàng', className: 'note-yellow' },
  { id: 'blue', label: 'Xanh', className: 'note-blue' },
  { id: 'green', label: 'Lục', className: 'note-green' },
  { id: 'pink', label: 'Hồng', className: 'note-pink' },
] as const

export type StickyNoteColor = (typeof stickyNoteColors)[number]['id']

export type StickyNote = {
  id: string
  color: StickyNoteColor
  content: string
  createdAt: number
  updatedAt: number
}

export function createStickyNote(color: StickyNoteColor = 'yellow'): StickyNote {
  const now = Date.now()
  return {
    id: `note-${now}-${Math.random().toString(36).slice(2, 8)}`,
    color,
    content: '',
    createdAt: now,
    updatedAt: now,
  }
}

export function getStickyColorClass(color: StickyNoteColor) {
  return stickyNoteColors.find((item) => item.id === color)?.className ?? stickyNoteColors[0].className
}
