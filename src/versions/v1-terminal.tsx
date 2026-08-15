import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { content, pexelsCredit } from '../content'
import type { Project } from '../content'
import TerminalLogo from '../components/TerminalLogo'
import { useCountUp } from '../hooks/useCountUp'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useGlow } from '../hooks/useGlow'
import { useInView } from '../hooks/useInView'
import { useReveal } from '../hooks/useReveal'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useTheme } from '../hooks/useTheme'
import { useTypewriter } from '../hooks/useTypewriter'
import './v1-terminal.css'

const SECTION_IDS = content.ui.nav.map((n) => n.id)

/** Per-item stagger delay for reveal animations. */
const rd = (i: number): CSSProperties =>
  ({ '--rd': `${i * 70}ms` }) as CSSProperties

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll-depth transform for hero parallax layers (transform-only, cheap). */
const parallax = (y: number, factor: number, reduced: boolean): CSSProperties | undefined =>
  reduced ? undefined : { transform: `translate3d(0, ${Math.round(y * factor)}px, 0)` }

/**
 * A project card with a cursor-following neon glow. The mouse position is
 * written straight to CSS custom properties (no re-render), and the glow is
 * painted by a ::before overlay in CSS.
 */
function ProjectCard({ project, style }: { project: Project; style?: CSSProperties }) {
  const { ref, handleMouseMove } = useGlow<HTMLElement>()

  return (
    <article ref={ref} className="t1-proj" data-reveal style={style} onMouseMove={handleMouseMove}>
      <div className="t1-proj-imgwrap">
        <img src={project.image} alt={project.title} loading="lazy" />
        <span className="t1-proj-year">{project.year}</span>
      </div>
      <div className="t1-proj-body">
        <p className="t1-proj-tagline">{project.tagline}</p>
        <h3 className="t1-proj-title">{project.title}</h3>
        <p className="t1-proj-desc">{project.description}</p>
        <ul className="t1-proj-stack">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {(project.demo || project.repo) && (
          <div className="t1-proj-links">
            {project.demo && (
              <a
                className="t1-proj-link t1-proj-link-demo"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                {content.ui.projectLinks.demo}
              </a>
            )}
            {project.repo && (
              <a className="t1-proj-link" href={project.repo} target="_blank" rel="noreferrer">
                {content.ui.projectLinks.source}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/** A generic card surface with the cursor-follow glow (stack + process). */
function GlowCard({
  className,
  style,
  reveal,
  children,
}: {
  className: string
  style?: CSSProperties
  reveal?: boolean
  children: ReactNode
}) {
  const { ref, handleMouseMove } = useGlow<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-reveal={reveal || undefined}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}

/** A stat number that counts up once its card scrolls into view. */
function CountUp({ value, start }: { value: number; start: boolean }) {
  const current = useCountUp(value, start)
  return <span className="t1-count">{current.toLocaleString('en-US')}</span>
}

/**
 * Renders **bold** markers from content strings as <strong>. When emphasis is
 * present, the paragraph exposes the plain text as its accessible name (with
 * the fragments hidden) so the a11y tree still reads one coherent sentence.
 */
function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  const hasBold = parts.length > 1
  return (
    <p className={className} aria-label={hasBold ? text.replace(/\*\*/g, '') : undefined}>
      <span aria-hidden={hasBold || undefined}>
        {parts.filter(Boolean).map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i}>{part}</strong>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </span>
    </p>
  )
}

/**
 * A highlight card. Any integers in the copy count up on reveal — except
 * numbers >= 1000, which are treated as years and stay static.
 */
function HighlightItem({ text, style }: { text: string; style?: CSSProperties }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.4)
  const parts = text.split(/(\d+)/)

  return (
    <li ref={ref} className="t1-hl" data-reveal style={style} aria-label={text}>
      <span className="t1-hl-check" aria-hidden="true">✔</span>
      <span aria-hidden="true">
        {parts.filter(Boolean).map((part, i) => {
          if (!/^\d+$/.test(part)) return <span key={i}>{part}</span>
          const n = Number(part)
          return n >= 1000 ? (
            <span key={i}>{part}</span>
          ) : (
            <CountUp key={i} value={n} start={inView} />
          )
        })}
      </span>
    </li>
  )
}

function BackToTop() {
  const scrollY = useScrollPosition()
  const visible = scrollY > 640

  return (
    <a
      className={`t1-top${visible ? ' is-visible' : ''}`}
      href="#top"
      aria-label={content.ui.backToTopAria}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      {content.ui.backToTop}
    </a>
  )
}

export default function TerminalVersion() {
  const rootRef = useReveal<HTMLDivElement>()
  const active = useScrollSpy(SECTION_IDS)
  const scrollY = useScrollPosition()
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  const reduced = prefersReducedMotion()
  const depth = Math.min(scrollY, window.innerHeight)
  const typed = useTypewriter(content.headline, 60, 900)
  const headlineDone = typed.length === content.headline.length
  // Chain a second command: type the headline, pause, then a `git log` readout.
  const gitDelay = 900 + content.headline.length * 60 + 1400
  const gitOut = useTypewriter(content.terminal.gitLogOutput, 38, gitDelay)

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const wasOpen = useRef(false)
  const videoARef = useRef<HTMLVideoElement | null>(null)
  const videoBRef = useRef<HTMLVideoElement | null>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useFocusTrap(menuRef, menuOpen, closeMenu)

  // Focus the first link when opening; restore focus to the toggle on close.
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true
      menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    } else if (wasOpen.current) {
      wasOpen.current = false
      toggleRef.current?.focus()
    }
  }, [menuOpen])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Seamless loop with two crossfading layers (both themes, each with its own
  // footage). The visible layer plays to the end while the hidden one starts
  // from frame 0 just before the loop point; a 1s dissolve swaps them, so the
  // layer that restarts is always invisible. The hidden layer stays paused to
  // save decode. Reduced motion keeps a single natively-looping video instead.
  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a) return

    if (prefersReducedMotion() || !b) {
      a.loop = true
      b?.pause()
      return
    }

    const FADE_MS = 1000
    let active = a
    let fading = false
    let swapTimer: number | undefined

    const swap = () => {
      if (fading) return
      fading = true
      const incoming = active === a ? b : a
      const outgoing = active
      incoming.currentTime = 0
      void incoming.play()
      incoming.classList.remove('is-hidden')
      outgoing.classList.add('is-hidden')
      active = incoming
      window.clearTimeout(swapTimer)
      swapTimer = window.setTimeout(() => {
        fading = false
        outgoing.pause()
      }, FADE_MS)
    }

    const onTimeUpdate = (e: Event) => {
      const v = e.target as HTMLVideoElement
      if (v === active && v.duration && v.currentTime >= v.duration - FADE_MS / 1000) {
        swap()
      }
    }

    a.addEventListener('timeupdate', onTimeUpdate)
    b.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate)
      b.removeEventListener('timeupdate', onTimeUpdate)
      window.clearTimeout(swapTimer)
    }
  }, [dark])

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 701px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="t1" ref={rootRef}>
      <a className="t1-skip" href="#main">
        {content.ui.skip}
      </a>

      <nav className={`t1-nav${scrollY > 60 ? ' is-scrolled' : ''}`} aria-label={content.ui.navAria}>
        <span className="t1-nav-name">
          <TerminalLogo size={22} />
          <span>{content.name}</span>
        </span>
        <button
          ref={toggleRef}
          type="button"
          className={`t1-menu-btn${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="t1-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? content.ui.menu.close : content.ui.menu.open}</span>
          <span className="t1-menu-icon" aria-hidden="true" />
        </button>
        <div
          ref={menuRef}
          id="t1-menu"
          className={`t1-nav-links${menuOpen ? ' is-open' : ''}`}
        >
          {content.ui.nav.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={isActive ? 'is-active' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            )
          })}
          <a className="t1-nav-mail" href={`mailto:${content.emailTo}`} onClick={closeMenu}>
            {content.email}
          </a>
          <button
            type="button"
            className="t1-theme-btn"
            onClick={toggle}
            aria-label={dark ? content.ui.theme.lightAria : content.ui.theme.darkAria}
          >
            <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
            {dark ? content.ui.theme.light : content.ui.theme.dark}
          </button>
        </div>
      </nav>

      <main id="main">
        <section className="t1-hero" id="top">
          {/* Light-mode backdrop: soft glows show through while the light video
              streams in, and act as the fallback if autoplay is blocked. */}
          {!dark && <div className="t1-hero-lightback" aria-hidden="true" />}
          <>
            <video
              key={dark ? 'hero-dark' : 'hero-light'}
              ref={videoARef}
              className="t1-hero-video"
              style={parallax(depth, 0.22, reduced)}
              autoPlay
              muted
              playsInline
              poster={dark ? '/assets/img/code-dark.jpg' : '/assets/img/light-poster.jpg'}
            >
              <source
                src={dark ? '/assets/video/typing-code-loop.mp4' : '/assets/video/light-loop.mp4'}
                type="video/mp4"
              />
            </video>
            {/* Standby layer: stays paused at frame 0 until its crossfade turn. */}
            <video
              key={dark ? 'hero-dark-b' : 'hero-light-b'}
              ref={videoBRef}
              className="t1-hero-video t1-hero-dupe is-hidden"
              style={parallax(depth, 0.22, reduced)}
              muted
              playsInline
              preload="auto"
              poster={dark ? '/assets/img/code-dark.jpg' : '/assets/img/light-poster.jpg'}
              aria-hidden="true"
            >
              <source
                src={dark ? '/assets/video/typing-code-loop.mp4' : '/assets/video/light-loop.mp4'}
                type="video/mp4"
              />
            </video>
          </>
          <div className="t1-hero-overlay" />
          <div className="t1-hero-grid" style={parallax(depth, 0.42, reduced)} />

          <div className="t1-hero-inner">
            <div className="t1-window" data-reveal aria-hidden="true">
              <div className="t1-window-bar">
                <span className="t1-dot t1-dot-r" />
                <span className="t1-dot t1-dot-y" />
                <span className="t1-dot t1-dot-g" />
                <span className="t1-window-title">{content.name} — {content.terminal.windowTitle}</span>
              </div>
              <div className="t1-window-body">
                <p>
                  <span className="t1-prompt">{content.terminal.prompt}</span>
                  <span className="t1-cmd"> {content.terminal.cwd}</span>
                </p>
                <p className="t1-out">
                  <span className="t1-arrow">➜</span> {content.terminal.whoami}
                </p>
                <p className="t1-out t1-out-dim">{content.terminal.whoamiOutput}</p>
                <p className="t1-out">
                  <span className="t1-arrow">➜</span> {content.terminal.cat}
                </p>
                <p className="t1-out t1-out-dim t1-type">
                  {typed}
                  {!headlineDone && <span className="t1-cursor">▋</span>}
                </p>
                {headlineDone && (
                  <div className="t1-git">
                    <p className="t1-out">
                      <span className="t1-arrow">➜</span> {content.terminal.gitLog}
                    </p>
                    <p className="t1-out t1-out-dim t1-git-out">
                      {gitOut}
                      <span className="t1-cursor">▋</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="t1-hero-text" data-reveal style={rd(1)}>
              <p className="t1-role">{content.role}</p>
              <h1 className="t1-title">{content.headline}</h1>
              {content.subheadline.map((s) => (
                <p className="t1-sub" key={s}>
                  {s}
                </p>
              ))}
              <div className="t1-cta">
              <a href="#projects" className="t1-btn t1-btn-primary">
                {content.ui.cta.viewProjects}
              </a>
              <a href="#contact" className="t1-btn t1-btn-ghost">
                {content.ui.cta.sayHello}
              </a>
              </div>
              <p className="t1-loc">📍 {content.location}</p>
            </div>
          </div>
        </section>

        <section className="t1-sec" id="about" data-reveal>
          <div className="t1-sec-head">
            <span className="t1-tag">{content.ui.sections.about.tag}</span>
            <h2 className="t1-h2">{content.ui.sections.about.title}</h2>
          </div>
          <RichText className="t1-lead" text={content.about.intro} />
          {content.about.paragraphs.map((p) => (
            <RichText className="t1-body" key={p} text={p} />
          ))}
          <ul className="t1-highlights">
            {content.about.highlights.map((h, i) => (
              <HighlightItem key={h} text={h} style={rd(i)} />
            ))}
          </ul>
        </section>

        <section className="t1-sec" id="stack" data-reveal>
          <div className="t1-sec-head">
            <span className="t1-tag">{content.ui.sections.stack.tag}</span>
            <h2 className="t1-h2">{content.ui.sections.stack.title}</h2>
          </div>
          <div className="t1-stack">
            {content.stack.map((cat, i) => (
              <GlowCard className="t1-stack-card" key={cat.category} reveal style={rd(i)}>
                <h3 className="t1-stack-cat">[ {cat.category} ]</h3>
                <ul className="t1-stack-items">
                  {cat.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
          <div className="t1-tools" data-reveal>
            <span className="t1-tools-label">{content.ui.toolsLabel}</span>
            <div className="t1-tools-chips">
              {content.tools.map((t, i) => (
                <span className="t1-chip" key={t} data-reveal style={rd(i)}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="t1-sec" id="projects" data-reveal>
          <div className="t1-sec-head">
            <span className="t1-tag">{content.ui.sections.projects.tag}</span>
            <h2 className="t1-h2">{content.ui.sections.projects.title}</h2>
          </div>
          <div className="t1-projects">
            {content.projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} style={rd(i % 3)} />
            ))}
          </div>
        </section>

        <section className="t1-sec" id="process" data-reveal>
          <div className="t1-sec-head">
            <span className="t1-tag">{content.ui.sections.process.tag}</span>
            <h2 className="t1-h2">{content.ui.sections.process.title}</h2>
          </div>
          <div className="t1-process">
            {content.process.map((s, i) => (
              <GlowCard className="t1-step" key={s.step} reveal style={rd(i)}>
                <span className="t1-step-num">{s.step}</span>
                <h3 className="t1-step-title">{s.title}</h3>
                <p className="t1-step-desc">{s.description}</p>
              </GlowCard>
            ))}
          </div>
          <p className="t1-process-mantra" data-reveal>
            {content.processClosing}
          </p>
        </section>

        <section className="t1-sec t1-sec-contact" id="contact" data-reveal>
          <div className="t1-sec-head">
            <span className="t1-tag">{content.ui.sections.contact.tag}</span>
            <h2 className="t1-h2">{content.ui.sections.contact.title}</h2>
          </div>
          <p className="t1-contact-lead">{content.contact.headline}</p>
          {content.contact.paragraphs.map((p, i) => (
            <p
              className={`t1-contact-note${i === content.contact.paragraphs.length - 1 ? ' t1-contact-closer' : ''}`}
              key={p}
            >
              {p}
            </p>
          ))}
          <a className="t1-btn t1-btn-primary t1-mail" href={`mailto:${content.emailTo}`}>
            {content.email}
          </a>
          <div className="t1-socials">
            {content.socials.map((s) => (
              <a className="t1-social" href={s.url} target="_blank" rel="noreferrer" key={s.label}>
                ↗ {s.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="t1-foot">
        <span>
          © {new Date().getFullYear()} {content.name} · {content.location}
        </span>
        <span className="t1-credit">
          {pexelsCredit.note}{' '}
          <a href={pexelsCredit.url} target="_blank" rel="noreferrer">
            {pexelsCredit.label}
          </a>
        </span>
      </footer>

      <BackToTop />
    </div>
  )
}
