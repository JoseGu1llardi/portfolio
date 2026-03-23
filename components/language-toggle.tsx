'use client'

import { useLanguage } from '@/hooks/use-language'

// flagcdn.com provides reliable SVG country flags
const FLAGS: Record<string, string> = {
  br: 'https://flagcdn.com/br.svg',
  gb: 'https://flagcdn.com/gb.svg',
}

export function LanguageToggle() {
  const { language, toggle, t } = useLanguage()

  // Show the flag of the language you will SWITCH TO (not the current one)
  const targetCode = language === 'en' ? 'br' : 'gb'
  const ariaLabel = t.languageToggle.switchTo

  return (
    <button
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
      aria-label={ariaLabel}
      title={ariaLabel}
      tabIndex={0}
      className="language-toggle-btn"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        background: 'transparent',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
    >
      {/* key forces remount → re-triggers the CSS animation on every toggle */}
      <img
        key={targetCode}
        src={FLAGS[targetCode]}
        alt={ariaLabel}
        width={36}
        height={26}
        style={{
          borderRadius: '4px',
          display: 'block',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
          animation: 'flagFadeIn 0.25s ease forwards',
        }}
      />

      <style>{`
        .language-toggle-btn:hover {
          transform: scale(1.15);
          opacity: 0.85;
        }
        .language-toggle-btn:focus-visible {
          outline: 2px solid hsl(var(--ring, 221 83% 53%));
          outline-offset: 3px;
          border-radius: 6px;
        }
        .language-toggle-btn:active {
          transform: scale(0.93);
        }
        @keyframes flagFadeIn {
          from { opacity: 0; transform: scale(0.7) rotate(-8deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0deg); }
        }
      `}</style>
    </button>
  )
}

