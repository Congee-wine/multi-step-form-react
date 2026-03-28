import { observer } from 'mobx-react-lite'
import Layout from '@/layout'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const App = observer(() => {
  return (
    /*
      bg-gradient-to-br 配合三个 from/via/to 变量实现主题背景渐变。
      这三个变量在 index.css 里随主题 class 切换。
    */
    <div
      className="min-h-screen bg-gradient-to-br
        from-[var(--color-bg-from)]
        via-[var(--color-bg-via)]
        to-[var(--color-bg-to)]
        transition-all duration-500"
    >
      {/* 主内容 */}
      <div className="p-8">
        <div className="flex justify-between items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <Layout />
      </div>
    </div>
  )
})

export default App
