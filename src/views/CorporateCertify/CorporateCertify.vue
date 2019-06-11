<template>
  <div class="wrapper">
    <el-row type="flex" class="title">
      <h1>企业认证</h1>
    </el-row>
    <el-form label-width="180px" label-position="left" :model="form" ref="form" :rules="rules">
      <el-form-item label="企业名称：" prop="cnName">
        <el-input v-model="form.cnName"></el-input>
      </el-form-item>
      <el-form-item label="企业名称(英文)：" prop="enName">
        <el-input v-model="form.enName"></el-input>
      </el-form-item>
      <el-form-item label="企业地址：" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名：" prop="contact">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱：" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话：" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item class="captcha" label="验证码：" prop="code">
        <el-input v-model="form.code" @blur="checkCode"></el-input>
        <el-button style="margin-left: 15px;" type="primary" @click="getCode">{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</el-button>
      </el-form-item>
      <el-form-item label="企业证件：" >
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
      <el-form-item class="check-box" label-width="0">
        <el-checkbox v-model="isChecked" style="margin-right:0;">我已阅读</el-checkbox> 深圳市晶讯软件有限公司 <a @click.prevent="">隐私声明</a>
      </el-form-item>
      <el-form-item class="btn" label-width="0">
        <el-button type="primary" @click.prevent.stop="certify('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      
    </el-row>
    <el-row>
      
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
      rules: // 表单校验规则
        { 
          cnName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          enName: [
            { required: false, message: '请输入企业英文名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入企业地址', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          phone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    certify(formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { form, businessLicenseImg } = this;
          let params = form;
          params.businessLicenseImg = businessLicenseImg;
          console.log(params);
          params = this.$qs.stringify(params);
          this.$axios.post('/userinfo/company', params).then((res) => {
            const rs = res.data;
            if (rs.success === true) {
              this.$message({
                message: '提交审核成功，请等待后台人员审核',
                type: 'success'
              });
            }
            this.timer = setTimeout(() => {
              this.$router.replace('/home')
            }, 500)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCode() {
      const { form } = this
      const phone = form.phone;
      const params = this.$qs.stringify({
        phone
      })
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

        this.$axios.post('/verificationCode', params).then((res) => {
          console.log(res.data);
        })
      }
    },
    checkCode() {
      const { form } = this
      const code = form.code;
      const params = {
        code
      }
      this.$axios.get('/verificationCode', { params }).then((res) => {
        console.log(res.data);
      })
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
    .check-box
      text-align center
    .el-input 
      width 100%
      float left
    .captcha
      .el-input 
        width 70%
      .el-button
        width 110px  
  .btn
    text-align center
    .el-button
      width 80% 
      margin 20px auto 0
</style>
