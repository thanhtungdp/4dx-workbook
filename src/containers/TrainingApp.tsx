import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { CadenceL10Meeting } from '../components/content/CadenceL10Meeting'
import { FourDxExamplesDashboard } from '../components/content/FourDxExamplesDashboard'
import { LegacyMain } from '../components/content/LegacyMain'
import { PageControls } from '../components/navigation/PageControls'
import { Sidebar } from '../components/navigation/Sidebar'
import { TopNav } from '../components/navigation/TopNav'
import { StickyNotesPanel } from '../components/notes/StickyNotesPanel'
import { getSlideIndex, slideRoutes, type PageId, type SectionId, type SlideRoute } from '../utils/navigation'
import { useLegacyInteractions } from './useLegacyInteractions'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable
}

export function TrainingApp() {
  const [activePage, setActivePage] = useState<PageId>('overview')
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const [activeWorkbookTab, setActiveWorkbookTab] = useState(0)
  const [completedSheets, setCompletedSheets] = useState(0)
  const [saveStatus, setSaveStatus] = useState('— chưa lưu —')
  const [isSaved, setIsSaved] = useState(false)

  const actions = useLegacyInteractions({
    activePage,
    activeWorkbookTab,
    setActivePage,
    setActiveSection,
    setActiveWorkbookTab,
    setCompletedSheets,
    setSaveStatus,
    setIsSaved,
  })

  const slideIndex = getSlideIndex(activePage, activeWorkbookTab)
  const currentSlide = slideRoutes[slideIndex] ?? slideRoutes[0]
  const previousSlide = slideIndex > 0 ? slideRoutes[slideIndex - 1] : undefined
  const nextSlide = slideIndex >= 0 && slideIndex < slideRoutes.length - 1 ? slideRoutes[slideIndex + 1] : undefined

  const goToSlide = useCallback(
    (slide?: SlideRoute) => {
      if (!slide) return
      if (slide.page === 'workbook') {
        actions.showWorkbook(slide.workbookTab ?? 0)
      } else {
        actions.showPage(slide.page)
      }
    },
    [actions],
  )

  const goPrevious = useCallback(() => goToSlide(previousSlide), [goToSlide, previousSlide])
  const goNext = useCallback(() => goToSlide(nextSlide), [goToSlide, nextSlide])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevious()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrevious])

  return (
    <>
      <TopNav
        activePage={activePage}
        activeSection={activeSection}
        activeWorkbookTab={activeWorkbookTab}
        completedSheets={completedSheets}
        isSaved={isSaved}
        saveStatus={saveStatus}
        onPageChange={actions.showPage}
        onSectionChange={actions.showSection}
        onWorkbookChange={actions.showWorkbook}
      />
      <Sidebar
        activePage={activePage}
        activeWorkbookTab={activeWorkbookTab}
        completedSheets={completedSheets}
        onPageChange={actions.showPage}
        onWorkbookChange={actions.showWorkbook}
      />
      <LegacyMain>
        <CadenceL10Meeting activePage={activePage} />
        <FourDxExamplesDashboard activePage={activePage} />
        <PageControls
          currentLabel={currentSlide.label}
          next={nextSlide}
          previous={previousSlide}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      </LegacyMain>
      <StickyNotesPanel />
    </>
  )
}
