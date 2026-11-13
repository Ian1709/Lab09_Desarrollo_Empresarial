const FAVORITES_STORAGE_KEY = 'cinestar.favoriteMovieIds'

function readFavoriteIds() {
  if (typeof window === 'undefined') return []

  try {
    const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!storedValue) return []

    const parsedValue = JSON.parse(storedValue)
    if (!Array.isArray(parsedValue)) return []

    return parsedValue.filter((movieId) => Number.isInteger(movieId))
  } catch (error) {
    console.warn('Could not read favorite movies from localStorage.', error)
    return []
  }
}

function writeFavoriteIds(favoriteIds) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteIds),
    )
  } catch (error) {
    console.warn('Could not save favorite movies to localStorage.', error)
  }
}

export { FAVORITES_STORAGE_KEY, readFavoriteIds, writeFavoriteIds }
