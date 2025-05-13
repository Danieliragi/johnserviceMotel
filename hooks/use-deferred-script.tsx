"use client"

import { useEffect, useState } from "react"

export function useDeferredScript(src: string, delay = 3000) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script")
      script.src = src
      script.async = true
      script.onload = () => setLoaded(true)
      document.body.appendChild(script)
    }, delay)

    return () => clearTimeout(timer)
  }, [src, delay])

  return loaded
}
