<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log('首页 接到个人中心的参数 route.params --- ', route.params)
const { proxy }: any = getCurrentInstance()
proxy.$message.success('666666')
</script>

<template>
    首页
    <el-button @click="() => router.push({ name: 'mine', query: { id: 1 } })">跳转到个人中心</el-button>
    <div class="text">事实上事实上少时诵诗书是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒</div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home/index.scss";
</style>
