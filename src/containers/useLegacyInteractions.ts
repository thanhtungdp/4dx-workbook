import { useCallback, useEffect, useRef } from 'react'
import { clearWorkbook, readWorkbook, writeWorkbook, type WorkbookData } from '../storage/workbookStorage'
import { getSectionForPage, sectionLandingPages, type PageId, type SectionId } from '../utils/navigation'
import { sbuPresets, type SbuId } from '../utils/sbuPresets'
import {
  formatSaveTime,
  getInputValue,
  setInputValue,
  workbookCheckboxIds,
  workbookFieldIds,
  workbookRadioNames,
} from '../utils/workbook'

type ControllerOptions = {
  activePage: PageId
  activeWorkbookTab: number
  setActivePage: (page: PageId) => void
  setActiveSection: (section: SectionId) => void
  setActiveWorkbookTab: (tab: number) => void
  setCompletedSheets: (count: number) => void
  setSaveStatus: (status: string) => void
  setIsSaved: (isSaved: boolean) => void
}

declare global {
  interface Window {
    showPage: (id: PageId) => void
    showSection: (section: SectionId) => void
    showWorkbook: (tab: number) => void
    showWorkbookTab: (tab: number) => void
    selectSBU: (sbu: SbuId) => void
    updateWIGPreview: () => void
    addSBRow: () => void
    autoSave: () => void
    saveAll: (silent?: boolean) => void
    clearAll: () => void
    drillWhy: () => void
    resetWhyDemo: () => void
    eosStartPause: () => void
    eosTick: () => void
    eosUpdateDisplay: () => void
    eosNextPhase: () => void
    eosFinish: () => void
    eosReset: () => void
    eosToggle: (item: Element) => void
  }
}

const radioPrefix = 'radio_'
const eosPhaseSeconds = [300, 300, 300] as const

function applyPageClasses(page: PageId) {
  document.querySelectorAll('.legacy-pages .page').forEach((element) => element.classList.remove('active'))
  document.getElementById(`page-${page}`)?.classList.add('active')
}

function applyWorkbookClasses(tab: number) {
  document.querySelectorAll('.wb-sheet').forEach((element) => element.classList.remove('active'))
  document.querySelectorAll('.wb-tab').forEach((element) => element.classList.remove('active'))
  document.getElementById(`wbsheet${tab}`)?.classList.add('active')
  document.getElementById(`wbtab${tab}`)?.classList.add('active')
}

function getScoreboardRows() {
  const rows: string[][] = []
  document.querySelectorAll('#sb-rows tr').forEach((row) => {
    const cells: string[] = []
    row.querySelectorAll('input,select').forEach((input) => {
      cells.push((input as HTMLInputElement | HTMLSelectElement).value)
    })
    rows.push(cells)
  })
  return rows
}

function updateWigPreviewDom() {
  const metric = getInputValue('wig-metric') || '___________'
  const x = getInputValue('wig-x') || '[X]'
  const y = getInputValue('wig-y') || '[Y]'
  const z = getInputValue('wig-z') || '[Z]'

  document.getElementById('pMetric')!.textContent = metric
  document.getElementById('pX')!.textContent = x
  document.getElementById('pY')!.textContent = y
  document.getElementById('pZ')!.textContent = z

  const wigRef = document.getElementById('whyWigRef')
  if (wigRef && metric !== '___________') {
    wigRef.textContent = `Tăng ${metric} từ ${x} → ${y} trước ${z}`
  }

  const shlm1 = document.getElementById('sh-lm1-t')
  const shlm2 = document.getElementById('sh-lm2-t')
  const shlag = document.getElementById('sh-lag-t')
  if (shlm1) shlm1.textContent = getInputValue('sb-lm1-target') || '__'
  if (shlm2) shlm2.textContent = getInputValue('sb-lm2-target') || '__'
  if (shlag) shlag.textContent = getInputValue('sb-lag-target') || '__'
}

function addScoreboardRow(values?: string[]) {
  const tbody = document.getElementById('sb-rows')
  if (!tbody) return

  const row = document.createElement('tr')
  row.innerHTML =
    '<td><input type="text" style="width:100%;border:none;border-bottom:1px solid #E0E0DC;padding:6px 0;font-size:13px;background:transparent;font-family:inherit" placeholder="Tên thành viên" oninput="autoSave()"></td>' +
    '<td><input type="text" style="width:80px;border:none;border-bottom:1px solid #E0E0DC;padding:6px 0;font-size:13px;background:transparent;text-align:center;font-family:inherit" placeholder="0" oninput="autoSave()"></td>' +
    '<td><input type="text" style="width:80px;border:none;border-bottom:1px solid #E0E0DC;padding:6px 0;font-size:13px;background:transparent;text-align:center;font-family:inherit" placeholder="0" oninput="autoSave()"></td>' +
    '<td><input type="text" style="width:80px;border:none;border-bottom:1px solid #E0E0DC;padding:6px 0;font-size:13px;background:transparent;text-align:center;font-family:inherit" placeholder="0" oninput="autoSave()"></td>' +
    '<td><select style="border:none;border-bottom:1px solid #E0E0DC;padding:6px 0;font-size:12px;background:transparent;font-family:inherit" onchange="autoSave()"><option>—</option><option>ĐUỐI</option><option>ĐƯỢC</option><option>ĐẠT</option><option>ĐỈNH</option></select></td>'
  tbody.appendChild(row)

  if (values) {
    row.querySelectorAll('input,select').forEach((input, index) => {
      ;(input as HTMLInputElement | HTMLSelectElement).value = values[index] ?? ''
    })
  }
}

function animateStatCards() {
  const counters = [
    { id: 'cnt-masstel', to: 650, duration: 1600 },
    { id: 'cnt-nexta', to: 75, duration: 1400 },
  ]

  counters.forEach((counter) => {
    const element = document.getElementById(counter.id)
    if (!element) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      startTime ??= timestamp
      const progress = Math.min((timestamp - startTime) / counter.duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      element.textContent = Math.round(ease * counter.to).toString()
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })

  document.querySelectorAll<HTMLElement>('.stat-bar-fill[data-target]').forEach((bar) => {
    const target = Number.parseInt(bar.dataset.target ?? '0', 10)
    setTimeout(() => {
      bar.style.width = `${Math.min(target, 100)}%`
    }, 200)
  })
}

function animateLiveScoreboard() {
  document.querySelectorAll<HTMLElement>('#liveSB .sb-prog-fill[data-w]').forEach((fill) => {
    const width = Number.parseFloat(fill.dataset.w ?? '0')
    setTimeout(() => {
      fill.style.width = `${Math.min(width, 100)}%`
    }, 200)
  })
}

export function useLegacyInteractions({
  activePage,
  activeWorkbookTab,
  setActivePage,
  setActiveSection,
  setActiveWorkbookTab,
  setCompletedSheets,
  setSaveStatus,
  setIsSaved,
}: ControllerOptions) {
  const currentSbu = useRef<SbuId | ''>('')
  const saveTimer = useRef<number | null>(null)
  const whyStep = useRef(0)
  const eosRunning = useRef(false)
  const eosPhase = useRef(0)
  const eosTimeLeft = useRef(300)
  const eosInterval = useRef<number | null>(null)
  const showSaveTime = useCallback(
    (timestamp?: number) => {
      if (!timestamp) return
      setSaveStatus(formatSaveTime(timestamp))
      setIsSaved(true)
    },
    [setIsSaved, setSaveStatus],
  )

  const updateProgress = useCallback(() => {
    let filled = 0
    if (getInputValue('wig-x') && getInputValue('wig-y')) filled += 1
    if (getInputValue('why1') && getInputValue('why5')) filled += 1
    if (getInputValue('lm1-desc') && getInputValue('lm2-desc')) filled += 1
    if (getInputValue('sb-lm1-name') && getInputValue('sb-wig')) filled += 1

    const progress = document.getElementById('wbProgress') as HTMLElement | null
    const label = document.getElementById('wbProgressLabel')
    if (progress) progress.style.width = `${(filled / 4) * 100}%`
    if (label) label.textContent = `${filled} / 4 tờ đã hoàn thiện`
    setCompletedSheets(filled)
  }, [setCompletedSheets])

  const getAllData = useCallback((): WorkbookData => {
    const data: WorkbookData = { sbu: currentSbu.current, ts: Date.now() }

    workbookFieldIds.forEach((id) => {
      data[id] = getInputValue(id)
    })

    workbookRadioNames.forEach((name) => {
      const checked = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
      if (checked) data[`${radioPrefix}${name}`] = checked.value
    })

    workbookCheckboxIds.forEach((id) => {
      const checkbox = document.getElementById(id) as HTMLInputElement | null
      if (checkbox) data[id] = checkbox.checked
    })

    data['sb-rows'] = getScoreboardRows()
    return data
  }, [])

  const saveAll = useCallback(
    (silent = false) => {
      const data = getAllData()
      writeWorkbook(data)
      updateProgress()

      if (!silent) {
        ;['saveStatus1', 'saveStatus2', 'saveStatus3', 'saveStatus4'].forEach((id) => {
          const element = document.getElementById(id)
          if (element) {
            element.textContent = '✓ Đã lưu'
            element.className = 'save-status ok'
          }
        })
      }

      showSaveTime(data.ts)
    },
    [getAllData, showSaveTime, updateProgress],
  )

  const autoSave = useCallback(() => {
    updateWigPreviewDom()
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => saveAll(true), 600)
  }, [saveAll])

  const showWorkbookTab = useCallback(
    (tab: number) => {
      setActiveWorkbookTab(tab)
      applyWorkbookClasses(tab)
    },
    [setActiveWorkbookTab],
  )

  const showPage = useCallback(
    (page: PageId) => {
      setActivePage(page)
      setActiveSection(getSectionForPage(page))
      applyPageClasses(page)
      window.scrollTo(0, 0)
      if (page === 'sbu-wigs') setTimeout(animateStatCards, 150)
      if (page === 'scoreboard') setTimeout(animateLiveScoreboard, 150)
    },
    [setActivePage, setActiveSection],
  )

  const showSection = useCallback(
    (section: SectionId) => {
      showPage(sectionLandingPages[section])
    },
    [showPage],
  )

  const showWorkbook = useCallback(
    (tab: number) => {
      showPage('workbook')
      showWorkbookTab(tab)
    },
    [showPage, showWorkbookTab],
  )

  const selectSBU = useCallback(
    (sbu: SbuId) => {
      currentSbu.current = sbu
      document.querySelectorAll('.sbu-btn').forEach((button) => button.classList.remove('active'))
      const eventTarget = (window.event?.target as HTMLElement | null) ?? null
      eventTarget?.classList.add('active')

      const preset = sbuPresets[sbu]
      const fields: Record<string, string> = {
        'wig-metric': preset.metric,
        'wig-x': preset.x,
        'wig-y': preset.y,
        'wig-z': preset.z,
        'wig-reason': preset.reason,
        'lm1-desc': preset.lm1desc,
        'lm1-target': preset.lm1target,
        'lm1-owner': preset.lm1owner,
        'lm2-desc': preset.lm2desc,
        'lm2-target': preset.lm2target,
        'lm2-owner': preset.lm2owner,
        'sb-sbu': sbu.toUpperCase(),
        'sb-wig': preset.sbwig,
        'sb-lm1-name': preset.lm1desc.substring(0, 50),
        'sb-lm1-target': preset.lm1target,
        'sb-lm2-name': preset.lm2desc.substring(0, 50),
        'sb-lm2-target': preset.lm2target,
        'sb-lag-name': preset.sblag,
      }

      Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null
        if (element && !element.value) element.value = value
      })

      updateWigPreviewDom()
      autoSave()
    },
    [autoSave],
  )

  const loadData = useCallback(() => {
    const data = readWorkbook()
    if (!data) {
      addScoreboardRow()
      addScoreboardRow()
      addScoreboardRow()
      updateWigPreviewDom()
      updateProgress()
      return
    }

    if (typeof data.sbu === 'string' && data.sbu in sbuPresets) {
      currentSbu.current = data.sbu as SbuId
      document.querySelectorAll('.sbu-btn').forEach((button) => {
        const onclick = button.getAttribute('onclick') ?? ''
        if (onclick.includes(`'${data.sbu}'`)) button.classList.add('active')
      })
    }

    Object.entries(data).forEach(([key, value]) => {
      if (
        key === 'sbu' ||
        key === 'ts' ||
        key.startsWith(radioPrefix) ||
        key === 'sb-rows' ||
        key.startsWith('sb-type-')
      ) {
        return
      }
      setInputValue(key, value)
    })

    Object.entries(data).forEach(([key, value]) => {
      if (!key.startsWith(radioPrefix) || typeof value !== 'string') return
      const name = key.replace(radioPrefix, '')
      const input = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`)
      if (input) input.checked = true
    })

    workbookCheckboxIds.forEach((id) => {
      const checkbox = document.getElementById(id) as HTMLInputElement | null
      const value = data[id]
      if (checkbox && typeof value === 'boolean') checkbox.checked = value
    })

    const rows = Array.isArray(data['sb-rows']) ? data['sb-rows'] : []
    if (rows.length > 0) rows.forEach((row) => addScoreboardRow(row))
    else {
      addScoreboardRow()
      addScoreboardRow()
      addScoreboardRow()
    }

    updateWigPreviewDom()
    updateProgress()
    showSaveTime(data.ts)
  }, [showSaveTime, updateProgress])

  useEffect(() => {
    window.showPage = showPage
    window.showSection = showSection
    window.showWorkbook = showWorkbook
    window.showWorkbookTab = showWorkbookTab
    window.selectSBU = selectSBU
    window.updateWIGPreview = updateWigPreviewDom
    window.addSBRow = () => {
      addScoreboardRow()
      autoSave()
    }
    window.autoSave = autoSave
    window.saveAll = saveAll
    window.clearAll = () => {
      if (!confirm('Xóa toàn bộ dữ liệu workbook? Thao tác không thể hoàn tác.')) return
      clearWorkbook()
      location.reload()
    }
    window.drillWhy = () => {
      if (whyStep.current >= 5) return
      whyStep.current += 1
      document.getElementById(`wsd${whyStep.current}`)?.classList.add('show')
      const status = document.getElementById('whyDrillStatus')
      if (status) status.textContent = `${whyStep.current} / 5 tầng khám phá`
      const button = document.getElementById('whyDrillBtn') as HTMLButtonElement | null
      if (!button) return
      if (whyStep.current >= 5) {
        button.textContent = '✓ Đến nguyên nhân gốc rễ!'
        button.classList.add('done')
        button.disabled = true
      } else {
        button.textContent = `▼ Đào sâu hơn — Why ${whyStep.current + 1}`
      }
    }
    window.resetWhyDemo = () => {
      whyStep.current = 0
      for (let index = 1; index <= 5; index += 1) {
        document.getElementById(`wsd${index}`)?.classList.remove('show')
      }
      const button = document.getElementById('whyDrillBtn') as HTMLButtonElement | null
      if (button) {
        button.textContent = '▼ Bắt đầu đào — Why 1'
        button.classList.remove('done')
        button.disabled = false
      }
      const status = document.getElementById('whyDrillStatus')
      if (status) status.textContent = 'Nhấn để khám phá từng tầng nguyên nhân'
    }

    window.eosUpdateDisplay = () => {
      let totalLeft = eosTimeLeft.current
      for (let index = eosPhase.current + 1; index < 3; index += 1) totalLeft += eosPhaseSeconds[index]
      const totalMinutes = Math.floor(totalLeft / 60)
      const totalSeconds = totalLeft % 60
      const clock = document.getElementById('eosClockDisplay')
      if (clock) clock.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`

      const phaseMinutes = Math.floor(eosTimeLeft.current / 60)
      const phaseSeconds = eosTimeLeft.current % 60
      const phaseTimer = document.getElementById(`ephtime${eosPhase.current}`)
      if (phaseTimer) phaseTimer.textContent = `${phaseMinutes}:${phaseSeconds < 10 ? '0' : ''}${phaseSeconds}`

      const pct =
        ((eosPhaseSeconds[eosPhase.current] - eosTimeLeft.current) / eosPhaseSeconds[eosPhase.current]) * 100
      const fill = document.getElementById(`ephfill${eosPhase.current}`) as HTMLElement | null
      if (fill) fill.style.width = `${pct}%`
    }
    window.eosFinish = () => {
      const clock = document.getElementById('eosClockDisplay')
      if (clock) clock.textContent = '0:00'
      const finished = document.getElementById('eosFinished') as HTMLElement | null
      if (finished) finished.style.display = 'flex'
      const message = document.getElementById('eosStatusMsg')
      if (message) message.textContent = '✓ Hoàn thành họp WIG!'
      const button = document.getElementById('eosStartBtn') as HTMLButtonElement | null
      if (button) {
        button.textContent = '✓ Xong!'
        button.disabled = true
      }
    }
    window.eosNextPhase = () => {
      if (eosInterval.current) clearInterval(eosInterval.current)
      eosRunning.current = false
      const current = document.getElementById(`ephase${eosPhase.current}`)
      current?.classList.remove('active')
      current?.classList.add('done-ph')
      const fill = document.getElementById(`ephfill${eosPhase.current}`) as HTMLElement | null
      if (fill) fill.style.width = '100%'
      if (eosPhase.current >= 2) {
        window.eosFinish()
        return
      }
      eosPhase.current += 1
      eosTimeLeft.current = eosPhaseSeconds[eosPhase.current]
      document.getElementById(`ephase${eosPhase.current}`)?.classList.add('active')
      const phaseTimer = document.getElementById(`ephtime${eosPhase.current}`)
      if (phaseTimer) phaseTimer.textContent = `${Math.floor(eosTimeLeft.current / 60)}:00`
      const button = document.getElementById('eosStartBtn') as HTMLButtonElement | null
      if (button) {
        button.textContent = '▶ Bắt đầu'
        button.disabled = false
      }
      const message = document.getElementById('eosStatusMsg')
      if (message) message.textContent = `Giai đoạn ${eosPhase.current + 1} / 3`
      window.eosUpdateDisplay()
    }
    window.eosTick = () => {
      eosTimeLeft.current -= 1
      if (eosTimeLeft.current <= 0) {
        eosTimeLeft.current = 0
        if (eosInterval.current) clearInterval(eosInterval.current)
        eosRunning.current = false
        window.eosUpdateDisplay()
        setTimeout(window.eosNextPhase, 600)
        return
      }
      window.eosUpdateDisplay()
    }
    window.eosStartPause = () => {
      const button = document.getElementById('eosStartBtn') as HTMLButtonElement | null
      if (!button) return
      if (!eosRunning.current) {
        eosRunning.current = true
        button.textContent = '⏸ Dừng'
        eosInterval.current = window.setInterval(window.eosTick, 1000)
      } else {
        eosRunning.current = false
        button.textContent = '▶ Tiếp tục'
        if (eosInterval.current) clearInterval(eosInterval.current)
      }
    }
    window.eosReset = () => {
      if (eosInterval.current) clearInterval(eosInterval.current)
      eosRunning.current = false
      eosPhase.current = 0
      eosTimeLeft.current = 300
      for (let index = 0; index < 3; index += 1) {
        const block = document.getElementById(`ephase${index}`)
        block?.classList.remove('active', 'done-ph')
        const fill = document.getElementById(`ephfill${index}`) as HTMLElement | null
        if (fill) fill.style.width = '0'
        const phaseTimer = document.getElementById(`ephtime${index}`)
        if (phaseTimer) phaseTimer.textContent = '5:00'
      }
      document.getElementById('ephase0')?.classList.add('active')
      const clock = document.getElementById('eosClockDisplay')
      if (clock) clock.textContent = '15:00'
      const button = document.getElementById('eosStartBtn') as HTMLButtonElement | null
      if (button) {
        button.textContent = '▶ Bắt đầu'
        button.disabled = false
      }
      const message = document.getElementById('eosStatusMsg')
      if (message) message.textContent = 'Giai đoạn 1 / 3 · Nhấn Bắt đầu'
      const finished = document.getElementById('eosFinished') as HTMLElement | null
      if (finished) finished.style.display = 'none'
      document.querySelectorAll('.eos-check-item').forEach((item) => {
        item.classList.remove('ticked')
        item.querySelector('.eos-cb')?.classList.remove('ticked')
      })
    }
    window.eosToggle = (item: Element) => {
      item.querySelector('.eos-cb')?.classList.toggle('ticked')
      item.classList.toggle('ticked')
    }

    loadData()
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      if (eosInterval.current) clearInterval(eosInterval.current)
    }
  }, [autoSave, loadData, saveAll, selectSBU, showPage, showSection, showWorkbook, showWorkbookTab])

  useEffect(() => {
    applyPageClasses(activePage)
  }, [activePage, activeWorkbookTab])

  useEffect(() => {
    applyWorkbookClasses(activeWorkbookTab)
  }, [activeWorkbookTab])

  return {
    showPage,
    showSection,
    showWorkbook,
  }
}
