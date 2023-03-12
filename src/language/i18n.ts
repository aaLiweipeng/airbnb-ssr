/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-03-05 03:17:52
 * @LastEditTime: 2023-03-12 15:36:57
 */
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export function createSSRI18n() {
  return createI18n({
    locale: 'zh',
    legacy: false, 
    messages: {
      zh,
      en
    }
  })
}
