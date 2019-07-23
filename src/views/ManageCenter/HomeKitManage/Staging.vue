<template>
  <div>
    <el-breadcrumb separator="|" style="margin-top: 20px;" class="jx-stag-p">
      <el-breadcrumb-item>
        <i class="el-icon-back"></i>&nbsp;
        <el-link @click="routerback" style="color: #606266;">
          返回
        </el-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>Staging&Producting</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <span class="jx-stag-p-c">
      <el-card class="box-card">
        <p>应用名：{{app.appName}}</p>
        <p>ppid：{{app.ppid}}</p>
      </el-card>

      <el-tabs type="border-card">
        <el-tab-pane label="Staging">
            <p>
              生成CSR文件后可用来生成下载PEM文件
            </p>
            <br/>
            <el-row :gutter="20">
              <el-col :span="2">
                <div style="margin-top: 10px;">CSR文件</div>
              </el-col>
              <el-col :span="2">
                <el-button @click="createCSR()" disabled>生成</el-button>
              </el-col>
              <el-col :span="2">
                <el-button @click="downloadCSR()" disabled>下载</el-button>
              </el-col>
              <el-col :span="2">
                <el-button @click="deleteCSR()" disabled>删除</el-button>
              </el-col>
              <el-col :span="24">
               <el-divider></el-divider>
              </el-col>
              <el-col :span="24">
                <p >
                  RequestId和PEM文件可以到苹果指定的网站去获取
                </p>
                <br/>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="RequestId">
                  <el-input v-model="formInline.request" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="PEM文件">
                  <el-upload
                    class="upload-demo"
                    action="/homekit/staging-pem"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button disabled>上传</el-button>
                    <el-button @click.stop="deletePEM()" disabled>删除</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              <p>
                测试前先填写RequestId和上传PEM文件，测试成功后可以导出测试过程的详细信息
              </p>
              <br/>
              </el-col>
              <el-col :span="24">
                <el-form :inline="true">
                <el-form-item>
                <el-button @click="testStag" :loading="tsag_btn_loading">一键测试</el-button>
                  <div>{{this.testMsg}}</div>
                </el-form-item>
                 <el-form-item v-if="tasgFn">
                  <el-badge :is-dot="tasgDoFn" class="tsga">
                    <el-button @click="testStagRe">测试结果导出</el-button>
                  </el-badge>
                </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card" v-if="testStagFn">
                  <el-collapse accordion >
                    <el-collapse-item>
                      <template slot="title">
                        <i class="el-icon-circle-check" v-if="this.testRequest.applyResult"></i>
                        <i class="el-icon-circle-close" v-else></i>
                        &nbsp;申请结果
                      </template>
                      <p>申请参数对象</p>
                      <div>ppid ：{{this.testRequest.applyParam.ppid}}</div>
                      <div>申请数量 ：{{this.testRequest.applyParam.requested_auth_entity_count}}</div>
                      <div v-if="this.testRequest.applyResult">状态：验证通过</div>
                      <div v-else>状态：验证失败</div>
                    </el-collapse-item>
                    <el-collapse-item>
                      <template slot="title">
                        <i class="el-icon-circle-check" v-if="this.testRequest.registerResult"></i>
                        <i class="el-icon-circle-close" v-else></i>
                        &nbsp;注册结果
                      </template>
                      <p>注册参数对象</p>
                      <div>
                        <ul>
                          <li v-for="value in this.testRequest.registerParam.auth_entities" :key="value.key">
                            {{ value }}
                          </li>
                        </ul>
                      </div>
                      <div v-if="this.testRequest.registerResult">状态：验证通过</div>
                      <div v-else>状态：验证失败</div>
                    </el-collapse-item>
                    <el-collapse-item title="销毁结果">
                      <template slot="title">
                        <i class="el-icon-circle-check" v-if="this.testRequest.destroyResult"></i>
                        <i class="el-icon-circle-close" v-else></i>
                        &nbsp;销毁结果
                      </template>
                      <p>销毁参数对象</p>
                      <div>
                        <ul>
                          <li v-for="value in this.testRequest.destroyParam.auth_entities" :key="value.key">
                            {{ value }}
                          </li>
                        </ul>
                      </div>
                      <div v-if="this.testRequest.destroyResult">状态：验证通过</div>
                      <div v-else>状态：验证失败</div>
                    </el-collapse-item>
                  </el-collapse>
                </el-card>
              </el-col>

            </el-row>
        </el-tab-pane>

        <el-tab-pane label="Producting">
            <p>
              生成CSR文件后可用来生成下载PEM文件
            </p>
            <br/>
            <el-row :gutter="20">
              <el-col :span="2">
                <div style="margin-top: 10px;">CSR文件</div>
              </el-col>
              <el-col :span="2">
                <el-button disabled>生成</el-button>
              </el-col>
              <el-col :span="2">
                <el-button disabled>下载</el-button>
              </el-col>
              <el-col :span="2">
                <el-button disabled>删除</el-button>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="24">
                <p>
                  RequestId和PEM文件可以到苹果指定的网站去获取
                </p>
                <br/>
                <el-form :inline="true" :model="formInline">
                  <el-form-item label="RequestId">
                    <el-input v-model="formInline.request" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="PEM文件">
                    <el-button disabled>上传</el-button>
                    <el-button disabled>删除</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="doProduct">
                  <el-tab-pane label="申请" name="apply">
                      <el-form :inline="true" :model="formInline" class="">
                        <el-form-item label="申请数量（1~10000）">
                          <el-input-number v-model="apply_num" @change="applyChange"
                                           :min="1" :max="10000" label="申请数量"></el-input-number>
                        </el-form-item>
                        <el-form-item>
                          <el-button @click="apply" :loading="apply_btn_loading">申请</el-button>
                        </el-form-item>
                        <el-form-item>
                          <el-button @click="goTokens">token详情</el-button>
                        </el-form-item>
                      </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="上传" name="macAddreUpl">
                    <el-row :gutter="20">
                      <el-col :span="5">
                        <el-form :inline="true" :model="formInline">
                          <el-form-item label="描述">
                            <el-input :rows="2" type="textarea" v-model="macUploadData.details"></el-input>
                          </el-form-item>
                        </el-form>
                      </el-col>
                      <el-col :span="5">
                          <el-upload
                            action="/homekit/file"
                            accept="txt"
                            :on-preview="macHandlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :beforeUpload="macBeforeUp"
                            :data="macUploadData"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :on-success="successUp"
                            :on-error="errorUp"
                            :file-list="fileList">
                            <el-button size="small" type="primary">mac地址文件上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传txt/xlsx文件</div>
                            <div slot="tip" class="el-upload__tip">{{ this.uploadMessage }}</div>
                          </el-upload>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="导出" name="export">
                    <div v-if="isExportFn">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-table
                            :data="csvs"
                            style="width: 100%">
                            <el-table-column
                              prop="exportId"
                              label="文件"
                              :formatter="formatExpId"
                              width="180">
                            </el-table-column>
                            <el-table-column
                              prop="createTime"
                              label="注册时间"
                              :formatter="formatTime"
                              width="180">
                            </el-table-column>
                            <el-table-column
                              prop="details"
                              width="180"
                              label="描述">
                            </el-table-column>
                            <el-table-column
                              fixed="right"
                              label="操作"
                              width="100">
                              <template slot-scope="scope">
                                <el-button @click="exportCsv(scope.row.exportId)" type="text" size="small">导出</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <div class="block">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="currentPage"
                              :page-sizes="[5, 10, 30, 40]"
                              :page-size="pageSize"
                              :hide-on-single-page="singlePageFn"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="total">
                            </el-pagination>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
        </el-tab-pane>
      </el-tabs>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasgDoFn: true,
      tasgFn: false,
      testMsg: '',
      singlePageFn: false,
      tsag_btn_loading: false,
      apply_btn_loading: false,
      apply_num: 1,
      uploadMessage: '',
      total: 0,
      pageSize: 5,
      currentPage: 1,
      csvs: [
        {
          id: '',
          exportId: '',
          ppid: '',
          createTime: '',
          details: ''
        }
      ],
      isExportFn: false,
      macUploadData: {
        ppid: '',
        details: ''
      },
      testStagFn: false,
      num: 1000,
      fileList: [],
      formInline: {
        user: '',
        region: ''
      },
      app: {
        appName: '',
        ppid: ''
      },
      testRequest: {
        applyResult: false,
        registerResult: false,
        destroyResult: false,
        applyParam: {
          ppid: '',
          requested_auth_entity_count: 0
        },
        registerParam: {
          auth_entities: [],
          ppid: ''
        },
        destroyParam: {},
      },
      activeName: 'apply'
    }
  },
  created() {
    this.initParam();
  },
  methods: {
    routerback() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    goTokens() {
      const { app } = this;
      const ppid = app.ppid;
      this.$router.push({ name: 'tokens', query: { ppid } })
    },
    testStagRe() {
      setTimeout(() => {
        this.tasgDoFn = false;
      }, 500)
      const { app } = this;
      const ppid = app.ppid;
      window.open(`/homekit/staging/test/result?ppid=${ppid}`, '_parent');
    },
    doProduct(tab, event) {
      console.log('doProduct', tab.name, event);
      if (tab.name === 'export') {
        console.log(' - register- -destroy - ')
        this.getCsvs();
      }
    },
    apply() {
      this.apply_btn_loading = true;
      const { app } = this;
      if (app.ppid && this.apply_num) {
        this.$axios.post('/homekit/token', {
          number: this.apply_num,
          ppid: app.ppid
        }).then((res) => {
          console.log('开始申请', res.data);
          if (res.data.code === 2000) {
            this.$message.success('申请成功')
          } else {
            this.$message.error(`申请失败,${res.data.msg}`)
          }
          this.apply_btn_loading = false;
        })
      } else {
        this.$message.error('申请参数失败')
        this.apply_btn_loading = false;
      }
    },
    errorUp(err, file, fileList) {
      console.log('上传失败返回数据...')
      if (err.status === 404) {
        this.uploadMessage = '上传失败：找不到上传路径';
      } else {
        this.uploadMessage = `上传失败：错误码为${err.status}`;
      }
    },
    successUp(response, file, fileList) {
      console.log('上传成功返回数据...')
      console.log(response)
      if (response.code === 2000) {
        this.uploadMessage = '上传成功';
      } else {
        this.uploadMessage = `上传失败：${response.msg}`;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getCsvs();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getCsvs();
    },
    formatTime(row) {
      if (row.createTime) {
        const d = new Date(row.createTime);
        let month = d.getMonth() + 1;
        month = month < 10 ? `0${month}` : `${month}`;
        const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
        const h = d.getHours() < 10 ? `0${d.getHours()}` : `${d.getHours()}`;
        const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
        const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : `${d.getSeconds()}`;
        return `${d.getFullYear()}-${month}-${day} ${h}:${m}:${s}`;
      }
      return '—';
    },
    exportCsv(exportId) {
      console.log('exportCsv..')
      window.open(`/homekit/file?exportId=${exportId}`, '_parent');
    },
    formatExpId(row, column) {
      return row.exportId ? `${row.exportId}.xlsx` : '-';
    },
    getCsvs() {
      const { app } = this;
      this.$axios.get(`/homekit/files?ppid=${app.ppid}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then((res) => {
        const rs = res.data;
        console.log('getCsvs', rs);
        if (rs.code === 2000) {
          console.log(rs.data.list)
          this.csvs = rs.data.list;
          this.total = rs.data.total;
          this.pageNum = rs.data.pageNum;
          this.pageSize = rs.data.pageSize;
          if (rs.data.pages === 1 || rs.data.pages === 0) {
            this.singlePageFn = true;
          }
        } else {
          this.singlePageFn = true;
        }
        this.isExportFn = true;
      })
    },
    handleClick(tab, event) {
      console.log('handleClick', tab, event);
    },
    applyChange(value) {
      console.log(value);
      this.num = value;
      console.log(this.num);
    },
    initParam() {
      const item = this.$route.query.item;
      if (item.ppid) {
        const { app, macUploadData } = this;
        app.appName = item.appName;
        app.ppid = item.ppid;
        macUploadData.ppid = item.ppid;
      } else {
        const ppid = localStorage.getItem('ppid');
        if (ppid) {
          this.getApp(ppid);
        }
      }
    },
    getApp(ppid) {
      const params = {
        ppid
      }
      this.$axios.get('/homekit/app', { params }).then((res) => {
        const rs = res.data;
        if (rs.code === 2000) {
          const { app, macUploadData } = this;
          app.appName = rs.data.appName;
          app.ppid = rs.data.ppid;
          macUploadData.ppid = rs.data.ppid;
        }
      })
    },
    createCSR() {
      this.$axios.post('/homekit/staging-csr').then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          this.$message.success('生成CSR成功')
        }
      })
    },
    downloadCSR() {
      this.$axios.get('/homekit/staging-csr').then((res) => {
        const rs = res.data;
        console.log(rs);
      })
    },
    deleteCSR() {
      this.$axios.delete('/homekit/staging-csr').then((res) => {
        if (res.data.code === 2000) {
          this.$message.success('删除成功')
        }
      })
    },
    deletePEM() {
      this.$axios.delete('/homekit/staging-pem').then((res) => {
        if (res.data.code === 2000) {
          this.$message.success('删除成功')
        }
      })
    },
    testStag() {
      this.tasgDoFn = true;
      this.tasgFn = false;
      this.testStagFn = false;
      this.tsag_btn_loading = true;
      this.testMsg = '一键测试请求过程可能耗时2分钟...';
      console.log(this.testMsg)
      const { app, testRequest } = this;
      console.log('一键测试-app-', app);
      this.$axios.get(`/homekit/staging/test?ppid=${app.ppid}`).then((res) => {
        const rs = res.data;
        console.log(rs);
        if (rs.code === 2000) {
          testRequest.applyResult = rs.data.applyResult;
          testRequest.registerResult = rs.data.registerResult;
          testRequest.destroyResult = rs.data.destroyResult;
          testRequest.applyParam = rs.data.applyParam;
          testRequest.registerParam = rs.data.registerParam;
          testRequest.destroyParam = rs.data.destroyParam;
          console.log('testRequest', testRequest);
          this.testStagFn = true;
          this.tasgFn = true;
        } else if (rs.code === 2011) {
          this.$message.error(`${res.data.msg}`)
        } else {
          this.$message.error(`一键测试失败，${res.data.msg}`)
        }
        this.tsag_btn_loading = false;
        this.testMsg = '';
      })
    },
    downTestStag() {
      this.$axios.get('/homekit/staging-test-result').then((res) => {
        const rs = res.data;
        console.log(rs);
      })
    },
    macBeforeUp(file) {
      console.log('macBeforeUp', file);
      if (!(file.type === 'text/plain' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        this.uploadMessage = '文件格式错误：上传文件格式必须为txt或xlsx';
        return false;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    macHandlePreview(file) {
      console.log('macHandlePreview', file);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .jx-font {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    size: 20px;
  }
  .jx-stag-p {
    line-height: 1.5;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .jx-stag-p-c {
    line-height: 1.5;
    font-size: 15px;
    color: #606266;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .tsga {
    margin-right: 40px;
  }
</style>
