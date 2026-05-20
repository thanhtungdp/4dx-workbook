import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { readStickyNotes, writeStickyNotes } from '../../storage/stickyNotesStorage'
import {
  createStickyNote,
  getStickyColorClass,
  stickyNoteColors,
  type StickyNote,
  type StickyNoteColor,
} from '../../utils/stickyNotes'

function resizeTextarea(textarea: HTMLTextAreaElement | null) {
  if (!textarea) return
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

export function StickyNotesPanel() {
  const [notes, setNotes] = useState<StickyNote[]>(() => readStickyNotes())
  const [isOpen, setIsOpen] = useState(false)
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})

  useEffect(() => {
    writeStickyNotes(notes)
  }, [notes])

  useLayoutEffect(() => {
    notes.forEach((note) => resizeTextarea(textareaRefs.current[note.id]))
  }, [notes])

  const addNote = useCallback((color: StickyNoteColor = 'yellow') => {
    setNotes((current) => [createStickyNote(color), ...current])
    setIsOpen(true)
  }, [])

  const updateNote = useCallback((id: string, content: string) => {
    setNotes((current) =>
      current.map((note) => (note.id === id ? { ...note, content, updatedAt: Date.now() } : note)),
    )
  }, [])

  const changeColor = useCallback((id: string, color: StickyNoteColor) => {
    setNotes((current) =>
      current.map((note) => (note.id === id ? { ...note, color, updatedAt: Date.now() } : note)),
    )
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id))
  }, [])

  const moveNote = useCallback((id: string, direction: -1 | 1) => {
    setNotes((current) => {
      const index = current.findIndex((note) => note.id === id)
      const targetIndex = index + direction
      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return current

      const next = [...current]
      const [note] = next.splice(index, 1)
      next.splice(targetIndex, 0, note)
      return next
    })
  }, [])

  return (
    <>
      <button
        className={`sticky-mobile-toggle${isOpen ? ' open' : ''}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="stickyNotesPanel"
        onClick={() => setIsOpen((current) => !current)}
      >
        Note
        <span>{notes.length}</span>
      </button>

      <aside className={`sticky-panel${isOpen ? ' open' : ''}`} id="stickyNotesPanel" aria-label="Sticky Notes">
        <div className="sticky-panel-head">
          <div>
            <span>Sticky Notes</span>
            <strong>Ghi chú nhanh</strong>
          </div>
          <button className="sticky-close" type="button" aria-label="Đóng sticky notes" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="sticky-create-row" aria-label="Tạo sticky note">
          <button className="sticky-add" type="button" onClick={() => addNote()}>
            + Note
          </button>
          <div className="sticky-color-palette">
            {stickyNoteColors.map((color) => (
              <button
                className={`sticky-swatch ${color.className}`}
                key={color.id}
                type="button"
                aria-label={`Tạo note màu ${color.label}`}
                onClick={() => addNote(color.id)}
              />
            ))}
          </div>
        </div>

        <div className="sticky-list">
          {notes.length === 0 ? (
            <div className="sticky-empty">Thêm note để ghi nhanh ý tưởng, câu hỏi hoặc cam kết trong buổi học.</div>
          ) : (
            notes.map((note, index) => (
              <article className={`sticky-note ${getStickyColorClass(note.color)}`} key={note.id}>
                <div className="sticky-note-toolbar">
                  <div className="sticky-color-palette compact">
                    {stickyNoteColors.map((color) => (
                      <button
                        className={`sticky-swatch ${color.className}${note.color === color.id ? ' active' : ''}`}
                        key={color.id}
                        type="button"
                        aria-label={`Đổi sang màu ${color.label}`}
                        onClick={() => changeColor(note.id, color.id)}
                      />
                    ))}
                  </div>

                  <div className="sticky-order-actions">
                    <button type="button" disabled={index === 0} aria-label="Đưa note lên" onClick={() => moveNote(note.id, -1)}>
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === notes.length - 1}
                      aria-label="Đưa note xuống"
                      onClick={() => moveNote(note.id, 1)}
                    >
                      ↓
                    </button>
                    <button type="button" aria-label="Xóa note" onClick={() => deleteNote(note.id)}>
                      ×
                    </button>
                  </div>
                </div>

                <textarea
                  ref={(element) => {
                    textareaRefs.current[note.id] = element
                  }}
                  value={note.content}
                  placeholder="Ghi nhanh tại đây..."
                  rows={1}
                  onInput={(event) => resizeTextarea(event.currentTarget)}
                  onChange={(event) => updateNote(note.id, event.target.value)}
                />
              </article>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
