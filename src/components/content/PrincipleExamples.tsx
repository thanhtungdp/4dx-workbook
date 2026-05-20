import type { PageId } from '../../utils/navigation'

type ExampleItem = {
  title: string
  context: string
  detail: string
}

const principleExamples: Partial<Record<PageId, { eyebrow: string; title: string; examples: ExampleItem[] }>> = {
  'wig-concept': {
    eyebrow: 'Example · Nguyên tắc 1',
    title: '3 ví dụ WIG đúng chuẩn',
    examples: [
      {
        title: 'Masstel · Doanh thu Feature Phone',
        context: 'Tăng doanh thu FP & Kid từ 227 tỷ lên 650 tỷ trước 31/12/2026.',
        detail: 'X, Y, Z đều rõ; mục tiêu đủ lớn để buộc team thay đổi cách bán qua Master, KA và kênh trực tiếp.',
      },
      {
        title: 'Nexta · CRM & demo trường học',
        context: 'Tăng số trường demo BGH đủ chuẩn từ 18 lên 80 trường trước 30/09/2026.',
        detail: 'Không viết chung chung “tăng khách hàng”; WIG đo đúng điểm nghẽn trong chuỗi bán hàng EdTech.',
      },
      {
        title: 'Massko · Giải phóng tồn kho',
        context: 'Giảm tồn Joystar từ 3.800 máy xuống dưới 800 máy trước 31/10/2026.',
        detail: 'WIG có thể là giảm, không chỉ tăng; miễn là nó là mục tiêu tối quan trọng và có deadline cụ thể.',
      },
    ],
  },
  'lead-lag': {
    eyebrow: 'Example · Nguyên tắc 2',
    title: '3 ví dụ Lead Measure tốt',
    examples: [
      {
        title: 'Nexta · Demo BGH',
        context: 'Lead: mỗi sale book 3 buổi demo BGH/tuần. Lag: số hợp đồng trường ký mới.',
        detail: 'Demo là hành động team kiểm soát được và có khả năng dự đoán hợp đồng tương lai.',
      },
      {
        title: 'Masstel · Kênh đại lý',
        context: 'Lead: chăm sóc 25 đại lý trọng điểm/tuần theo checklist trưng bày. Lag: doanh thu sell-out.',
        detail: 'Không đợi số cuối tháng; team tác động vào hành vi bán hàng ngay trong tuần.',
      },
      {
        title: 'Massko · Meup M90',
        context: 'Lead: tổ chức 5 buổi training sản phẩm/tuần cho phòng khám và nhà thuốc. Lag: số đơn M90.',
        detail: 'Training không phải kết quả cuối, nhưng là đòn bẩy làm tăng xác suất đơn hàng.',
      },
    ],
  },
  scoreboard: {
    eyebrow: 'Example · Nguyên tắc 3',
    title: '3 ví dụ bảng điểm dễ nhìn',
    examples: [
      {
        title: 'Bảng điểm sale tuần',
        context: 'Hiển thị Lead demo, Lead follow-up, Lag hợp đồng ký theo từng người.',
        detail: 'Ai nhìn vào cũng biết đang thắng hay thua mà không cần mở báo cáo dài.',
      },
      {
        title: 'Bảng điểm CRM Nexta',
        context: 'Theo dõi % cơ hội có next step, số demo đã book, số demo hoàn tất.',
        detail: 'Bảng điểm tập trung vào hành vi làm dịch chuyển pipeline, không chỉ tổng doanh thu.',
      },
      {
        title: 'Bảng điểm tồn kho Joystar',
        context: 'Theo dõi số máy bán ra mỗi tuần, số điểm bán kích hoạt, tồn còn lại.',
        detail: 'Mục tiêu giảm tồn trở thành cuộc chơi hằng tuần thay vì áp lực cuối tháng.',
      },
    ],
  },
  cadence: {
    eyebrow: 'Example · Nguyên tắc 4',
    title: '3 ví dụ nhịp họp WIG 15 phút',
    examples: [
      {
        title: 'Họp WIG thứ Hai',
        context: '5 phút báo cáo cam kết cũ, 5 phút nhìn bảng điểm, 5 phút chốt cam kết mới.',
        detail: 'Cuộc họp ngắn, đều, chỉ nói về WIG và Lead Measure; không biến thành họp vận hành.',
      },
      {
        title: 'Cam kết cá nhân',
        context: 'Mỗi thành viên nói một cam kết cụ thể: “Tuần này tôi book 3 demo BGH”.',
        detail: 'Cam kết có chủ thể, số lượng và thời hạn; tránh kiểu “sẽ cố gắng đẩy mạnh”.',
      },
      {
        title: 'Check-in khi bị cơn lốc kéo lệch',
        context: 'Nếu không hoàn thành cam kết, team hỏi trở ngại và chọn một hành động bù trong tuần.',
        detail: 'Mục tiêu là giữ trách nhiệm và học nhanh, không phải truy lỗi cá nhân.',
      },
    ],
  },
}

type PrincipleExamplesProps = {
  activePage: PageId
}

export function PrincipleExamples({ activePage }: PrincipleExamplesProps) {
  const content = principleExamples[activePage]
  if (!content) return null

  return (
    <section className="principle-examples" aria-label="Ví dụ áp dụng 4DX">
      <div className="page-eyebrow">{content.eyebrow}</div>
      <h2>{content.title}</h2>
      <div className="example-grid">
        {content.examples.map((example, index) => (
          <article className="example-card" key={example.title}>
            <div className="example-index">{index + 1}</div>
            <div className="example-title">{example.title}</div>
            <p className="example-context">{example.context}</p>
            <p className="example-detail">{example.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
