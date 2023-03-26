/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-02-26 17:39:38
 * @LastEditTime: 2023-03-26 17:38:05
 */
import home from '@/views/home/index.vue'
import mine from '@/views/mine/index.vue'
import login from '@/views/login/loginIndex.vue'
import airbnb from '@/db' // 引入数据库和对象仓库

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";


const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      title: "爱此迎-全球大型房屋租赁平台",
      keywords: "爱此迎，特价房源，品质房源，租赁平台",
      description:
        "爱此迎（Aircnb）是房屋租赁平台。爱此迎（Aircnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能。 ",
      keepAlive: false,
    },
  },
  {
    path: "/mine",
    name: "mine",
    component: mine,
    meta: {
      title: "",
      keywords: "",
      description: "",
      keepAlive: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
];

const router =  createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore,
    // ...airbnb.orderObjectStore,
    // ...airbnb.recordObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象仓库', res)
    // localStorage.getItem('userId') && store.commit('setUserStatus', 1)
    next()
  })
})

export default router