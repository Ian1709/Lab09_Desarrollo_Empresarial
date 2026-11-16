import { useRef } from 'react'
import Button from './Button.jsx'
import PremiereCard from './PremiereCard.jsx'

function premieresScrollBehavior() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  return prefersReducedMotion ? 'auto' : 'smooth'
}

function PremieresCarousel({ premieres = [] }) {
  const trackRef = useRef(null)

  const scrollTrack = (direction) => {
    const track = trackRef.current
    if (!track) return

    const amount = Math.max(track.clientWidth * 0.8, 280)
    track.scrollBy({
      left: direction * amount,
      behavior: premieresScrollBehavior(),
    })
  }

  return (
    <div className="premieres-carousel">
      <div className="premieres-carousel__controls">
        <p className="premieres-carousel__hint">
          Scroll or use the arrows to browse the premieres.
        </p>
        <div className="cluster">
          <Button
            variant="icon"
            onClick={() => scrollTrack(-1)}
            aria-label="Previous premieres"
          >
            ←
          </Button>
          <Button
            variant="icon"
            onClick={() => scrollTrack(1)}
            aria-label="Next premieres"
          >
            →
          </Button>
        </div>
      </div>

      <ul className="premieres-carousel__track" ref={trackRef}>
        {premieres.map((premiere) => (
          <li key={premiere.id} className="premieres-carousel__item">
            <PremiereCard premiere={premiere} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PremieresCarousel
