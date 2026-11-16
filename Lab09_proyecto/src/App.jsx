import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import PremieresSection from './components/PremieresSection.jsx'
import Toast from './components/Toast.jsx'
import { movies } from './data/movies.js'
import useDebounce from './hooks/useDebounce.js'
import useWindowSize from './hooks/useWindowSize.js'
import { readFavoriteIds, writeFavoriteIds } from './utils/favoritesStorage.js'

const validMovieIds = new Set(movies.map((movie) => movie.id))

function getCardsPerRow(width) {
  if (width >= 1280) return 4
  if (width >= 960) return 3
  if (width >= 640) return 2
  return 1
}

function App() {
  const [favoriteIds, setFavoriteIds] = useState(() =>
    readFavoriteIds().filter((movieId) => validMovieIds.has(movieId)),
  )
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const [toast, setToast] = useState(null)
  const { width } = useWindowSize()
  const cardsPerRow = getCardsPerRow(width)
  const favoriteCount = favoriteIds.length

  const dismissToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    writeFavoriteIds(favoriteIds)
  }, [favoriteIds])

  useEffect(() => {
    if (!import.meta.env.DEV) return

    console.log('[CineStar] search input:', JSON.stringify(searchTerm))
    console.log('[CineStar] applied filter:', JSON.stringify(debouncedSearchTerm))
  }, [searchTerm, debouncedSearchTerm])

  const toggleFavorite = (movieId) => {
    const movie = movies.find((item) => item.id === movieId)
    const wasFavorite = favoriteIds.includes(movieId)

    setFavoriteIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
    )

    if (!movie) return

    setToast({
      id: Date.now(),
      message: wasFavorite
        ? `${movie.title} removed from favorites`
        : `${movie.title} added to favorites`,
      tone: wasFavorite ? 'info' : 'success',
    })
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const billboard = document.getElementById('billboard-movies')
    if (!billboard) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    billboard.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className="app" id="top">
      <Header favoriteCount={favoriteCount} />
      <Hero
        movie={movies[0]}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
      />

      <main className="main-content">
        <section className="section" id="billboard">
          <div className="container">
            <h2 className="section-title">Now Showing</h2>
            <p className="section-description">
              Discover the latest releases and reserve your seats at CineStar.
            </p>
            <div id="billboard-movies" className="movie-list__section">
              <h2 className="visually-hidden">Available movies</h2>
              <MovieList
                movies={movies}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                searchTerm={debouncedSearchTerm}
                cardsPerRow={cardsPerRow}
              />
            </div>
          </div>
        </section>

        <PremieresSection />
      </main>

      <Footer />

      <Toast
        key={toast?.id}
        message={toast?.message}
        tone={toast?.tone}
        onDismiss={dismissToast}
      />
    </div>
  )
}

export default App
