import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../../components/ui/SectionHeading'

const Q1 = 'What causes aurora borealis?'
const A1 =
  "Auroras happen when charged particles from the Sun interact with Earth's magnetic field and atmosphere. These particles excite atmospheric gases, which release light as they return to lower energy states. Oxygen often produces green or red light, while nitrogen can produce blue or purple hues."
const Q2 = 'Why is the sky blue?'
const A2 =
  'Air molecules scatter shorter wavelengths of sunlight more strongly than longer wavelengths. Blue light is scattered across the sky, making it appear blue during the day.'

type Stage = 'idle' | 'thinking' | 'writing' | 'done'

const LOG_LINES = [
  'HTTP 200  { id: "req_7f2a" }',
  'HTTP 200  { id: "req_91bc" }',
  'HTTP 200  { id: "req_c3e1" }',
]

function typeText(
  full: string,
  onUpdate: (s: string) => void,
  onDone: () => void,
  cancelled: () => boolean,
  timers: Set<ReturnType<typeof setTimeout>>,
  charMs = 18,
) {
  let i = 0
  const tick = () => {
    if (cancelled()) return
    i = Math.min(i + 2, full.length)
    onUpdate(full.slice(0, i))
    if (i < full.length) {
      const id = setTimeout(tick, charMs)
      timers.add(id)
    } else {
      onDone()
    }
  }
  tick()
}

export function NyvenWrites() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const reduced = usePrefersReducedMotion()
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())
  const gen = useRef(0)
  const cancelled = useRef(false)

  const [stage, setStage] = useState<Stage>('idle')
  const [userText, setUserText] = useState('')
  const [assistantText, setAssistantText] = useState('')
  const [typing, setTyping] = useState(false)
  const [elapsed, setElapsed] = useState({ thinking: '—', writing: '—', done: '—' })
  const [logCount, setLogCount] = useState(0)

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
    setUserText(Q1)
    setAssistantText(A1)
    setStage('done')
    setTyping(false)
    setElapsed({ thinking: '0.4s', writing: '1.8s', done: '2.2s' })
    setLogCount(LOG_LINES.length)
  }, [])

  const runSequence = useCallback(() => {
    const myGen = ++gen.current
    cancelled.current = false
    clearAll()

    setUserText('')
    setAssistantText('')
    setStage('idle')
    setTyping(false)
    setElapsed({ thinking: '—', writing: '—', done: '—' })
    setLogCount(0)

    const alive = () => myGen === gen.current && !cancelled.current

    // Show user Q1
    schedule(() => {
      if (!alive()) return
      setUserText(Q1)
      setStage('thinking')
      setElapsed((e) => ({ ...e, thinking: '0.4s' }))
      setLogCount(1)

      schedule(() => {
        if (!alive()) return
        setStage('writing')
        setTyping(true)
        setElapsed((e) => ({ ...e, writing: '…' }))
        setLogCount(2)

        typeText(
          A1,
          (s) => {
            if (alive()) setAssistantText(s)
          },
          () => {
            if (!alive()) return
            setTyping(false)
            setStage('done')
            setElapsed({ thinking: '0.4s', writing: '1.8s', done: '2.2s' })
            setLogCount(3)

            // Pause then second exchange
            schedule(() => {
              if (!alive()) return
              setUserText(Q2)
              setAssistantText('')
                        setStage('thinking')
              setElapsed({ thinking: '0.3s', writing: '—', done: '—' })
              setLogCount(1)

              schedule(() => {
                if (!alive()) return
                setStage('writing')
                setTyping(true)
                typeText(
                  A2,
                  (s) => {
                    if (alive()) setAssistantText(s)
                  },
                  () => {
                    if (!alive()) return
                    setTyping(false)
                    setStage('done')
                    setElapsed({ thinking: '0.3s', writing: '1.1s', done: '1.4s' })
                    setLogCount(3)

                    // Loop after pause
                    schedule(() => {
                      if (alive()) runSequence()
                    }, 3200)
                  },
                  () => !alive(),
                  timers.current,
                  16,
                )
              }, 500)
            }, 2200)
          },
          () => !alive(),
          timers.current,
          16,
        )
      }, 600)
    }, 400)
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
    if (reduced) {
      runStatic()
    } else {
      runSequence()
    }

    return () => {
      cancelled.current = true
      clearAll()
      gen.current += 1
    }
  }, [inView, reduced, runSequence, runStatic, clearAll])

  const stages: { key: Stage; label: string; time: string }[] = [
    { key: 'thinking', label: 'Thinking', time: elapsed.thinking },
    { key: 'writing', label: 'Writing', time: elapsed.writing },
    { key: 'done', label: 'Done', time: elapsed.done },
  ]

  const stageOrder: Stage[] = ['idle', 'thinking', 'writing', 'done']
  const stageIdx = stageOrder.indexOf(stage)

  return (
    <section
      ref={ref}
      id="nyven-writes"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      aria-labelledby="nyven-writes-heading"
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="nyven-writes-heading"
          title="Ask a question. Get a clear answer."
          subtitle="A simulated NYVEN session. Watch it think, write and finish, with timing shown alongside."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Conversation card */}
          <div className="glass-card flex flex-col overflow-hidden min-h-[300px] sm:min-h-[340px]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
              <span
                className="h-2 w-2 rounded-full bg-white/70"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-text-primary">NYVEN</span>
              <span className="text-xs text-text-muted">· Simulated preview</span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              {reduced ? (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-2xl rounded-br-md bg-white/[0.08] px-4 py-2.5 text-sm text-text-primary break-words">
                      {Q1}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-elevated/80 px-4 py-3 text-sm leading-relaxed text-text-secondary break-words">
                      {A1}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-2xl rounded-br-md bg-white/[0.08] px-4 py-2.5 text-sm text-text-primary break-words">
                      {Q2}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-elevated/80 px-4 py-3 text-sm leading-relaxed text-text-secondary break-words">
                      {A2}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-2xl rounded-br-md bg-white/[0.08] px-4 py-2.5 text-sm text-text-primary break-words">
                      {userText || (
                        <span className="text-text-muted/50">&nbsp;</span>
                      )}
                    </div>
                  </div>
                  {(assistantText || typing) && (
                    <div className="flex justify-start">
                      <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-elevated/80 px-4 py-3 text-sm leading-relaxed text-text-secondary break-words">
                        {assistantText}
                        {typing ? (
                          <span className="demo-cursor" aria-hidden="true" />
                        ) : null}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Timeline + log */}
          <div className="glass-card flex flex-col overflow-hidden min-h-[300px] sm:min-h-[340px]">
            <div className="border-b border-white/[0.06] px-5 py-3.5">
              <span className="text-sm font-medium text-text-primary">Activity</span>
              <span className="ml-2 text-xs text-text-muted">Illustrative timing</span>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-5">
              <ol className="relative space-y-0" aria-label="Response stages">
                {stages.map((s, i) => {
                  const active = stage === s.key
                  const complete = stageIdx > stageOrder.indexOf(s.key)
                  return (
                    <li key={s.key} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < stages.length - 1 ? (
                        <span
                          className={`absolute left-[7px] top-4 h-full w-px ${
                            complete ? 'bg-white/20' : 'bg-white/[0.06]'
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border transition-colors duration-300 ${
                          active
                            ? 'border-white/60 bg-white shadow-[0_0_14px_rgba(139,108,255,0.85)]'
                            : complete
                              ? 'border-white/30 bg-white/25'
                              : 'border-white/15 bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`text-sm font-medium ${
                              active || complete
                                ? 'text-text-primary'
                                : 'text-text-muted'
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="font-mono text-xs text-text-muted tabular-nums">
                            {s.time}
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-auto rounded-lg border border-white/[0.06] bg-obsidian/50 p-3 font-mono text-[10px] sm:text-[11px] leading-5 text-text-muted overflow-hidden">
                {LOG_LINES.slice(0, Math.max(logCount, reduced ? LOG_LINES.length : 0)).map(
                  (line) => (
                    <div key={line} className="truncate">
                      {line}
                    </div>
                  ),
                )}
                {!reduced && logCount === 0 ? (
                  <div className="text-text-muted/40">Awaiting events…</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
