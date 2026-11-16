import { useEffect } from 'react'

function Toast({ message, tone = 'success', onDismiss, duration = 2800 }) {
  useEffect(() => {
    if (!message) return undefined

    const timeoutId = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(timeoutId)
  }, [message, duration, onDismiss])

  if (!message) return null

  return (
    <div className={`toast toast--${tone}`} role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        {tone === 'success' ? '★' : '☆'}
      </span>
      <p className="toast__message">{message}</p>
      <button
        type="button"
        className="toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
