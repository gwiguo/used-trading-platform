import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'element-plus/dist/index.css';
import './assets/css/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

createApp(App).use(router).use(ElementPlus, {
    locale: zhCn,
}).mount('#app')
