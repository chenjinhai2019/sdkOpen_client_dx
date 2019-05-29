<template>
  <div class="">
    <div class="login-wrapper">
      <div class="login-form">
        <h2>晶讯开放平台</h2>
        <el-row>
          <el-input placeholder="用户名/邮箱" v-model="username" clearable></el-input>
        </el-row>
        <el-row>
          <el-input placeholder="密码" v-model="password" show-password></el-input>
        </el-row>
        <el-row>
          <el-button type="primary" size="medium" class="login-btn" @click="login">登录</el-button>
        </el-row>
        <el-row type="flex" justify="space-between" class="link-wrapper">
          <el-col>
            <router-link to='/register' class="toRegister">免费注册</router-link>
          </el-col>
          <el-col>
            <router-link to='forgetPsd' class="toForgetPsd">忘记密码</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from 'layout/Footer'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

export default {
  name: '',
  data() { 
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
  },
  methods: {
    login() {
      const { username, password } = this;
      const params = {
        account: username,
        password
      }
      this.$axios.get('/userinfo', { params }).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          console.log(rs.data);
          const user = rs.data.username;
          const userInfo = {
            user,
          }
          this.$store.dispatch('userInfo', userInfo);
          Cookies.set('username', user);

          // 判断是否需要跳回到路由拦截的页面
          let oldPath = this.$route.query.redirect;
          const certifyState = Cookies.get('certifyState')
          if (oldPath && certifyState !== '-1') {
            this.timer = setTimeout(() => {
              this.$router.push({
                path: `${oldPath}`
              })
            }, 500);
          } else if (oldPath && certifyState === '-1') {
            this.timer = setTimeout(() => {
              this.$router.push({
                path: '/corporateCertify'
              })
            }, 500);
          } else {
            this.timer = setTimeout(() => {
              this.$router.push({
                path: '/home'
              })
            }, 500);
          }
        } else {
          this.$message({
            message: `${res.data.msg}`,
            type: 'error'
          });
        }
      })
    }
  },
  components: {
    Footer,
  },
}
</script>

<style lang="stylus" scoped>
.login-wrapper
  background url("./images/banner.jpg") no-repeat
  padding 100px
  display flex
  flex-direction row-reverse
  justify-content center
  .login-form
    width 300px
    background #999
    border 1px solid #333
    padding 50px
    h2 
      font-size 26px
      color #fff
      margin-bottom 20px
    .el-input 
      margin-bottom 20px  
    .link-wrapper
      margin-top 10px  
      .toRegister
       float left
      .toForgetPsd
        float right
  .el-button
    width 100%
    margin-top 20px  
</style>
