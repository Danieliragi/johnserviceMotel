"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ScriptLoaderProps {
  src: string
  id?: string
  async?: boolean
  defer?: boolean
  onLoad?: () => void
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  children?: React.ReactNode
}

export default function ScriptLoader({
  src,
  id,
  async = true,
  defer = false,
  onLoad,
  strategy = "afterInteractive",
  children,
}: ScriptLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Si le script est déjà chargé, ne pas le recharger
    if (document.querySelector(`script[src="${src}"]`)) {
      setLoaded(true)
      onLoad?.()
      return
    }

    const handleLoad = () => {
      setLoaded(true)
      onLoad?.()
    }

    if (strategy === "beforeInteractive") {
      loadScript()
    } else if (strategy === "afterInteractive") {
      if (document.readyState === "complete") {
        loadScript()
      } else {
        window.addEventListener("load", loadScript)
        return () => window.removeEventListener("load", loadScript)
      }
    } else if (strategy === "lazyOnload") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadScript()
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )

      if (document.body) {
        observer.observe(document.body)
        return () => observer.disconnect()
      }
    }

    function loadScript() {
      const script = document.createElement("script")
      script.src = src
      if (id) script.id = id
      script.async = async
      script.defer = defer
      script.onload = handleLoad

      document.body.appendChild(script)
    }
  }, [src, id, async, defer, onLoad, strategy])

  return <>{children && loaded ? children : null}</>
}
