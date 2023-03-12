<!--
 * @Descripttion: 页面架构
 * @Author: lwp
 * @Date: 2023-02-26 02:05:02
 * @LastEditTime: 2023-03-12 17:26:15
-->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import commonHeader from './components/layout/commonHeader.vue'
// import commonFooter from './components/layout/commonFooter.vue'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import zh from './language/zh'
// import en from 'element-plus/lib/locale/lang/en'

import { useI18n } from 'vue-i18n'
const { locale: localeLanguage } = useI18n()
// const changeLang = (language: any) => {
//   localeLanguage.value = language.name
//   console.log('language：', language)
// }

const route = useRoute()
</script>

<template>
  <!-- <el-config-provider :locale="store.state.locale"> -->
  <el-config-provider :locale="localeLanguage">
    <!-- 头部 -->
    <commonHeader v-show="route.fullPath.indexOf('login') === -1" />
    <!-- 主体 -->
    <!-- <div class="container">
      <router-view />
    </div> -->
    <!-- 底部 -->
    <!-- <commonFooter v-show="route.fullPath.indexOf('login') === -1" /> -->
  </el-config-provider>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
