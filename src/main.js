import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'element-plus/dist/index.css';
import './assets/css/index.css'

createApp(App).use(router).mount('#app')
