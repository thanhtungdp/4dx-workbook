export type PageId =
  | 'overview'
  | 'sbu-wigs'
  | 'schedule'
  | 'examples'
  | 'whirlwind'
  | 'wig-concept'
  | 'lead-lag'
  | 'five-whys'
  | 'five-ways'
  | 'scoreboard'
  | 'cadence'
  | 'checkin'
  | 'simplamo'
  | 'workbook'

export type SectionId = 'overview' | 'day1' | 'day2' | 'workbook'

export const sectionLandingPages: Record<SectionId, PageId> = {
  overview: 'overview',
  day1: 'whirlwind',
  day2: 'scoreboard',
  workbook: 'workbook',
}

const day1Pages = new Set<PageId>([
  'whirlwind',
  'wig-concept',
  'lead-lag',
  'five-whys',
  'five-ways',
])

const day2Pages = new Set<PageId>(['scoreboard', 'cadence', 'checkin', 'simplamo'])

export function getSectionForPage(page: PageId): SectionId {
  if (day1Pages.has(page)) return 'day1'
  if (day2Pages.has(page)) return 'day2'
  if (page === 'workbook') return 'workbook'
  return 'overview'
}

export const sidebarSections = [
  {
    label: 'Tổng quan',
    items: [
      { page: 'overview', label: '4DX là gì?' },
      { page: 'sbu-wigs', label: 'WIG của Masscom' },
      { page: 'schedule', label: 'Lịch trình 2 ngày' },
      { page: 'examples', label: 'Example 4DX' },
    ],
  },
  {
    label: 'Ngày 1 — 21/5',
    items: [
      { page: 'whirlwind', label: 'Cơn lốc hàng ngày' },
      { page: 'wig-concept', label: 'Nguyên tắc 1: WIG' },
      { page: 'lead-lag', label: 'Nguyên tắc 2: Lead & Lag' },
      { page: 'five-whys', label: '5 WHYs — Nexta' },
      { page: 'five-ways', label: '5 WAYS — Masstel' },
    ],
  },
  {
    label: 'Ngày 2 — 22/5',
    items: [
      { page: 'scoreboard', label: 'Nguyên tắc 3: Bảng điểm' },
      { page: 'cadence', label: 'Nguyên tắc 4: Nhịp họp WIG' },
      { page: 'checkin', label: 'Check-in kết quả' },
      { page: 'simplamo', label: 'Triển khai Simplamo' },
    ],
  },
] as const satisfies ReadonlyArray<{
  label: string
  items: ReadonlyArray<{ page: PageId; label: string }>
}>

export const workbookLinks = [
  'Tờ 1: WIG của tôi',
  'Tờ 2: 5 WHYs',
  'Tờ 3: Lead Measures',
  'Tờ 4: Bảng điểm',
] as const

export type SlideRoute = {
  label: string
  page: PageId
  workbookTab?: number
}

export const slideRoutes: SlideRoute[] = [
  ...sidebarSections.flatMap((section) => section.items.map((item) => ({ label: item.label, page: item.page }))),
  ...workbookLinks.map((label, index) => ({ label, page: 'workbook' as const, workbookTab: index })),
]

export function getSlideIndex(page: PageId, workbookTab: number) {
  return slideRoutes.findIndex((route) => {
    if (route.page !== page) return false
    if (route.page !== 'workbook') return true
    return route.workbookTab === workbookTab
  })
}
