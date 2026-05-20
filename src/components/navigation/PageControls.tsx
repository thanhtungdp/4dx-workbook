import type { SlideRoute } from '../../utils/navigation'

type PageControlsProps = {
  currentLabel: string
  next?: SlideRoute
  previous?: SlideRoute
  onNext: () => void
  onPrevious: () => void
}

export function PageControls({ currentLabel, next, previous, onNext, onPrevious }: PageControlsProps) {
  return (
    <div className="page-controls" aria-label="Điều hướng slide">
      <button className="page-control-btn" type="button" disabled={!previous} onClick={onPrevious}>
        <span>←</span>
        <small>{previous?.label ?? 'Bắt đầu'}</small>
        <strong>Trước</strong>
      </button>

      <div className="page-control-current">
        <span>Đang xem</span>
        <strong>{currentLabel}</strong>
        <small>Dùng phím ← / → để di chuyển</small>
      </div>

      <button className="page-control-btn page-control-next" type="button" disabled={!next} onClick={onNext}>
        <span>→</span>
        <small>{next?.label ?? 'Kết thúc'}</small>
        <strong>Tiếp</strong>
      </button>
    </div>
  )
}
