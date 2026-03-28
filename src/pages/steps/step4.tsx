import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks'
const Step4 = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation(['common', 'form'])

  const planName = t(`selectPlan.plans.${formStore.plan}`, { ns: 'form' })
  const planPrice = formStore.isYearly
    ? t(`selectPlan.yearly.${formStore.plan}`, { ns: 'form' })
    : t(`selectPlan.monthly.${formStore.plan}`, { ns: 'form' })
  const billingText = formStore.isYearly
    ? `(${t('yearly')})`
    : `(${t('monthly')})`

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-heading)]">
          {t('summary.title', { ns: 'form' })}
        </h2>
        <p className="text-[var(--color-text-muted)] text-base">
          {t('summary.subtitle', { ns: 'form' })}
        </p>
      </div>

      <div className="bg-[var(--color-bg-from)]/30 rounded-lg p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[var(--color-text-heading)] font-bold text-base">
              {planName} {billingText}
            </h3>
            <button
              onClick={() => formStore.setTabActive('2')}
              className="text-[var(--color-text-muted)] underline hover:text-[var(--color-primary)] transition-colors text-sm mt-1 cursor-pointer"
            >
              {t('change')}
            </button>
          </div>
          <div className="text-[var(--color-text-heading)] font-bold text-base">
            {planPrice}
          </div>
        </div>

        {formStore.addons.length > 0 && (
          <div className="h-[1px] w-full bg-[var(--color-surface-border)] opacity-50 my-2"></div>
        )}

        {formStore.addons.map((addon) => (
          <div key={addon.id} className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)] text-sm">
              {addon.title}
            </span>
            <span className="text-[var(--color-text-heading)] font-medium text-sm">
              {formStore.isYearly ? addon.yearly : addon.monthly}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center px-6 mt-6">
        <span className="text-[var(--color-text-muted)] text-sm">
          {formStore.isYearly ? t('yearlyTotal') : t('monthlyTotal')}
        </span>
        <span className="text-[var(--color-primary)] font-bold text-xl">
          +¥{formStore.calculatedTotalCost}/
          {formStore.isYearly ? t('yearly') : t('monthly')}
        </span>
      </div>
    </div>
  )
})

export default Step4
