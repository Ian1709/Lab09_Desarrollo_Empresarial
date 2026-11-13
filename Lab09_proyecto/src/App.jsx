import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import { movies } from './data/movies.js'
import useDebouncedValue from './hooks/useDebouncedValue.js'
import { readFavoriteIds, writeFavoriteIds } from './utils/favoritesStorage.js'

const validMovieIds = new Set(movies.map((movie) => movie.id))

function App() {
  const [favoriteIds, setFavoriteIds] = useState(() =>
    readFavoriteIds().filter((movieId) => validMovieIds.has(movieId)),
  )
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400)

  useEffect(() => {
    writeFavoriteIds(favoriteIds)
  }, [favoriteIds])

  useEffect(() => {
    if (!import.meta.env.DEV) return

    console.log('[CineStar] search input:', JSON.stringify(searchTerm))
    console.log('[CineStar] applied filter:', JSON.stringify(debouncedSearchTerm))
  }, [searchTerm, debouncedSearchTerm])

  const toggleFavorite = (movieId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
    )
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const billboard = document.getElementById('premieres')
    if (!billboard) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    billboard.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="app" id="top">
      <Header />
      <Hero
        movie={movies[0]}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="main-content">
        <section className="section" id="billboard">
          <div className="container">
            <h2 className="section-title">Now Showing</h2>
            <p className="section-description">
              Discover the latest releases and reserve your seats at CineStar.
            </p>
            <div id="premieres" className="movie-list__section">
              <h2 className="visually-hidden">Available movies</h2>
              <MovieList
                movies={movies}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                searchTerm={debouncedSearchTerm}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
