import { premiereCatalog } from '../data/premieres.js'
import { adaptMovies } from '../utils/movieAdapter.js'

const REQUEST_DELAY = 900

/**
 * Simulates the network request for the premieres. It resolves with the
 * adapted model after a short delay, or rejects when `shouldFail` is true so
 * the UI can exercise its error state.
 */
function fetchPremieres({ shouldFail = false, signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'))
      return
    }

    const timeoutId = window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('The premieres service is temporarily unavailable.'))
        return
      }

      resolve(adaptMovies(premiereCatalog))
    }, REQUEST_DELAY)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

export { fetchPremieres, REQUEST_DELAY }
