import Vue from 'vue'
import Router from 'vue-router'



// 解决  Navigating to current location ("/stock") is not allowed", 重写 push
// const [routerPush, routerReplace] = [Router.prototype.push, Router.prototype.replace];
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error);
// };
// Router.prototype.replace = function replace(location) {
//   return routerReplace.call(this, location).catch(error => error);
// };


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path:'/client',
          component:() => import ('../components/page/FSclient.vue'),
          meta: { title: '用户' }
        },
        {
          path:'/jssip',
          component:() => import ('../components/page/JSsip.vue'),
          meta: { title: '客户端' }
        }
      ]
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/test.vue')
    },

  ]
})
