<template>
  <div class="">
    <el-row class="">
      <ul class="product-list">
        <li class="add-btn" @click="createProduct($event)">+</li>
        <li class="item" v-for="(item,index) in productLists" :key="index"  @click="createProduct($event,item.id)">
          <i @click="deleteProduct">×</i>
          <div>产品名: {{item.name}}</div>
          <div>状态： {{item.state}}</div>
          <div>创建时间: {{item.createTime}}</div>
          <div>发布时间: {{item.publicTime}}</div>
          <div>类型: {{item.typeName}}</div>
          <div>通信协议: {{item.comunicationType}}</div>
          <div>品牌: {{item.brand}}</div>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      productLists: [],
    }
  },
  created() {
    this.initProductList();
  },
  methods: {
    initProductList() {
      const params = {
        controlType: 1,
        currentPage: 1,
        pageSize: 100
      }
      this.$axios.get('/product', { params }).then((res) => {
        const rs = res.data;
        console.log(rs);
        this.productLists = rs.data.list;
        console.log(this.productLists);
        // 相关数据处理
        this.productLists.forEach((item) => {
          if (item.state === 0) {
            item.state = '开发中';
          } else if (item.state === 1) {
            item.state = '申请上线';
          } else if (item.state === 2) {
            item.state = '已上线';
          } 
          if (item.comunicationType === 1) {
            item.comunicationType = 'wifi';
          } else if (item.comunicationType === 2) {
            item.comunicationType = 'SIG Mesh';
          }
        })
      })
    },
    // 创建新产品
    createProduct(event, id) {
      this.$router.push({ name: 'createProduct', query: { id } })
    },
    // 删除产品
    deleteProduct() {
      this.$confirm('是否删除该产品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
