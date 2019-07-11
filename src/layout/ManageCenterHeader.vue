<template>
  <el-header class="wrapper">
    <el-row>
      <el-col class="logo">
        <router-link to="/">
          <img src="./imgs/logo.svg" alt="">
        </router-link>
      </el-col>
      <el-col class="managecenter-menu">
        <el-menu :default-active="activeMenu" active-text-color="#1890ff" mode="horizontal" :router="true">
          <el-menu-item index="/manageCenter/applicationManage">应用管理</el-menu-item>
          <el-menu-item index="/manageCenter/productManage">产品管理</el-menu-item>
          <el-menu-item index="/manageCenter/valueService">增值服务</el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="right-box">
        <div class="link-box">
          <router-link to="/developDoc" class="developdoc"><i class="fa fa-file-text-o" aria-hidden="true"></i> 开发文档</router-link>
        </div>
        <el-dropdown class="welcome-container" trigger="hover" placement="top">
            <div class="welcome-wrap">
              <div class="welcome">hello,{{username}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/subaccountManage">
                <el-dropdown-item>管理</el-dropdown-item>
              </router-link>
              <router-link to="/operateLog">
                <el-dropdown-item>日志</el-dropdown-item>
              </router-link>
              <router-link to="/subscribe">
                <el-dropdown-item>订阅</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: '',
  data() { 
    return {

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
  },
  mounted() {
    
  },
  methods: {
    logout() {
      this.$store.dispatch('removeUserInfo', this.$router);
    },
  }
}
</script>

<style lang="stylus" scoped>
.el-menu.el-menu--horizontal
.el-menu--horizontal>.el-menu-item.is-active
  border-bottom none
  border-bottom-color transparent!important
.wrapper
  min-width 1200px
  height 60px
  box-shadow 1px 1px 5px #999
  .el-row
    display flex
    align-items center
    .logo 
      width 200px
      height 40px
      img
        height 40px
    .managecenter-menu
      flex 3  
      min-width 400px
    .right-box
      flex 1
      min-width 202px 
      float right
      display flex
      justify-content flex-end 
      .link-box
        a:hover 
          color #333
      .welcome-wrap
        margin 0 30px
        padding-top 2px
        .welcome
          cursor pointer
</style>
