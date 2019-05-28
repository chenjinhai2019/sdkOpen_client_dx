<template>
 <div>
   <div class="register-wrap">
    <h3 class="title">欢迎注册晶讯开放平台</h3>
    <el-row class="inp-item">
      <el-input v-model="username" clearable placeholder="用户名" @focus="usernameTip=true" @blur="checkUser"></el-input>
      <ul class="tip username-tip" v-show="usernameTip">
        <li>* 用户名可由中文、字母、数字以及下划线组成</li>
        <li>* 长度4-16</li>
        <li>* 请勿用身份证/银行卡等隐私信息作为您的用户名</li>
      </ul>
      <div class="username-errTip errTip">{{usernameErrTip}}</div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="email" clearable placeholder="邮箱" @focus="emailTip=true" @blur="checkEmail"></el-input>
      <ul class="tip email-tip" v-show="emailTip">
        <li>* 请填写一个有效邮箱</li>
      </ul>
      <div class="email-errTip errTip">{{emailErrTip}}</div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="password" show-password clearable placeholder="密码" @focus="passwordTip=true" @blur="passwordTip=false"></el-input>
      <ul class="tip password-tip" v-show="passwordTip">
        <li>* 密码可由字母、数字、标点符号组成</li>
        <li>* 6-16个字符</li>
        <li>* 字母、数字和标点符号至少包含两种</li>
      </ul>
      <div class="password-errTip errTip">{{passwordErrTip}}</div>
    </el-row>
    <el-row class="inp-item">
      <el-input v-model="checkPsd" show-password clearable placeholder="确认密码" @focus="checkPsdTip=true" @blur="checkPsdTip=false"></el-input>
      <ul class="tip checkPsd-tip" v-show="checkPsdTip">
        <li>* 请再次输入您的密码</li>
      </ul>
      <div class="checkPsd-errTip errTip">{{checkPsdErrTip}}</div>
    </el-row>
    <el-row class="captcha-box inp-item">
      <el-input maxlength="11" clearable placeholder="验证码" v-model="captcha" @blur="checkCaptcha"></el-input>
      <img class="get_verification" src="/userinfo/captcha" alt="captcha" @click='getCaptcha()' ref='captcha'>
      <div class="captcha-errTip errTip">{{captchaErrTip}}</div>
    </el-row>
    
    <el-row class="checked-box">
      <el-checkbox v-model="isChecked" style="margin-right:0;">我已阅读</el-checkbox><a @click.prevent="">《服务协议》</a>
    </el-row>
    <el-row>
      <el-button type="primary" size="medium" @click="register()">注册</el-button>
    </el-row>
  </div>
  <Footer></Footer>
 </div>
</template>

<script>
import Footer from 'layout/Footer'

export default {
  data() {
    return {
      validator: false,
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
      usernameErrTip: '',
      emailErrTip: '',
      passwordErrTip: '',
      checkPsdErrTip: '',
      captchaErrTip: ''
    }
  },
  mounted() {
    
  },
  methods: {
    register() {
      let { email, username, password, checkPsd, captcha, validator, isChecked } = this;
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;  
      if (username === '') {
        this.usernameErrTip = '请输入用户名'
        this.timer = setTimeout(() => {
          this.usernameErrTip = '';   
        }, 2000)
      }
      if (email === '') {
        this.emailErrTip = '请输入邮箱'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      } else if (!regEmail.test(email)) {
        this.emailErrTip = '请输入一个有效邮箱'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      }
      if (password === '') {
        validator = false;
        this.passwordErrTip = '请输入密码'
        this.timer = setTimeout(() => {
          this.passwordErrTip = '';   
        }, 2000)
      }
      if (checkPsd === '') {
        validator = false;
        this.checkPsdErrTip = '请再次输入密码'
        this.timer = setTimeout(() => {
          this.checkPsdErrTip = '';   
        }, 2000)
      }
      if (password !== '' && checkPsd !== '') {
        if (password !== checkPsd) {
          validator = false;
          this.checkPsdErrTip = '两次密码输入不一致'
          this.timer = setTimeout(() => {
            this.checkPsdErrTip = '';   
          }, 2000)
        }
      }
      if (captcha === '') {
        validator = false;
        this.captchaErrTip = '验证码不能为空'
        this.timer = setTimeout(() => {
          this.captchaErrTip = '';   
        }, 2000)
      }
      // 校验验证码是否一致
      this.checkCaptcha();
      if (username && email && password && checkPsd && captcha && password === checkPsd) {
        validator = true
      }
      const params = this.$qs.stringify({
        username,
        email,
        password,
        captcha
      })
      if (validator) {
        if (!isChecked) {
          this.$alert('请阅读服务协议并同意', '', {
            confirmButtonText: '确定',
            showClose: false
          });
        } else {
          this.$axios.post('/userinfo', params).then((res) => {
            if (res.data.success === true) {
              this.$message({
                message: '注册成功，请激活邮件完成注册',
                type: 'success'
              });
              username = '';
              email = '';
              password = '';
              checkPsd = '';
              captcha = '';
              /* this.timer = setTimeout(() => {
                this.$router.push({
                  path: '/login'
                })
              }, 500) */
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'error'
              });
            }
          }).catch((err) => {

          })
        }
      }
    },
    checkUser() {
      this.usernameTip = false;
      const { username } = this; 
      if (username === '') {
        this.usernameErrTip = '请输入用户名'
        this.timer = setTimeout(() => {
          this.usernameErrTip = '';   
        }, 2000)
      }
      const params = {
        username
      }
      if (username) {
        this.$axios.get('/userinfo/checkUsernameAndEmail', { params }).then((res) => {
          if (res.data.success === false) {
            this.usernameErrTip = '该用户名已被注册'
            this.timer = setTimeout(() => {
              this.usernameErrTip = '';
            }, 2000)
            this.validator = false;
          } 
          if (res.data.success === true) {
            this.validator = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    checkEmail() {
      this.emailTip = false
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;  
      const { email } = this; 
      if (email === '') {
        this.emailErrTip = '请输入邮箱'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      } else if (!regEmail.test(email)) {
        this.emailErrTip = '请输入一个有效邮箱'
        this.timer = setTimeout(() => {
          this.emailErrTip = '';   
        }, 2000)
      }
      const params = {
        email
      }
      if (email && regEmail.test(email)) {
        this.$axios.get('/userinfo/checkUsernameAndEmail', { params }).then((res) => {
          if (res.data.success === false) {
            this.emailErrTip = '该邮箱已被注册'
            this.timer = setTimeout(() => {
              this.emailErrTip = '';   
            }, 2000)
            this.validator = false;
          } 
          if (res.data.success === true) {
            this.validator = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    checkCaptcha() {
      const { captcha } = this;
      const params = {
        captcha
      }
      if (captcha) {
        this.$axios.get('/userinfo/checkCaptcha', { params }).then((res) => {
          if (res.data.success === false) {
            this.validator = false;
            this.captchaErrTip = '验证码错误，请重新输入'
            this.timer = setTimeout(() => {
              this.captchaErrTip = '';   
            }, 2000)
          } 
          if (res.data.success === true) {
            this.validator = true;
          }
        })
      }
    },
    getCaptcha() {
      this.$refs.captcha.src = `/userinfo/captcha?time=${Date.now()}`;
    }
  },
  components: {
    Footer,
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
    padding-bottom 20px
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
        width 260px
        float left
      .get_verification
        cursor pointer  
      img 
        height 40px
        float right
  button
    width 100%
    margin-top 20px
</style>
