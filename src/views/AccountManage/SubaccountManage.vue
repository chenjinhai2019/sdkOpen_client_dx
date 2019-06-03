<template>
  <div class="">
    <el-main>
      <AccountManageHeader />
      <el-row>
        <el-col :span="10">
          <el-alert
            title="注：您最多可以添加10个子账号"
            type="warning"
            show-icon
            :closable="false">
          </el-alert>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-button @click="dialogVisible = true" type="primary">添加子账号</el-button>
      </el-row>
      <el-row class="table">
        <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            fixed
            type="index"
            label="序号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="280">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="添加时间"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            label="权限"
            align="center"
            width="500">
            <template slot-scope="scope" :data="tableData.permissionList" class="check-box">
                <el-checkbox @change="changeAuthority(scope, item.permissionBit)" v-model="item.has" :label="item.permissionName" v-for="(item,index) in scope.row.permissionList" :key="index"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            width="">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope, tableData)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :page-size="pageSize"
          :page-count="pageCount"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          class="pagination">
        </el-pagination>
      </el-row>
    </el-main>
    <el-dialog title="添加子账号" class="dialog" :visible.sync="dialogVisible" width="500px">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item prop="username" label="子账号用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="子账号邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubaccount('form')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AccountManageHeader from './AccountManageHeader'

export default {
  name: '',
  data() { 
    return {
      currentPage: 1, // 当前页
      pageCount: 0, // 总页数 = total/pageSize
      pageSize: 5, // 每页显示的条数
      total: 0, // 总条数
      tableData: [],
      loading: false,
      dialogVisible: false,
      form: {
        username: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, message: '长度至少为 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  mounted() {
    this.initTeamTable()
  },
  methods: {
    // 修改权限
    changeAuthority(scope, bit) {
      const childId = scope.row.childId;
      const permissionBit = bit
      // console.log(childId, bit);
      const params = this.$qs.stringify({
        permissionBit
      })
      this.$axios.patch(`/userinfo/team/${childId}/permission`, params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('修改权限成功！')
        } else {
          const nowItem = scope.row.permissionList[permissionBit - 1];
          nowItem.has = !nowItem.has
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    // 表格初始化
    initTeamTable(currentPage = 1) {
      this.loading = true;
      this.tableData = []; // 每次请求数据前清空原有数据
      const { pageSize, tableData } = this;
      const params = {
        currentPage,
        pageSize
      }
      this.$axios.get('/userinfo/team', { params }).then((res) => {
        this.loading = false;
        const rs = res.data.data;
        // console.log(rs);
        // 分页相关数据
        this.total = rs.total;
        this.pageCount = rs.total / rs.pageSize;

        // table相关数据
        // 准备tableData相关的数据，根据list数据重写tableData数组对象
        const arr = rs.list;
        // console.log(arr);
        arr.map((item, index) => tableData.push(
          Object.assign({}, { 
            username: item.username, 
            email: item.email,
            childId: item.childId,
            createTime: item.createTime,
            binaryPermission: item.binaryPermission,
            permissionList: item.permissionList.slice(0, 12),
            status: item.confirm ? '已确认' : '等待确认',
          })
        ))
        // this.authority = tableData.permissionList;
        // 权限配置
        /* tableData.forEach((item, index) => {
          item.binaryPermission = item.binaryPermission.substring(4);
          const nameArr = ['申请公版OEM', '查看公版OEM配置', '申请SDK', '查看SDK配置', '添加普通产品', '删除普通产品', '修改普通产品配置', '查看普通产品配置', '添加天猫配件', '删除天猫配件', '修改天猫配件配置', '查看天猫配件配置'];
          for (let i = 0; i < item.binaryPermission.length; i++) {
            item.authority[i].code = item.binaryPermission.substring(i, 1);
            item.authority[i].name = nameArr[i];
          }
        }) */
        console.log(tableData)
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.initTeamTable(val);
    },
    addSubaccount(formName) {
      const { username, email } = this.form;
      
      // 添加子账号
      const params = this.$qs.stringify({
        username,
        email
      })
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/userinfo/team', params).then((res) => {
            this.dialogVisible = false;
            let rs = res.data;
            if (rs.success === true) {
              this.tableData.unshift(rs.data);
              this.initTeamTable()
            } else {
              this.$message({
                message: `${rs.msg}`,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 删除
    deleteRow(scope, tableData) {
      this.$confirm('是否删除该子账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const childId = scope.row.childId;
        const index = scope.$index;
        const params = {
          childId
        }
        this.$axios.delete(`/userinfo/team/${childId}`).then((res) => {
          const rs = res.data;
          if (rs.success === true) {
            tableData.splice(index, 1);
          }
        })
      }).catch(() => {
          
      });
    }
  },
  components: {
    AccountManageHeader
  }
}
</script>

<style lang="stylus" scoped>
.el-main
  .el-row 
    margin-bottom 20px  
    h1 
     font-size 28px
     text-align left 
  .table 
    .el-table 
      margin-bottom 30px
      .cell
        display flex 
        .el-checkbox
          flex 1    
</style>
