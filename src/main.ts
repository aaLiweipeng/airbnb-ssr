import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import { createSSRI18n } from './language/i18n'

const app = createApp(App);
const i18n = createSSRI18n()
app.use(router)
app.use(ElementPlus);
app.use(i18n)
app.config.globalProperties.$message = ElMessage;
app.mount("#app");
