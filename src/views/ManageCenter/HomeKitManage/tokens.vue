<template>
  <div>
    <el-breadcrumb separator="|" style="margin-top: 20px;" class="jx-stag-p">
      <el-breadcrumb-item><i class="el-icon-back"></i>&nbsp;<el-link @click="routerback">返回</el-link></el-breadcrumb-item>
      <el-breadcrumb-item>token详细信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="box-card">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="批次ID">
          <el-input v-model="formSearch.expId" placeholder="批次ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        height="540"
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="exportId"
          label="批次ID"
          width="120"
          :formatter="formatNull">
        </el-table-column>
        <el-table-column
          prop="ppid"
          label="ppid"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uuid"
          label="uuid"
          width="180"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="token"
          label="token"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="mac"
          label="mac"
          width="120"
          show-overflow-tooltip
          :formatter="formatNull">
        </el-table-column>
        <el-table-column
          prop="crc"
          label="crc"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="66"
          show-overflow-tooltip
          :formatter="formatStatus">
        </el-table-column>
        <el-table-column
          prop="base64Token"
          label="base64Token"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          sortable>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      loading: true,
      formSearch: {
        expId: ''
      }
    }
  },
  created() {
    this.getTokens();
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
    onSubmit() {
      console.log('search')
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
    formatNull(row, column) {
      return row.mac ? row.mac : '—';
    },
    formatStatus(row, column) {
      if (row.status === 0) {
        return '未使用';
      } else if (row.status === 1) {
        return '已注册';
      } else if (row.status === 2) {
        return '已销毁';
      } else {
        return '未知';
      }
    },
    getTokens() {
      const ppid = this.$route.query.ppid;
      this.$axios.get(`/homekit/token/info?currentPage=${this.currentPage}&pageSize=${this.pageSize}&ppid=${ppid}`).then((res) => {
        const rs = res.data;
        console.log(rs);
        console.log(typeof rs.data.list, rs.data.list);
        console.log(typeof this.tableData);
        this.tableData = rs.data.list;
        this.total = rs.data.total;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTokens();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTokens();
    },
    toStag(index, row) {
      console.log(index, row);
      localStorage.setItem('ppid', row.ppid);
      this.$router.push({ name: 'staging', query: { row } })
    },
  }
}
</script>
