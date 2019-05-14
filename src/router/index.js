import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: resolve => require(['views/Home/Home'], resolve) },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['views/Login/Login.vue'], resolve),
      meta: {
        hideTab: true,
        hideLogin: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['views/Register/Register.vue'], resolve),
      meta: {
        hideTab: true,
        hideRegister: true,
      },
    },
    {
      path: '/forgetPsd',
      name: 'forgetPsd',
      component: resolve => require(['views/ForgetPsd/ForgetPsd.vue'], resolve),
      meta: {
        hideTab: true,
      },
    },
    {
      path: '/developDoc',
      name: 'developDoc',
      component: resolve => require(['views/DevelopDoc/DevelopDoc.vue'], resolve),
    },
    { path: '/manageCenter', redirect: '/applicationManage' },
    {
      path: '/manageCenter',
      name: 'manageCenter',
      component: resolve => require(['views/ManageCenter/ManageCenter.vue'], resolve),
      meta: {
        hideHeader: true,
        requireAuth: true,
      },
      children: [
        {
          path: '/applicationManage',
          name: 'applicationManage',
          component: resolve => require(['views/ManageCenter/ApplicationManage/ApplicationManage'], resolve),
          meta: {
            hideHeader: true
          }
        },
        {
          path: '/productManage',
          name: 'productManage',
          component: resolve => require(['views/ManageCenter/ProductManage/ProductManage'], resolve),
          meta: {
            hideHeader: true
          }
        },
        {
          path: '/valueService',
          name: 'valueService',
          component: resolve => require(['views/ManageCenter/ValueService/ValueService'], resolve),
          meta: {
            hideHeader: true
          }
        },
      ],
    },
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (document.cookie.indexOf('username') !== -1) { // 已登录
      next()
    } else { // 未登录
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else { // 不需要登录权限
    next()
  }
})

export default router;
