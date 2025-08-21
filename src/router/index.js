import { createRouter, createWebHistory } from 'vue-router'
import   bridge   from "../views/bridge/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bridge',
      component: bridge,
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    // 处理滚动行为：如果有保存的滚动位置，则恢复到该位置，否则滚动到顶部
  
      return { top: 0 }; // 跳转时滚动到顶部
    
  },
});
export default router
