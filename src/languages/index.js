import Vue from 'vue';
import VueI18n from 'vue-i18n';

// 安装插件
Vue.use(VueI18n);

// 语言包
import zhCN from './locales/zh-CN';
import enUS from './locales/en_US';

// 实例化 i18n
const i18n = new VueI18n({
  locale: 'en-us',  // 默认语言
  messages: {
    'zh-cn': zhCN,
    'en-us': enUS
  }
});

export default i18n;
