'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { Language, Translations } from '@/lib/i18n/types'
import { getTranslations, detectBrowserLanguage, STORAGE_KEY } from '@/lib/i18n'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  toggle: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // On mount: read from localStorage → browser detection → fallback to 'en'
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    const initial = stored ?? detectBrowserLanguage()
    setLanguageState(initial)
    document.documentElement.lang = initial
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [])

  const toggle = useCallback(() => {
    setLanguage(language === 'en' ? 'pt' : 'en')
  }, [language, setLanguage])

  const t = getTranslations(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggle, t }}>
      {/* Suppress hydration mismatch by only rendering after mount */}
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return ctx
}
