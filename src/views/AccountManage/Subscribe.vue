<template>
  <div class="">
    <el-main>
      <AccountManageHeader currentIndex='2'/>
      <el-row class="subscribe">
        <div class="img-box">
          <img src="./imgs/subscribe.png" alt="">
        </div>
        <div class="text-box">
          <h3>订阅邮件，我们会为您的邮箱推送消息，如平台新服务、限时优惠、开发文档更新等。</h3>
          <el-switch
            v-model="subscribe"
            :active-text="subscribeText"
            @change="subscribeBtn">
          </el-switch>
        </div> 
      </el-row>
    </el-main>
  </div>
</template>

<script>
import AccountManageHeader from './AccountManageHeader'

export default {
  name: '',
  data() { 
    return {
      subscribe: false,
    }
  },
  computed: {
    subscribeText() {
      if (this.subscribe === true) {
        return '已订阅'
      } else {
        return '未订阅'
      }
    }
  },
  methods: {
    subscribeBtn() {
      const { subscribe } = this;
      const params = this.$qs.stringify({
        subscribe
      })
      this.$axios.patch('/userinfo/subscribe', params).then((res) => {
        const rs = res.data;
        // console.log(rs);
        if (rs.success === true) {
          this.$message.success('操作成功')
        }
      })
    }
  },
  components: {
    AccountManageHeader
  }
}
</script>

<style lang="stylus" scoped>
.subscribe
  width 400px
  margin 100px auto 0
  display flex
  .img-box
    margin-right 20px
  .text-box
    flex 1
    h3
      line-height 30px
      font-size 16px
      margin-bottom 15px
</style>
