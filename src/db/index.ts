import DB from '../utils/indexedDB' // 引入indexedDB工具类
import languageObjectStore from './objectStores/language' // 引入语言类型对象仓库

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  languageObjectStore,
  airbnbDB
}
