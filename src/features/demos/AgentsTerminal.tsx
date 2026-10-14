import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { products } from '../ecosystem/products'

type LineKind = 'context' | 'add' | 'del' | 'blank'

interface CodeLine {
  n: number
  kind: LineKind
  tokens: { text: string; cls?: string }[]
}

const CODE_LINES: CodeLine[] = [
  {
    n: 1,
    kind: 'context',
    tokens: [
      { text: 'import', cls: 'syn-kw' },
      { text: ' type ', cls: 'syn-kw' },
      { text: '{ Request, Response, NextFunction }', cls: 'syn-type' },
      { text: ' from ', cls: 'syn-kw' },
      { text: "'express'", cls: 'syn-str' },
    ],
  },
  { n: 2, kind: 'blank', tokens: [] },
  {
    n: 3,
    kind: 'del',
    tokens: [
      { text: '// TODO: protect routes', cls: 'syn-cm' },
    ],
  },
  {
    n: 4,
    kind: 'add',
    tokens: [
      { text: 'const', cls: 'syn-kw' },
      { text: ' WINDOW_MS', cls: 'syn-var' },
      { text: ' = ', cls: 'syn-op' },
      { text: '60_000', cls: 'syn-num' },
    ],
  },
  {
    n: 5,
    kind: 'add',
    tokens: [
      { text: 'const', cls: 'syn-kw' },
      { text: ' MAX_REQUESTS', cls: 'syn-var' },
      { text: ' = ', cls: 'syn-op' },
      { text: '100', cls: 'syn-num' },
    ],
  },
  { n: 6, kind: 'blank', tokens: [] },
  {
    n: 7,
    kind: 'add',
    tokens: [
      { text: 'export', cls: 'syn-kw' },
      { text: ' function ', cls: 'syn-kw' },
      { text: 'rateLimit', cls: 'syn-fn' },
      { text: '(', cls: 'syn-op' },
      { text: 'req', cls: 'syn-var' },
      { text: ': ', cls: 'syn-op' },
      { text: 'Request', cls: 'syn-type' },
      { text: ',', cls: 'syn-op' },
    ],
  },
  {
    n: 8,
    kind: 'add',
    tokens: [
      { text: '  res', cls: 'syn-var' },
      { text: ': ', cls: 'syn-op' },
      { text: 'Response', cls: 'syn-type' },
      { text: ',', cls: 'syn-op' },
      { text: ' next', cls: 'syn-var' },
      { text: ': ', cls: 'syn-op' },
      { text: 'NextFunction', cls: 'syn-type' },
      { text: ')', cls: 'syn-op' },
      { text: ' {', cls: 'syn-op' },
    ],
  },
  {
    n: 9,
    kind: 'add',
    tokens: [
      { text: '  const', cls: 'syn-kw' },
      { text: ' key', cls: 'syn-var' },
      { text: ' = ', cls: 'syn-op' },
      { text: 'req.ip', cls: 'syn-var' },
      { text: ' ?? ', cls: 'syn-op' },
      { text: "'unknown'", cls: 'syn-str' },
    ],
  },
  {
    n: 10,
    kind: 'add',
    tokens: [
      { text: '  // illustrative demo middleware', cls: 'syn-cm' },
    ],
  },
  {
    n: 11,
    kind: 'add',
    tokens: [
      { text: '  if', cls: 'syn-kw' },
      { text: ' (', cls: 'syn-op' },
      { text: 'isLimited', cls: 'syn-fn' },
      { text: '(key)) ', cls: 'syn-op' },
      { text: 'return', cls: 'syn-kw' },
      { text: ' res.status(', cls: 'syn-var' },
      { text: '429', cls: 'syn-num' },
      { text: ')', cls: 'syn-op' },
    ],
  },
  {
    n: 12,
    kind: 'add',
    tokens: [
      { text: '  next()', cls: 'syn-fn' },
    ],
  },
  {
    n: 13,
    kind: 'add',
    tokens: [{ text: '}', cls: 'syn-op' }],
  },
]

const PROMPT = 'Add rate limiting to all API routes.'

export function AgentsTerminal() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const reduced = usePrefersReducedMotion()
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())
  const gen = useRef(0)
  const cancelled = useRef(false)

  const [status, setStatus] = useState<'running' | 'done'>('running')
  const [visibleLines, setVisibleLines] = useState(0)
  const [promptText, setPromptText] = useState('')
  const [promptDone, setPromptDone] = useState(false)

  const agentsProduct = products.find((p) => p.id === 'agents')
  const agentsHref = agentsProduct?.href ?? null

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
    setStatus('done')
    setVisibleLines(CODE_LINES.length)
    setPromptText(PROMPT)
    setPromptDone(true)
  }, [])

  const runSequence = useCallback(() => {
    const myGen = ++gen.current
    cancelled.current = false
    clearAll()
    setStatus('running')
    setVisibleLines(0)
    setPromptText('')
    setPromptDone(false)

    const alive = () => myGen === gen.current && !cancelled.current

    let line = 0
    const revealLine = () => {
      if (!alive()) return
      line += 1
      setVisibleLines(line)
      if (line < CODE_LINES.length) {
        schedule(revealLine, 90)
      } else {
        // Type prompt
        let i = 0
        const typePrompt = () => {
          if (!alive()) return
          i = Math.min(i + 1, PROMPT.length)
          setPromptText(PROMPT.slice(0, i))
          if (i < PROMPT.length) {
            schedule(typePrompt, 28)
          } else {
            setPromptDone(true)
            setStatus('done')
            schedule(() => {
              if (alive()) runSequence()
            }, 3500)
          }
        }
        schedule(typePrompt, 400)
      }
    }

    schedule(revealLine, 500)
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
      id="agents-demo"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      aria-labelledby="agents-demo-heading"
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="agents-demo-heading"
          title="Describe the change. Watch it get made."
          subtitle="Agents turns a plain-language request into working code. This is a simulated session, not live execution."
        />

        <div className="mx-auto max-w-3xl">
          <div className="glass-card glass-card--dark overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="flex-1 truncate text-center font-mono text-[11px] sm:text-xs text-text-muted px-1">
                src/middleware/auth.ts
              </span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                  status === 'running'
                    ? 'bg-white/[0.06] text-text-secondary'
                    : 'bg-emerald-500/10 text-emerald-400/90'
                }`}
              >
                {status === 'running' ? 'running' : 'done'}
              </span>
            </div>

            <div className="px-4 pt-3 pb-1">
              <p className="font-mono text-[11px] text-text-muted">
                Thought for 4.1s · illustrative
              </p>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                Edit <span className="text-text-primary">src/middleware/auth.ts</span>
              </p>
            </div>

            {/* Code */}
            <div
              className="max-w-full overflow-x-auto overscroll-x-contain px-2 py-3 font-mono text-[11px] leading-[1.65] sm:text-[13px]"
              role="region"
              aria-label="Illustrative code editor"
            >
              <table className="w-full border-collapse">
                <tbody>
                  {CODE_LINES.slice(0, visibleLines).map((line) => (
                    <tr
                      key={line.n}
                      className={
                        line.kind === 'add'
                          ? 'line-add'
                          : line.kind === 'del'
                            ? 'line-del'
                            : undefined
                      }
                    >
                      <td className="w-6 select-none pr-1 text-right text-text-muted/50">
                        {line.kind === 'add' ? (
                          <span className="text-emerald-500/70">+</span>
                        ) : line.kind === 'del' ? (
                          <span className="text-red-400/70">−</span>
                        ) : null}
                      </td>
                      <td className="w-8 select-none pr-3 text-right text-text-muted/40 tabular-nums">
                        {line.n}
                      </td>
                      <td className="whitespace-pre pr-4">
                        {line.tokens.length === 0 ? '\u00a0' : null}
                        {line.tokens.map((t, i) => (
                          <span key={i} className={t.cls}>
                            {t.text}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prompt bar */}
            <div className="border-t border-white/[0.06] px-4 py-3">
              <div className="flex items-start gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
                <span className="mt-0.5 font-mono text-xs text-text-muted">›</span>
                <p className="min-h-[1.25rem] flex-1 font-mono text-xs text-text-primary sm:text-sm">
                  {promptText}
                  {!promptDone && !reduced ? (
                    <span className="demo-cursor" aria-hidden="true" />
                  ) : null}
                </p>
              </div>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
              <span className="text-sm font-medium text-text-primary">Agents</span>
              {agentsHref ? (
                <a
                  href={agentsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Open Agents
                </a>
              ) : (
                <span className="text-sm text-text-muted">Coming soon</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
