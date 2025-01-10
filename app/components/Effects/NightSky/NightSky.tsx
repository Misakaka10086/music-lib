'use client'

import { useEffect, useRef } from 'react'
import styles from './NightSky.module.css'

interface NightSkyProps {
  starCount?: number
  twinkleSpeed?: number
  starSize?: number
  rotateSpeed?: number
  centerSpeedRatio?: number
  speedDecay?: number
}

interface Star {
  radius: number
  angle: number
  size: number
  opacity: number
  phase: number
  speed: number
  timing: number
  rotateSpeed: number
}

interface TouchInfo {
  startY: number
  lastY: number
  lastTime: number
}

export default function NightSky({
  starCount = 100,
  twinkleSpeed = 1,
  starSize = 2,
  rotateSpeed = 0.02,
  centerSpeedRatio = 100,
  speedDecay = 2
}: NightSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rotationRef = useRef<number>(0)
  const animationFrameRef = useRef<number>(0)
  const lastScrollY = useRef<number>(0)
  const currentRotateSpeed = useRef<number>(rotateSpeed)
  const targetRotateSpeed = useRef<number>(rotateSpeed)
  const lastSpeedUpdateTime = useRef<number>(0)
  const touchInfo = useRef<TouchInfo | null>(null)
  const isDecelerating = useRef<boolean>(false)
  const lastFrameTime = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Update rotation speed with smooth transition
    const updateRotationSpeed = (moveSpeed: number) => {
      const speedIncrease = Math.min(moveSpeed * 0.1, rotateSpeed * 10)
      targetRotateSpeed.current = rotateSpeed + speedIncrease
      currentRotateSpeed.current = targetRotateSpeed.current
      lastSpeedUpdateTime.current = Date.now()
      isDecelerating.current = false
    }

    // Calculate star speed multiplier based on radius
    const calculateSpeedMultiplier = (radius: number) => {
      // radius 是 0-1 的值，0 表示中心，1 表示边缘
      // 使用 speedDecay 来控制衰减曲线
      // 使用 centerSpeedRatio 来控制中心和边缘的速度比
      return 1 + Math.pow(1 - radius, speedDecay) * (centerSpeedRatio - 1)
    }

    // Smooth deceleration animation
    const startDeceleration = () => {
      if (isDecelerating.current) return
      isDecelerating.current = true
      
      const decelerate = () => {
        if (!isDecelerating.current) return

        const currentSpeed = currentRotateSpeed.current
        const targetSpeed = rotateSpeed
        const diff = currentSpeed - targetSpeed

        if (Math.abs(diff) < 0.0001) {
          currentRotateSpeed.current = targetSpeed
          isDecelerating.current = false
          return
        }

        // Exponential decay
        currentRotateSpeed.current = targetSpeed + diff * 0.95

        requestAnimationFrame(decelerate)
      }

      requestAnimationFrame(decelerate)
    }

    // Handle scroll speed for desktop
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
      lastScrollY.current = currentScrollY
      
      if (scrollDelta > 0) {
        updateRotationSpeed(scrollDelta)
      }
    }

    // Debounced scroll end detection
    const handleScrollEnd = () => {
      if (Date.now() - lastSpeedUpdateTime.current > 50) {
        startDeceleration()
      } else {
        requestAnimationFrame(handleScrollEnd)
      }
    }

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchInfo.current = {
          startY: e.touches[0].clientY,
          lastY: e.touches[0].clientY,
          lastTime: Date.now()
        }
        isDecelerating.current = false
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchInfo.current || e.touches.length !== 1) return

      const currentY = e.touches[0].clientY
      const currentTime = Date.now()
      const deltaY = Math.abs(currentY - touchInfo.current.lastY)
      const deltaTime = currentTime - touchInfo.current.lastTime

      if (deltaTime > 0) {
        const speed = (deltaY / deltaTime) * 1000
        updateRotationSpeed(speed)
      }

      touchInfo.current.lastY = currentY
      touchInfo.current.lastTime = currentTime
    }

    const handleTouchEnd = () => {
      touchInfo.current = null
      startDeceleration()
    }

    // Set canvas size to match display size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
      
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
        const speedMultiplier = calculateSpeedMultiplier(radius)
        return {
          radius,
          angle,
          size: starSize * (0.5 + Math.random()),
          opacity: 0,
          phase: Math.random() * Math.PI * 2,
          speed: twinkleSpeed * (0.5 + Math.random() * 1.5),
          timing: Math.floor(Math.random() * 3),
          rotateSpeed: speedMultiplier
        }
      })
    }

    // Draw star function with dynamic center calculation
    const drawStar = (ctx: CanvasRenderingContext2D, star: Star, viewBox: { width: number, height: number }, deltaTime: number) => {
      const centerX = viewBox.width / 2
      const centerY = viewBox.height / 2
      const maxRadius = Math.max(centerX, centerY) * 2

      star.angle += currentRotateSpeed.current * star.rotateSpeed * deltaTime * 0.001

      const actualRadius = star.radius * maxRadius
      const rotatedX = centerX + actualRadius * Math.cos(star.angle)
      const rotatedY = centerY + actualRadius * Math.sin(star.angle)

      ctx.save()
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
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return

      const deltaTime = lastFrameTime.current ? timestamp - lastFrameTime.current : 0
      lastFrameTime.current = timestamp

      const viewBox = {
        width: canvas.getBoundingClientRect().width,
        height: canvas.getBoundingClientRect().height
      }

      ctx.clearRect(0, 0, viewBox.width, viewBox.height)

      starsRef.current.forEach(star => {
        drawStar(ctx, star, viewBox, deltaTime)
      })

      // Check for scroll end
      if (!touchInfo.current && !isDecelerating.current) {
        handleScrollEnd()
      }

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
    lastFrameTime.current = performance.now()
    animate(performance.now())

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      isDecelerating.current = false
    }
  }, [starCount, twinkleSpeed, starSize, rotateSpeed, centerSpeedRatio, speedDecay])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
