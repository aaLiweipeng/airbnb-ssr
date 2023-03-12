/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-02-26 02:05:02
 * @LastEditTime: 2023-03-12 17:09:36
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variable.scss";@import "@/assets/scss/main.scss";',
      },
      // styl: {
      //   additionalData: `$injectedColor ?= orange`,
      // },
    },
  },
});
