<template>
  <div class="create-SDK">
    <el-row>
      <el-steps :active="sdkActive" finish-status="success" align-center>
        <el-step title="App基本信息" @click.native="step1"></el-step>
        <el-step title="注册服务" @click.native="step2"></el-step>
        <el-step title="引用SDK" @click.native="step3"></el-step>
      </el-steps>
    </el-row>
    <el-row class="step-containers">
      <div class="step-container form-box" v-show="sdkActive===0">
        <el-form :model="form" ref="sdkApplyForm" label-width="100px" :rules="sdkRules">
          <el-form-item label="应用名" prop="applicationName">
            <el-input v-model="form.applicationName"></el-input>
          </el-form-item>
          <el-form-item label="应用ID" prop="applicationId">
            <el-input v-model="form.applicationId"></el-input>
          </el-form-item>
          <el-form-item label="应用描述" prop="applicationDescribtion">
            <el-input type="textarea" v-model="form.applicationDescribtion"></el-input>
          </el-form-item>
          <el-form-item v-show="!id">
            <el-button type="primary" style="margin-left:160px" @click="sdkApply">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-container" v-show="sdkActive===1">
        <el-row class="switch-box">
          <div class="switch">
            是否开启注册服务： 
            <el-switch
              v-model="userLogin"
              active-text="开"
              inactive-text="关"
              @change="setUserLogin">
            </el-switch>
          </div>
          <p>SDK中封装了用户注册登录服务，可为您快速实现用户注册登录功能，如果您需要开通该服务，需配置认证邮箱</p>
        </el-row>
        <el-row class="hide-box" v-show="userLogin">
          <h3>认证邮箱</h3>
          <p>在用户注册的时候，需要用您的企业邮箱来给用户发送激活信息，请确保您所填邮箱的有效性。若您不填写该项，将默认使用晶讯邮箱发送给用户激活信息。</p>
          <el-form :model="hideForm" ref="form" label-width="100px" :rules="rules">
            <el-form-item label="邮箱服务器" prop='host'>
              <el-input v-model="hideForm.host" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号" prop='username'>
              <el-input v-model="hideForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
              <el-input v-model="hideForm.password" clearable show-password></el-input>
            </el-form-item>
            <el-form-item label="验证邮箱" prop='email'>
              <el-input v-model="hideForm.email" clearable></el-input>
              <el-button type="primary" @click="verifyEmail">验证邮箱有效性</el-button>
            </el-form-item>
          </el-form>
          <p>验证邮箱的有效性：我们将尝试用您提供的账号和密码登录您提供的邮箱服务器，并向您提供的验证邮箱发送一封确认邮件，点击确认邮件中提供的连接完成邮箱的有效性验证</p>
        </el-row>
      </div>
      <div class="step-container" v-show="sdkActive===2">
        <el-row class="sdk-info">
          <div class="sdk-download">
            <h3>SDK下载</h3>
            <img src="./imgs/ios-logo.png" alt="">
            <img src="./imgs/android-logo.png" alt="">
          </div>
          <div class="tip">具体操作查看 <a href="">开发文档</a></div>
          <div class="key-info">
            <div>KeyId: {{keyId}}</div>
            <div>KeySecret: {{keySecret}}</div>
          </div>
        </el-row>
      </div>
    </el-row>
    <el-row class="button-box">
      <el-button @click="prev">{{prevText}}</el-button>
      <el-button @click="next" v-show="showNextBtn">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      sdkActive: parseInt(this.$cookies.get('sdkActive'), 10) || 0,
      id: parseInt(this.$route.query.id, 10) || '',
      form: {
        applicationName: '',
        applicationId: '',
        applicationDescribtion: ''
      },
      sdkRules: {
        applicationName: [
          { required: true, message: '请输入应用名称' }
        ],
        applicationId: [
          { required: true, message: '请输入应用ID' }
        ],
        applicationDescribtion: [
          { required: true, message: '请输入应用描述' }
        ],
      },
      userLogin: false,
      hideForm: {
        host: '',
        username: '',
        password: '',
        email: '',
      },
      rules: {
        host: [
          { required: true, message: '请输入邮箱服务地址' }
        ],
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        email: [
          { required: true, message: '请输入邮箱' }
        ],
      },
      keyId: '',
      keySecret: '',
      androidPath: '',
      iosPath: '',
      showNextBtn: true
    }
  },
  computed: {
    prevText() {
      return this.sdkActive === 0 ? '返回' : '上一步';
    },
  },
  created() {
    if (this.sdkActive === 0) {
      this.getBaseInfo();
    }
    if (this.sdkActive === 1) {
      this.getUserLogin();
    }
    if (this.sdkActive === 2) {
      this.getSDKInfo() // 获取SDK的认证信息和下载路径
    }
  },
  methods: {
    step1() {
      this.sdkActive = 0;
      this.getBaseInfo();
      this.$cookies.set('sdkActive', this.sdkActive)
    },
    step2() {
      this.sdkActive = 1;
      this.getUserLogin();
      this.$cookies.set('sdkActive', this.sdkActive)
    },
    step3() {
      this.sdkActive = 2;
      this.getSDKInfo();
      this.$cookies.set('sdkActive', this.sdkActive)
    },
    // 获取App的基本信息
    getBaseInfo() {
      const { id, form } = this;
      if (id) {
        this.$axios.get(`/sdk/${id}/baseinfo`).then((res) => {
          const rs = res.data;
          console.log(rs);
          form.applicationName = rs.data.applicationName;
          form.applicationId = rs.data.applicationId;
          form.applicationDescribtion = rs.data.applicationDescribtion;
        })
      }
    },
    // 修改App的基本信息
    changeBaseInfo() {
      const { id, form } = this;
      if (form.applicationName === '' || form.applicationId === '' || form.applicationDescribtion === '') {
        this.$message.error('应用名或应用ID或应用描述不能为空')
        return false;
      } else {
        const params = this.$qs.stringify(form);
        this.$axios.patch(`/sdk/${id}/baseinfo`, params).then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            this.sdkActive = 1;
            this.$cookies.set('sdkActive', 1)
            this.getUserLogin();
          }
        })
      }
    },
    // 获取App的注册服务信息
    getUserLogin() {
      this.$axios.get(`/sdk/${this.id}/userLogin`).then((res) => {
        const rs = res.data;
        this.userLogin = rs.data.userLogin;
        this.hideForm.host = rs.data.host;
        this.hideForm.username = rs.data.username;
      })
    },
    // 修改App的注册服务信息
    setUserLogin() {
      const { userLogin } = this;
      const params = this.$qs.stringify({
        userLogin
      })
      this.$axios.patch(`/sdk/${this.id}/userLogin`, params).then((res) => {
        if (res.data.success === true) {
          this.$message.success('设置成功');
        }
      })
    },
    // 验证邮箱有效性
    verifyEmail() {
      const { hideForm, id } = this;
      const params = this.$qs.stringify(hideForm)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post(`/sdk/${id}/email`, params).then((res) => {
            const rs = res.data;
            if (rs.success === true) {
              this.$message.info('验证成功，请激活邮箱');
            } else {
              this.$message.error(`${rs.msg}`);
            }
          }).catch((error) => {
            this.$message.error(error);
          })
        }
      })
    },
    // 检查认证邮箱是否已激活
    checkEmail() {
      if (this.userLogin) {
        this.$axios.get(`/sdk/${this.id}/checkEmail`).then((res) => {
          const rs = res.data;
          if (rs.data.active === false) {
            this.$message.info('邮箱还未激活，将默认使用晶讯邮箱发送给用户激活信息')
          } else {
            this.$message.success('邮箱已激活')
          }
        })
      }
    },
    // 获取SDK的认证信息和下载路径
    getSDKInfo() {
      this.$axios.get(`/sdk/${this.id}/key`).then((res) => {
        const rs = res.data;
        console.log(rs);
        this.keyId = rs.data.keyId;
        this.keySecret = rs.data.keySecret;
        this.iosPath = rs.data.iosPath;
        this.androidPath = rs.data.androidPath;
      })
    },
    // 申请SDK
    sdkApply() {
      const { form } = this;
      const params = this.$qs.stringify(form)
      this.$refs.sdkApplyForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/sdk', params).then((res) => {
            const rs = res.data;
            // console.log(rs);
            if (rs.success === true) {
              this.id = rs.data.id;
              this.$router.replace({ name: 'createSDK', query: { id: rs.data.id } })
              this.$message.success('申请成功')
            } else {
              this.$message.error('申请失败') 
            }
          })
        } 
      })
    },
    prev() {
      if (this.sdkActive === 2) {
        this.sdkActive = 1;
        this.getUserLogin();
        this.showNextBtn = true;
        this.$cookies.set('sdkActive', 1)
        return false;
      }
      if (this.sdkActive === 1) {
        this.sdkActive = 0;
        this.getBaseInfo();
        this.$cookies.set('sdkActive', 0)
        return false;
      }
      if (this.sdkActive === 0) {
        this.$router.push('/manageCenter/applicationManage/sdkApply')
      }
    },
    next() {
      if (this.sdkActive === 0) {
        this.changeBaseInfo();
      }
      if (this.sdkActive === 1) {
        this.getUserLogin();
        this.sdkActive = 2
        this.checkEmail(); // 验证邮箱
        this.getSDKInfo() // 获取SDK的认证信息和下载路径
        this.showNextBtn = false;
        this.$cookies.set('sdkActive', 2)
      }
      if (this.sdkActive > 2) {
        this.sdkActive = 2
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.create-SDK
  .step-containers
    width 80%
    margin 50px auto 0
    .step-container
      &.form-box
        display flex
        justify-content center
        .el-form
          width 60%
      .switch-box    
        padding-left 100px
        .switch
          font-size 16px 
          font-weight 600 
          &:first-child
            margin-top 20px
          margin-bottom 20px 
          .el-switch 
            margin-left 15px 
        p 
          margin-bottom 20px    
      .hide-box
        padding-left 100px
        h3 
          font-size 16px 
          font-weight 600 
          margin-bottom 20px
        p 
          width 600px 
          line-height 30px
          margin-bottom 20px
        .el-form 
          padding 20px 0
          .el-input 
            width 60%
      .sdk-info
        padding-left 100px
        .sdk-download 
          margin-bottom 30px
          h3 
            font-size 18px 
            font-weight 600 
            margin-bottom 20px
          img 
            margin 0 30px 
            cursor pointer 
        .tip 
          font-size 16px
          margin-bottom 30px    
          a 
            color blue
        .key-info
          font-size 18px  
          div
            margin-bottom 20px
                 
  .button-box
    margin-top 50px
    text-align right
    padding-right 100px
</style>
