export const WORKBOOK_STORAGE_KEY = '4dx_masscom_2026'

export type WorkbookData = Record<string, unknown> & {
  sbu?: string
  ts?: number
  'sb-rows'?: string[][]
}

export function readWorkbook(): WorkbookData | null {
  try {
    const raw = localStorage.getItem(WORKBOOK_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WorkbookData) : null
  } catch {
    return null
  }
}

export function writeWorkbook(data: WorkbookData) {
  localStorage.setItem(WORKBOOK_STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent('workbook:updated'))
}

export function clearWorkbook() {
  localStorage.removeItem(WORKBOOK_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent('workbook:updated'))
}
