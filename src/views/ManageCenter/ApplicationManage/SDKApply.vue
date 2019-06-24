<template>
  <div class="">
    <el-main>
      <el-row class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'applicationManage' }">应用管理</el-breadcrumb-item>
          <el-breadcrumb-item>SDK申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="" v-if="condition">
        <ul class="application-list">
          <li class="add-application" @click="createSDK($event)">+</li>
          <li class="item" v-for="(item,index) in applicationLists" :key="index" @click="createSDK($event,item.id)">
            <p>应用名：{{item.applicationName}}</p>
            <hr style="margin-top: 150px">
            <p>创建时间：</p>
            <p>{{item.applyTime}}</p>
          </li>
        </ul>
      </el-row>
      <router-view v-else></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      applicationLists: [],
    }
  },
  computed: {
    condition() {
      const route = this.$route;
      const { path } = route;
      if (path === '/manageCenter/applicationManage/sdkApply') {
        return true
      }
      return false
    }
  },
  created() {
    this.getSDK()
  },
  methods: {
    // 获取用户申请的SDK信息列表
    getSDK() {
      this.$axios.get('/sdk').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.applicationLists = rs.data;
      })
    },
    createSDK(event, i) {
      const id = i;
      this.$router.push({ name: 'createSDK', query: { id: i } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-main
  width 1200px
  margin 0 auto
  padding 0 50px
  padding-bottom 50px
  .breadcrumb
    margin-bottom 50px
    .el-breadcrumb
      height 60px
      line-height 60px
      font-size 16px 
  .application-list
    display flex
    li
      width 200px
      height 300px
      border 1px solid #333
      border-radius 20px
      margin-right 20px
      cursor pointer
      &.add-application
        text-align center
        line-height 300px
        font-size 150px
      &.item
        box-sizing border-box 
        padding 20px 0  
        font-size 16px
        p
          margin-left 10px
</style>
