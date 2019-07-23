<template>
  <div>

  <el-breadcrumb separator="|" style="margin-top: 20px;" class="jx-stag-p">
    <el-breadcrumb-item>
      <label style="color: #C0C4CC;margin-right: 10px;">|</label>基本信息
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-divider></el-divider>


    <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="10" :push="7" style="margin-top: 5%;">
        <el-form :label-position="labelPosition" :model="basicInfoForm" :rules="rules" ref="basicInfoForm"
                 label-width="100px" class="hk-ruleForm">
            <el-form-item label="MFi账号" prop="mfiAccount" >
              <el-input v-model="basicInfoForm.mfiAccount" maxlength="6" placeholder="输入Apple授权的MFi账号"
                        style="width: 332px;" show-word-limit></el-input>
              <div>MFi账号通常由六个数字组成。例如：215445</div>
            </el-form-item>
            <el-form-item label="公司名" prop="company">
              <el-input v-model="basicInfoForm.company" maxlength="50" placeholder="输入Apple授权的企业名称(英文)"
                        style="width: 332px;" show-word-limit></el-input>
              <div>申请MFi账号时提供的公司名全称。例如：ACME Inc.</div>
            </el-form-item>
          <div style="margin-left: 178px;">
            <el-form-item >
              <el-button type="primary" @click="submitForm('basicInfoForm')" :loading="add_btn_loading" v-if="addFlag">保存</el-button>
              <el-button type="primary" @click="updFrom('basicInfoForm')" :loading="upd_btn_loading" v-else>更新</el-button>
              <el-button @click="resetForm('basicInfoForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    </el-card>
    </div>


</template>
<script>
export default {
  data() {
    return {
      add_btn_loading: false,
      upd_btn_loading: false,
      labelPosition: 'left',
      addFlag: true,
      updFlag: false,
      basicInfoForm: {
        mfiAccount: '',
        company: ''
      },
      rules: {
        mfiAccount: [
          { required: true, message: '请输入MFi账号', trigger: 'blur' },
        ],
        company: [
          { required: true, message: '请输入FMi账号公司名全称', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.initHomeKitBasicInfo();
  },
  methods: {
    initHomeKitBasicInfo() {
      this.$axios.get('/homekit/mfi-info').then((res) => {
        const rs = res.data;
        console.log(`get initHomeKitBasicInfo--${rs}`);
        if (rs.success) {
          if (rs.data) {
            const { basicInfoForm } = this;
            basicInfoForm.mfiAccount = rs.data.mfiAccount;
            basicInfoForm.company = rs.data.enName;
            this.updFlag = true;
            this.addFlag = false;
          }
        }
      })
    },
    submitForm(formName) {
      this.add_btn_loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { basicInfoForm } = this;
          console.log(basicInfoForm.mfiAccount);
          console.log(basicInfoForm.company);
          const params = this.$qs.stringify({
            mfiAccount: basicInfoForm.mfiAccount,
            enName: basicInfoForm.company
          })
          this.$axios.post('/homekit/mfi-info', params).then((res) => {
            console.log(res.data);
            if (res.data.code === 2000) {
              this.$message.success('创建成功')
              this.addFlag = false;
            } else {
              this.$message.success(`创建失败，${res.data.msg}`)
            }
            this.add_btn_loading = false;
          })
        } else {
          this.$message.error('校验失败');
          this.add_btn_loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const { basicInfoForm } = this;
      basicInfoForm.mfiAccount = '';
      basicInfoForm.company = '';
    },
    updFrom(formName) {
      this.upd_btn_loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { basicInfoForm } = this;
          console.log(basicInfoForm.mfiAccount);
          console.log(basicInfoForm.company);
          this.$axios.put('/homekit/mfi-info', {
            mfiAccount: basicInfoForm.mfiAccount,
            enName: basicInfoForm.company
          }).then((res) => {
            if (res.data.code === 2000) {
              this.$message.success('更新成功')
            } else {
              this.$message.error(`更新失败，${res.data.msg}`);
            }
            this.upd_btn_loading = false;
          })
        } else {
          this.$message.error('校验失败')
          this.upd_btn_loading = false;
        }
      });
    }
  }
}
</script>
<style>
  .basic-info {
    margin-top: 20px;
  }
  .jx-stag-p {
    line-height: 1.5;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 12px 0;
  }
  .el-input__count-inner {
    background: #FFF;
    display: inline-block;
    padding: 0 5px;
    height: 38px;
  }
</style>
