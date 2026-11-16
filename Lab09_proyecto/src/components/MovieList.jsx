import MovieCard from './MovieCard.jsx'

const normalizeText = (value) => value.trim().toLowerCase()

function MovieList({
  movies = [],
  favoriteIds = [],
  onToggleFavorite,
  searchTerm = '',
  cardsPerRow = 4,
}) {
  if (!movies.length) {
    return <p className="movie-list__empty">No movies are available right now.</p>
  }

  const query = normalizeText(searchTerm)
  const visibleMovies = query
    ? movies.filter((movie) => normalizeText(movie.title).includes(query))
    : movies

  if (!visibleMovies.length) {
    return (
      <div className="movie-list__empty" role="status">
        <p className="movie-list__empty-title">No movies found</p>
        <p className="movie-list__empty-text">
          We could not find any movie matching{' '}
          <strong className="movie-list__empty-query">
            &ldquo;{searchTerm.trim()}&rdquo;
          </strong>
          . Try a different title.
        </p>
      </div>
    )
  }

  return (
    <>
      {query && (
        <p className="movie-list__summary" role="status">
          Showing {visibleMovies.length} of {movies.length} movies.
        </p>
      )}
      <div
        className="grid movie-list"
        style={{ '--cards-per-row': cardsPerRow }}
        data-cards-per-row={cardsPerRow}
      >
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </>
  )
}

export default MovieList
