import type { PageId } from '../../utils/navigation'

type FourDxExample = {
  name: string
  unit: string
  wig: {
    metric: string
    from: string
    to: string
    deadline: string
  }
  leadLag: {
    lead1: string
    lead2: string
    lag: string
  }
  scoreboard: {
    primary: string
    secondary: string
    status: string
  }
  cadence: {
    rhythm: string
    owner: string
    commitment: string
  }
  detail: string
}

const fourDxExamples: FourDxExample[] = [
  {
    name: 'Nexta',
    unit: 'EdTech · Lớp học thông minh',
    wig: {
      metric: 'Demo BGH đủ chuẩn',
      from: '18',
      to: '80',
      deadline: '30/09/2026',
    },
    leadLag: {
      lead1: '3 demo BGH / sale / tuần',
      lead2: '100% cơ hội CRM có next step',
      lag: 'Số trường ký mới',
    },
    scoreboard: {
      primary: '59%',
      secondary: 'CRM hoàn chỉnh',
      status: 'Đang cần kéo nhịp demo',
    },
    cadence: {
      rhythm: 'Thứ Hai · 08:30',
      owner: 'Trưởng nhóm Sales',
      commitment: 'Mỗi sale chốt 3 lịch demo mới trước thứ Sáu',
    },
    detail:
      'Case này dùng khi team có pipeline nhưng hành vi đầu vào chưa đủ đều: demo BGH, cập nhật CRM, follow-up sau demo.',
  },
  {
    name: 'Masstel',
    unit: 'Feature Phone & Kid',
    wig: {
      metric: 'Doanh thu FP & Kid',
      from: '227 tỷ',
      to: '650 tỷ',
      deadline: '31/12/2026',
    },
    leadLag: {
      lead1: '25 đại lý trọng điểm / tuần',
      lead2: '8 điểm trưng bày đạt chuẩn / ASM',
      lag: 'Doanh thu sell-out',
    },
    scoreboard: {
      primary: '35%',
      secondary: 'tiến độ WIG',
      status: 'Cần tăng tốc kênh Master + KA',
    },
    cadence: {
      rhythm: 'Thứ Ba · 09:00',
      owner: 'Giám đốc Kênh',
      commitment: 'ASM cam kết danh sách điểm bán và ảnh trưng bày tuần',
    },
    detail:
      'Case này phù hợp với đội bán hàng phân phối: scoreboard phải làm rõ ai đang tạo hoạt động tại điểm bán, không chỉ nhìn doanh thu cuối tháng.',
  },
  {
    name: 'Massko · Joystar',
    unit: 'AI Camera & Robot',
    wig: {
      metric: 'Tồn kho Joystar',
      from: '3.800 máy',
      to: '< 800 máy',
      deadline: '31/10/2026',
    },
    leadLag: {
      lead1: '10 đối tác TT Anh ngữ / tuần',
      lead2: '6 buổi demo robot / tuần',
      lag: 'Số máy bán ra',
    },
    scoreboard: {
      primary: '3.000',
      secondary: 'máy cần giải phóng',
      status: 'Tập trung B2B trước online',
    },
    cadence: {
      rhythm: 'Thứ Năm · 15:00',
      owner: 'Lead Massko',
      commitment: 'Chốt 2 đối tác thử nghiệm và 1 chương trình demo/tuần',
    },
    detail:
      'Case này cho thấy WIG không nhất thiết là tăng. Giảm tồn kho cũng là WIG nếu nó là mục tiêu tối quan trọng, đo được và có nhịp thực thi.',
  },
]

type FourDxExamplesDashboardProps = {
  activePage: PageId
}

export function FourDxExamplesDashboard({ activePage }: FourDxExamplesDashboardProps) {
  if (activePage !== 'examples') return null

  return (
    <section className="examples-dashboard-page" aria-label="Example 4DX dashboard">
      <div className="gradient-bar"></div>
      <div className="page-eyebrow">Dashboard · 4DX Examples</div>
      <h1 className="page-title">
        3 case 4DX
        <br />
        <strong>nhìn gọn trên một trang</strong>
      </h1>
      <p className="page-subtitle">
        Mỗi case trình bày đủ 4 phần: Mục tiêu tối quan trọng, Lead & Lag, Bảng điểm và Cách họp WIG.
      </p>

      <div className="examples-dashboard-grid">
        {fourDxExamples.map((example) => (
          <article className="fourdx-case-card" key={example.name}>
            <div className="fourdx-case-head">
              <div>
                <span>{example.unit}</span>
                <strong>{example.name}</strong>
              </div>
              <div className="fourdx-score">
                <b>{example.scoreboard.primary}</b>
                <small>{example.scoreboard.secondary}</small>
              </div>
            </div>

            <div className="fourdx-wig-strip">
              <div className="fourdx-label">1 · Mục tiêu tối quan trọng</div>
              <div className="fourdx-metric">{example.wig.metric}</div>
              <div className="fourdx-number-flow">
                <span>{example.wig.from}</span>
                <i>→</i>
                <span>{example.wig.to}</span>
              </div>
              <div className="fourdx-deadline">Trước {example.wig.deadline}</div>
            </div>

            <div className="fourdx-section-grid">
              <div className="fourdx-mini-block">
                <div className="fourdx-label">2 · Lead & Lag</div>
                <p>
                  <strong>Lead:</strong> {example.leadLag.lead1}
                </p>
                <p>
                  <strong>Lead:</strong> {example.leadLag.lead2}
                </p>
                <p>
                  <strong>Lag:</strong> {example.leadLag.lag}
                </p>
              </div>

              <div className="fourdx-mini-block">
                <div className="fourdx-label">3 · Bảng điểm</div>
                <p className="fourdx-status">{example.scoreboard.status}</p>
                <div className="fourdx-scorebar">
                  <span style={{ width: example.scoreboard.primary.includes('%') ? example.scoreboard.primary : '62%' }}></span>
                </div>
              </div>

              <div className="fourdx-mini-block wide">
                <div className="fourdx-label">4 · Cách họp</div>
                <div className="fourdx-meeting-row">
                  <span>{example.cadence.rhythm}</span>
                  <span>{example.cadence.owner}</span>
                </div>
                <p>{example.cadence.commitment}</p>
              </div>
            </div>

            <details className="fourdx-drilldown">
              <summary>Drill down</summary>
              <p>{example.detail}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}
