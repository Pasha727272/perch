import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on every route change so Nest/etc. open at the top */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
