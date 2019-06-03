<template>
  <div class="clearfix">
    <el-row class="header-wrap">
      <el-col :span="6" class="logo-wrap">
        <div class="logo">
          <router-link to="/">
            <img src="./imgs/logo.svg" alt="">
          </router-link>
        </div>
      </el-col>
      <el-col :span="18" class="right-wrap">
        <el-row type="flex" justify="end" class="right-menu" style="min-width:500px">
          <div v-if="!username">
            <router-link to="/login" class="login" v-show="!$route.meta.hideLogin">登录</router-link>
            <router-link to="/register" class="register" v-show="!$route.meta.hideRegister">注册</router-link>
          </div>
          <el-dropdown class="welcome-container" trigger="click" v-else>
            <div class="welcome-wrap">
              <div class="welcome">hello,{{username}}</div>
              <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/subaccountManage">
                <el-dropdown-item>管理</el-dropdown-item>
              </router-link>
              <router-link to="">
                <el-dropdown-item>日志</el-dropdown-item>
              </router-link>
              <router-link to="">
                <el-dropdown-item>订阅</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        <el-row type="flex" justify="end" style="min-width:500px">
          <el-menu :default-active="activeMenu" active-text-color="#1890ff" mode="horizontal" :router="true" class="nav">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/developDoc">开发文档</el-menu-item>
            <el-menu-item :style="styleObj" v-show="!$route.meta.hideTab" @click="checkCertify">管理中心</el-menu-item>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      dynamicRouter: '',
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path;
    },
    // 当返回路由不为 '/manageCenter' 时，去除管理中心menu高亮显示
    styleObj() {
      if (this.activeMenu !== '/manageCenter') {
        return 'border-bottom-color:transparent;color:#909399' 
      } else {
        return ''
      }
    },
  },
  mounted() {
    
  },
  methods: {
    logout() {
      this.$store.dispatch('removeUserInfo', this.$router);
    },
    checkCertify() {
      if (this.username) {
        this.$axios.get('/userinfo/company').then((res) => {
          const rs = res.data;
          let certifyState = rs.data.state;

          // 存vuex
          this.$store.commit('certify_state', { certifyState })
          // console.log(certifyState);
          if (certifyState === -1) {
            this.$router.push('/corporateCertify')
          } else if (certifyState === 0) {
            this.$msgbox({
              title: '提示',
              message: '您的企业认证信息还在审核中，审核结果会通过邮件告知，请留意您的邮箱。',
              type: 'success',
              showClose: false,
              confirmButtonText: '确定',
              closeOnClickModal: false,
            })
          } else if (certifyState === 1) {
            this.$router.push('/manageCenter');
          }
        });
      } else {
        this.$router.push('/manageCenter')
      }
    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header-wrap
    height 90px
    padding 0 20px
    box-shadow 1px 1px 5px #999
    .logo-wrap
      padding-top 20px
      padding-left 10px
      .logo
        width 180px
        height 50px
    .right-wrap
      padding-top 10px
      .right-menu
        font-size 16px
        font-weight 400
        padding-right 32px
        .login, .register
          font-size 14px
          /*text-decoration underline*/
          color blue
          vertical-align middle
        .register
          margin-left 10px
          vertical-align middle
      .welcome-wrap
        position relative
        .welcome
          cursor pointer
          font-size 14px
        .el-icon-caret-bottom
          cursor pointer
          position absolute
          right -12px
          top 4px
          font-size 12px
      .nav
        height 48px;
        line-height 48px;
        font-size 14px;
        border-bottom 1px solid #e8e8e8
        margin-top 10px
        margin-right 20px
        .el-menu-item
          line-height 48px
          height 100%
</style>
