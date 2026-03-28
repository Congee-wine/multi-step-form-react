import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zhCNCommon from './zh-CN/common'
import zhCNSteps from './zh-CN/steps'
import zhCNForm from './zh-CN/form'
import zhCNValidation from './zh-CN/validation'

import zhTWCommon from './zh-TW/common'
import zhTWSteps from './zh-TW/steps'
import zhTWForm from './zh-TW/form'
import zhTWValidation from './zh-TW/validation'

import enCommon from './en/common'
import enSteps from './en/steps'
import enForm from './en/form'
import enValidation from './en/validation'

export const resources = {
  'zh-CN': {
    common: zhCNCommon,
    steps: zhCNSteps,
    form: zhCNForm,
    validation: zhCNValidation,
  },
  'zh-TW': {
    common: zhTWCommon,
    steps: zhTWSteps,
    form: zhTWForm,
    validation: zhTWValidation,
  },
  en: {
    common: enCommon,
    steps: enSteps,
    form: enForm,
    validation: enValidation,
  },
}

// 支持的语言列表，后续语言切换组件会用到
export const supportedLocales = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
]

// 默认语言
export const defaultLocale = 'zh-CN'

// 从 localStorage 读取用户上次选择的语言，没有则用默认语言
const savedLocale = localStorage.getItem('locale') || defaultLocale

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLocale,
    fallbackLng: 'zh-CN',
    ns: ['common', 'steps', 'form', 'validation'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
