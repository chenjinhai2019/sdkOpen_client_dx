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
          <el-step title="发布" v-if="showPublish"></el-step>
        </el-steps>
      </el-row>
      <el-row class="step-containers">
        <!-- 第一步：创建App -->
        <div class="step-container create-app" v-show="active===0">
          <el-row>
            App名称：<el-input v-model="appName" placeholder="请输入您的App名称，如Mlight"></el-input>
          </el-row>
          <el-row>
            App包名：<el-input v-model="appPackName" placeholder="请输入一个合理的包名，如com.jx.smart"></el-input>
          </el-row>
          <el-row>
            App版本号：<el-input v-model="appVersion" placeholder="请输入一个版本号"></el-input>
          </el-row>
          <el-row>
            <!-- 此处可以添加一个动画，后期添加 -->
            <el-button type="primary" v-show="changeBtnShow" @click="createApplication">修改</el-button>
          </el-row>
        </div>
        <!-- 第二步： UI配置 -->
        <div class="step-container" v-show="active===1">
          <div class="step1-0" v-show="active1===1">
            <!-- 第一步 Logo设置 -->
            <el-row class="logo" :gutter="50" type="flex">
              <el-col class="phone-box">
                <img class="phone" src="./imgs/phone.jpg" alt="">
                <img class="logo-img" :src="logo" alt="">
              </el-col>
              <el-col class="cont">
                <div>
                  logo:
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="3">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
                <p>App应用图标</p>
                <p>分辨率：1024*1024</p>
                <p>格式：.png</p>
                <p>文件大小： 小于5M</p>
              </el-col>
            </el-row>
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
          <div class="step1-3" v-show="active1===5">
            第五步
          </div>
          <div class="step1-3" v-show="active1===6">
            第六步
          </div>
        </div>
        <!-- 第三步：功能配置  -->
        <div class="step-container" v-show="active===2">
          
        </div>
        <!-- 第四步：自动构建 -->
        <div class="step-container" v-show="active===3">
          
        </div>
        <!-- 第五步：发布，如果没有权限的话，则隐藏该步骤 -->
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
import { mapState } from 'vuex'

export default {
  name: '',
  data() { 
    return {
      active: 0,
      active1: 0,
      STEPNUM_1: 6,
      showPublish: false
    }
  },
  computed: {
    /* 如果是第一步时，显示‘返回’ ，其他步骤时都显示‘上一步’ */
    prevText() {
      return this.active === 0 ? '返回' : '上一步';
    },
    // 获取OEM应用对象，没有时为null
    ...mapState(['oemApplication', 'originAppName', 'originAppPackName', 'originAppVersion', 'logo']), 
    appName: {
      get() {
        return this.oemApplication ? this.oemApplication.appName : ''
      },
      set(val) {
        this.$store.state.oemApplication.appName = val;
      }
    },
    appPackName: {
      get() {
        return this.oemApplication ? this.oemApplication.appPackName : ''
      },
      set(val) {
        this.$store.state.oemApplication.appPackName = val;
      }
    },
    appVersion: {
      get() {
        return this.oemApplication ? this.oemApplication.appVersion : ''
      },
      set(val) {
        this.$store.state.oemApplication.appVersion = val;
      }
    },
    // 用户修改应用时显示修改按钮
    changeBtnShow() {
      const { oemApplication } = this;
      let { originAppName, originAppPackName, originAppVersion, appName, appPackName, appVersion } = this;
      // console.log(originAppName, appName);
      if (oemApplication.id) {
        if (originAppName !== appName || originAppPackName !== appPackName || originAppVersion !== appVersion) {
          return true;
        }
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.$store.dispatch('checkOemApplication');
  },
  methods: {
    createApplication() {
      const { oemApplication, appName, appPackName } = this;
      const id = oemApplication.id;
      const params = this.$qs.stringify({
        id,
        appName,
        appPackName
      })
      // console.log(params);
      this.$axios.post('/oemApplication', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('创建成功')
        } else {
          this.$message.error(`${rs.msg}`);
        }
      })
    },
    getLogo() {
      this.$store.dispatch('getLogo');
    },
    next() {
      const { STEPNUM_1, oemApplication } = this;
      if (this.active === 0) {
        this.active = 1;
      }
      if (this.active === 1) {
        this.active1++;
        if (this.active1 > STEPNUM_1) {
          this.active = 2
          return false
        }
      }
      if (this.active >= 2 && this.active !== 1) {
        this.active++
      }
      // 第一步 this.active = 1，如果没有id，则创建app; 如果有id，则直接进入下一步
      if (!oemApplication.id) {
        if (this.active === 1) {
          console.log(111);
        }
        /* if (this.active === 2 && this.active1 === 0) {
          console.log(2222);
        } */
      } else {
        if (this.active === 1) {
          this.getLogo()
        }
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
  },
}
</script>

<style lang="stylus" scoped>
.el-main
  width 1200px
  margin 0 auto
  padding 0 50px
  text-align center
  padding-bottom 50px
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
      .el-row 
        margin-bottom 25px
      .el-input 
        width 300px
      .logo 
        .phone-box
          text-align center
          position relative
          .phone
            width 200px  
          .logo-img
            width 20px
            height 20px  
            border 1px solid red
            position absolute
            left 200px
            top 60px
        .cont 
          font-size 22px
          text-align left
          div 
           margin-bottom 30px   
          p 
            font-size 18px
            line-height 30px 
    .create-app
      height 170px    
  .button-box
    margin-top 50px
    text-align right
    padding-right 100px
</style>
