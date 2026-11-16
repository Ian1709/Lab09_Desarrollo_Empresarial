import { useState } from 'react'
import Button from './Button.jsx'
import PremieresCarousel from './PremieresCarousel.jsx'
import PremieresSkeleton from './PremieresSkeleton.jsx'
import usePremieres from '../hooks/usePremieres.js'

function PremieresSection() {
  const [simulateError, setSimulateError] = useState(false)
  const { status, data, error, retry } = usePremieres({ simulateError })

  return (
    <section
      className="section premieres"
      id="premieres"
      aria-labelledby="premieres-title"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-header__content">
            <p className="eyebrow">Coming soon</p>
            <h2 className="section-title" id="premieres-title">
              Premieres
            </h2>
            <p className="section-description">
              Special screenings, restored classics and advance showings
              selected for the CineStar audience.
            </p>
          </div>

          <div className="section-header__actions">
            {status === 'success' && (
              <span className="badge font-numeric">{data.length} premieres</span>
            )}

            {import.meta.env.DEV && (
              <label className="premieres__toggle">
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={(event) => setSimulateError(event.target.checked)}
                />
                Simulate error
              </label>
            )}
          </div>
        </div>

        {status === 'loading' && <PremieresSkeleton />}

        {status === 'error' && (
          <div className="premieres__error" role="alert">
            <p className="premieres__error-title">Premieres are unavailable</p>
            <p className="premieres__error-text">{error}</p>
            <Button variant="secondary" onClick={retry}>
              Try again
            </Button>
          </div>
        )}

        {status === 'success' && <PremieresCarousel premieres={data} />}
      </div>
    </section>
  )
}

export default PremieresSection
