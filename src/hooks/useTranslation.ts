import { useTranslation as useReactI18nTranslation } from 'react-i18next'

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useReactI18nTranslation(namespace)
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  
  const currentLanguage = i18n.language
  
  return {
    t,
    changeLanguage,
    currentLanguage,
    i18n,
  }
}
