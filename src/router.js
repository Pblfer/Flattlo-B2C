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
          component: () => import('@/views/pages/Panel.vue')
        },
        {
          path: '/apartament-showcase',
          name: 'apartament-showcase',
          component: () => import('@/views/pages/Apartament.vue')
        },
        {
          path: '/selected-apartament',
          name: 'selected-apartament',
          component: () => import('@/views/pages/SelectedApartament.vue')
        },
        {
          path: '/quote-generator',
          name: 'quote-generator',
          component: () => import('@/views/pages/quoteGenerator.vue')
        },
        {
          path: "",
          redirect: "/login"
        },
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
          component: () => import('@/views/pages/Login.vue')
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

//     // get firebase current user
//     const firebaseCurrentUser = firebase.auth().currentUser

//     if (
//         to.path === "/level-selection"
//         ( firebaseCurrentUser)
//     ) {
//         return next();
//     }


//   })

// })

export default router;
