// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import './css/common.css'
import crypto from 'crypto'
import "./js/jquery"

Vue.config.productionTip = false
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
