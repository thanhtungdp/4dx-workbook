export const workbookFieldIds = [
  'wb-name',
  'wig-metric',
  'wig-x',
  'wig-y',
  'wig-z',
  'wig-source',
  'wig-reason',
  'why-gap',
  'why1',
  'why2',
  'why3',
  'why4',
  'why5',
  'why-lm1',
  'why-lm2',
  'lm1-desc',
  'lm1-target',
  'lm1-owner',
  'lm2-desc',
  'lm2-target',
  'lm2-owner',
  'commit-lm1',
  'commit-lm2',
  'sb-sbu',
  'sb-wig',
  'sb-week',
  'sb-lm1-name',
  'sb-lm1-target',
  'sb-lm1-owner',
  'sb-lm2-name',
  'sb-lm2-target',
  'sb-lm2-owner',
  'sb-lag-name',
  'sb-lag-target',
  'sb-update-who',
  'sb-update-when',
  'wb-wig-day',
  'wb-wig-time',
] as const

export const workbookRadioNames = [
  'wig-check',
  'lm1-pred',
  'lm1-inf',
  'lm2-pred',
  'lm2-inf',
] as const

export const workbookCheckboxIds = [
  'sb-type-paper',
  'sb-type-sheet',
  'sb-type-simplamo',
] as const

export function formatSaveTime(ts: number) {
  const date = new Date(ts)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `Lưu lúc ${hours}:${minutes}`
}

export function getInputValue(id: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null
  return element?.value ?? ''
}

export function setInputValue(id: string, value: unknown) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null
  if (element && typeof value === 'string') element.value = value
}
