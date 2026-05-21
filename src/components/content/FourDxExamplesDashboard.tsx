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
    name: 'SBU1',
    unit: 'Kinh doanh',
    wigTitle: 'Giảm nhiễu nhóm chat, chuẩn hóa xử lý việc bán hàng',
    wig: 'Tăng tỷ lệ yêu cầu kinh doanh được xử lý đúng kênh và đúng SLA từ tình trạng xử lý phát sinh thủ công lên 90% trước 30/06/2026',
    from: 'thủ công',
    to: '90% SLA',
    deadline: '30/06/2026',
    achievement: '42%',
    status: 'Nhóm chat và khiếu nại vẫn chiếm nhiều thời gian',
    leadTitle: 'Triage việc + đóng gói tình huống lặp',
    lead1Target: 'Triage nhóm chat/ngày · KH 2 khung giờ',
    lead2Target: 'Tình huống lặp đóng gói/tuần · KH 5',
    lagTitle: 'Yêu cầu đúng kênh/SLA · KH 90%',
    topPerformer: 'Nhóm KD',
    topResult: '2/2 khung triage · 5 mẫu',
    coachNote: 'Cơn lốc chính là chat, chạy số, khiếu nại và đơn cuối kỳ. Lead phải giảm nhiễu vận hành, không chỉ cố trả lời nhanh hơn.',
    rows: [
      { name: 'Triage chat', lead1: '10/10', lead2: '5/5', lag: '68%', rating: 'ĐỈNH' },
      { name: 'Khiếu nại', lead1: '8/10', lead2: '4/5', lag: '61%', rating: 'ĐẠT' },
      { name: 'Đơn cuối kỳ', lead1: '6/10', lead2: '2/5', lag: '44%', rating: 'ĐƯỢC' },
      { name: 'Kênh MXH', lead1: '3/10', lead2: '1/5', lag: '25%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên cơn lốc sau đào tạo: trả lời nhóm chat, chạy số hằng ngày, khiếu nại khách hàng và xử lý đơn không đúng quy chuẩn cuối tháng/quý.',
  },
  {
    number: 2,
    name: 'Nexta',
    unit: 'Lớp học thông minh',
    wigTitle: 'Đóng gói lỗi sale/CSKH thành Q&A xử lý nhanh',
    wig: 'Tăng tỷ lệ lỗi sale/CSKH có câu trả lời chuẩn từ chưa có thư viện Q&A lên 80% trước 31/07/2026',
    from: '0 Q&A',
    to: '80%',
    deadline: '31/07/2026',
    achievement: '28%',
    status: 'Vấn đề bị hỏi lại nhiều lần, xử lý chưa triệt để',
    leadTitle: 'Thư viện Q&A + roadmap trạng thái',
    lead1Target: 'Lỗi/câu hỏi đóng gói/tuần · KH 10',
    lead2Target: 'Cập nhật roadmap/tuần · KH 2',
    lagTitle: 'Sự cố có câu trả lời chuẩn · KH 80%',
    topPerformer: 'CSKH Nexta',
    topResult: '12/10 Q&A · 2 roadmap',
    coachNote: 'Cơn lốc Nexta không chỉ là sự cố, mà là cùng một vấn đề được hỏi lại. Lead đúng là biến sự cố thành tài sản dùng lại.',
    rows: [
      { name: 'Lỗi sale', lead1: '12/10', lead2: '2/2', lag: '36%', rating: 'ĐỈNH' },
      { name: 'CSKH', lead1: '9/10', lead2: '2/2', lag: '31%', rating: 'ĐẠT' },
      { name: 'Roadmap', lead1: '6/10', lead2: '1/2', lag: '24%', rating: 'ĐƯỢC' },
      { name: 'Công văn', lead1: '2/10', lead2: '0/2', lag: '12%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên ghi nhận sau đào tạo: sự cố cần xử lý ngay, lỗi lặp lại, không biết cách xử lý, roadmap thiếu trạng thái khiến CSKH khó trả lời.',
  },
  {
    number: 3,
    name: 'SBU3',
    unit: 'Massko',
    wigTitle: 'Giảm phụ thuộc chuyên môn vào leader',
    wig: 'Tăng tỷ lệ việc chuyên môn có guide để team tự xử lý từ phụ thuộc leader lên 70% trước 31/07/2026',
    from: 'phụ thuộc',
    to: '70% tự xử lý',
    deadline: '31/07/2026',
    achievement: '33%',
    status: 'Leader vẫn bị kéo vào chat/email, ký hồ sơ, hỏi chuyên môn',
    leadTitle: 'Guide R&D AI + nhịp họp 4DX',
    lead1Target: 'Guide chuyên môn/tuần · KH 3',
    lead2Target: 'Daily + họp 4DX đúng giờ/tuần · KH 5+1',
    lagTitle: 'Việc tự xử lý theo guide · KH 70%',
    topPerformer: 'R&D Massko',
    topResult: '4/3 guide · họp đúng nhịp',
    coachNote: 'Massko cần biến câu hỏi lặp lại thành guide và dùng nhịp họp ngắn để giảm việc leader phải nhảy vào từng sự vụ.',
    rows: [
      { name: 'R&D guide', lead1: '4/3', lead2: '6/6', lag: '40%', rating: 'ĐỈNH' },
      { name: 'Chuyên môn', lead1: '3/3', lead2: '5/6', lag: '34%', rating: 'ĐẠT' },
      { name: 'Ký hồ sơ', lead1: '2/3', lead2: '4/6', lag: '27%', rating: 'ĐƯỢC' },
      { name: 'Họp kéo dài', lead1: '1/3', lead2: '2/6', lag: '16%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên ghi nhận sau đào tạo: chat/email, việc chuyên môn, trả lời câu hỏi Chủ tịch, ký hồ sơ và họp kéo dài hơn quy định.',
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
