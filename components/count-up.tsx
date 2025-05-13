"use client"

import { useEffect, useState, useRef } from "react"

interface CountUpProps {
  start?: number
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function CountUp({
  start = 0,
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const easeOutQuad = (t: number) => t * (2 - t)

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const easedProgress = easeOutQuad(progress)
      const nextCount = start + (end - start) * easedProgress

      countRef.current = nextCount
      setCount(nextCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration])

  const formatNumber = (num: number) => {
    return num.toFixed(decimals)
  }

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}
