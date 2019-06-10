<template>
  <div class="main">
    <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="子账号管理" name="0"></el-tab-pane>
      <el-tab-pane label="操作日志" name="1"></el-tab-pane>
      <el-tab-pane label="订阅" name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      activeName: this.currentIndex
    }
  },
  props: { 
    currentIndex: {
      type: String
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      const index = tab.index;
      if (index === '0') {
        this.$router.push('/subaccountManage')
      } else if (index === '1') {
        this.$router.push('/operateLog');
      } else if (index === '2') {
        this.$router.push('/subscribe');
      } 
    }
  }
}
</script>

<style lang="stylus" scoped>
.main 
  padding-top 2px
</style>
