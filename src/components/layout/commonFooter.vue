<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 出现了 依据、根据JSONOb渲染页面组件的
const footerMenu = reactive(
  [
    {
      title: 'airbnb',
      menus: [
        {
          name: 'careers',
          link: 'https://www.airbnb.cn/careers'
        },
        {
          name: 'news',
          link: 'https://www.airbnb.cn/press/news'
        },
        {
          name: 'topic',
          link: 'https://www.airbnb.cn/help/topic/1578/法律条款'
        },
        {
          name: 'diversity',
          link: 'https://www.airbnb.cn/diversity'
        },
        {
          name: 'accessibility',
          link: 'https://www.airbnb.cn/accessibility'
        }
      ]
    },
    {
      title: 'discovery',
      menus: [
        {
          name: 'trustAndSafe',
          link: 'https://www.airbnb.cn/trust'
        },
        {
          name: 'invite',
          link: 'https://www.airbnb.cn/invite?r=6'
        },
        {
          name: 'evection',
          link: 'https://www.airbnb.cn/work?s=footer'
        },
        {
          name: 'magzine',
          link: 'https://airbnbmag.com'
        },
        {
          name: 'airbnborg',
          link: 'https://www.airbnb.org/?locale=zh'
        }
      ]
    },
    {
      title: 'rent',
      menus: [
        {
          name: 'whyRent',
          link: 'https://www.airbnb.cn/host/homes?from_footer=1'
        },
        {
          name: 'hospitality',
          link: 'https://www.airbnb.cn/hospitality'
        },
        {
          name: 'responsibleHosting',
          link: 'https://www.airbnb.cn/help/responsible-hosting'
        },
        {
          name: 'experiences',
          link: 'https://www.airbnb.cn/host/experiences?from_footer=1'
        },
        {
          name: 'resources',
          link: 'https://www.airbnb.cn/resources?traffic_source=footer'
        }
      ]
    },
    {
      title: 'service',
      menus: [
        {
          name: 'help',
          link: 'https://www.airbnb.cn/help?from=footer'
        },
        {
          name: 'neighbors',
          link: 'https://www.airbnb.cn/neighbors'
        }
      ]
    }
  ])
</script>

<template>
  <div class="footer-common">
    <div class="inner-footer">
      <ul>
        <!-- footerMenu数组里有多少个对象，就有多少个li -->
        <li v-for="(item, index) in footerMenu" :key="index">
          <!-- 每个item里，装一个title，还有一个 链接对象数组 -->
          <h3>{{ t(`footer['${item.title}']`) }}</h3>
          <!-- 链接对象数组, link用来跳转, name用来展示 -->
          <a
            target="_blank"
            :href="itemInner.link"
            v-for="(itemInner, indexInner) in item.menus"
            :key="indexInner"
          >{{ t(`footer['${itemInner.name}']`) }}</a>
          <!-- t函数结合 动态字符串模板 -->
        </li>
      </ul>
      <div class="copy-right">@ 2022 Harry, Inc . All rights reserved.</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/layout/commonFooter.scss";
</style>
