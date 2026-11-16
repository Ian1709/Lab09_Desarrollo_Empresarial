const DEFAULT_CLASSIFICATION = 'NR'

function normalizeSchedules(showtimes) {
  if (!Array.isArray(showtimes)) return []

  return showtimes
    .filter((time) => typeof time === 'string' && time.trim().length > 0)
    .map((time) => time.trim())
}

/**
 * Adapter that turns the raw billboard payload into the model consumed by the
 * UI components. Keeping the mapping here means the rest of the app never has
 * to know the shape of the external source.
 */
function adaptMovie(rawMovie = {}) {
  return {
    id: rawMovie.movieId ?? rawMovie.id,
    title: rawMovie.title ?? rawMovie.name ?? 'Untitled movie',
    image: rawMovie.posterUrl ?? rawMovie.image ?? '',
    synopsis: rawMovie.overview ?? rawMovie.synopsis ?? '',
    classification:
      rawMovie.ageRating ?? rawMovie.classification ?? DEFAULT_CLASSIFICATION,
    rating: Number(rawMovie.voteAverage ?? rawMovie.rating ?? 0),
    schedules: normalizeSchedules(rawMovie.showtimes ?? rawMovie.schedules),
    releaseDate: rawMovie.releaseDate ?? null,
  }
}

function adaptMovies(rawMovies = []) {
  return rawMovies.filter(Boolean).map(adaptMovie)
}

export { adaptMovie, adaptMovies }
