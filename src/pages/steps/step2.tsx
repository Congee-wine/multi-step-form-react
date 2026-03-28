import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks'
import items from '@/assets/data/items.json'

import iconArcade from '@/assets/images/icon-arcade.svg'
import iconAdvanced from '@/assets/images/icon-advanced.svg'
import iconPro from '@/assets/images/icon-pro.svg'

const icons = {
  'icon-arcade.svg': iconArcade,
  'icon-advanced.svg': iconAdvanced,
  'icon-pro.svg': iconPro,
}

const Step2 = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation(['form', 'common'])

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-heading)]">
          {t('selectPlan.title')}
        </h2>
        <p className="text-[var(--color-text-muted)] text-base">
          {t('selectPlan.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.STEP2.map((item) => {
          const isSelected = formStore.plan === item.id
          return (
            <div
              key={item.id}
              onClick={() => formStore.setPlanItem(item.id)}
              className={classNames(
                'border rounded-lg p-4 cursor-pointer transition-all hover:border-[var(--color-primary)] flex md:flex-col gap-4 md:gap-10',
                {
                  'border-[var(--color-primary)] bg-[var(--color-bg-from)]/30':
                    isSelected,
                  'border-[var(--color-surface-border)] bg-transparent':
                    !isSelected,
                },
              )}
            >
              <img
                src={icons[item.icon as keyof typeof icons]}
                alt={item.name}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-[var(--color-text-heading)] font-bold text-base">
                  {t(`selectPlan.plans.${item.id}`)}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                  {formStore.isYearly
                    ? t(`selectPlan.yearly.${item.id}`)
                    : t(`selectPlan.monthly.${item.id}`)}
                </p>
                {formStore.isYearly && (
                  <p className="text-[var(--color-text-heading)] text-xs mt-1 font-medium">
                    {t('discount', { ns: 'common' })}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-[var(--color-bg-from)]/30 rounded-lg py-3 flex justify-center items-center gap-6 mt-8">
        <span
          className={classNames('text-sm font-bold transition-colors', {
            'text-[var(--color-text-heading)]': !formStore.isYearly,
            'text-[var(--color-text-muted)]': formStore.isYearly,
          })}
        >
          {t('monthly', { ns: 'common' })}
        </span>

        <button
          className="w-10 h-5 bg-[var(--color-text-heading)] rounded-full relative flex items-center p-1 cursor-pointer border border-[var(--color-surface-border)] dark:border-transparent"
          onClick={() => formStore.toggleYearly()}
        >
          <div
            className={classNames(
              'w-3 h-3 bg-[var(--color-surface)] rounded-full transition-transform duration-300',
              {
                'translate-x-0': !formStore.isYearly,
                'translate-x-5': formStore.isYearly,
              },
            )}
          />
        </button>

        <span
          className={classNames('text-sm font-bold transition-colors', {
            'text-[var(--color-text-heading)]': formStore.isYearly,
            'text-[var(--color-text-muted)]': !formStore.isYearly,
          })}
        >
          {t('yearly', { ns: 'common' })}
        </span>
      </div>
    </div>
  )
})

export default Step2
