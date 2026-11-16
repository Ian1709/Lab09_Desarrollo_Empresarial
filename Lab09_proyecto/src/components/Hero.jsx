import Button from './Button.jsx'
import MovieSearch from './MovieSearch.jsx'

function Hero({
  movie,
  searchTerm = '',
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
}) {
  if (!movie) return null

  const hasActiveFilter = searchTerm.trim().length > 0

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={{ '--hero-image': `url(${movie.image})` }}
    >
      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">Featured movie</p>
        <h1 className="hero__title" id="hero-title">{movie.title}</h1>
        <p className="hero__synopsis">{movie.synopsis}</p>
        <div className="hero__meta">
          <span className="classification">{movie.classification}</span>
          <span aria-label={`Rating ${movie.rating} out of 10`}>★ {movie.rating}</span>
        </div>
        <div className="hero__actions">
          <MovieSearch
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          />
          <Button href="#premieres" variant="secondary">
            Explore showtimes
          </Button>
          {hasActiveFilter && (
            <Button
              variant="ghost"
              className="hero__clear"
              onClick={onClearSearch}
            >
              Clear filter
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
