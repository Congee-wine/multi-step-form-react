import { makeAutoObservable, autorun } from 'mobx'
import { type IPersonal, type IStep3 } from '@/types/items'

const STORAGE_KEY = 'multi_step_form_state'

export class FormStore {
  nowTab: string = '1'
  plan: string = '1'
  visitedSteps: string[] = ['1']
  isYearly: boolean = false
  personalInfo: IPersonal = { name: '', email: '', phone: '' }
  addons: IStep3[] = []

  errors: Record<keyof IPersonal, string> = { name: '', email: '', phone: '' }
  touched: Record<keyof IPersonal, boolean> = {
    name: false,
    email: false,
    phone: false,
  }

  constructor() {
    this.loadFromStorage()
    makeAutoObservable(this)
    autorun(
      () => {
        if (this.nowTab !== '5') {
          this.saveToStorage()
        }
      },
      { delay: 500 },
    )
  }

  // === 内部持久化方法 ===
  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // 把存下来的值赋值给实例属性
        if (parsed.nowTab) this.nowTab = parsed.nowTab
        if (parsed.plan) this.plan = parsed.plan
        if (typeof parsed.isYearly === 'boolean')
          this.isYearly = parsed.isYearly
        if (parsed.personalInfo) this.personalInfo = parsed.personalInfo
        if (parsed.addons) this.addons = parsed.addons
        if (parsed.visitedSteps) this.visitedSteps = parsed.visitedSteps
        if (parsed.errors) this.errors = parsed.errors
        if (parsed.touched) this.touched = parsed.touched
      }
    } catch (e) {
      console.error('Failed to load store from localStorage', e)
    }
  }

  private saveToStorage() {
    const dataToSave = {
      nowTab: this.nowTab,
      plan: this.plan,
      isYearly: this.isYearly,
      personalInfo: this.personalInfo,
      addons: this.addons,
      visitedSteps: this.visitedSteps,
      errors: this.errors,
      touched: this.touched,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }

  // === 校验逻辑 ===
  // 校验单个字段
  validateField(field: keyof IPersonal) {
    const value = this.personalInfo[field].trim()

    if (!value) {
      this.errors[field] = '此字段为必填项'
      return
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.errors[field] = emailRegex.test(value) ? '' : '邮箱格式错误'
    } else if (field === 'phone') {
      const phoneRegex = /^\+?[\d\s-]{7,15}$/
      this.errors[field] = phoneRegex.test(value) ? '' : '手机号格式错误'
    } else {
      this.errors[field] = ''
    }
  }

  // 判断第一步是否验证通过
  get isStep1Valid() {
    const info = this.personalInfo
    return (
      info.name.trim() !== '' &&
      info.email.trim() !== '' &&
      info.phone.trim() !== '' &&
      Object.values(this.errors).every((err) => err === '')
    )
  }

  // 点击“Next Step”时调用的全局校验
  validateAll() {
    ;(Object.keys(this.personalInfo) as Array<keyof IPersonal>).forEach(
      (field) => {
        this.validateField(field)
      },
    )
    return this.isStep1Valid
  }

  // === Actions ===
  get calculatedTotalCost() {
    let total = 0
    // 基础计划价格
    const planCost = this.isYearly
      ? this.plan === '1'
        ? 90
        : this.plan === '2'
          ? 120
          : 150
      : this.plan === '1'
        ? 9
        : this.plan === '2'
          ? 12
          : 15
    total += planCost

    // 附加服务价格
    this.addons.forEach((addon) => {
      const costStr = this.isYearly ? addon.yearly : addon.monthly
      const match = costStr.match(/\d+/)
      if (match) {
        total += parseInt(match[0], 10)
      }
    })

    return total
  }

  setTabActive(tabId: string) {
    this.nowTab = tabId
    if (!this.visitedSteps.includes(tabId)) {
      this.visitedSteps.push(tabId)
    }
  }

  setPlanItem(planId: string) {
    this.plan = planId
  }

  toggleYearly() {
    this.isYearly = !this.isYearly
  }

  setPersonalInfo(field: keyof IPersonal, value: string) {
    this.personalInfo[field] = value
    this.touched[field] = true
    this.validateField(field) // 实时校验：用户输入时立即反馈错误
  }

  toggleAddon(addon: IStep3) {
    const index = this.addons.findIndex((item) => item.id === addon.id)
    if (index === -1) {
      this.addons.push(addon)
    } else {
      this.addons.splice(index, 1)
    }
  }

  clearStoreageForm() {
    localStorage.removeItem(STORAGE_KEY)
  }

  clearForm() {
    this.nowTab = '1'
    this.plan = '1'
    this.visitedSteps = ['1']
    this.isYearly = false
    this.personalInfo = { name: '', email: '', phone: '' }
    this.errors = { name: '', email: '', phone: '' }
    this.touched = { name: false, email: false, phone: false }
    this.addons = []
  }
}
