/*
 * @Descripttion: layout组件的 indexDB接口（主要是lang表）
 *                服务器（indexDB模拟）需要保存用户的lang配置，页面初始化时候要获取此配置，提高用户体验
 * @Author: lwp
 * @Date: 2023-03-12 17:29:32
 * @LastEditTime: 2023-03-12 22:39:12
 */
/**
 * code: '000000'表示'操作成功'；code: '000001'表示'数据已存在'；code: '000002'表示'密码不正确'；
 * code: '000003'表示'手机号不正确'；code: '000004'表示'其他异常'；code: '000005'表示'登录过期'；
 */

import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import airbnb from '@/db' // 引入数据库和对象仓库

const storeName = Object.keys(airbnb.languageObjectStore)[0] // 即 'language'

// Mock接口：保存当前语言包
export async function saveLanguageApi(lang: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 先get 后update； 因为 add和update操作的数据不一，要区分
  const resultOr: IResultOr = await airbnb.airbnbDB.getItem(storeName, 1).then(res => {
    return { code: '000000', message: '操作成功', result: res || null, success: true }
  })

  const { success } = resultOr
  let obj = {}
  if (success) { // 说明数据已存在，则更新数据
    obj = { name: lang, id: 1 }
  } else { // 说明数据不存在，则新增数据
    obj = { name: lang }
  }

  const result: IResultOr = await airbnb.airbnbDB.updateItem(storeName, obj).then(res => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: null, success: true }
  })
  return result
}

// Mock接口：获取当前语言包
export async function fetchLanguageApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  const result: IResultOr = await airbnb.airbnbDB.getItem(storeName, 1).then(res => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: res || null, success: true }
  })
  return result
}
