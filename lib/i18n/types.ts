export type Language = 'en' | 'pt'

export interface Translations {
  hero: {
    role: string
    description: string
  }
  bento: {
    projects: { title: string; description: string }
    about: { title: string; description: string }
    contact: { title: string; description: string }
    setup: { title: string; description: string }
    blog: { title: string; description: string }
    mediaKit: { title: string; description: string }
    changelog: { title: string; description: string }
  }
  newsletter: {
    title: string
    subtitle: string
    placeholder: string
    button: {
      idle: string
      loading: string
      success: string
    }
    successMessage: string
  }
  languageToggle: {
    switchTo: string
  }
}
