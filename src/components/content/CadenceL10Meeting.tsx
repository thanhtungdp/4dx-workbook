import type { PageId } from '../../utils/navigation'

type CadenceL10MeetingProps = {
  activePage: PageId
}

const rhythmReasons = [
  {
    title: 'WIG không tự chạy',
    body: 'Sau khi có mục tiêu, lead measure và bảng điểm, đội ngũ cần một nhịp cố định để kéo mọi người quay lại đúng ưu tiên.',
  },
  {
    title: 'Trách nhiệm cần được nhìn thấy',
    body: 'Mỗi tuần phải có nơi để nhìn lại cam kết cũ, cập nhật số thật và chốt việc mới. Không chờ đến cuối tháng mới biết lệch.',
  },
  {
    title: 'Cuộc họp phải bảo vệ trọng tâm',
    body: 'Nhịp họp chỉ phục vụ WIG và các vấn đề cản trở WIG. Cơn lốc hàng ngày được ghi nhận, nhưng không được nuốt mất cuộc họp.',
  },
]

const meetingPrinciples = [
  'Cố định hàng tuần',
  'Có timer rõ ràng',
  'Bám vào scoreboard',
  'Chốt việc có owner',
]

const discoverItems = [
  { number: 1, label: 'Tin vui', time: '5 phút' },
  { number: 2, label: 'Đánh giá chỉ số kinh doanh', time: '5 phút' },
  { number: 3, label: 'Đánh giá Kế hoạch hành động', time: '5 phút' },
  { number: 4, label: 'Phản hồi từ khách hàng / nội bộ', time: '5 phút' },
  { number: 5, label: 'Rà soát việc giao tuần trước', time: '5 phút' },
]

export function CadenceL10Meeting({ activePage }: CadenceL10MeetingProps) {
  if (activePage !== 'cadence') return null

  return (
    <section className="page cadence-l10-page active" id="page-cadence-l10" aria-label="Nhịp điệu trách nhiệm">
      <div className="gradient-bar"></div>
      <div className="page-eyebrow">Nguyên tắc 4 · Cadence of Accountability</div>
      <h1 className="page-title">
        Nhịp điệu
        <br />
        <strong>trách nhiệm</strong>
      </h1>
      <p className="page-subtitle">
        Mục tiêu quan trọng chỉ dịch chuyển khi đội ngũ có nhịp kiểm tra, xử lý vấn đề và cam kết hành động đều đặn.
      </p>

      <div className="cadence-knowledge-grid">
        {rhythmReasons.map((item, index) => (
          <article className="cadence-knowledge-card" key={item.title}>
            <span>{index + 1}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="cadence-method-strip">
        <div>
          <div className="fourdx-label">Phương pháp họp</div>
          <h2>Nhịp họp định kỳ</h2>
          <p>Áp dụng như khung vận hành hàng tuần cho WIG: cập nhật nhanh, thảo luận vấn đề, quyết định và giao việc.</p>
        </div>
        <div className="cadence-method-tags">
          {meetingPrinciples.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </div>

      <div className="section-title">Playground — Khung cuộc họp định kỳ</div>
      <div className="l10-playground">
        <section className="l10-stage discover">
          <div className="l10-stage-side">
            <strong>1. Discover</strong>
            <span>Khám phá</span>
          </div>
          <div className="l10-stage-body">
            {discoverItems.map((item) => (
              <div className="l10-stage-row" key={item.number}>
                <em>{item.number}.</em>
                <strong>{item.label}</strong>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
          <div className="l10-stage-total">
            <span>Cập nhật nhanh</span>
            <strong>25 PHÚT</strong>
            <p>Nhu cầu mới · Phát hiện vấn đề</p>
          </div>
        </section>

        <section className="l10-stage discuss">
          <div className="l10-stage-side">
            <strong>2. Discuss</strong>
            <span>Thảo luận</span>
            <strong>3. Decide</strong>
            <span>Quyết định</span>
          </div>
          <div className="l10-stage-body">
            <div className="l10-stage-row hero">
              <em>6.</em>
              <strong>Thảo luận - Xử lý vấn đề</strong>
              <span>60 Phút</span>
            </div>
            <div className="l10-scribble" aria-hidden="true"></div>
          </div>
          <div className="l10-stage-total">
            <span>Giải quyết</span>
            <strong>60 PHÚT</strong>
            <p>Sắp xếp ưu tiên · Giải quyết hệ thống</p>
          </div>
        </section>

        <section className="l10-stage delegate">
          <div className="l10-stage-side">
            <strong>4. Delegate</strong>
            <span>Giao việc</span>
          </div>
          <div className="l10-stage-body">
            <div className="l10-stage-row hero">
              <em>7.</em>
              <strong>Kết luận</strong>
              <span>5 Phút</span>
            </div>
          </div>
          <div className="l10-stage-total">
            <span>Kết luận</span>
            <strong>5 PHÚT</strong>
          </div>
        </section>
      </div>

      <div className="principle-cta">
        <div className="principle-cta-text">
          <strong>Chốt nhịp họp cho SBU của bạn</strong>
          <p>Tờ 4 · Workbook — đặt lịch họp cố định, người cập nhật bảng điểm và owner cho từng hành động</p>
        </div>
        <button className="btn-cta" type="button" onClick={() => window.showWorkbook(3)}>
          → Làm Tờ 4: Bảng điểm
        </button>
      </div>
    </section>
  )
}
