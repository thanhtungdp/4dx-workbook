import { useEffect, useMemo, useState } from 'react'
import { readWorkbook, type WorkbookData } from '../../storage/workbookStorage'
import type { PageId } from '../../utils/navigation'

type WorkbookOnePagePreviewProps = {
  activePage: PageId
}

type Rating = 'ĐỈNH' | 'ĐẠT' | 'ĐƯỢC' | 'ĐUỐI' | '—'

const emptyRows = [
  ['Thành viên 1', '0', '0', '0', '—'],
  ['Thành viên 2', '0', '0', '0', '—'],
  ['Thành viên 3', '0', '0', '0', '—'],
]

function value(data: WorkbookData | null, key: string, fallback = '—') {
  const raw = data?.[key]
  return typeof raw === 'string' && raw.trim() ? raw.trim() : fallback
}

function completionScore(data: WorkbookData | null) {
  if (!data) return 0
  let completed = 0
  if (value(data, 'wig-x', '') && value(data, 'wig-y', '')) completed += 1
  if (value(data, 'why1', '') && value(data, 'why5', '')) completed += 1
  if (value(data, 'lm1-desc', '') && value(data, 'lm2-desc', '')) completed += 1
  if (value(data, 'sb-lm1-name', '') && value(data, 'sb-wig', '')) completed += 1
  return completed
}

function ratingClass(rating: string) {
  if (rating === 'ĐỈNH') return 'peak'
  if (rating === 'ĐẠT') return 'good'
  if (rating === 'ĐƯỢC') return 'watch'
  if (rating === 'ĐUỐI') return 'risk'
  return 'neutral'
}

function getRows(data: WorkbookData | null) {
  const rows = Array.isArray(data?.['sb-rows']) && data['sb-rows'].length > 0 ? data['sb-rows'] : emptyRows
  return rows.slice(0, 4).map((row) => ({
    name: row[0] || '—',
    lead1: row[1] || '—',
    lead2: row[2] || '—',
    lag: row[3] || '—',
    rating: (row[4] || '—') as Rating,
  }))
}

export function WorkbookOnePagePreview({ activePage }: WorkbookOnePagePreviewProps) {
  const [data, setData] = useState<WorkbookData | null>(() => readWorkbook())

  useEffect(() => {
    const sync = () => setData(readWorkbook())
    window.addEventListener('workbook:updated', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('workbook:updated', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const preview = useMemo(() => {
    const metric = value(data, 'wig-metric', 'chỉ số trọng yếu')
    const from = value(data, 'wig-x', 'X')
    const to = value(data, 'wig-y', 'Y')
    const deadline = value(data, 'wig-z', 'Z')
    const lead1Name = value(data, 'sb-lm1-name', value(data, 'lm1-desc', 'Lead Measure #1'))
    const lead2Name = value(data, 'sb-lm2-name', value(data, 'lm2-desc', 'Lead Measure #2'))

    return {
      completion: completionScore(data),
      sbu: value(data, 'sb-sbu', value(data, 'wb-name', 'SBU của bạn')),
      wig: value(data, 'sb-wig', `Tăng ${metric} từ ${from} đến ${to} trước ${deadline}`),
      metric,
      from,
      to,
      deadline,
      lead1Name,
      lead1Target: value(data, 'sb-lm1-target', value(data, 'lm1-target', 'Target / tuần')),
      lead1Owner: value(data, 'sb-lm1-owner', value(data, 'lm1-owner', 'Owner')),
      lead2Name,
      lead2Target: value(data, 'sb-lm2-target', value(data, 'lm2-target', 'Target / tuần')),
      lead2Owner: value(data, 'sb-lm2-owner', value(data, 'lm2-owner', 'Owner')),
      lagName: value(data, 'sb-lag-name', 'Lag Measure'),
      lagTarget: value(data, 'sb-lag-target', 'Kế hoạch'),
      week: value(data, 'sb-week', 'Tuần triển khai'),
      meetingDay: value(data, 'wb-wig-day', 'Ngày họp cố định'),
      meetingTime: value(data, 'wb-wig-time', 'Giờ họp · Người dẫn'),
      updateWho: value(data, 'sb-update-who', 'Người cập nhật'),
      updateWhen: value(data, 'sb-update-when', 'Thời điểm cập nhật'),
      commit1: value(data, 'commit-lm1', 'Cam kết Lead #1 tuần đầu'),
      commit2: value(data, 'commit-lm2', 'Cam kết Lead #2 tuần đầu'),
      rows: getRows(data),
    }
  }, [data])

  if (activePage !== 'workbook-preview') return null

  return (
    <section className="page workbook-preview-page active" id="page-workbook-preview" aria-label="Preview workbook 4DX">
      <div className="gradient-bar"></div>
      <div className="preview-board">
        <div className="preview-board-title">
          <span>Workbook Preview</span>
          <strong>{preview.sbu}</strong>
          <small>{preview.completion}/4 tờ hoàn thiện</small>
        </div>

        <div className="preview-wig-band">
          <div>
            <div className="fourdx-label">WIG · Mục tiêu tối quan trọng</div>
            <h1>{preview.wig}</h1>
          </div>
          <div className="preview-target-flow">
            <span>{preview.from}</span>
            <i>→</i>
            <span>{preview.to}</span>
            <small>Trước {preview.deadline}</small>
          </div>
        </div>

        <div className="preview-body">
          <section className="preview-kpi-panel">
            <div className="fourdx-label">Tiến độ workbook</div>
            <div className="preview-kpi-number">{preview.completion}/4</div>
            <p>{preview.metric}</p>
            <button type="button" onClick={() => window.showWorkbook(0)}>
              Chỉnh workbook
            </button>
          </section>

          <section className="preview-leads-panel">
            <div className="fourdx-label">Lead & Lag</div>
            <div className="preview-lead-list">
              <article>
                <span>Lead #1</span>
                <strong>{preview.lead1Name}</strong>
                <small>
                  {preview.lead1Target} · {preview.lead1Owner}
                </small>
              </article>
              <article>
                <span>Lead #2</span>
                <strong>{preview.lead2Name}</strong>
                <small>
                  {preview.lead2Target} · {preview.lead2Owner}
                </small>
              </article>
              <article className="lag">
                <span>Lag</span>
                <strong>{preview.lagName}</strong>
                <small>{preview.lagTarget}</small>
              </article>
            </div>
          </section>

          <section className="preview-score-panel">
            <div className="fourdx-label">Bảng điểm tuần · {preview.week}</div>
            <table className="fourdx-score-table preview-score-table">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Lead #1</th>
                  <th>Lead #2</th>
                  <th>Lag</th>
                  <th>4Đ</th>
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row, index) => (
                  <tr key={`${row.name}-${index}`}>
                    <td>{row.name}</td>
                    <td>{row.lead1}</td>
                    <td>{row.lead2}</td>
                    <td>{row.lag}</td>
                    <td>
                      <span className={`fourdx-rating ${ratingClass(row.rating)}`}>{row.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside className="preview-meeting-panel">
            <div className="fourdx-label">Nhịp họp định kỳ</div>
            <strong>{preview.meetingDay}</strong>
            <span>{preview.meetingTime}</span>
            <div className="fourdx-label meeting-label">Cập nhật bảng điểm</div>
            <p>
              {preview.updateWho}
              <br />
              {preview.updateWhen}
            </p>
          </aside>
        </div>

        <div className="preview-commit-row">
          <div>
            <span>Cam kết tuần đầu</span>
            <strong>{preview.commit1}</strong>
          </div>
          <div>
            <span>Cam kết tiếp theo</span>
            <strong>{preview.commit2}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
