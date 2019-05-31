<template>
  <div class="">
    <el-main>
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
        <el-button type="primary">添加子账号</el-button>
      </el-row>
      <el-row class="table">
        <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            fixed
            type="index"
            label="序号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="添加时间"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="权限"
            align="center"
            width="500">
            <template slot-scope="scope" :data="tableData.permissionList" class="check-box">
                <el-checkbox @change="showDialog(scope.row)" v-model="item.has" :label="item.permissionName" v-for="(item,index) in scope.row.permissionList" :key="index"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
          layout="prev, pager, next"
          :total="total"
          class="pagination">
        </el-pagination>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      currentPage: 1, // 当前页
      pageCount: 0, // 总页数 = total/pageSize
      pageSize: 2, // 每页显示的条数
      total: 0, // 总条数
      tableData: [],
      binaryPermission: '', // 相关权限二进制
      authority: [],
    }
  },
  mounted() {
    this.initTeamTable()
  },
  methods: {
    showDialog(scope) {
      console.log(scope);
    },
    initTeamTable() {
      const { currentPage, pageSize, tableData } = this;
      const params = {
        currentPage,
        pageSize
      }
      this.$axios.get('/userinfo/team', { params }).then((res) => {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-main
  .el-row 
    margin-bottom 20px   
  .table 
    .el-table 
      margin-bottom 30px
      .cell
        display flex 
        .el-checkbox
          flex 1
</style>
