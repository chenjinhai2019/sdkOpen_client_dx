<template>
  <div class="">
    <el-main>
      <el-row class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'applicationManage' }">应用管理</el-breadcrumb-item>
          <el-breadcrumb-item>SDK申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="">
        <ul class="application-list" v-if="!createSDKShow">
          <li class="add-application" @click="showCreateSDK">+</li>
          <li class="item" v-for="(item,index) in applicationLists" :key="index" @click="showCreateSDK(item.id)">
            <p>应用名：{{item.applicationName}}</p>
            <hr style="margin-top: 150px">
            <p>创建时间：</p>
            <p>{{item.applyTime}}</p>
          </li>
        </ul>
        <div class="create-SDK" v-else>
          <el-row>
            <el-steps :active="active" finish-status="success" align-center>
              <el-step title="App基本信息"></el-step>
              <el-step title="注册服务"></el-step>
              <el-step title="引用SDK"></el-step>
            </el-steps>
          </el-row>
          <el-row class="step-containers">
            <div class="step-container" v-show="active===0">
              <el-form :model="form" label-width="100px">
                <el-form-item label="应用名">
                  <el-input v-model="form.applicationName"></el-input>
                </el-form-item>
                <el-form-item label="应用ID">
                  <el-input v-model="form.applicationId"></el-input>
                </el-form-item>
                <el-form-item label="应用描述">
                  <el-input type="textarea" v-model="form.applicationDescribtion"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="step-container" v-show="active===1">
              222222
            </div>
            <div class="step-container" v-show="active===2">
              333333
            </div>
          </el-row>
          <el-row class="button-box">
            <el-button @click="prev">{{prevText}}</el-button>
            <el-button @click="next">下一步</el-button>
          </el-row>
        </div>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      createSDKShow: false,
      applicationLists: [],
      active: 0,
      form: {
        applicationName: '',
        applicationId: '',
        applicationDescribtion: ''
      },
    }
  },
  computed: {
    prevText() {
      return this.active === 0 ? '返回' : '上一步';
    },
  },
  created() {
    this.getSDK()
  },
  mounted() {
  },
  methods: {
    prev() {
      if (this.active === 0) {
        this.createSDKShow = false;
      }
      this.active--
    },
    next() {
      this.active++
      if (this.active > 2) {
        this.active = 2
      }
    },
    // 获取用户申请的SDK信息列表
    getSDK() {
      this.$axios.get('/sdk').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.applicationLists = rs.data;
      })
    },
    showCreateSDK(i) {
      this.createSDKShow = true;
      const id = i;
      this.$axios.get(`/sdk/${id}/baseinfo`).then((res) => {
        const rs = res.data;
      })
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
  .create-SDK
    .step-containers
      width 80%
      margin 50px auto 0
      .step-container
        display flex
        justify-content center
        .el-form
          width 60%
    .button-box
      margin-top 50px
      text-align right
      padding-right 100px
</style>
