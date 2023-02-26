<script setup lang="ts">
import { useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter()
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <!-- 触发路由（router-view）切换方式1 -->
  <button @click="() => router.push({path: '/home' })">首页</button>
  <button @click="() => router.push({ path: '/mine'})">个人中心</button>

  <!-- 触发路由（router-view）切换方式2 -->
  <router-link to="/home">首页</router-link>
  <router-link to="/mine">个人中心</router-link>

  <router-view />
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
