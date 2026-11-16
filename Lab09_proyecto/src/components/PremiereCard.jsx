const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatReleaseDate(value) {
  if (!value) return 'Release date to be confirmed'

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value

  return dateFormatter.format(date)
}

function PremiereCard({ premiere }) {
  return (
    <article className="premiere-card">
      <img
        className="premiere-card__image"
        src={premiere.image}
        alt={`${premiere.title} poster`}
        loading="lazy"
      />
      <div className="premiere-card__content">
        <span className="badge premiere-card__badge">Premiere</span>
        <h3 className="premiere-card__title">{premiere.title}</h3>
        <p className="premiere-card__date">
          <time dateTime={premiere.releaseDate ?? undefined}>
            {formatReleaseDate(premiere.releaseDate)}
          </time>
        </p>
        <p className="premiere-card__synopsis">{premiere.synopsis}</p>
        <div className="premiere-card__meta">
          <span className="classification">{premiere.classification}</span>
          <span
            className="premiere-card__rating"
            aria-label={`Rating ${premiere.rating} out of 10`}
          >
            ★ {premiere.rating}
          </span>
        </div>
      </div>
    </article>
  )
}

export default PremiereCard
