'use client'

import { useLanguageContext } from '@/context/LanguageContext'

/**
 * Convenience hook that exposes the language context.
 *
 * @example
 * const { t, language, setLanguage, toggle } = useLanguage()
 */
export function useLanguage() {
  return useLanguageContext()
}
