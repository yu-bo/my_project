// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题

import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';

import infiniteScroll from 'vue-infinite-scroll'
import api from './api/index'
import common from "./api/common"

Vue.prototype.$api = api
api.alertMsg=this.$m
Vue.prototype.$_global= common
 
Vue.use(ElementUI)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

