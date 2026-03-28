import { createContext } from 'react'
import { FormStore } from './form'
import { ThemeStore } from './theme'

// 1. 创建所有 Store 的根实例
class RootStore {
  formStore: FormStore
  themeStore: ThemeStore

  constructor() {
    this.formStore = new FormStore()
    this.themeStore = new ThemeStore()
  }
}

export const rootStore = new RootStore()

// 2. 创建 React Context
export const StoreContext = createContext<RootStore>(rootStore)
