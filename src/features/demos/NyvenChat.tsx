import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { IconClock } from '../../components/ui/Icons'

const USER_MSG = 'month-end is friday, close out the card for me?'
const ASSISTANT_MSG =
  'I can help you prepare a month-end closeout checklist, review the items you need to reconcile, and organize the next steps. Before anything is finalized, you can review and confirm the actions.'

const NYVEN_HREF = 'https://nyven-v1.pages.dev/'

export function NyvenChat() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const reduced = usePrefersReducedMotion()
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())
  const gen = useRef(0)
  const cancelled = useRef(false)

  const [userVisible, setUserVisible] = useState(false)
  const [assistantText, setAssistantText] = useState('')
  const [typing, setTyping] = useState(false)
  const [showChip, setShowChip] = useState(false)

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current.clear()
  }, [])

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      if (!cancelled.current) fn()
    }, ms)
    timers.current.add(id)
  }, [])

  const runStatic = useCallback(() => {
    setUserVisible(true)
    setAssistantText(ASSISTANT_MSG)
    setTyping(false)
    setShowChip(true)
  }, [])

  const runSequence = useCallback(() => {
    const myGen = ++gen.current
    cancelled.current = false
    clearAll()
    setUserVisible(false)
    setAssistantText('')
    setTyping(false)
    setShowChip(false)

    const alive = () => myGen === gen.current && !cancelled.current

    schedule(() => {
      if (!alive()) return
      setUserVisible(true)

      schedule(() => {
        if (!alive()) return
        setTyping(true)
        let i = 0
        const tick = () => {
          if (!alive()) return
          i = Math.min(i + 2, ASSISTANT_MSG.length)
          setAssistantText(ASSISTANT_MSG.slice(0, i))
          if (i < ASSISTANT_MSG.length) {
            schedule(tick, 16)
          } else {
            setTyping(false)
            schedule(() => {
              if (!alive()) return
              setShowChip(true)
              schedule(() => {
                if (alive()) runSequence()
              }, 3800)
            }, 500)
          }
        }
        tick()
      }, 700)
    }, 350)
  }, [clearAll, schedule])

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
      clearAll()
      gen.current += 1
    }
  }, [clearAll])

  useEffect(() => {
    if (!inView) {
      cancelled.current = true
      clearAll()
      gen.current += 1
      return
    }
    cancelled.current = false
    if (reduced) runStatic()
    else runSequence()
    return () => {
      cancelled.current = true
      clearAll()
      gen.current += 1
    }
  }, [inView, reduced, runSequence, runStatic, clearAll])

  return (
    <section
      ref={ref}
      id="nyven-chat"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      aria-labelledby="nyven-chat-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="nyven-chat-heading"
          title="Make room for what matters."
          subtitle="A simulated NYVEN session organizing a month-end checklist—no bank actions or live routines are performed."
        />

        <div className="mx-auto max-w-lg">
          <div className="glass overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-text-primary">NYVEN</span>
              <span className="text-xs text-text-muted">· Simulated preview</span>
            </div>

            <div className="flex min-h-[280px] flex-col gap-4 p-5">
              {userVisible ? (
                <div className="flex justify-end">
                  <div className="max-w-[92%] rounded-2xl rounded-br-md bg-white/[0.1] px-4 py-2.5 text-sm text-text-primary break-words">
                    {USER_MSG}
                  </div>
                </div>
              ) : (
                <div className="h-10" aria-hidden="true" />
              )}

              {(assistantText || typing) && (
                <div className="flex justify-start">
                  <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-elevated/80 px-4 py-3 text-sm leading-relaxed text-text-secondary break-words">
                    {assistantText}
                    {typing ? <span className="demo-cursor" aria-hidden="true" /> : null}
                  </div>
                </div>
              )}

              {showChip ? (
                <div
                  className="mt-1 flex max-w-full flex-wrap items-center gap-2 self-start rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-text-secondary transition-opacity duration-500"
                  role="status"
                >
                  <IconClock size={13} className="text-text-muted" />
                  <span>Created routine · Month-end close</span>
                  <span className="text-text-muted/70">· preview</span>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
              <span className="text-sm font-medium text-text-primary">NYVEN</span>
              <a
                href={NYVEN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Explore →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
