import { makeAutoObservable } from 'mobx'

export type ThemeType = 'light-sky' | 'sunset' | 'forest' | 'purple' | 'dark'

export class ThemeStore {
  currentTheme: ThemeType =
    (localStorage.getItem('app-theme') as ThemeType) || 'light-sky'

  constructor() {
    makeAutoObservable(this)
    this.applyTheme(this.currentTheme)
  }

  setTheme(theme: ThemeType) {
    this.currentTheme = theme
    localStorage.setItem('app-theme', theme)
    this.applyTheme(theme)
  }

  private applyTheme(theme: ThemeType) {
    // 移除所有已知的主题 class
    const root = document.documentElement
    root.classList.remove(
      'theme-light-sky',
      'theme-sunset',
      'theme-forest',
      'theme-purple',
      'dark',
    )

    // 添加对应的主题 class
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.add(`theme-${theme}`)
    }
  }
}
