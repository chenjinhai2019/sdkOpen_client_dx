<template>
  <div class="">
    <el-container v-if="showContainer" class="wrapper">
      <el-header>
        <h1>选择APP创建方式</h1>
      </el-header>
      <el-row type="flex" justify="space-around">
        <el-col :span="12">
          <router-link :to="{name:'oemApply'}">
            <h3>公版OEM申请</h3>
            <span>通过简单的配置自动生成App</span>
          </router-link>
        </el-col>
        <el-col :span="12">
          <router-link :to="{name:'sdkApply'}">
            <h3>SDK申请</h3>
            <span>引用SDK，自主开发自己的App</span>
          </router-link>
        </el-col>
      </el-row>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  computed: {
    // 当路由不是应用管理页面，隐藏应用管理页面的内容，改为显示子路由内容
    showContainer() {
      const route = this.$route;
      const { path } = route;
      if (path === '/manageCenter/applicationManage') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-container
  text-align center
  width 1200px
  margin 0 auto
  .el-header
    height 100px!important
    line-height 100px
    h1 
      font-size 32px
  .el-row
    .el-col
      width 500px
      border 1px solid #666
      border-radius 20px
      padding 20px 0
      &:hover 
        background-color #ccc
      a
        display inline-block
        width 100%
        height 100% 
        h3 
          font-size 26px
          margin-bottom 10px
</style>
