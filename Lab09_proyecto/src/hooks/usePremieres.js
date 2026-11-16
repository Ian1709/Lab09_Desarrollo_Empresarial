import { useCallback, useEffect, useState } from 'react'
import { fetchPremieres } from '../services/premieresService.js'

const emptyState = { status: 'loading', data: [], error: null }

/**
 * Owns the premieres request lifecycle and exposes exactly three states:
 * `loading`, `success` and `error`, plus a `retry` action.
 *
 * The result is tagged with the request it belongs to, so switching to a new
 * request (retry or error toggle) renders `loading` immediately without an
 * extra synchronous `setState` inside the effect.
 */
function usePremieres({ simulateError = false } = {}) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ ...emptyState, requestKey: null })

  const requestKey = `${attempt}:${simulateError}`

  useEffect(() => {
    const controller = new AbortController()

    fetchPremieres({ shouldFail: simulateError, signal: controller.signal })
      .then((data) => {
        setResult({
          requestKey,
          status: 'success',
          data,
          error: null,
        })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setResult({
          requestKey,
          status: 'error',
          data: [],
          error: error.message,
        })
      })

    return () => controller.abort()
  }, [requestKey, simulateError])

  const retry = useCallback(() => {
    setAttempt((currentAttempt) => currentAttempt + 1)
  }, [])

  if (result.requestKey !== requestKey) {
    return { ...emptyState, retry }
  }

  return { status: result.status, data: result.data, error: result.error, retry }
}

export default usePremieres
