'use client'

import { useEffect, useRef } from 'react'
import styles from './NightSky.module.css'

interface NightSkyProps {
  starCount?: number
  twinkleSpeed?: number
  starSize?: number
  rotateSpeed?: number
}

interface Star {
  radius: number
  angle: number
  size: number
  opacity: number
  phase: number
  speed: number
  timing: number
}

export default function NightSky({
  starCount = 100,
  twinkleSpeed = 1,
  starSize = 2,
  rotateSpeed = 0.02
}: NightSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rotationRef = useRef<number>(0)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match display size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      // Set the canvas size in pixels
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr)
      
      // Set the CSS size to match the desired layout size
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      return {
        width: rect.width,
        height: rect.height
      }
    }

    // Initialize stars with uniform distribution
    const initStars = () => {
      starsRef.current = Array.from({ length: starCount }, () => {
        const radius = Math.sqrt(Math.random())
        const angle = Math.random() * Math.PI * 2
        return {
          radius,
          angle,
          size: starSize * (0.5 + Math.random()),
          opacity: 0,
          phase: Math.random() * Math.PI * 2,
          speed: twinkleSpeed * (0.5 + Math.random() * 1.5),
          timing: Math.floor(Math.random() * 3)
        }
      })
    }

    // Draw star function with dynamic center calculation
    const drawStar = (ctx: CanvasRenderingContext2D, star: Star, viewBox: { width: number, height: number }) => {
      const centerX = viewBox.width / 2
      const centerY = viewBox.height / 2
      const maxRadius = Math.max(centerX, centerY) * 2

      const actualRadius = star.radius * maxRadius
      const baseX = actualRadius * Math.cos(star.angle)
      const baseY = actualRadius * Math.sin(star.angle)

      ctx.save()
      ctx.translate(centerX, centerY)
      
      const angle = rotationRef.current
      const rotatedX = baseX * Math.cos(angle) - baseY * Math.sin(angle)
      const rotatedY = baseX * Math.sin(angle) + baseY * Math.cos(angle)
      
      ctx.translate(rotatedX, rotatedY)

      let progress = (Date.now() % (star.speed * 1000)) / (star.speed * 1000)
      switch(star.timing) {
        case 0:
          progress = easeInOutQuad(progress)
          break
        case 1:
          progress = easeOutQuad(progress)
          break
        case 2:
          progress = easeInOutCubic(progress)
          break
      }

      const scale = 0.8 + (progress < 0.5 ? progress : 1 - progress) * 0.8
      star.opacity = progress < 0.5 ? progress * 2 : (1 - progress) * 2

      ctx.globalAlpha = star.opacity
      ctx.beginPath()
      ctx.arc(0, 0, star.size * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.restore()
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      const viewBox = {
        width: canvas.getBoundingClientRect().width,
        height: canvas.getBoundingClientRect().height
      }

      ctx.clearRect(0, 0, viewBox.width, viewBox.height)
      rotationRef.current += rotateSpeed

      starsRef.current.forEach(star => {
        drawStar(ctx, star, viewBox)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Easing functions
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const easeOutQuad = (t: number): number => {
      return t * (2 - t)
    }

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    // Setup
    const { width, height } = updateCanvasSize()
    initStars()
    animate()

    // Handle resize
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [starCount, twinkleSpeed, starSize, rotateSpeed])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
