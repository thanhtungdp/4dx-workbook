import type { PageId } from '../../utils/navigation'

type WhirlwindCase = {
  name: string
  theme: string
  pains: string[]
  different: string[]
}

type WigSuggestion = {
  sbu: string
  focus: string
  from: string
  to: string
  deadline: string
  wig: string
  lead1: string
  lead2: string
}

const whirlwindCases: WhirlwindCase[] = [
  {
    name: 'SBU1 · Kinh doanh',
    theme: 'Nhóm chat, chạy số và xử lý phát sinh cuối kỳ',
    pains: [
      'Trả lời nhóm chat kinh doanh hằng ngày, khiếu nại khách hàng và các đơn hàng lệch quy chuẩn.',
      'Chạy số hằng ngày, hằng tháng; cuối tháng/cuối quý phải xử lý chính sách thêm rất nhanh.',
      'Xem Facebook, TikTok và các kênh bán hàng làm phân tán nhịp tập trung.',
    ],
    different: [
      'Thiết kế cơ chế giao tiếp công việc hiệu quả để giảm phụ thuộc nhóm chat.',
      'Chốt cơ chế làm việc trong các tuần đầu: ai phản hồi, phản hồi kênh nào, SLA bao lâu.',
    ],
  },
  {
    name: 'SBU1 · Phát triển sản phẩm',
    theme: 'Thông tin hàng hóa, lỗi sau bán và phối hợp nội bộ',
    pains: [
      'Hỗ trợ chăm sóc sau bán hàng, lỗi sản phẩm, tương tác DVK về chất lượng dịch vụ và giá cả.',
      'Lịch check hàng về với nhà cung cấp ảnh hưởng kế hoạch bán hàng nhưng thông tin chưa đủ rõ.',
      'Thông tin nội bộ về hàng hóa, kế hoạch, khiếu nại và hỗ trợ bán hàng đi vòng nhiều lần.',
    ],
    different: [
      'Build một hệ thống thống nhất nội bộ: hàng hóa, thông tin, kế hoạch và thông báo.',
      'Rà lại quy trình: quy trình nào còn đúng thì đưa lên hệ thống, quy trình nào lệch thì fix trước.',
    ],
  },
  {
    name: 'Khối vận hành',
    theme: 'Sự vụ nhân sự và sự vụ nằm ngoài quy trình',
    pains: [
      'Giải quyết khiếu nại, thắc mắc nhân sự và sự vụ phát sinh từ phòng ban khác.',
      'Nhiều sự vụ không nằm trong quy trình ban hành nên chiếm thời gian xử lý thủ công.',
    ],
    different: [
      'Đóng gói các sự vụ phát sinh ngoài quy trình thành nhóm vấn đề có mẫu xử lý.',
      'Cập nhật quy trình ban hành để giảm xử lý lại cùng một loại sự vụ.',
    ],
  },
  {
    name: 'SBU2 · Nexta',
    theme: 'Sự cố sale, câu hỏi lặp lại và thiếu trạng thái roadmap',
    pains: [
      'Sự cố cần giải quyết ngay lập tức cho sale; một vấn đề bị hỏi đi hỏi lại nhiều lần.',
      'Không biết cách xử lý hoặc xử lý không triệt để, CSKH thiếu câu trả lời ngắn hạn/dài hạn.',
      'Không kiểm soát rõ kết quả hoạt động các phòng ban, thêm áp lực công văn và biến động tỷ giá/lãi suất.',
    ],
    different: [
      'Đóng gói lỗi thường gặp thành thư viện Q&A và bot trả lời nhanh.',
      'Có hệ thống theo dõi roadmap ngắn hạn/dài hạn để CSKH trả lời ngay.',
    ],
  },
  {
    name: 'SBU3 · Massko',
    theme: 'Email, chuyên môn, ký hồ sơ và họp kéo dài',
    pains: [
      'Chat/email, việc chuyên môn phát sinh cần nhảy vào, trả lời câu hỏi từ Chủ tịch.',
      'Ký hồ sơ và các cuộc họp kéo dài hơn quy định làm đứt nhịp ưu tiên.',
    ],
    different: [
      'Dùng hệ thống 4DX để giao việc, daily meeting và nhịp họp đều.',
      'Xây guide R&D với AI để các bạn trong team tự nâng cấp thành lead.',
    ],
  },
]

const wigSuggestions: WigSuggestion[] = [
  {
    sbu: 'SBU1 · Kinh doanh',
    focus: 'Thiết kế cơ chế giao tiếp và làm việc trong các tuần đầu',
    from: 'chat phân tán, xử lý theo phản xạ',
    to: '90% việc đi đúng kênh/SLA',
    deadline: '30/06/2026',
    wig: 'Tăng tỷ lệ việc kinh doanh được tiếp nhận và xử lý đúng kênh/SLA từ trạng thái chat phân tán lên 90% trước 30/06/2026.',
    lead1: 'Thiết kế và chạy cơ chế phản hồi nhóm chat theo 2-3 khung giờ cố định mỗi ngày.',
    lead2: 'Mỗi tuần chuẩn hóa 5 tình huống giao tiếp lặp lại thành mẫu phản hồi, quy định kênh và người chịu trách nhiệm.',
  },
  {
    sbu: 'SBU1 · Kinh doanh PTSP',
    focus: 'Thống nhất thông tin hàng hóa, kế hoạch và quy trình nội bộ',
    from: 'thông tin phân tán',
    to: '100% thông tin có nguồn chung',
    deadline: '15/07/2026',
    wig: 'Tăng tỷ lệ thông tin hàng hóa, kế hoạch bán hàng và hướng xử lý nội bộ có nguồn chung từ phân tán lên 100% trước 15/07/2026.',
    lead1: 'Build một nguồn chung cho hàng hóa, thông tin, kế hoạch và thông báo nội bộ; cập nhật trạng thái mỗi ngày.',
    lead2: 'Mỗi tuần rà các quy trình đang dùng: quy trình còn đúng thì đưa lên hệ thống, quy trình lệch thì fix trước khi ban hành.',
  },
  {
    sbu: 'Khối vận hành',
    focus: 'Đóng gói sự vụ ngoài quy trình thành cách xử lý chuẩn',
    from: 'xử lý sự vụ thủ công',
    to: '80% sự vụ có mẫu xử lý',
    deadline: '31/07/2026',
    wig: 'Tăng tỷ lệ sự vụ phát sinh ngoài quy trình có mẫu xử lý chuẩn từ xử lý thủ công lên 80% trước 31/07/2026.',
    lead1: 'Mỗi tuần gom và phân loại các sự vụ ngoài quy trình theo nhóm nguyên nhân, phòng ban và mức độ lặp lại.',
    lead2: 'Mỗi tuần đóng gói/cập nhật tối thiểu 3 mẫu xử lý để đưa vào quy trình ban hành.',
  },
  {
    sbu: 'SBU2 · Nexta',
    focus: 'Xây bot Q&A và roadmap để CSKH trả lời nhanh',
    from: 'lỗi hỏi đi hỏi lại',
    to: '80% câu hỏi có câu trả lời chuẩn',
    deadline: '31/07/2026',
    wig: 'Tăng tỷ lệ lỗi và câu hỏi lặp lại của sale/CSKH có câu trả lời chuẩn từ xử lý từng vụ lên 80% trước 31/07/2026.',
    lead1: 'Mỗi tuần đóng gói 10 lỗi/câu hỏi lặp lại vào thư viện Q&A để huấn luyện bot trả lời nhanh.',
    lead2: 'Cập nhật roadmap ngắn hạn/dài hạn 2 lần/tuần để CSKH biết vấn đề nào đang xử lý, khi nào có câu trả lời.',
  },
  {
    sbu: 'SBU3 · Massko',
    focus: 'Dùng 4DX và guide AI để giảm phụ thuộc vào leader',
    from: 'leader phải nhảy vào từng việc',
    to: '70% việc có guide/nhịp xử lý',
    deadline: '31/07/2026',
    wig: 'Tăng tỷ lệ việc chuyên môn có guide hoặc nhịp xử lý rõ từ phụ thuộc leader lên 70% trước 31/07/2026.',
    lead1: 'Mỗi tuần tạo 3 guide R&D với AI cho câu hỏi chuyên môn lặp lại để giúp team từng bước trở thành lead.',
    lead2: 'Duy trì hệ thống 4DX để giao việc, daily meeting và họp đều, giảm họp kéo dài hoặc nhảy vào từng sự vụ.',
  },
]

type PostTrainingInsightsProps = {
  activePage: PageId
}

export function PostTrainingInsights({ activePage }: PostTrainingInsightsProps) {
  return (
    <>
      {activePage === 'whirlwind' ? (
        <section className="page post-training-page active" id="page-whirlwind-updated">
          <div className="gradient-bar"></div>
          <div className="page-eyebrow">Sau buổi đào tạo · Masscom thực tế</div>
          <h1 className="page-title">
            Cơn lốc
            <br />
            <strong>của từng đội</strong>
          </h1>
          <p className="page-subtitle">
            Các nhóm đã gọi tên rõ những việc đang cuốn mất thời gian: chat, sự cố, khiếu nại, quy trình thiếu, thông tin
            phân tán và họp kéo dài. 4DX bắt đầu từ việc nhìn thẳng vào cơn lốc này.
          </p>

          <div className="whirlwind-insight-grid">
            {whirlwindCases.map((item) => (
              <article className="whirlwind-insight-card" key={item.name}>
                <span>{item.name}</span>
                <h2>{item.theme}</h2>
                <div className="insight-columns">
                  <div>
                    <strong>Cơn lốc</strong>
                    <ul>
                      {item.pains.map((pain) => (
                        <li key={pain}>{pain}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Làm khác đi</strong>
                    <ul>
                      {item.different.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="highlight-box post-training-summary">
            <p>
              <strong>Mẫu số chung:</strong> các đội không thiếu nỗ lực, nhưng đang thiếu hệ thống gom việc lặp lại thành
              quy trình, dữ liệu chung, thư viện Q&A, roadmap và nhịp họp ngắn. Đây là chất liệu tốt để chuyển sang WIG.
            </p>
          </div>
        </section>
      ) : null}

      {activePage === 'wig-concept' ? (
        <section className="page post-training-page active" id="page-wig-concept-updated">
          <div className="gradient-bar"></div>
          <div className="page-eyebrow">Nguyên tắc 1 · Gợi ý từ cơn lốc Masscom</div>
          <h1 className="page-title">
            WIG
            <br />
            <strong>chọn trận đáng thắng</strong>
          </h1>
          <p className="page-subtitle">
            Từ phần “làm điều gì khác đi” sau đào tạo, mỗi đội có thể biến một điểm nghẽn vận hành thành WIG đủ hẹp,
            đo được và tạo khác biệt thật trong các tuần đầu.
          </p>

          <div className="wig-suggestion-grid">
            {wigSuggestions.map((item) => (
              <article className="wig-suggestion-card" key={item.sbu}>
                <div className="wig-suggestion-head">
                  <span>{item.sbu}</span>
                  <strong>{item.focus}</strong>
                </div>
                <div className="wig-suggestion-flow">
                  <span>{item.from}</span>
                  <i>→</i>
                  <span>{item.to}</span>
                  <small>Trước {item.deadline}</small>
                </div>
                <p>{item.wig}</p>
                <div className="wig-leads">
                  <div>
                    <strong>Lead #1</strong>
                    <span>{item.lead1}</span>
                  </div>
                  <div>
                    <strong>Lead #2</strong>
                    <span>{item.lead2}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="quote-block">
            <p>
              WIG tốt không phải là “làm thêm nhiều việc”. WIG tốt là chọn đúng một điểm nghẽn trong cơn lốc, biến nó
              thành mục tiêu đo được và tạo nhịp cam kết mỗi tuần.
            </p>
          </div>
        </section>
      ) : null}
    </>
  )
}
