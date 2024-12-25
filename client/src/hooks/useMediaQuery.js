import {useState, useEffect} from 'react'

export default function useMediaQuery(query = '(max-width: 768px)') {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [query])

  return matches
}
