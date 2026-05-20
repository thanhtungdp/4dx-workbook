import { useState } from 'react'
import simplamoMark from '../../assets/simplamo-mark.svg'
import { sidebarSections, workbookLinks, type PageId, type SectionId } from '../../utils/navigation'

const masscomLogoUrl = 'https://masscom.vn/public/upload/Logo%2BSlogan1.png'

type TopNavProps = {
  activePage: PageId
  activeSection: SectionId
  activeWorkbookTab: number
  completedSheets: number
  saveStatus: string
  isSaved: boolean
  onPageChange: (page: PageId) => void
  onSectionChange: (section: SectionId) => void
  onWorkbookChange: (tab: number) => void
}

export function TopNav({
  activePage,
  activeWorkbookTab,
  completedSheets,
  saveStatus,
  isSaved,
  onPageChange,
  onWorkbookChange,
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handlePageChange = (page: PageId) => {
    onPageChange(page)
    setMenuOpen(false)
  }

  const handleWorkbookChange = (tab: number) => {
    onWorkbookChange(tab)
    setMenuOpen(false)
  }

  return (
    <header id="topnav">
      <div className="nav-brand" aria-label="Masscom">
        <img className="masscom-logo" src={masscomLogoUrl} alt="Masscom" />
      </div>

      <div className="program-title">
        <span>Chương trình đào tạo</span>
        <strong>4DX Training 2026</strong>
        <small>Masscom Group · 21–22/5/2026</small>
      </div>

      <div className="technology-support" aria-label="Hỗ trợ công nghệ bởi Simplamo">
        <img src={simplamoMark} alt="" />
        <span>
          Hỗ trợ công nghệ bởi
          <strong>Simplamo</strong>
        </span>
      </div>

      <button
        className="nav-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="topnav-links"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="topnav-links" aria-label="Cấu trúc nội dung">
        {sidebarSections.map((section) => (
          <div className="mobile-nav-section" key={section.label}>
            <div className="mobile-nav-label">{section.label}</div>
            {section.items.map((item) => (
              <button
                className={`mobile-nav-link${activePage === item.page ? ' active' : ''}`}
                key={item.page}
                type="button"
                onClick={() => handlePageChange(item.page)}
              >
                <span className="sb-dot"></span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
        <div className="mobile-nav-section">
          <div className="mobile-nav-label">Workbook</div>
          {workbookLinks.map((label, index) => (
            <button
              className={`mobile-nav-link${
                activePage === 'workbook' && activeWorkbookTab === index ? ' active' : ''
              }${completedSheets >= index + 1 ? ' done' : ''}`}
              key={label}
              type="button"
              onClick={() => handleWorkbookChange(index)}
            >
              <span className="sb-dot"></span>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className={`nav-save${isSaved ? ' saved' : ''}`} id="navSaveStatus">
        {saveStatus}
      </div>
    </header>
  )
}
