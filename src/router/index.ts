import home from '@/views/home/index.vue'
import mine from '@/views/mine/index.vue'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";


const routes = [
  {
    path: "/home",
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
];

const router =  createRouter({
  history: createWebHistory(),
  routes
});

export default router