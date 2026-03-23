import type { Language, Translations } from './types'
import en from './en.json'
import pt from './pt.json'

export const STORAGE_KEY = 'portfolio-language'

export const translations: Record<Language, Translations> = {
  en: en as Translations,
  pt: pt as Translations,
}

export function getTranslations(lang: Language): Translations {
  return translations[lang]
}

/**
 * Detects the user's preferred language from the browser.
 * Returns 'pt' if the browser language starts with 'pt', otherwise 'en'.
 */
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language || ''
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}
