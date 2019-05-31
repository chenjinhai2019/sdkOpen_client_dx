<template>
  <div class="">
    <el-tabs type="border-card">
      <el-tab-pane label="子账号管理"></el-tab-pane>
      <el-tab-pane label="操作日志"></el-tab-pane>
      <el-tab-pane label="订阅"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

</style>
