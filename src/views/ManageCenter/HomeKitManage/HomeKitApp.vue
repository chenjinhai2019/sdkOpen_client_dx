<template>
  <div class="wrap">
    <el-breadcrumb separator="|" style="margin-top: 20px;" class="jx-stag-p">
      <el-breadcrumb-item><label style="color: #C0C4CC;margin-right: 10px;">|</label>应用管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="box-card" v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">

      <el-row class="">
        <ul class="product-list">
          <li class="add-btn" @click="createApp($event)">+</li>
          <li class="item" v-for="(item,index) in appLists" :key="index"  @click="toStaging($event,item)">
            <el-row>
              <el-col :span="24" style="margin-top: 10%;">
                  <div>应用名: {{item.appName}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="margin-top: 6%;">
                  <div>ppid: {{item.ppid}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="margin-top: 3%;">
                创建时间: {{ item.createTime | formatDate }}
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" style="margin-top: 1%;">
                <el-button style="width: 115%;" @click="toStaging($event,item)">详情</el-button>
              </el-col>
              <el-col :span="10" :push="2" style="margin-top: 1%;">
                  <el-button style="width: 115%;" @click.stop="queryApp($event,item.ppid)">编辑</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      appLists: [],
      id: '',
      loading: true
    }
  },
  created() {
    this.initAppList();
  },
  filters: {
    formatDate(date) {
      const d = new Date(date);
      let month = d.getMonth() + 1;
      month = month < 10 ? `0${month}` : `${month}`;
      const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
      const h = d.getHours() < 10 ? `0${d.getHours()}` : `${d.getHours()}`;
      const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
      const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : `${d.getSeconds()}`;
      return `${d.getFullYear()}-${month}-${day} ${h}:${m}:${s}`;
    }
  },
  methods: {
    initAppList() {
      this.$axios.get('/homekit/apps').then((res) => {
        this.loading = false;
        const rs = res.data;
        console.log(rs);
        if (rs.code === 2000) {
          this.appLists = rs.data;
          console.log(this.appLists);
        } else {
          if (rs.code === 2011) {
            this.$store.dispatch('removeUserInfo', this.$router);
          } else if (rs.msg === '没有应用') {
            this.$message.info(`${rs.msg},请添加应用`);
          } else {
            this.$message.error(`获取应用列表失败，${rs.msg}`);
          }
        }
      })
    },
    // 获取homeKit基本信息
    getHomeKitBinfo(id) {
      this.$axios.get('/homekit/mfi-info').then((res) => {
        const rs = res.data;
        console.log('get initHomeKitBasicInfo--');
        console.log(rs);
        if (rs.code === 2000 && rs.data) {
          console.log('goin')
          this.$router.push({ name: 'createApp', query: { id } })
        } else {
          this.$message.info('请去填写基本信息')
        }
      })
    },
    // 创建新产品
    createApp(event, id) {
      this.getHomeKitBinfo(id)
    },
    // 脚手架测试
    toStaging(event, item) {
      localStorage.setItem('ppid', item.ppid);
      this.$router.push({ name: 'staging', query: { item } })
    },
    // 详情
    queryApp(event, ppid) {
      console.log(`query ppid=${ppid}`);
      this.$router.push({ name: 'createApp', query: { ppid } })
    },
    // 删除产品
    deleteProduct(id) {
      this.$confirm('是否删除该产品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/product/v1/${id}`).then((res) => {
          if (res.data.success === true) {
            this.$message.success('删除成功')
            this.initProductList();
          }
        })
      }).catch(() => {
        // 点击取消
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box-card
    height 650px
    overflow-y scroll
  .product-list
    display flex
    flex-wrap wrap
    padding 20px
    li
      min-width 250px
      height 215px
      border 1px solid #333
      border-radius 20px
      margin-right 20px
      margin-bottom 10px
      cursor pointer
      &.add-btn
        text-align center
        line-height 200px
        font-size 150px
      &.item
        box-sizing border-box
        padding 20px 10px
        width 250px
        font-size 16px
        position relative
        i
          font-size 30px
          position absolute
          right 8px
          display inline-block
          padding 5px
          top 0
        div
          height 25px
  .list
    max-height: 200px
</style>
