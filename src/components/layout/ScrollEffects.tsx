import { useEffect, useRef } from 'react'

/**
 * Page-wide scroll behaviour and atmosphere:
 * - inertial smooth scrolling for mouse/trackpad users (native scroll is kept
 *   for touch, keyboard and reduced-motion users)
 * - animated #anchor jumps
 * - scroll progress bar
 * - slow parallax on the ambient glow orbs
 * - cursor-following spotlight on every .glass-card
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null)
  const orbA = useRef<HTMLDivElement>(null)
  const orbB = useRef<HTMLDivElement>(null)
  const orbC = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const smooth = finePointer && !reduced

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    const clamp = (v: number) => Math.min(Math.max(v, 0), maxScroll())

    let current = window.scrollY
    let target = current
    let animating = false
    let raf = 0
    let last = 0

    const paint = (y: number) => {
      const max = maxScroll()
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      if (reduced) return
      if (orbA.current) orbA.current.style.transform = `translate3d(0, ${-p * 280}px, 0)`
      if (orbB.current)
        orbB.current.style.transform = `translate3d(${-p * 120}px, ${p * 200}px, 0)`
      if (orbC.current) orbC.current.style.transform = `translate3d(${p * 140}px, ${-p * 160}px, 0)`
    }

    const step = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      const diff = target - current
      if (Math.abs(diff) < 0.3) {
        current = target
        window.scrollTo({ top: current, left: 0, behavior: 'instant' })
        animating = false
        paint(current)
        return
      }
      current += diff * (1 - Math.exp(-dt * 9))
      window.scrollTo({ top: current, left: 0, behavior: 'instant' })
      paint(current)
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (animating) return
      animating = true
      last = performance.now()
      raf = requestAnimationFrame(step)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      animating = false
      current = target = window.scrollY
    }

    /** True when the wheel is over something that scrolls on its own. */
    const insideScroller = (node: EventTarget | null) => {
      let el = node instanceof Element ? node : null
      while (el && el !== document.body) {
        const { overflowY } = getComputedStyle(el)
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
          return true
        }
        el = el.parentElement
      }
      return false
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if (document.body.style.overflow === 'hidden') return
      if (insideScroller(e.target)) return
      e.preventDefault()
      let dy = e.deltaY
      if (e.deltaMode === 1) dy *= 32
      else if (e.deltaMode === 2) dy *= window.innerHeight
      if (!animating) {
        current = window.scrollY
        target = current
      }
      target = clamp(target + dy)
      start()
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null
      if (!link) return
      const hash = link.getAttribute('href') ?? ''
      if (hash.length < 2) return
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!el) return
      e.preventDefault()
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      const top = hash === '#top' ? 0 : el.getBoundingClientRect().top + window.scrollY - margin
      if (!animating) current = window.scrollY
      target = clamp(top)
      history.pushState(null, '', hash)
      start()
    }

    const onScroll = () => {
      if (!animating) current = target = window.scrollY
      paint(window.scrollY)
    }

    const onKey = (e: KeyboardEvent) => {
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']
      if (keys.includes(e.key)) stop()
    }

    const onResize = () => {
      target = clamp(target)
      paint(window.scrollY)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const card = e.target instanceof Element ? e.target.closest<HTMLElement>('.glass-card') : null
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    paint(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('pointermove', onPointerMove, { passive: true })

    if (smooth) {
      window.addEventListener('wheel', onWheel, { passive: false })
      document.addEventListener('click', onClick)
      window.addEventListener('keydown', onKey)
      window.addEventListener('pointerdown', stop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', stop)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="scroll-progress h-full origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div ref={orbA} className="ambient-orb ambient-orb--a" />
        <div ref={orbB} className="ambient-orb ambient-orb--b" />
        <div ref={orbC} className="ambient-orb ambient-orb--c" />
        <div className="ambient-grain" />
      </div>
    </>
  )
}
