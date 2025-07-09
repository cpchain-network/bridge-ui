import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    redirect: '/bridge',
    component: () => import('@/pages/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/index'),
        meta: {
          title: 'home',
          icon: ''
        }
      },
      {
        path: '/bridge',
        name: 'bridge',
        component: () => import('@/pages/bridge/index'),
        meta: {
          title: 'bridge',
          icon: ''
        }
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/pages/history/index'),
        meta: {
          title: 'history',
          icon: ''
        }
      },

      {
        path: '/b',
        name: 'b',
        component: () => import('@/pages/new/index'),
        meta: {
          title: 'history',
          icon: ''
        }
      },

      
    ]
  }
]


const router = new VueRouter({
  // mode: 'history',
  routes: routers
})

export default router
