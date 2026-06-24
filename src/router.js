import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      component: () => import('./pages/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: 'entidad'
        },
        {
          path: 'entidad',
          name: 'entidad',
          component: () => import('./views/Entidad.vue')
        },
        {
          path: 'programa',
          name: 'programa',
          component: () => import('./views/Programa.vue')
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('./views/Perfil.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next({ name: 'entidad' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
