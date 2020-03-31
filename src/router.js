/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

// import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/level-selection',
          name: 'level-selection',
          component: () => import('@/views/pages/panel/Panel.vue')
        },
        {
          path: '/apartament-showcase',
          name: 'apartament-showcase',
          component: () => import('@/views/pages/Apartament/Apartament.vue')
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue')
        },
        {
          path: '/terms-and-conditions',
          name: 'terms',
          component: () => import('@/views/pages/terms.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

// router.beforeEach((to, from, next) => {
//   firebase.auth().onAuthStateChanged(() => {

//     // // get firebase current user
//     // const firebaseCurrentUser = firebase.auth().currentUser

//     // if (
//     //     to.path === "/pages/login" ||
//     //     to.path === "/pages/forgot-password" ||
//     //     to.path === "/pages/error-404" ||
//     //     to.path === "/pages/error-500" ||
//     //     to.path === "/pages/register" ||
//     //     to.path === "/callback" ||
//     //     to.path === "/pages/comingsoon" ||
//     //     ( firebaseCurrentUser)
//     // ) {
//     //     return next();
//     // }

//     return next()
//     // Specify the current path as the customState parameter, meaning it
//     // will be returned to the application after auth
//     // auth.login({ target: to.path });

//   })

// })

export default router
