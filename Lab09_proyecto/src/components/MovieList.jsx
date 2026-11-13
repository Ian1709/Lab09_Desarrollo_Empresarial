import MovieCard from './MovieCard.jsx'

function MovieList({ movies, favoriteIds = [], onToggleFavorite }) {
  if (!movies?.length) {
    return <p className="movie-list__empty">No movies are available right now.</p>
  }

  return (
    <div className="grid movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default MovieList
