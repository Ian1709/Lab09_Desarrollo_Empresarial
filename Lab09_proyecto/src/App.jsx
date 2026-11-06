import Header from './components/Header.jsx'

function App() {
  return (
    <div className="app" id="top">
      <Header />

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
    </div>
  )
}

export default App
