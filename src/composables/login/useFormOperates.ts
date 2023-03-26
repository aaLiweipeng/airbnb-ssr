/*
 * @Descripttion: 封装登录模块的业务层逻辑
 * @Author: lwp
 * @Date: 2023-02-26 17:39:38
 * @LastEditTime: 2023-03-26 23:03:27
 */
import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'
import { getCurrentInstance } from 'vue'
import { useStore } from '@/store'
import { Router, useRoute } from 'vue-router'
import { UserFormType } from './useFormProperties'

/**
 * 本hook的返回类型
 */
interface Result {
  userSign: () => void,
  userLogin: () => void,
}

/**
 * 暴漏hook函数
 * @param router useRouter实例引用，留给调用处实例化之后传进来，函数里面就不用去实例化了
 * @param params 注册、登录参数 ———— mobile、password
 * @returns 
 */
export default function useFormOperates(router: Router, params: UserFormType): Result {
  const { proxy }: any = getCurrentInstance()
  const store = useStore()
  const route = useRoute()

  // 注册接口 的业务封装
  function userSign(): void {
    // 直接把“网路请求” 及其 response处理 封装在这里
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
  
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录接口 的业务封装
  function userLogin(): void {
    // 直接把“网路请求” 及其 response处理 封装在这里
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res
      if (success) {
        const { status, userId } = result

        localStorage.setItem('userId', userId)
        store.commit('setUserStatus', status)
        // localStorage.setItem('userStatus', '1')

        const { redirect }: any = route.query
        console.log(redirect)
        router.push({ path: redirect || '/' }) // 登录成功后，要么跳转到重定向，要么跳转到主页
        // window.location.href = '/'
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }
  return {
    userSign,
    userLogin
  }
}
