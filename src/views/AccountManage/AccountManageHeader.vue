<template>
  <div class="main">
    <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="子账号管理"></el-tab-pane>
      <el-tab-pane label="操作日志"></el-tab-pane>
      <el-tab-pane label="订阅"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      const index = tab.index;
      if (index === '0') {
        this.$router.push('/subaccountManage')
      } else if (index === '1') {
        this.$router.push('/subaccountManage?a=1');
      } else if (index === '2') {
        this.$router.push('/subaccountManage?a=2');
      } 
    }
  }
}
</script>

<style lang="stylus" scoped>
.main 
  padding-top 2px
</style>
