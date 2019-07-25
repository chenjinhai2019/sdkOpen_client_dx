import Vue from 'vue';
import Router from 'vue-router';
import cookies from 'js-cookie'

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: resolve => require(['views/Home/Home'], resolve) },
    { // 企业认证
      path: '/corporateCertify',
      name: 'corporateCertify',
      component: resolve => require(['views/CorporateCertify/CorporateCertify.vue'], resolve),
      meta: {
        activeMenu: '/manageCenter'
      }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['views/Login/Login.vue'], resolve),
      meta: {
        hideManageCenterMenu: true,
        hideLogin: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['views/Register/Register.vue'], resolve),
      meta: {
        hideManageCenterMenu: true,
        hideRegister: true,
      },
    },
    {
      path: '/forgetPsd',
      name: 'forgetPsd',
      component: resolve => require(['views/ForgetPsd/ForgetPsd.vue'], resolve),
      meta: {
        hideManageCenterMenu: true,
      },
    },
    // 开发文档
    {
      path: '/developDoc',
      name: 'developDoc',
      component: resolve => require(['views/DevelopDoc/DevelopDoc.vue'], resolve),
    },
    // 管理中心
    { path: '/manageCenter', redirect: '/manageCenter/applicationManage' },
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
          path: 'applicationManage',
          name: 'applicationManage',
          component: resolve => require(['views/ManageCenter/ApplicationManage/ApplicationManage'], resolve),
          meta: {
            hideHeader: true
          },
          children: [
            {
              path: 'oemApply',
              name: 'oemApply',
              component: resolve => require(['views/ManageCenter/ApplicationManage/OEMApply'], resolve),
              meta: {
                hideHeader: true,
                activeMenu: '/manageCenter/applicationManage'
              },
            },
            {
              path: 'sdkApply',
              name: 'sdkApply',
              component: resolve => require(['views/ManageCenter/ApplicationManage/SDKApply'], resolve),
              meta: {
                hideHeader: true,
                activeMenu: '/manageCenter/applicationManage'
              },
              children: [
                {
                  path: 'createSDK',
                  name: 'createSDK',
                  component: resolve => require(['views/ManageCenter/ApplicationManage/CreateSDK.vue'], resolve),
                  meta: {
                    hideHeader: true,
                    activeMenu: '/manageCenter/applicationManage'
                  },
                }
              ]
            },
          ]
        },
        {
          path: 'productManage',
          name: 'productManage',
          redirect: '/manageCenter/productManage/product',
          component: resolve => require(['views/ManageCenter/ProductManage/ProductManage'], resolve),
          meta: {
            hideHeader: true
          },
          children: [
            { path: 'product',
              name: 'product',
              component: resolve => require(['views/ManageCenter/ProductManage/Product'], resolve),
              meta: {
                hideHeader: true,
                showProductMenu: true,
                activeMenu: '/manageCenter/productManage'
              }
            },
            { path: 'accessories',
              name: 'accessories',
              component: resolve => require(['views/ManageCenter/ProductManage/TMAccessories'], resolve),
              meta: {
                hideHeader: true,
                showProductMenu: true,
                activeMenu: '/manageCenter/productManage'
              }
            },
            { path: 'createProduct',
              name: 'createProduct',
              component: resolve => require(['views/ManageCenter/ProductManage/CreateProduct'], resolve),
              meta: {
                hideHeader: true,
                showProductMenu: false,
                activeMenu: '/manageCenter/productManage'
              }
            },
          ]
        },
        {
          path: 'valueService',
          name: 'valueService',
          component: resolve => require(['views/ManageCenter/ValueService/ValueService'], resolve),
          meta: {
            hideHeader: true
          }
        },
        // homeKit
        {
          path: 'homeKitManage',
          name: 'homeKitManage',
          redirect: '/manageCenter/HomeKitManage/basicInfo',
          component: resolve => require(['views/ManageCenter/HomeKitManage/HomeKitManage'], resolve),
          meta: {
            hideHeader: true
          },
          children: [
            { path: 'basicInfo',
              name: 'basicInfo',
              component: resolve => require(['views/ManageCenter/HomeKitManage/HomeKitBasicInfo'], resolve),
              meta: {
                hideHeader: true,
                showHomeKitMenu: true,
                showHomeKitItemMenu: false,
                activeMenu: '/manageCenter/homeKitManage'
              }
            },
            { path: 'appManage',
              name: 'appManage',
              component: resolve => require(['views/ManageCenter/HomeKitManage/HomeKitApp'], resolve),
              meta: {
                hideHeader: true,
                showHomeKitMenu: true,
                showHomeKitItemMenu: false,
                activeMenu: '/manageCenter/homeKitManage'
              }
            },
            { path: 'createApp',
              name: 'createApp',
              component: resolve => require(['views/ManageCenter/HomeKitManage/CreateApp'], resolve),
              meta: {
                hideHeader: true,
                showHomeKitMenu: true,
                showHomeKitItemMenu: false,
                activeMenu: '/manageCenter/homeKitManage'
              }
            },
            { path: 'staging',
              name: 'staging',
              component: resolve => require(['views/ManageCenter/HomeKitManage/Staging'], resolve),
              meta: {
                hideHeader: true,
                showHomeKitMenu: true,
                showHomeKitItemMenu: false,
                activeMenu: '/manageCenter/homeKitManage'
              }
            },
            { path: 'tokens',
              name: 'tokens',
              component: resolve => require(['views/ManageCenter/HomeKitManage/tokens'], resolve),
              meta: {
                hideHeader: true,
                showHomeKitMenu: true,
                showHomeKitItemMenu: false,
                activeMenu: '/manageCenter/homeKitManage'
              }
            },
          ]
        },

      ],
    },
    // 账号管理
    {
      path: '/accountManage',
      name: 'accountManage',
      component: resolve => require(['views/AccountManage/AccountManageHeader'], resolve),
    },
    // 子账号管理
    {
      path: '/subaccountManage',
      name: 'subaccountManage',
      component: resolve => require(['views/AccountManage/SubaccountManage'], resolve),
    },
    // 操作日志
    {
      path: '/operateLog',
      name: 'operateLog',
      component: resolve => require(['views/AccountManage/Oplog'], resolve),
    },
    // 订阅
    {
      path: '/subscribe',
      name: 'subscribe',
      component: resolve => require(['views/AccountManage/Subscribe'], resolve),
    },
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const accessFlag = cookies.get('username');
  
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (accessFlag) { // 已登录 document.cookie.indexOf('username') !== -1
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
