const SKELETON_COUNT = 4

function PremieresSkeleton({ count = SKELETON_COUNT }) {
  return (
    <div className="premieres-skeleton" role="status" aria-live="polite">
      <span className="visually-hidden">Loading premieres…</span>
      <ul className="premieres-carousel__track" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <li key={`premiere-skeleton-${index}`} className="premiere-skeleton">
            <div className="premiere-skeleton__poster" />
            <div className="premiere-skeleton__body">
              <div className="premiere-skeleton__line premiere-skeleton__line--short" />
              <div className="premiere-skeleton__line premiere-skeleton__line--title" />
              <div className="premiere-skeleton__line" />
              <div className="premiere-skeleton__line premiere-skeleton__line--medium" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PremieresSkeleton
