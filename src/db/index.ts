import DB from '@/utils/indexedDB' // 引入indexedDB工具类

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB
}
