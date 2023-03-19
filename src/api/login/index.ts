// code: '000000'表示'操作成功'；code: '000001'表示'数据已存在'；code: '000002'表示'密码不正确'；
// code: '000003'表示'手机号不正确'；code: '000004'表示'其他异常'；code: '000005'表示'登录过期'；
import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import { getQueryCookie } from '@/utils/util'
import airbnb from '@/db' // 引入数据库和对象仓库
import { IRuleForm } from '@/composables/login/useFormOperates'

const userStoreName = Object.keys(airbnb.userObjectStore)[0]

// mock接口：用户注册
export async function userSignApi(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同手机号
  const hasMobile = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(userStoreName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.mobile === params.mobile) { // 存在相同手机号
          resolve(true)
        }
      })
      resolve(false)
    })
  })

  let result: IResultOr
  if (hasMobile) {
    // 数据(手机号) 已存在；终止操作【账号（手机号）去重】
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000001', success: false, message: '数据已存在', result: null })
    })
  } else {
    // 手机号不存在，说明没重复，则把数据更新进去； status 0：未登录
    const obj = { status: 0 }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(userStoreName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}

// mock接口：用户登录
export async function userLoginApi(params: IRuleForm) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 校验手机号和密码是否正确
  const correct: { code: string, userId?: any } = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(userStoreName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.mobile === params.mobile) { // 校验手机号【看数据库有没这个手机号（账号）】
          if (item.password === params.password) { // 校验密码【有的话 看密码对不对】
            resolve({ code: '000000', userId: item.userId })
          } else {
            resolve({ code: '000002' })
          }
        }
      })
      // 其他
      resolve({ code: '000004' })
    })
  })

  // 对以上的校验结果 进行处理
  let result: IResultOr
  if (correct.code !== '000000') {
    result = await new Promise((resolve, reject) => {
      // 非正常操作，操作失败
      resolve({ code: correct.code, success: false, message: correct.code === '000002' ? '密码不正确' : (correct.code === '000003' ? '手机号不正确' : '不存在该用户，请先注册'), result: null })
    })
  } else { 
    // 手机号和密码都正确，更新登录状态【mobile, password, status, token】
    const token = (new Date()).getTime() + '' // 用时间戳 模拟token
    localStorage.setItem("token", token)
  
    // status 1：已登录
    const obj = { status: 1, userId: correct.userId, token }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {

      // 数据库操作
      airbnb.airbnbDB.updateItem(userStoreName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: obj })
      })
    })
  }
  return result
}

// mock接口：用户登出
export async function userLogoutApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 遍历User表，
  const correct: { code?: string, userId?: any } = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(userStoreName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)

      res && res.filter((item: any) => {
        console.log('user表的当前迭代item（每一项）', item)
        const token = localStorage.getItem("token")
        console.log('取当前浏览器账号的token', token)
  
        if (item.token && item.token.indexOf(token) !== -1) { 
          // 库里存在与当前账号相同的token; 取这个账号id出来
          resolve({ userId: item.userId })
        }
      })
      // 库里找不到相同的token
      resolve({ code: '000005' })
    })
  })

  // 根据用户token更改登录态为0
  let result: IResultOr
  if (correct.code === '000005') {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000005', success: false, message: '登录过期', result: null })
    })
  } else {
    const params : Object = await new Promise((resolve, reject) => {
      // 取id对应user数据，准备处理
      airbnb.airbnbDB.getItem(userStoreName, correct.userId).then((res: any) => {
        resolve(res)
      })
    })
  
    // 清空user的token，状态status置0，退出登录
    const obj = { status: 0, token: null }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(userStoreName, params).then(res => {
        console.log('userLogoutApi 开始更新数据库')
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}
