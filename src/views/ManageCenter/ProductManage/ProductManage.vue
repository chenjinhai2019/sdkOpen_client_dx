<template>
  <div class="product-manage">
    <el-row type="flex" :gutter="20" justify="space-between">
      <el-col :span="3" class="menu-wrapper" v-if="this.$route.meta.showProductMenu">
        <el-menu
          :default-active="$route.path"
          mode="vertical"
          :unique-opened="true"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          :collapse-transition="false"
          class="side-menu"
          id="menu">
          <el-menu-item index="/manageCenter/productManage/product">
            <span>普通产品</span>
          </el-menu-item>
          <el-menu-item index="/manageCenter/productManage/accessories">
            <span>天猫配件</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="content-wrapper" id="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
}
</script>

<style lang="stylus" scoped>
.product-manage
  padding 10px 20px 0 10px
  box-sizing border-box
  min-width 1200px
  margin 0 auto 
  .menu-wrapper
    text-align center
    .el-menu  
      min-height 120px
      border-radius 0 0 5px 5px
  .content-wrapper
    padding 0 20px
    margin-bottom 50px
    width 1200px
    margin 0 auto;
</style>
