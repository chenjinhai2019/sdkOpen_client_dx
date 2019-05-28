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
              <router-link to="">
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
          <el-menu :default-active="$route.path" active-text-color="#1890ff" mode="horizontal" :router="true" class="nav">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/developDoc">开发文档</el-menu-item>
            <el-menu-item index="/manageCenter">管理中心</el-menu-item>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      username: state => state.username
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('removeUserInfo', this.$router);
    }
  },
  data() {
    return {
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
