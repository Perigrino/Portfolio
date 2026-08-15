/**
 * TerminalLogo — the site's brand mark: a mini terminal window with
 * traffic-light dots, a `$` prompt and a blinking cursor. Mirrors the hero's
 * terminal-window motif so the mark reads as "perigrino" at a glance.
 *
 * Decorative by default (aria-hidden) — pair it with real text, e.g. the
 * `perigrino@vibe` wordmark in the nav.
 */
type Props = {
  size?: number
  className?: string
}

export default function TerminalLogo({ size = 22, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#0c0f14" stroke="#00ff9c" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="#ff5f56" />
      <circle cx="14" cy="8" r="2" fill="#ffbd2e" />
      <circle cx="20" cy="8" r="2" fill="#27c93f" />
      <line x1="1" y1="12.5" x2="31" y2="12.5" stroke="rgba(255, 255, 255, 0.1)" />
      <text
        x="7.5"
        y="24.5"
        fill="#00ff9c"
        fontSize="13"
        fontFamily="'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
        fontWeight="700"
      >
        $
      </text>
      <rect className="t1-logo-cursor" x="17.5" y="15.5" width="7" height="9" fill="#00ff9c" />
    </svg>
  )
}
