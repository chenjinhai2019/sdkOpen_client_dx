<template>
  <div class="product-manage">
    <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="" view-class="view-box" :native="false">

    <el-row type="flex" :gutter="20" justify="space-between">
      <el-col :span="3" v-if="this.$route.meta.showHomeKitMenu"  class="menu-wrapper">
        <el-menu
          :default-active="$route.path"
          :router="true"
          id="menu"
        >
          <el-menu-item class="hk-head">
            <span slot="title">HomeKit</span>
          </el-menu-item>
          <el-menu-item index="/manageCenter/HomeKitManage/basicInfo">
            <i class="el-icon-info"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="/manageCenter/HomeKitManage/appManage">
            <i class="el-icon-menu"></i>
            <span slot="title">应用管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="3" class="menu-wrapper" v-if="this.$route.meta.showHomeKitItemMenu">
        <el-menu
          :default-active="$route.path"
          :router="true"
          id="menu">
          <el-menu-item class="hk-head">
            <span slot="title">HomeKit</span>
          </el-menu-item>
          <el-menu-item index="/manageCenter/HomeKitManage/staging" style="padding-left: 0px;">
            <i class="el-icon-bicycle"></i>
            <span slot="title" >Staging</span>
          </el-menu-item>
          <el-menu-item index="/manageCenter/HomeKitManage/producting" >
            <i class="el-icon-truck"></i>
            <span slot="title">Producting</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="21" style="padding-left: 0px;" id="content" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>

    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      curHeight: 0
    }
  },
  created() {
    this.beforeMount();
  },
  methods: {
    beforeMount() {
      const h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - 60;
      console.log(h, 'hx', this.curHeight, 'hx');
    }
  },
}
</script>

<style lang="stylus" scoped>
  .product-manage
    padding 3px 20px 0 10px
    box-sizing border-box
    min-width 1200px
    margin 0 auto
    .menu-wrapper
      text-align center
      .el-menu
        height 690px
        border-radius 0 0 5px 5px
    .content-wrapper
      padding 0 20px
      margin-bottom 50px
      width 1200px
      margin 0 auto;
    .content
      height auto
      overflow-y hidden
  .hk-head
    background: #D9DEE4
  .list
    max-height: 200px
</style>
