import { useEffect, useRef } from 'react'

const GLYPHS =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>[]{}|/\\=+-_*#@'

interface MatrixBackgroundProps {
  className?: string
}

export function MatrixBackground({ className = '' }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let columns: number[] = []
    const fontSize = 13
    let lastTime = 0
    const frameInterval = 50

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
      const colCount = Math.ceil(width / fontSize)
      columns = Array.from({ length: colCount }, () =>
        Math.floor(Math.random() * -40),
      )
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px ui-monospace, monospace`
      ctx.fillStyle = 'rgba(245, 245, 247, 0.035)'
      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize
        for (let row = 0; row < Math.ceil(height / fontSize); row += 3) {
          if (Math.random() > 0.7) continue
          const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!
          ctx.fillText(ch, x, row * fontSize)
        }
      }
    }

    const draw = (time: number) => {
      if (time - lastTime < frameInterval) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = time
      ctx.fillStyle = 'rgba(10, 10, 13, 0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px ui-monospace, monospace`
      ctx.fillStyle = 'rgba(245, 245, 247, 0.045)'
      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize
        const y = columns[i]! * fontSize
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!
        ctx.fillText(ch, x, y)
        if (y > height && Math.random() > 0.975) {
          columns[i] = 0
        } else {
          columns[i]! += 1
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReduced) {
      drawStatic()
    } else {
      ctx.fillStyle = 'rgba(10, 10, 13, 1)'
      ctx.fillRect(0, 0, width, height)
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
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
