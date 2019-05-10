import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
    {
      path: '/manageCenter',
      name: 'manageCenter',
      component: resolve => require(['views/ManageCenter/ManageCenter.vue'], resolve),
    },
  ],
});
