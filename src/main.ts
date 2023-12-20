import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import router from '@/router'

const app = createApp(App)
app.use(ElementPlus).use(router)
router.isReady().then(() => app.mount('#app'))
