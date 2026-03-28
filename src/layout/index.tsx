import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks'

import tabs from '@/assets/data/tabs-info.json'

import Step1 from '@/pages/steps/step1'
import Step2 from '@/pages/steps/step2'
import Step3 from '@/pages/steps/step3'
import Step4 from '@/pages/steps/step4'
import Thanks from '@/pages/steps/thanks'

const Layout = observer(() => {
  const { formStore } = useStore()
  const { t } = useTranslation(['common', 'steps'])
  const [toastMsg, setToastMsg] = useState('')

  // 用于切换当前显示的步骤
  const setTabContent = (tabId: string) => {
    formStore.setTabActive(tabId)
  }

  const onSubmit = () => {
    if (
      (formStore.nowTab === '1' && formStore.validateAll()) ||
      formStore.nowTab === '2' ||
      formStore.nowTab === '3' ||
      formStore.nowTab === '4'
    ) {
      setTabContent(String(Number(formStore.nowTab) + 1))
    }
  }

  const goBack = () => {
    if (Number(formStore.nowTab) > 1) {
      setTabContent(String(Number(formStore.nowTab) - 1))
    }
  }

  const handleStepClick = (tabId: string) => {
    if (formStore.nowTab === tabId) return

    if (formStore.visitedSteps.includes(tabId)) {
      setTabContent(tabId)
    } else {
      setToastMsg(t('orderTip'))
      setTimeout(() => setToastMsg(''), 3000)
    }
  }

  return (
    <div className="mt-10 w-full max-w-[970px] mx-auto relative">
      {/* Toast 提示 */}
      {toastMsg && (
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50">
          {toastMsg}
        </div>
      )}

      <div className="bg-[var(--surface)] w-full max-w-[900px] rounded-2xl shadow-lg flex flex-col md:flex-row p-4 gap-4 h-[600px]">
        {/* 左侧侧边栏 (Sidebar) */}
        {formStore.nowTab !== '5' && (
          <div className="md:w-[274px] rounded-xl bg-gradient-to-b from-[var(--color-sidebar-from)] to-[var(--color-sidebar-to)] p-8 text-[var(--color-sidebar-text)]">
            <div className="flex flex-col gap-6">
              {tabs.map((item) => {
                const isActive = formStore.nowTab === item.id
                const isVisited = formStore.visitedSteps.includes(item.id)

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 transition-all ${isVisited ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-50'}`}
                    onClick={() => handleStepClick(item.id)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border border-[var(--color-sidebar-text)] flex items-center justify-center font-bold transition-colors ${isActive ? 'bg-white/30 text-[var(--color-sidebar-text)]' : isVisited ? 'bg-white/10 text-[var(--color-sidebar-text)]' : 'text-[var(--color-sidebar-text)] opacity-50 border-opacity-50'}`}
                    >
                      {item.id}
                    </div>
                    <div className="hidden md:block">
                      <div
                        className={`text-xs ${isActive || isVisited ? 'opacity-70' : 'opacity-40'}`}
                      >
                        {t(`step${item.id}.step`, { ns: 'steps' })}
                      </div>
                      <div
                        className={`font-bold tracking-widest ${!isActive && !isVisited ? 'opacity-50' : ''}`}
                      >
                        {t(`step${item.id}.name`, { ns: 'steps' })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 右侧内容区 (Content) */}
        <div className="flex-1 px-8 py-6 relative flex flex-col">
          <div className="flex-1">
            {formStore.nowTab === '1' && <Step1 />}
            {formStore.nowTab === '2' && <Step2 />}
            {formStore.nowTab === '3' && <Step3 />}
            {formStore.nowTab === '4' && <Step4 />}
            {formStore.nowTab === '5' && <Thanks />}
          </div>

          {/* 底部导航按钮 */}
          {formStore.nowTab !== '5' && (
            <div className="flex justify-between items-center mt-auto pt-4">
              {formStore.nowTab !== '1' && (
                <button
                  onClick={goBack}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] font-medium transition-colors cursor-pointer"
                >
                  {t('back', { ns: 'common' })}
                </button>
              )}
              <button
                onClick={onSubmit}
                className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors ml-auto cursor-pointer"
              >
                {formStore.nowTab === '4'
                  ? t('confirm', { ns: 'common' })
                  : t('next', { ns: 'common' })}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Layout
