/*
 * @Descripttion: 登录模块 Model层hook封装
 * @Author: lwp
 * @Date: 2023-03-18 23:59:08
 * @LastEditTime: 2023-03-26 20:09:33
 */
import { ref, reactive, Ref } from 'vue'
// 表单值 绑定对象的类型
export interface UserFormType {
  mobile: string,
  password: string
}

// 表单校验规则 类型
interface IRuleItem {
  required: boolean;
  min?: number;
  max?: number;
  message: string;
  trigger: string;
}
interface IRules {
  mobile: IRuleItem[],
  password: IRuleItem[]
}

// 本定义函数的返回结果。所有model字段
interface Result {
  activeName: Ref<string>, // 响应式字符串字段，用于存储tab的变量
  loginText: Ref<string>, // 响应式字符串字段，用于 登录button的显示
  ruleFormRef: any,
  ruleForm: UserFormType,
  rules: IRules
}

export default function useFormProperties(t: any): Result {
  const activeName = ref('login')
  const loginText = ref(t('login.loginBtn'))
  const ruleFormRef = ref()
  const ruleForm = reactive({
    mobile: '',
    password: ''
  })
  
  // 登录表单校验规则
  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t('login.placeMobile'),
        trigger: 'blur' // 触发方式，失焦时触发
      }
    ],
    password: [
      {
        required: true,
        message: t('login.placePass'),
        trigger: 'blur'
      }
    ]
  })
  return {
    activeName,
    loginText,
    ruleFormRef,
    ruleForm,
    rules
  }
}
