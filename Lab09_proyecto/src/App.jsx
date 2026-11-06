import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import { movies } from './data/movies.js'

function App() {
  return (
    <div className="app" id="top">
      <Header />
      <Hero movie={movies[0]} />

      <main className="main-content">
        <section className="section" id="billboard">
          <div className="container">
            <h1 className="section-title">Now Showing</h1>
            <p className="section-description">
              Discover the latest releases and reserve your seats at CineStar.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
