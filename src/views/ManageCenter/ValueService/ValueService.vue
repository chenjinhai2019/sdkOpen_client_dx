<template>
  <div class="">
      <el-main>
        <el-row class="title">
          <h1>增值服务</h1>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col class="data-analyze">
            <h2>数据分析</h2>
            <div class="img-box">
              <img src="./imgs/01.jpg" alt="">
            </div>
            <div class="cont">
              <p>提供设备以及用户数据实时记录，并对数据进行可视化处理，安全灵活，提高数据运营力</p>
            </div>
            <div class="contact">
              <p>若需要开通该服务，请联系我们的业务人员</p>
              <p>联系人：xxx</p> 
              <p>联系电话：1123123133</p>
              <p>服务时间： 9:00-18:00</p>
            </div>
          </el-col>
          <el-col>
            <h2>应用上架</h2>
            <div class="img-box">
              <img src="./imgs/02.jpg" alt="">
            </div>
            <div class="cont">
              <p>提供应用上架服务，您只需要专注产品开发，这些繁琐的流程交给我们</p>
            </div>
            <div class="contact">
              <p>若需要开通该服务，请联系我们的业务人员</p>
              <p>联系人：xxx</p> 
              <p>联系电话：1123123133</p>
              <p>服务时间： 9:00-18:00</p>
            </div>
          </el-col>
        </el-row>
      </el-main>
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

<style lang="stylus" scoped>
.el-main
  width 1200px
  margin 0 auto
  .title
    height 100px
    line-height 100px
    text-align center
    h1 
      font-size 26px
  .el-row
    .data-analyze
      margin-right 40px
    .el-col 
      width 280px
      border 1px solid #cccccc
      border-radius 5px
      padding 20px
      h2 
        height 30px
        line-height 30px
        font-size 16px
        font-weight 600 
        text-align center
      .img-box 
        margin 10px 0
        text-align center  
      .cont 
        line-height 25px
        height 80px
        margin-bottom 20px  
      .contact
        line-height 25px    
</style>
