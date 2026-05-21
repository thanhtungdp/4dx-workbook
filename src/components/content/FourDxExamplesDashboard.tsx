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
    wigTitle: 'Thiết kế cơ chế giao tiếp và làm việc trong các tuần đầu',
    wig: 'Tăng tỷ lệ việc kinh doanh được tiếp nhận và xử lý đúng kênh/SLA từ trạng thái chat phân tán lên 90% trước 30/06/2026',
    from: 'chat phân tán',
    to: '90% đúng SLA',
    deadline: '30/06/2026',
    achievement: '42%',
    status: 'Nhóm chat, khiếu nại và việc cuối kỳ vẫn kéo đội vào phản xạ xử lý nhanh',
    leadTitle: 'Khung phản hồi + mẫu giao tiếp chuẩn',
    lead1Target: 'Khung phản hồi nhóm chat/ngày · KH 3',
    lead2Target: 'Mẫu tình huống giao tiếp/tuần · KH 5',
    lagTitle: 'Việc đi đúng kênh/SLA · KH 90%',
    topPerformer: 'Nhóm KD Thạch',
    topResult: '3/3 khung phản hồi · 5 mẫu',
    coachNote: 'WIG này không yêu cầu team trả lời nhiều hơn, mà thiết kế lại cơ chế giao tiếp để giảm nhóm chat và giảm xử lý theo phản xạ.',
    rows: [
      { name: 'Nhóm chat KD', lead1: '15/15', lead2: '5/5', lag: '68%', rating: 'ĐỈNH' },
      { name: 'Khiếu nại', lead1: '13/15', lead2: '4/5', lag: '61%', rating: 'ĐẠT' },
      { name: 'Đơn cuối kỳ', lead1: '9/15', lead2: '2/5', lag: '44%', rating: 'ĐƯỢC' },
      { name: 'Kênh FB/TikTok', lead1: '5/15', lead2: '1/5', lag: '25%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên cơn lốc sau đào tạo: trả lời nhóm chat kinh doanh, chạy số hằng ngày, xử lý khiếu nại, đơn lệch quy chuẩn cuối tháng/quý và nhiễu từ Facebook/TikTok.',
  },
  {
    number: 2,
    name: 'Nexta',
    unit: 'Lớp học thông minh',
    wigTitle: 'Xây bot Q&A và roadmap để CSKH trả lời nhanh',
    wig: 'Tăng tỷ lệ lỗi và câu hỏi lặp lại của sale/CSKH có câu trả lời chuẩn từ xử lý từng vụ lên 80% trước 31/07/2026',
    from: 'xử lý từng vụ',
    to: '80% có Q&A',
    deadline: '31/07/2026',
    achievement: '28%',
    status: 'Một vấn đề bị hỏi lại nhiều lần, sale/CSKH thiếu câu trả lời thống nhất',
    leadTitle: 'Đóng gói lỗi + cập nhật roadmap',
    lead1Target: 'Lỗi/câu hỏi vào thư viện Q&A/tuần · KH 10',
    lead2Target: 'Cập nhật roadmap ngắn hạn/dài hạn/tuần · KH 2',
    lagTitle: 'Câu hỏi có câu trả lời chuẩn · KH 80%',
    topPerformer: 'CSKH Nexta',
    topResult: '12/10 Q&A · roadmap 2 lần',
    coachNote: 'Lead đúng của Nexta là biến lỗi lặp lại thành tài sản dùng lại: Q&A cho bot và roadmap đủ rõ để CSKH trả lời ngay.',
    rows: [
      { name: 'Lỗi sale', lead1: '12/10', lead2: '2/2', lag: '36%', rating: 'ĐỈNH' },
      { name: 'CSKH', lead1: '9/10', lead2: '2/2', lag: '31%', rating: 'ĐẠT' },
      { name: 'Roadmap', lead1: '6/10', lead2: '1/2', lag: '24%', rating: 'ĐƯỢC' },
      { name: 'Công văn', lead1: '2/10', lead2: '0/2', lag: '12%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên ghi nhận sau đào tạo: sự cố cần xử lý ngay, vấn đề hỏi đi hỏi lại, không biết cách xử lý, xử lý chưa triệt để và thiếu roadmap cho câu trả lời ngắn hạn/dài hạn.',
  },
  {
    number: 3,
    name: 'SBU3',
    unit: 'Massko',
    wigTitle: 'Dùng 4DX và guide AI để giảm phụ thuộc vào leader',
    wig: 'Tăng tỷ lệ việc chuyên môn có guide hoặc nhịp xử lý rõ từ phụ thuộc leader lên 70% trước 31/07/2026',
    from: 'leader xử lý',
    to: '70% có guide',
    deadline: '31/07/2026',
    achievement: '33%',
    status: 'Leader vẫn bị kéo vào chat/email, việc chuyên môn, ký hồ sơ và họp kéo dài',
    leadTitle: 'Guide R&D với AI + hệ thống 4DX',
    lead1Target: 'Guide R&D/AI cho câu hỏi lặp/tuần · KH 3',
    lead2Target: 'Daily meeting + họp 4DX đúng nhịp/tuần · KH 5+1',
    lagTitle: 'Việc có guide/nhịp xử lý rõ · KH 70%',
    topPerformer: 'R&D Massko',
    topResult: '4/3 guide · 6/6 nhịp họp',
    coachNote: 'Massko cần dùng 4DX để giao việc, giữ daily meeting đều và biến câu hỏi chuyên môn lặp lại thành guide R&D với AI.',
    rows: [
      { name: 'R&D guide', lead1: '4/3', lead2: '6/6', lag: '40%', rating: 'ĐỈNH' },
      { name: 'Chuyên môn', lead1: '3/3', lead2: '5/6', lag: '34%', rating: 'ĐẠT' },
      { name: 'Ký hồ sơ', lead1: '2/3', lead2: '4/6', lag: '27%', rating: 'ĐƯỢC' },
      { name: 'Họp kéo dài', lead1: '1/3', lead2: '2/6', lag: '16%', rating: 'ĐUỐI' },
    ],
    detail:
      'Dựa trên ghi nhận sau đào tạo: chat/email, việc chuyên môn cần nhảy vào, trả lời câu hỏi Chủ tịch, ký hồ sơ và họp kéo dài hơn quy định.',
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
        Mỗi example bám theo WIG sau đào tạo: điểm nghẽn vận hành, Lead/Lag, bảng điểm, top performance và nhịp họp.
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
