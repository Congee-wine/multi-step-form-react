import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks'

const Step1 = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation('form')

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-heading)]">
          {t('personalInfo.title')}
        </h2>
        <p className="text-[var(--color-text-muted)] text-base">
          {t('personalInfo.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[var(--color-text-base)]"
            >
              {t('personalInfo.name')}
            </label>
            {formStore.errors.name && (
              <span className="text-sm font-bold text-red-500">
                {formStore.errors.name}
              </span>
            )}
          </div>
          <input
            type="text"
            id="name"
            placeholder={t('personalInfo.namePlaceholder')}
            value={formStore.personalInfo.name}
            onChange={(e) => formStore.setPersonalInfo('name', e.target.value)}
            className={classNames(
              'w-full px-4 py-3 rounded-lg border text-[var(--color-text-base)] font-medium focus:outline-none focus:ring-1 transition-all placeholder:text-[var(--color-text-muted)]/70 placeholder:font-normal',
              {
                'border-red-500 bg-transparent focus:ring-red-500':
                  formStore.errors.name,
                'border-[var(--color-surface-border)] bg-[var(--color-bg-from)]/30 focus:ring-[var(--color-primary)]':
                  !formStore.errors.name,
              },
            )}
          />
        </div>

        {/* Email Field with Error State */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--color-text-base)]"
            >
              {t('personalInfo.email')}
            </label>
            {formStore.errors.email && (
              <span className="text-sm font-bold text-red-500">
                {formStore.errors.email}
              </span>
            )}
          </div>
          <input
            type="email"
            id="email"
            placeholder={t('personalInfo.emailPlaceholder')}
            value={formStore.personalInfo.email}
            onChange={(e) => formStore.setPersonalInfo('email', e.target.value)}
            className={classNames(
              'w-full px-4 py-3 rounded-lg border text-[var(--color-text-base)] font-medium focus:outline-none focus:ring-1 transition-all placeholder:text-[var(--color-text-muted)]/70 placeholder:font-normal',
              {
                'border-red-500 bg-transparent focus:ring-red-500':
                  formStore.errors.email,
                'border-[var(--color-surface-border)] bg-[var(--color-bg-from)]/30 focus:ring-[var(--color-primary)]':
                  !formStore.errors.email,
              },
            )}
          />
        </div>

        {/* Phone Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[var(--color-text-base)]"
            >
              {t('personalInfo.phone')}
            </label>
            {formStore.errors.phone && (
              <span className="text-sm font-bold text-red-500">
                {formStore.errors.phone}
              </span>
            )}
          </div>
          <input
            type="tel"
            id="phone"
            placeholder={t('personalInfo.phonePlaceholder')}
            value={formStore.personalInfo.phone}
            onChange={(e) => formStore.setPersonalInfo('phone', e.target.value)}
            className={classNames(
              'w-full px-4 py-3 rounded-lg border text-[var(--color-text-base)] font-medium focus:outline-none focus:ring-1 transition-all placeholder:text-[var(--color-text-muted)]/70 placeholder:font-normal',
              {
                'border-red-500 bg-transparent focus:ring-red-500':
                  formStore.errors.phone,
                'border-[var(--color-surface-border)] bg-[var(--color-bg-from)]/30 focus:ring-[var(--color-primary)]':
                  !formStore.errors.phone,
              },
            )}
          />
        </div>
      </div>
    </div>
  )
})

export default Step1
