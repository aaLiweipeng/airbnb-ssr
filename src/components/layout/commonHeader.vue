<script setup lang="ts">
// import { ref, getCurrentInstance, defineAsyncComponent, onMounted } from 'vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import { fetchLanguageApi } from '@/api/layout'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { userLogoutApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
// import { userLogoutApi } from '@/api/login'
// import { IResultOr } from '@/api/interface'
import { useStore } from '@/store'

// const OrderPopover = defineAsyncComponent(() => import('@/views/order/components/orderPopover.vue'))
const { t, locale: localeLanguage } = useI18n()
const router = useRouter()
const { proxy }: any = getCurrentInstance()
const activeIndex = ref('orders')
const store = useStore()

/* eslint-disable */
// const emit = defineEmits<{
//   (e: 'changeLang', language: any): void
// }>()

// 类型来自 el-menu 的 el-menu-item 的 index
type SelectEventKey = 'zh' | 'en' | 'login' | 'logout' | 'orders' | 'records'
function handleSelect(e: SelectEventKey) {
  if (e === 'zh') {
    // saveLanguageApi(zhCn.name)
    store.dispatch('saveLanguage', zhCn)
    localeLanguage.value = e
  } else if (e === 'en') {
    // saveLanguageApi(en.name)
    store.dispatch("saveLanguage", en)
    localeLanguage.value = e
  } else if (e === 'login') {
    router.push({ name: 'login' })
  } else if (e === 'logout') {
    userLogout()
  } 
  // else if (e === 'orders') {
  //   store.commit('setOrderVisible', true)
  // } else if (e === 'records') {
  //   router.push({ name: 'record' })
  // }
  // console.log(e)
}

// Mock接口：获取语言包配置
function getLanguage() {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    const { name } = result || {}
  
    if (success) {
      if (name === 'zh') {
        store.dispatch('saveLanguage', zhCn)
        localeLanguage.value = name
      } else if (name === 'en') {
        store.dispatch("saveLanguage", en)
        localeLanguage.value = name
      }
      console.log('获取当前语言包成功')
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    // 要延时一下，初始化时数据库没初始化好，去读的话会出错！
    getLanguage()
  }, 100)
})

// localStorage临时存储方案
// const userStatus = localStorage.getItem('userStatus')
// 登出接口
function userLogout() {
  proxy.$message.success('demo')
  userLogoutApi().then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      proxy.$message.success(message)
      // 退出登录成功，跳到登录页
      router.push({ name: 'login' })

      // localStorage.setItem('userStatus', '0') // @ 这种方案，需要刷新页面才能更新页面UI！！！！
      store.commit('setUserStatus', 0) // @ 用VueX方案，可以实现响应式刷新UI！！！！！
      localStorage.setItem('userId', '')
    } else {
      proxy.$message.error(message)
    }
  })
}
</script>

<template>
  <div class="header-common">
    <img
      @click="() => { router.push({ name: 'home' }) }"
      class="logo"
      src="@/assets/images/layout/logo.png"
      alt="爱此迎"
    />

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">
        {{ t("header.orders") }}
        <!-- <template v-if="store.state.orderVisible"> -->
        <template v-if="true">
          <Suspense>
            <template #default>
              <OrderPopover />
            </template>
            <template #fallback>
              <div class="loading-block">{{ t("common.loading") }}</div>
            </template>
          </Suspense>
        </template>
      </el-menu-item>

      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
  
      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
  
      <!-- <el-menu-item index="logout" v-if="userStatus === '1'">{{ t("login.logout") }}</el-menu-item> -->
      <el-menu-item index="logout" v-if="store.state.userStatus === 1">{{ t("login.logout") }}</el-menu-item>
  
      <el-menu-item index="login" v-else>{{ t("login.loginTab") }}/{{ t("login.signTab") }}</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/layout/commonHeader.scss";
</style>
