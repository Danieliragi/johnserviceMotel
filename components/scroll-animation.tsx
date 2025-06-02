"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  once?: boolean
  rootMargin?: string
  showIcon?: boolean
  isValid?: boolean
}

export default function ScrollAnimation({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  direction = "up",
  once = true,
  rootMargin = "0px",
  showIcon = false,
  isValid = true,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once, rootMargin])

  const getAnimationClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-16"
      case "down":
        return "translate-y-[-4rem]"
      case "left":
        return "translate-x-16"
      case "right":
        return "translate-x-[-4rem]"
      case "fade":
        return ""
      default:
        return "translate-y-16"
    }
  }

  return (
    <>
      {showIcon && (
        <div className="absolute top-2 right-2">
          {isValid ? <Check className="h-6 w-6 text-green-500" /> : <X className="h-6 w-6 text-red-500" />}
        </div>
      )}
      {children}
    </>
  )
}
