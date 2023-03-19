/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-03-08 05:44:44
 * @LastEditTime: 2023-03-19 20:12:39
 */
import DB from '@/utils/indexedDB' // 引入indexedDB工具类
import languageObjectStore from './objectStores/language' // 引入语言类型对象仓库
import userObjectStore from './objectStores/user' // 引入用户信息对象仓库

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  languageObjectStore,
  userObjectStore,
  airbnbDB
}
