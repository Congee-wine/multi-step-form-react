import { observer } from 'mobx-react-lite'
import iconThankYou from '@/assets/images/icon-thank-you.svg'
import { useStore } from '@/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Thanks = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation('common')

  useEffect(() => {
    formStore.clearStoreageForm()
  }, [formStore])

  return (
    <div className="flex flex-col h-full animate-fade-in items-center justify-center text-center py-16">
      <img src={iconThankYou} alt="Thank you" className="w-20 h-20 mb-8" />
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-heading)]">
        {t('thankYou')}
      </h2>
      <p className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-[450px]">
        {t('thankYouNotice')}
      </p>
    </div>
  )
})

export default Thanks
