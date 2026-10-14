import { useEffect, useRef } from 'react'

const GLYPHS =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>[]{}|/\\=+-_*#@'

const FONT_SIZE = 14
const FONT = `${FONT_SIZE}px ui-monospace, 'JetBrains Mono', monospace`

interface MatrixBackgroundProps {
  className?: string
}

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? '0'

/** Violet-tinted code rain on a transparent canvas, so the page glow shows through. */
export function MatrixBackground({ className = '' }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let heads: number[] = []
    let speeds: number[] = []
    let lastRows: number[] = []
    let running = false
    let raf = 0
    let lastTime = 0
    const interval = 45

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = rect?.width ?? window.innerWidth
      height = rect?.height ?? window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cols = Math.ceil(width / FONT_SIZE)
      heads = Array.from({ length: cols }, () => -Math.random() * 60)
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.9)
      lastRows = Array.from({ length: cols }, () => -1)
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = FONT
      ctx.fillStyle = 'rgba(176, 156, 255, 0.07)'
      const rows = Math.ceil(height / FONT_SIZE)
      for (let i = 0; i < heads.length; i++) {
        for (let row = 0; row < rows; row += 3) {
          if (Math.random() > 0.6) continue
          ctx.fillText(randomGlyph(), i * FONT_SIZE, row * FONT_SIZE)
        }
      }
    }

    const frame = (time: number) => {
      if (!running) return
      raf = requestAnimationFrame(frame)
      if (time - lastTime < interval) return
      lastTime = time

      // Fade old glyphs out while keeping the canvas transparent
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.font = FONT

      for (let i = 0; i < heads.length; i++) {
        const head = (heads[i] ?? 0) + (speeds[i] ?? 1)
        heads[i] = head
        const row = Math.floor(head)
        if (row === lastRows[i]) continue
        lastRows[i] = row
        if (row < 0) continue
        const y = row * FONT_SIZE
        ctx.fillStyle =
          Math.random() > 0.94 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(176, 156, 255, 0.4)'
        ctx.fillText(randomGlyph(), i * FONT_SIZE, y)
        if (y > height && Math.random() > 0.975) {
          heads[i] = 0
          lastRows[i] = -1
        }
      }
    }

    const begin = () => {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const halt = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    window.addEventListener('resize', resize)

    // Only animate while the hero is on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) begin()
      else halt()
    })
    observer.observe(canvas)

    return () => {
      halt()
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  )
}
