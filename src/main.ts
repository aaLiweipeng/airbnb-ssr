/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-02-26 02:05:02
 * @LastEditTime: 2023-03-26 21:42:03
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import { createSSRI18n } from './language/i18n'
import { createSSRStore, key } from './store'

const app = createApp(App);
const i18n = createSSRI18n()
const store = createSSRStore()
app.use(store, key)
app.use(router)
app.use(ElementPlus);
app.use(i18n)
app.config.globalProperties.$message = ElMessage;
app.mount("#app");
