/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-03-18 23:59:08
 * @LastEditTime: 2023-03-19 18:44:33
 */
import { ref, reactive, Ref } from 'vue'
// 表单值 绑定对象的类型
interface IRuleForm {
  mobile: string,
  password: string
}

// 表单校验值的类型
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

// 本定义函数的返回结果
interface Result {
  activeName: Ref<string>, // 响应式字符串字段，用于存储tab的变量
  loginText: Ref<string>, // 响应式字符串字段，用于 登录button的显示
  ruleFormRef: any,
  ruleForm: IRuleForm,
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
