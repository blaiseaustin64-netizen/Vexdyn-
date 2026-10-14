import { useEffect, useRef } from 'react'

/**
 * Lightweight page chrome only:
 * - scroll progress bar driven by native scroll
 * - no wheel interception, no inertial scroll, no ambient orbs
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="scroll-progress-bar h-full w-full origin-left scale-x-0 bg-white/40"
      />
    </div>
  )
}
