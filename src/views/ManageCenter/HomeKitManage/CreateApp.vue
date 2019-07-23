<template>
  <div>
    <el-breadcrumb separator="|" style="margin-top: 20px;" class="jx-stag-p">
      <el-breadcrumb-item>
        <label style="color: #C0C4CC;margin-right: 10px;">|</label>HomeKit应用信息
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="10" :push="6" style="margin-top: 5%;">
            <el-form :label-position="labelPosition" :model="appForm" :rules="rules" ref="appForm"
                     label-width="75px" class="hk-ruleForm">
              <el-form-item label="ppid" prop="ppid" style="width: 400px">
                <el-input v-model="appForm.ppid" ></el-input>
              </el-form-item>
              <el-form-item label="应用名" prop="app_name" style="width: 400px">
                <el-input v-model="appForm.app_name" ></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="desc" style="width: 400px">
                <el-input :rows="3" type="textarea" v-model="appForm.desc"></el-input>
              </el-form-item>
              <div>
                <el-form-item style="width: 400px;text-align: right;" >
                  <el-button type="primary" @click="submitForm('appForm')" v-if="addFlag" :loading="add_btn_loading">保存</el-button>
                  <el-button type="primary" @click="updFrom('appForm')" v-else :loading="upd_btn_loading">更新</el-button>
                  <el-button @click="resetForm('appForm')">重置</el-button>
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
      appForm: {
        ppid: '',
        app_name: '',
        desc: ''
      },
      rules: {
        ppid: [
          { required: true, message: '请输入ppid', trigger: 'blur' }
        ],
        app_name: [
          { required: true, message: '请输入应用名', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getApp();
  },
  methods: {
    getApp() {
      const ppid = this.$route.query.ppid;
      console.log(`getApp..ppid=${ppid}`)
      if (ppid) {
        const params = {
          ppid
        }
        this.$axios.get('/homekit/app', { params }).then((res) => {
          const rs = res.data;
          console.log(rs);
          if (rs.code === 2000) {
            const { appForm } = this;
            appForm.ppid = rs.data.ppid;
            appForm.app_name = rs.data.appName;
            appForm.desc = rs.data.details;
            this.addFlag = false;
            console.log(appForm);
            console.log(`addFlag=${this.addFlag}`);
          } else {
            this.$message.info(`获取应用失败，${rs.msg}`)
          }
        })
      }
    },
    submitForm(formName) {
      this.add_btn_loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { appForm } = this;
          console.log(appForm.ppid);
          console.log(appForm.app_name);
          console.log(appForm.desc);
          const params = {
            ppid: appForm.ppid,
            appName: appForm.app_name,
            details: appForm.desc
          }
          this.$axios.post('/homekit/app', params).then((res) => {
            console.log(res.data);
            if (res.data.code === 2000) {
              this.$message.success('创建应用成功')
              setTimeout(() => {
                this.$router.push({ name: 'appManage' })
              }, 2000);
            } else {
              this.$message.error(`创建应用失败，${res.data.msg}`)
            }
            this.add_btn_loading = false;
          })
        } else {
          this.add_btn_loading = false;
          this.$message.error('校验失败')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updFrom(formName) {
      this.upd_btn_loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { appForm } = this;
          console.log(appForm.ppid);
          console.log(appForm.app_name);
          console.log(appForm.desc);
          this.$axios.put('/homekit/app', {
            ppid: appForm.ppid,
            appName: appForm.app_name,
            details: appForm.desc
          }).then((res) => {
            if (res.data.code === 2000) {
              this.$message.success('更新成功')
              setTimeout(() => {
                this.$router.push({ name: 'appManage' })
              }, 2000);
            } else {
              this.$message.error(`更新失败，${res.data.msg}`)
            }
            this.upd_btn_loading = false;
          })
        } else {
          this.upd_btn_loading = false;
          this.$message.error('校验失败')
          return false;
        }
      });
    }
  }
}
</script>
