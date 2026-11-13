import Button from './Button.jsx'

function Hero({ movie }) {
  if (!movie) return null

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
        <Button href="#premieres" variant="primary">
          Explore showtimes
        </Button>
      </div>
    </section>
  )
}

export default Hero
