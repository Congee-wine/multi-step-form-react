import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks'
import items from '@/assets/data/items.json'
import iconCheckmark from '@/assets/images/icon-checkmark.svg'

const Step3 = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation('form')

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-heading)]">
          {t('addons.title')}
        </h2>
        <p className="text-[var(--color-text-muted)] text-base">
          {t('addons.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {items.STEP3.map((item) => {
          const isSelected = formStore.addons.some(
            (addon) => addon.id === item.id,
          )

          return (
            <div
              key={item.id}
              onClick={() => formStore.toggleAddon(item)}
              className={classNames(
                'border rounded-lg p-4 cursor-pointer transition-all hover:border-[var(--color-primary)] flex items-center gap-4',
                {
                  'border-[var(--color-primary)] bg-[var(--color-bg-from)]/30':
                    isSelected,
                  'border-[var(--color-surface-border)] bg-transparent':
                    !isSelected,
                },
              )}
            >
              <div
                className={classNames(
                  'w-5 h-5 rounded border flex items-center justify-center transition-colors',
                  {
                    'bg-[var(--color-primary)] border-[var(--color-primary)]':
                      isSelected,
                    'border-[var(--color-surface-border)] bg-transparent':
                      !isSelected,
                  },
                )}
              >
                {isSelected && <img src={iconCheckmark} alt="checkmark" />}
              </div>

              <div className="flex-1">
                <h3 className="text-[var(--color-text-heading)] font-bold text-base">
                  {t(`addons.items.${item.id}.title`)}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                  {t(`addons.items.${item.id}.subtitle`)}
                </p>
              </div>

              <div className="text-[var(--color-text-base)] text-sm font-medium">
                {formStore.isYearly
                  ? t(`addons.yearly.${item.id}`)
                  : t(`addons.monthly.${item.id}`)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default Step3
