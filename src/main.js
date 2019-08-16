// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
Vue.use(VueAxios, axios);
import VueAxios from 'vue-axios'
import 'bootstrap'
import $ from 'jquery';
window.$ = $; //將原本的$變成jquery
//Vue loading overlay 套件
import Loading from 'vue-loading-overlay';
// Vee validate套件
import ZHTW from 'vee-validate/dist/locale/zh_TW';
import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate, {
  events: 'input|blur',
});
Validator.localize('ZHTW', ZHTW);


import App from './App'
import router from './router'
//在proto中加入$bus
import './bus.js'
//filters
import filter from './filters/currency';
Vue.filter('currency', filter);
// 元件若很常用到可以在全域註冊
// import Alert from "./components/AlertMessage";

Vue.config.productionTip = false;


//把後端回傳的session存在cookies內
axios.defaults.withCredentials = true;
//使用Vue loading overlay元件
Vue.component('Loading', Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  // ...
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    // console.log('Need to verify')
    const api = ` ${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        next();
      } else {
        router.push('/');
      }
    })
  } else {
    next();
  }
})