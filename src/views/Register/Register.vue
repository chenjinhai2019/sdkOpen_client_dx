<template>
 <div class="register-wrap">
    <h3 class="title">欢迎注册晶讯开放平台</h3>
    <el-row class="inp-item">
      <el-input v-model="username" clearable placeholder="用户名" @focus="usernameTip=true" @blur="usernameTip=false"></el-input>
      <ul class="tip username-tip" v-show="usernameTip">
        <li>* 用户名可由中文、字母、数字以及下划线组成</li>
        <li>* 长度4-16</li>
        <li>* 请勿用身份证/银行卡等隐私信息作为您的用户名</li>
      </ul>
      <div class="username-errTip errTip"></div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="email" clearable placeholder="邮箱" @focus="emailTip=true" @blur="emailTip=false"></el-input>
      <ul class="tip email-tip" v-show="emailTip">
        <li>* 请填写一个有效邮箱</li>
      </ul>
      <div class="email-errTip errTip">{{emailErrTip}}</div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="password" clearable placeholder="密码" @focus="passwordTip=true" @blur="passwordTip=false"></el-input>
      <ul class="tip password-tip" v-show="passwordTip">
        <li>* 密码可由字母、数字、标点符号组成</li>
        <li>* 6-16个字符</li>
        <li>* 字母、数字和标点符号至少包含两种</li>
      </ul>
      <div class="password-errTip errTip"></div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="checkPsd" clearable placeholder="确认密码" @focus="checkPsdTip=true" @blur="checkPsdTip=false"></el-input>
      <ul class="tip checkPsd-tip" v-show="checkPsdTip">
        <li>* 请再次输入您的密码</li>
      </ul>
      <div class="checkPsd-errTip errTip"></div>
    </el-row>
    <el-row class="captcha-box inp-item">
      <el-input maxlength="11" clearable placeholder="验证码" v-model="captcha"></el-input>
      <img class="get_verification" src="./images/captcha.svg" alt="captcha" >
      <div class="captcha-errTip errTip"></div>
    </el-row>
    
    <el-row class="checked-box">
      <el-checkbox v-model="isChecked" style="margin-right:0;">我已阅读</el-checkbox><a @click.prevent="">《服务协议》</a>
    </el-row>
    <el-row>
      <el-button type="primary" size="medium" class="login-btn" @click="register()">注册</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: true,
      timer: null,
      username: '',
      email: '',
      password: '',
      checkPsd: '',
      captcha: '',
      usernameTip: false,
      emailTip: false,
      passwordTip: false,
      checkPsdTip: false,
      emailErrTip: '',
    }
  },
  methods: {
    register() {
      const { email } = this;
      const regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
      if (email === '') {
        this.emailErrTip = '请输入邮箱'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      } else if (!regEmail.test(email)) {
        this.emailErrTip = '邮箱格式不正确'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .register-wrap
    width 360px
    margin 0 auto
    text-align center
    padding-top 50px
    .title
      width 100%
      border-bottom 1px solid #ccc
      padding-bottom 20px
      font-size: 28px
      font-weight: 400
      margin-bottom 20px
    .inp-item
      position relative
      height 70px
      .tip 
        padding 5px
        border 1px solid #ccc
        border-radius 5px
        position absolute
        li 
          text-align left 
          padding 2px
        &::before
          content ''
          position absolute
          width 0
          height 0
          border-left 5px solid transparent
          border-top 5px solid transparent
          border-bottom 5px solid transparent
          border-right 5px solid #409EFF
      .username-tip
        right -337px
        top -18px
        &::before
          left -10px
          top 32px
      .email-tip 
        right -165px
        top 1px
        &::before
          left -10px
          top 12px
      .password-tip
        right -263px
        top -20px
        &::before
          left -10px
          top 32px    
      .checkPsd-tip
        right -165px
        top 1px
        &::before
          left -10px
          top 12px 
      .errTip
        height 28px
        line-height 28px
        color red
        text-indent 2px 
        text-align left    
    .captcha-box
      .el-input
        width 240px
        float left
      img 
        height 40px
        float right
  button
    width 100%
    margin-top 20px
</style>
