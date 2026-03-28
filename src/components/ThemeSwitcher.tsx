import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks'
import type { ThemeType } from '@/stores/theme'

// 主题配置：名称、预览色、label
const themes: {
  value: ThemeType
  label: string
  // 用于预览色块的 Tailwind 渐变 class（静态写死，不走变量）
  previewClass: string
}[] = [
  {
    value: 'light-sky',
    label: '浅蓝',
    previewClass: 'from-sky-300 via-blue-200 to-indigo-300',
  },
  {
    value: 'sunset',
    label: '日落',
    previewClass: 'from-orange-300 via-rose-200 to-pink-300',
  },
  {
    value: 'forest',
    label: '森林',
    previewClass: 'from-emerald-300 via-teal-200 to-green-300',
  },
  {
    value: 'purple',
    label: '薰衣草',
    previewClass: 'from-purple-300 via-violet-200 to-fuchsia-300',
  },
  {
    value: 'dark',
    label: '暗夜',
    previewClass: 'from-slate-700 via-slate-600 to-gray-700',
  },
]

const ThemeSwitcher = observer(() => {
  const { themeStore } = useStore()

  return (
    <div className="flex items-center gap-2">
      {themes.map((theme) => {
        const isActive = themeStore.currentTheme === theme.value
        return (
          <button
            key={theme.value}
            onClick={() => themeStore.setTheme(theme.value)}
            title={theme.label}
            aria-label={`切换到${theme.label}主题`}
            aria-pressed={isActive}
            className={[
              'group relative flex flex-col items-center gap-1 cursor-pointer',
            ].join(' ')}
          >
            {/* 色块预览 */}
            <span
              className={[
                'block w-7 h-7 rounded-full bg-gradient-to-br transition-all duration-200',
                theme.previewClass,
                isActive
                  ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-110'
                  : 'opacity-70 hover:opacity-100 hover:scale-105',
              ].join(' ')}
            />
            {/* 主题名 */}
            <span
              className={[
                'text-[10px] transition-colors',
                isActive
                  ? 'text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-text-muted)]',
              ].join(' ')}
            >
              {theme.label}
            </span>
          </button>
        )
      })}
    </div>
  )
})

export default ThemeSwitcher
