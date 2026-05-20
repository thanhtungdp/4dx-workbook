import type { CSSProperties } from 'react'
import type { PageId } from '../../utils/navigation'

type ScoreRow = {
  name: string
  lead1: string
  lead2: string
  lag: string
  rating: 'ĐỈNH' | 'ĐẠT' | 'ĐƯỢC' | 'ĐUỐI'
}

type FourDxExample = {
  number: number
  name: string
  unit: string
  wigTitle: string
  wig: string
  from: string
  to: string
  deadline: string
  achievement: string
  status: string
  leadTitle: string
  lead1Target: string
  lead2Target: string
  lagTitle: string
  topPerformer: string
  topResult: string
  coachNote: string
  rows: ScoreRow[]
  detail: string
}

type DonutStyle = CSSProperties & {
  '--pct': string
}

const fourDxExamples: FourDxExample[] = [
  {
    number: 1,
    name: 'Masstel',
    unit: 'Feature Phone & Kid',
    wigTitle: 'Tăng doanh thu FP & Kid',
    wig: 'Tăng doanh thu FP & Kid từ 227 tỷ (T1-T4) lên 650 tỷ kế hoạch năm trước 31/12/2026',
    from: '227 tỷ',
    to: '650 tỷ',
    deadline: '31/12/2026',
    achievement: '35%',
    status: 'Cần tăng tốc kênh Master + KA',
    leadTitle: 'Điểm bán + training đại lý',
    lead1Target: 'Điểm bán ghé thăm/tuần · KH 15',
    lead2Target: 'Đại lý training/tuần · KH 3',
    lagTitle: 'Sản lượng FP/tháng · KH 28k máy',
    topPerformer: 'Minh Tuấn',
    topResult: '16/15 điểm bán · 310M',
    coachNote: 'Thu Hà đang ĐUỐI: ít điểm bán FP tại Miền Trung. Cần bóc rào cản địa lý hay kênh đại lý nhỏ.',
    rows: [
      { name: 'Minh Tuấn', lead1: '16/15', lead2: '3/3', lag: '310M', rating: 'ĐỈNH' },
      { name: 'Quang Hùng', lead1: '13/15', lead2: '3/3', lag: '255M', rating: 'ĐƯỢC' },
      { name: 'Thu Hà', lead1: '8/15', lead2: '1/3', lag: '140M', rating: 'ĐUỐI' },
      { name: 'Thanh Sơn', lead1: '15/15', lead2: '2/3', lag: '270M', rating: 'ĐẠT' },
    ],
    detail:
      'Lead Measures lấy từ slide 53 và bảng check-in slide 72: thăm điểm bán, training đại lý, push KPI FP & Kid, giao hàng đúng hạn và xử lý bảo hành trong 24h.',
  },
  {
    number: 2,
    name: 'Nexta',
    unit: 'Lớp học thông minh',
    wigTitle: 'Tăng doanh thu Nexta',
    wig: 'Tăng doanh thu Nexta từ 4,9 tỷ/tháng lên 11,3 tỷ/quý, hoàn thành 75 tỷ kế hoạch năm trước 31/12/2026',
    from: '4,9 tỷ/th',
    to: '75 tỷ/năm',
    deadline: '31/12/2026',
    achievement: '59%',
    status: 'CRM hiện mới đạt 59%',
    leadTitle: 'Demo BGH + CRM 100%',
    lead1Target: 'Demo/gặp BGH/tuần · KH 3',
    lead2Target: 'Đề xuất gửi Sở/Phòng GD · KH 2',
    lagTitle: 'Trường ký HĐ tháng · KH 3',
    topPerformer: 'Lan Anh',
    topResult: '4/3 demo · 4 trường',
    coachNote: 'Minh Châu Đà Nẵng: demo ít + CRM 0% dẫn tới 0 HĐ. Lead là gốc rễ cần xử lý trước.',
    rows: [
      { name: 'Lan Anh', lead1: '4/3', lead2: '2/2', lag: '4 trường', rating: 'ĐỈNH' },
      { name: 'Văn Khoa', lead1: '2/3', lead2: '2/2', lag: '2 trường', rating: 'ĐƯỢC' },
      { name: 'Minh Châu', lead1: '1/3', lead2: '0/2', lag: '0 trường', rating: 'ĐUỐI' },
      { name: 'Hoàng Nam', lead1: '3/3', lead2: '1/2', lag: '2 trường', rating: 'ĐẠT' },
    ],
    detail:
      'Từ slide 54, 58, 73: demo đủ BGH, đề xuất hợp đồng, tập huấn giáo viên, chăm sóc sau ký và CRM cập nhật đúng hạn target 100%.',
  },
  {
    number: 3,
    name: 'Massko | Joystar',
    unit: 'AI Camera · Robot AI',
    wigTitle: 'Bán máy mới + giải phóng tồn',
    wig: 'Bán 10.000 máy mới (AI Camera, Robot AI) + 3.800 tồn kho, đạt 31,5 tỷ kế hoạch năm trước 31/12/2026',
    from: '3.800 tồn',
    to: '31,5 tỷ',
    deadline: '31/12/2026',
    achievement: '38%',
    status: 'Tập trung đối tác TT Anh ngữ / VTT',
    leadTitle: 'Đối tác + demo kênh B2B',
    lead1Target: 'Đối tác TT Anh ngữ mới/tuần · KH 5',
    lead2Target: 'Máy mới demo qua đối tác/tuần · KH 20',
    lagTitle: 'Máy mới bán/tuần · KH 350',
    topPerformer: 'Ngọc Linh',
    topResult: '32/30 lead online · 38%',
    coachNote: 'Hồng Nhung TikTok: tiếp cận đối tác ít, máy mới không vào kênh, doanh thu thấp. Lead quyết định tất cả.',
    rows: [
      { name: 'Ngọc Linh', lead1: '32/30', lead2: '12/10', lag: '38%', rating: 'ĐỈNH' },
      { name: 'Bảo Châu', lead1: '25/30', lead2: '10/10', lag: '28%', rating: 'ĐƯỢC' },
      { name: 'Hồng Nhung', lead1: '10/30', lead2: '3/10', lag: '18%', rating: 'ĐUỐI' },
      { name: 'Trọng Nhân', lead1: '30/30', lead2: '7/10', lag: '32%', rating: 'ĐẠT' },
    ],
    detail:
      'Từ slide 55 và 74: kênh đối tác TT Anh ngữ/VTT cho 7.000 máy, online B2C cho 3.000 máy, đồng thời giải phóng 3.800 máy tồn kho.',
  },
]

type FourDxExamplesDashboardProps = {
  activePage: PageId
}

function ratingClass(rating: ScoreRow['rating']) {
  if (rating === 'ĐỈNH') return 'peak'
  if (rating === 'ĐẠT') return 'good'
  if (rating === 'ĐƯỢC') return 'watch'
  return 'risk'
}

export function FourDxExamplesDashboard({ activePage }: FourDxExamplesDashboardProps) {
  if (activePage !== 'examples') return null

  return (
    <section className="page examples-dashboard-page active" id="page-examples" aria-label="Example 4DX dashboard">
      <div className="gradient-bar"></div>
      <div className="page-eyebrow">Cuối chương trình · Dashboard mẫu</div>
      <h1 className="page-title">
        Example 4DX
        <br />
        <strong>3 case trên một trang</strong>
      </h1>
      <p className="page-subtitle">
        Mỗi example trình bày như một bảng điều hành: WIG, Lead/Lag, bảng điểm, top performance và nhịp họp.
      </p>

      <div className="examples-dashboard-grid">
        {fourDxExamples.map((example) => (
          <article className="fourdx-board" key={example.name}>
            <div className="fourdx-board-title">
              <span>Example #{example.number}</span>
              <strong>{example.name}</strong>
              <small>{example.unit}</small>
            </div>

            <div className="fourdx-board-wig">
              <div>
                <div className="fourdx-label">WIG · Mục tiêu tối quan trọng</div>
                <h2>{example.wigTitle}</h2>
                <p>{example.wig}</p>
              </div>
              <div className="fourdx-target-flow">
                <span>{example.from}</span>
                <i>→</i>
                <span>{example.to}</span>
                <small>Trước {example.deadline}</small>
              </div>
            </div>

            <div className="fourdx-board-body">
              <div className="fourdx-kpi-panel">
                <div className="fourdx-label">Tỷ lệ / trạng thái</div>
                <div className="fourdx-kpi-number">{example.achievement}</div>
                <div className="fourdx-donut" style={{ '--pct': example.achievement } as DonutStyle}>
                  <span>{example.achievement}</span>
                </div>
                <p>{example.status}</p>
              </div>

              <div className="fourdx-lead-panel">
                <div className="fourdx-label">Lead & Lag</div>
                <h3>{example.leadTitle}</h3>
                <div className="fourdx-lead-list">
                  <span>{example.lead1Target}</span>
                  <span>{example.lead2Target}</span>
                  <span>{example.lagTitle}</span>
                </div>
              </div>

              <div className="fourdx-table-panel">
                <div className="fourdx-label">Bảng điểm tuần</div>
                <table className="fourdx-score-table">
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
                    {example.rows.map((row) => (
                      <tr key={row.name}>
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
              </div>

              <aside className="fourdx-top-panel">
                <div className="fourdx-label">Top performance</div>
                <div className="fourdx-medal">1</div>
                <strong>{example.topPerformer}</strong>
                <span>{example.topResult}</span>
                <div className="fourdx-label meeting-label">Cách họp WIG</div>
                <p>15 phút/tuần: báo cáo cam kết cũ, nhìn scoreboard, chốt cam kết mới.</p>
              </aside>
            </div>

            <details className="fourdx-drilldown">
              <summary>Drill down</summary>
              <p>
                <strong>Coach note:</strong> {example.coachNote}
              </p>
              <p>{example.detail}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}
