import { useEffect, useState } from 'react'

// Keep the current page in the URL hash so a reload stays on the same page
export function useHashRoute() {
  const read = () => window.location.hash.slice(1)
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
