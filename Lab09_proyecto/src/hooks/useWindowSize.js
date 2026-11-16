import { useEffect, useState } from 'react'

function readWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  return { width: window.innerWidth, height: window.innerHeight }
}

function useWindowSize() {
  const [size, setSize] = useState(readWindowSize)

  useEffect(() => {
    const handleResize = () => setSize(readWindowSize())

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default useWindowSize
