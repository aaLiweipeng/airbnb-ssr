<!--
 * @Descripttion: 登录页【作V层】
 * @Author: lwp
 * @Date: 2023-03-14 03:27:45
 * @LastEditTime: 2023-03-26 16:34:50
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'
import useFormProperties from '@/composables/login/useFormProperties'
import useFormOperates from '@/composables/login/useFormOperates'

const router = useRouter()
const { t } = useI18n()
const { ruleForm, loginText, ruleFormRef, activeName, rules } = useFormProperties(t) // M层调用
const { userSign, userLogin } = useFormOperates(router, ruleForm) // PC层调用 直接调用封装好的hook，无需多言

// tabClick回调，切换时更替按钮文本
function handleClick(e: any) {
  const { name } = e.props
  loginText.value = t(`login['${name}Btn']`)
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      // 校验成功
      if (activeName.value === 'sign') {
        userSign() // 一行即可
      } else if (activeName.value === 'login') {
        userLogin()
      }
    } else {
      return false
    }
  })
}

</script>

<template>
  <div class="login-page">
    <!-- 左部 -->
    <div class="left-part"></div>

    <!-- 右部 -->
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <!-- 点击tab时，触发handleClick，以子项name为参数； 同时这个name参数也同步到 双绑变量activeName上了 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>

        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">

          <el-form-item prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              :placeholder="t('login.placePass')"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{ loginText }}</el-button>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
