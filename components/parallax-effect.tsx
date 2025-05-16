"use client"

import { useEffect } from "react"

export default function ParallaxEffect() {
  useEffect(() => {
    const parallaxHero = document.getElementById("parallax-hero")

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (parallaxHero && scrollPosition < window.innerHeight) {
        parallaxHero.style.transform = `translateY(${scrollPosition * 0.4}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
