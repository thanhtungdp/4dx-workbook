import { finalLinks, sidebarSections, workbookLinks, type PageId } from '../../utils/navigation'

type SidebarProps = {
  activePage: PageId
  activeWorkbookTab: number
  completedSheets: number
  onPageChange: (page: PageId) => void
  onWorkbookChange: (tab: number) => void
}

export function Sidebar({
  activePage,
  activeWorkbookTab,
  completedSheets,
  onPageChange,
  onWorkbookChange,
}: SidebarProps) {
  return (
    <aside id="sidebar">
      {sidebarSections.map((section) => (
        <div className="sb-section" key={section.label}>
          <div className="sb-label">{section.label}</div>
          {section.items.map((item) => (
            <button
              className={`sb-link${activePage === item.page ? ' active' : ''}`}
              key={item.page}
              type="button"
              onClick={() => onPageChange(item.page)}
            >
              <span className="sb-dot"></span>
              {item.label}
            </button>
          ))}
        </div>
      ))}
      <div className="sb-section">
        <div className="sb-label">Workbook</div>
        {workbookLinks.map((label, index) => (
          <button
            className={`sb-link${activePage === 'workbook' && activeWorkbookTab === index ? ' active' : ''}${
              completedSheets >= index + 1 ? ' done' : ''
            }`}
            id={`sb-wb${index + 1}`}
            key={label}
            type="button"
            onClick={() => onWorkbookChange(index)}
          >
            <span className="sb-dot"></span>
            {label}
          </button>
        ))}
      </div>
      <div className="sb-section">
        <div className="sb-label">Cuối chương trình</div>
        {finalLinks.map((item) => (
          <button
            className={`sb-link${activePage === item.page ? ' active' : ''}`}
            key={item.page}
            type="button"
            onClick={() => onPageChange(item.page)}
          >
            <span className="sb-dot"></span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
