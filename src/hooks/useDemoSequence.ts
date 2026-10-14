import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type StepFn = () => void | Promise<void>

interface UseDemoSequenceOptions {
  /** When false, all timers are cancelled and the sequence pauses. */
  active: boolean
  /** Run once to the end and stay there (reduced motion / static). */
  staticMode?: boolean
  /** Delay before restarting the loop after completion (ms). */
  loopDelay?: number
}

/**
 * Finite demo sequence controller.
 * - Only advances while `active` is true
 * - Cancels all pending timers when inactive or unmounted
 * - Safe under React Strict Mode (generation token invalidates stale runs)
 */
export function useDemoSequence(options: UseDemoSequenceOptions) {
  const { active, staticMode = false, loopDelay = 2800 } = options
  const reduced = usePrefersReducedMotion()
  const isStatic = staticMode || reduced

  const [step, setStep] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const generation = useRef(0)
  const cancelled = useRef(false)

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const schedule = useCallback((fn: StepFn, delay: number) => {
    const id = setTimeout(() => {
      timers.current = timers.current.filter((t) => t !== id)
      if (!cancelled.current) void fn()
    }, delay)
    timers.current.push(id)
    return id
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    generation.current += 1
    setStep(0)
  }, [clearTimers])

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
      clearTimers()
    }
  }, [clearTimers])

  useEffect(() => {
    if (!active) {
      clearTimers()
      return
    }
    // When re-entering view, restart sequence
    generation.current += 1
    setStep(0)
  }, [active, clearTimers])

  return {
    step,
    setStep,
    schedule,
    clearTimers,
    reset,
    isStatic,
    active,
    generation: generation.current,
    loopDelay,
  }
}
