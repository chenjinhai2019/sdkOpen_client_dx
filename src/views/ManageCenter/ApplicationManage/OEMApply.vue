<template>
  <div class="">
    <el-main>
      <el-row class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'applicationManage' }">应用管理</el-breadcrumb-item>
          <el-breadcrumb-item>公版OEM申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="创建App"></el-step>
          <el-step title="UI配置">
            <el-steps :active="active1"></el-steps>
          </el-step>
          <el-step title="功能配置"></el-step>
          <el-step title="自动构建"></el-step>
          <el-step title="发布" v-if="show"></el-step>
        </el-steps>
      </el-row>
      <el-row class="step-containers">
        <div class="step-container" v-show="active===0">
          <el-row>
            App名称：<el-input v-model="appName"></el-input>
          </el-row>
          <el-row>
            App包名：<el-input v-model="appPackageName"></el-input>
          </el-row>
        </div>
        <div class="step-container" v-show="active===1">
          <div class="step1-0" v-show="active1===1">
            第一步
          </div>
          <div class="step1-1" v-show="active1===2">
            第二步
          </div>
          <div class="step1-2" v-show="active1===3">
            第三步
          </div>
          <div class="step1-3" v-show="active1===4">
            第四步
          </div>
        </div>
        <div class="step-container" v-show="active===2">
          
        </div>
        <div class="step-container" v-show="active===3">
          
        </div>
        <div class="step-container" v-show="active===4">
          
        </div>
      </el-row>
      <el-row class="button-box">
        <el-button @click="prev">{{prevText}}</el-button>
        <el-button @click="next">下一步</el-button>
      </el-row>
    </el-main>
    
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      active: 0,
      active1: 0,
      appName: '',
      appPackageName: '',
      show: false
    }
  },
  computed: {
    /* 如果是第一步时，显示‘返回’ ，其他步骤时都显示‘上一步’ */
    prevText() {
      return this.active === 0 ? '返回' : '上一步';
    },
  },
  methods: {
    next() {
      if (this.active === 0) {
        this.active = 1;
      }
      if (this.active === 1) {
        this.active1++;
        if (this.active1 > 4) {
          this.active = 2
          return false
        }
      }
      if (this.active >= 2 && this.active !== 1) {
        this.active++
      }
    },
    prev() {
      if (this.active !== 1 && this.active !== 0) {
        this.active--
      }
      if (this.active === 1) {
        this.active1--
        if (this.active1 < 1) {
          this.active = 0;
          return false;
        }
      }
      if (this.active === 0) {
        this.$router.push('/manageCenter/applicationManage')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-main
  width 1200px
  margin 0 auto
  padding 0 50px
  .breadcrumb
    margin-bottom 50px
    .el-breadcrumb
      height 60px
      line-height 60px
      font-size 16px
  .step-containers
    width 90%
    margin 50px auto 0
    .step-container
      .el-input 
        width 300px
        margin 20px 0
  .button-box
    margin-top 50px
    text-align right
    padding-right 100px
</style>
