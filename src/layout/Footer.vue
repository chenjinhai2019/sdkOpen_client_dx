<template>
  <div class="footer-wrapper">
    <div class="left-box">
      <p>深圳晶讯软件通讯技术有限公司</p>
      <p>中国深圳南山区学苑大道1001号南山智园A5栋三楼</p>
      <p>粤ICP备11106313号-1</p>
    </div>
    <div class="right-box">
      <p>业务咨询：</p>
      <p>电话：13802215026（宋先生）</p>
      <p>邮箱：songmx@jingxunsoft.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer-wrapper
  width 1000px
  display flex
  margin 0 auto
  text-align left 
  padding-top 20px
  .left-box
    flex 1
    margin-left 10%
  .right-box
    flex 1
    margin-left 10%
  p 
    height 28px 
    line-height 28px
</style>
