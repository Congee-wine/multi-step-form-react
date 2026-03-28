import { useTranslation } from 'react-i18next'
import { supportedLocales } from '@/i18n'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    i18n.changeLanguage(newLang)
    localStorage.setItem('locale', newLang)
  }

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="appearance-none px-3 py-1.5 rounded-lg border border-[var(--color-surface-border)] bg-[var(--surface)] text-[var(--color-text-base)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors cursor-pointer"
      >
        {supportedLocales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
