'use client'

import { useEffect, useRef } from 'react'
import styles from './NightSky.module.css'

interface NightSkyProps {
  starCount?: number
  twinkleSpeed?: number
  starSize?: number
}

export default function NightSky({
  starCount = 100,
  twinkleSpeed = 1,
  starSize = 2
}: NightSkyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing stars
    container.innerHTML = ''

    // Available timing function classes
    const timingClasses = ['star-timing-1', 'star-timing-2', 'star-timing-3']

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      
      // Randomly select a timing function
      const timingClass = timingClasses[Math.floor(Math.random() * timingClasses.length)]
      star.className = `${styles.star} ${styles[timingClass]}`
      
      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      star.style.left = `${x}%`
      star.style.top = `${y}%`
      
      // Random size
      const size = starSize * (0.5 + Math.random())
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      
      // Random animation properties
      const delay = Math.random() * 5
      const duration = twinkleSpeed * (0.5 + Math.random() * 1.5)
      
      star.style.animationDelay = `${delay}s`
      star.style.animationDuration = `${duration}s`
      
      container.appendChild(star)
    }
  }, [starCount, twinkleSpeed, starSize])

  return (
    <div 
      ref={containerRef}
      className={styles.container}
    />
  )
}
