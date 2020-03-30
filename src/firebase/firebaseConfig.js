// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html


import firebase from 'firebase/app'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDgwP5YgwBHF-hpWu4g0gq8vtT5mC6TtGY',
  authDomain: 'flattlo.firebaseapp.com',
  databaseURL: 'https://flattlo.firebaseio.com',
  projectId: 'flattlo',
  storageBucket: 'flattlo.appspot.com',
  messagingSenderId: '961917575422',
  appId: '1:961917575422:web:b2552dc2ff5d55111645af',
  measurementId: 'G-Y620KKC402'
}

firebase.initializeApp(config)
