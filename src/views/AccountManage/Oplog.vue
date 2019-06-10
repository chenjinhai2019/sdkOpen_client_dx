<template>
  <div class="">
    <el-main>
      <AccountManageHeader currentIndex='1'/>
      <el-row type="flex" justify="space-between" class="top-area">
        <el-col :span="8" class="left-box">
          <span style="margin-right: 10px;">选择日期:</span>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col> 
        <el-col :span="8" class="right-box"> 
          <span style="margin-right: 10px;">用户:</span>
          <el-select v-model="selectValue" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="queryLog">查询</el-button>
        </el-col>
      </el-row>
      <el-row class="content">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="tableData"
          border
          style="width: 100%;margin-bottom: 20px;"
          class="table">
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
            align="center">
          </el-table-column>
          <el-table-column
            prop="isParent"
            label="主/子账号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            align="center">
          </el-table-column>
          <el-table-column
            prop="operationTime"
            label="操作时间"
            width="300"
            align="center">
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
  </div>
</template>

<script>
import AccountManageHeader from './AccountManageHeader'

export default {
  name: '',
  data() { 
    return {
      loading: false,
      currentPage: 1, // 当前页
      pageCount: 0, // 总页数 = total/pageSize
      pageSize: 5, // 每页显示的条数
      total: 0, // 总条数
      dateValue: '',
      startTime: '',
      endTime: '',
      selectValue: '',
      options: [],
      pickerOptions: {
        /* shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
            picker.$emit('pick', [start, end]);
          }
        }] */
      },
      tableData: []
    }
  },
  mounted() {
    this.initOperateLogTable();
    this.getSelectData();
  },
  methods: {
    initOperateLogTable(currentPage = 1) {
      this.loading = true;
      this.tableData = [];
      const { pageSize, dateValue, selectValue } = this;
      // 当dateValue为空时，做容错处理
      let { startTime, endTime } = this;
      if (dateValue) {
        startTime = dateValue[0];
        endTime = dateValue[1];
      }
      const params = {
        currentPage,
        pageSize,
        startTime,
        endTime,
        userId: selectValue
      }
      this.$axios.get('/userinfo/operationLog', { params }).then((res) => {
        this.loading = false;
        const rs = res.data.data;
        // 分页相关数据
        this.total = rs.total;
        this.pageCount = rs.total / rs.pageSize;
        // console.log(rs);
        this.tableData = rs.list;
        // 格式化部分数据显示
        this.tableData.forEach((item) => {
          if (item.isParent === true) {
            item.isParent = '主账号'
          } else {
            item.isParent = '子账号'
          }
        })
      }).catch((error) => {
        this.$message.error(`${error}`)
        this.loading = false;
      })
    },
    getSelectData() {
      this.$axios.get('/userinfo/userId').then((res) => {
        const rs = res.data;
        this.options = rs.data;
        // console.log(this.options);
      })
    },
    // 查询按钮，根据条件查询
    queryLog() {
      // console.log(this.dateValue);
      // console.log(this.selectValue);
      this.initOperateLogTable();
    },
    handleCurrentChange(val) {
      this.initOperateLogTable(val);
    }
  },
  components: {
    AccountManageHeader
  }
}
</script>

<style lang="stylus" scoped>
.top-area
  text-align center
  margin-top 20px
  margin-bottom 30px
  .left-box
    min-width 430px
  .right-box
    min-width 400px
.content
  text-align center
  .pagination
    width 100%
</style>
