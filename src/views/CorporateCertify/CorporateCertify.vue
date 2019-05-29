<template>
  <div class="wrapper">
    <el-row type="flex" class="title">
      <h1>企业认证</h1>
    </el-row>
    <el-form label-width="180px" label-position="left" :model="form">
      <el-form-item label="企业名称：">
        <el-input v-model="form.cnName"></el-input>
      </el-form-item>
      <el-form-item label="企业名称(英文)：">
        <el-input v-model="form.enName"></el-input>
      </el-form-item>
      <el-form-item label="企业地址：">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名：">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱：">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item class="captcha" label="验证码：">
        <el-input v-model="form.code"></el-input>
        <el-button type="primary" @click="getCode">{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</el-button>
      </el-form-item>
      <el-form-item label="企业证件：">
        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :limit="2"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-row>
      <el-checkbox v-model="isChecked" style="margin-right:0;">我已阅读</el-checkbox> 深圳市晶讯软件有限公司 <a @click.prevent="">隐私声明</a>
    </el-row>
    <el-row class="btn">
      <el-button type="primary" @click.prevent.stop="certify()">提交</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: '',
  data() { 
    return {
      form: {
        cnName: '',
        enName: '',
        address: '',
        contact: '',
        email: '',
        phone: '',
        code: ''
      },
      businessLicenseImg: '', // 上传图片的name
      computedTime: 0, // 计时
      flag: false, // 是否正在计时，false表示没有在计时
      dialogImageUrl: '',
      dialogVisible: false,
      isChecked: true,
    }
  },
  methods: {
    certify() {
      const { form, businessLicenseImg } = this;
      const params = form;
      params.businessLicenseImg = businessLicenseImg;
      console.log(params);
      this.$axios.post('/userinfo/company', params).then((res) => {
        const rs = res.data;
        console.log(rs);
      })
    },
    getCode() {
      // 启动倒计时
      if (!this.computedTime) {
        this.flag = true;
        this.computedTime = 30;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime === 0) {
            clearInterval(this.timer);
            this.flag = false;
          }
        }, 1000);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(response, file) {
      // console.log(response, file);
      this.businessLicenseImg = file.name;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 2 个文件');
    },
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  width 1200px 
  margin 0 auto 80px
  padding 20px
  .title
    h1 
     font-size 28px
  .el-form
    width 600px
    margin 50px auto 0
    .el-input 
      width 100%
      float left
    .captcha
      .el-input 
        width 70%
      .el-button
        width 110px  
  .btn
    .el-button
      width 400px 
      margin 40px auto 0
</style>
