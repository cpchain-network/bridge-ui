import { Buffer } from 'buffer'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import './styles/global.scss'
import i18n from "./languages"
// `@coinbase-wallet/sdk` uses `Buffer`
globalThis.Buffer = Buffer
import Vue3Marquee from 'vue3-marquee'
import App from './App.vue'
// import './style.css'
import { config } from './wagmi'

// import "./utils/font.js"

// 模拟递增

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(WagmiPlugin, { config }).use(VueQueryPlugin, {})
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Vue3Marquee)

app.mount('#app')


