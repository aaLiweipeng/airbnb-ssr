<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log('首页 接到个人中心的参数 route.params --- ', route.params)
</script>

<template>
    首页
    <button @click="() => router.push({name:'mine', query: { id: 1 }})">跳转到个人中心</button>
</template>

<style scoped>
</style>
