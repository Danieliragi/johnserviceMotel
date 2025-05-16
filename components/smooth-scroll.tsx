"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when pathname changes (page navigation)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (!anchor) return

      const targetId = anchor.getAttribute("href")
      if (!targetId || targetId === "#") return

      e.preventDefault()

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
