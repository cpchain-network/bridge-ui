import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
import store from './store'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import "vue-toastification/dist/index.css";
import 'vue-loading-overlay/dist/vue-loading.css';
// import VueI18n from 'vue-i18n'
import VueClipboard from 'vue-clipboard2'
import Meta from 'vue-meta'
import Toast from 'vue-toastification'
import Loading from "vue-loading-overlay";
// import '@/assets/font/googleFont.css' // 引入全局的Google Fonts
import SvgTransition from 'vue-svg-transition'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import { getNetworks } from './utils/networks.js';
Vue.prototype.$moment = moment
import i18n from './languages'; // 你的 index.js 导出的 i18n 实例
import  "./reset.css"
Vue.config.productionTip = false
Vue.use(vuex)
// Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.use(Meta)
Vue.use(Loading)
Vue.use(SvgTransition)
Vue.use(ElementUI);
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  position: 'top-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
})
const locale = localStorage.getItem('language') || 'en'
localStorage.setItem('language', locale)
// let networks = null;
getNetworks(false).then(res=>{
  Vue.prototype.$networks = res
});
getNetworks(true).then(res=>{
  Vue.prototype.$activeNetworks = res
});
// const i18n = new VueI18n({
//   locale,
//   messages: {
//     zh: require('@/assets/language/zh.json'),
//     en: require('@/assets/language/en.json')
//   }
// })
// Vue.prototype.$i18nn = i18n // 将国际化工具 挂载到 vue原型上面
router.beforeEach((to, from, next) => {
  if (to.meta.metaInfo) {
    store.commit('CAHNGE_META_INFO', to.meta.metaInfo)
  }
  next()
})

// 全局注入配置
// Vue.mixin({
//   beforeCreate() {

//   }
// });

let vueThis = new Vue({
   i18n,
  store,
  router,
  metaInfo () {
    return {
      // title: this.$store.state.metaInfo.title,
      meta: [
        {
          name: 'title',
          content: this.$store.state.metaInfo.title
        },
        {
          name: 'keywords',
          content: this.$store.state.metaInfo.keywords
        },
        {
          name: 'description',
          content: this.$store.state.metaInfo.description
        }
      ]
    }
  },
  render: h => h(App)
}).$mount('#app')
export default vueThis
