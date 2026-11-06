function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img className="movie-card__image" src={movie.image} alt={`${movie.title} poster`} loading="lazy" />
      <div className="movie-card__content">
        <div className="movie-card__heading">
          <h3 className="movie-card__title">{movie.title}</h3>
          <span className="classification">{movie.classification}</span>
        </div>
        <p className="movie-card__rating" aria-label={`Rating ${movie.rating} out of 10`}>★ {movie.rating} / 10</p>
        <h4 className="movie-card__schedule-title">Available showtimes</h4>
        <ul className="movie-card__schedules">
          {movie.schedules.map((schedule) => <li key={schedule}>{schedule}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default MovieCard
