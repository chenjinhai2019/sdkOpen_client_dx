<template>
  <div class="wrapper">
    <el-main class="create-product">
      <el-row>
        <el-steps :active="productActive" finish-status="success" align-center>
          <el-step title="产品定义"></el-step>
          <el-step title="功能配置"></el-step>
          <el-step title="模块选择"></el-step>
          <el-step title="App配置"></el-step>
          <el-step title="上线"></el-step>
        </el-steps>
      </el-row>
      <el-row class="step-containers">
        <div class="step-container product-info-wrap" v-show="productActive===0">
          <h2>产品基本信息：</h2>
          <div class="product-info">
            <div class="left">
              <el-form :model="productInfoForm" ref="productInfo" label-width="100px" :rules="productInfoRules">
                <el-form-item label="类型：" prop="typeId"> 
                  <el-select v-model="productInfoForm.typeId" placeholder="请选择产品类型">
                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in productTypeLists" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="品牌：" prop="brand">
                  <el-input v-model="productInfoForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="产品名称：" prop="name">
                  <el-input v-model="productInfoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="网络类型：" prop="comunicationType">
                  <el-select v-model="productInfoForm.comunicationType">
                    <el-option label="wifi" value="1"></el-option>
                    <el-option label="sig mesh" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <div class="title">产品描述：</div>
              <el-input type="textarea" v-model="textareaValue" :rows="5" placeholder="请输入产品描述 "></el-input>
            </div>
          </div>
        </div>
        <div class="step-container" v-show="productActive===1">
          2222
        </div>
        <div class="step-container" v-show="productActive===2">
          333
        </div>
        <div class="step-container" v-show="productActive===3">
          444
        </div>
        <div class="step-container" v-show="productActive===4">
          555
        </div>
      </el-row>
      <el-row class="button-box">
        <el-button @click="prev">上一步</el-button>
        <el-button @click="next">下一步</el-button>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      productActive: parseInt(this.$cookies.get('productActive'), 10) || 0,
      productInfoForm: {
        typeId: '',
        brand: '',
        name: '',
        comunicationType: ''
      },
      id: parseInt(this.$route.query.id, 10) || '',
      productTypeLists: [],
      textareaValue: '',
      productInfoRules: {
        typeId: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        comunicationType: [
          { required: true, message: '请选择网络类型', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    this.getProductInfo();
    this.getProductList();
  },
  methods: {
    // 获取产品基本信息
    getProductInfo() {
      // console.log(this.id);
      const { productInfoForm } = this;

      if (this.id) {
        this.$axios.get(`/product/${this.id}/baseinfo`).then((res) => {
          if (res.data.success === true) {
            const rs = res.data.data;
            // console.log(rs);
            if (rs.comunicationType === 1) {
              rs.comunicationType = 'wifi'
            } else if (rs.comunicationType === 2) {
              rs.comunicationType = 'sig mesh'
            }
            productInfoForm.typeId = rs.typeId;
            productInfoForm.brand = rs.brand;
            productInfoForm.name = rs.name;
            productInfoForm.comunicationType = rs.comunicationType;
            this.textareaValue = rs.describtion;
          }
        })
      }
    },
    // 获取产品类型信息列表
    getProductList() {
      this.$axios.get('/product/type').then((res) => {
        if (res.data.success === true) {
          this.productTypeLists = res.data.data;
          console.log(this.productTypeLists);
        }
      })
    },
    // 创建产品
    createProduct() {
      const { productInfoForm, textareaValue } = this;
      const controlType = 1;
      const params = this.$qs.stringify({
        controlType,
        typeId: productInfoForm.typeId,
        brand: productInfoForm.brand,
        name: productInfoForm.name,
        comunicationType: productInfoForm.comunicationType,
        describtion: textareaValue
      })
      // console.log(params);
      this.$refs.productInfo.validate((valid) => {
        if (valid) {
          this.$axios.post('/product', params).then((res) => {
            if (res.data.success === true) {
              this.$message.success('创建成功')
              this.productActive = 1;
              this.$cookies.set('productActive', 1);
            }
          })
        }
      })
    },
    
    // 下一步
    next() {
      if (this.productActive === 0) {
        this.createProduct();
      }
    },
    // 上一步
    prev() {
      this.productActive--;
    },
  }
}
</script>

<style lang="stylus" scoped>
.create-product
  margin 0 auto
  .step-containers
    width 80%
    margin 30px auto 0
    .product-info-wrap
      h2  
        font-size 20px
        font-weight 400
        margin-bottom 30px
      .product-info
        font-size 14px
        display flex
        .left 
          flex 1
          .el-input 
            width 228px
        .right 
          flex 1  
          .title
            height 40px
            line-height 40px
            color #606266
            margin-bottom 10px
.button-box
  margin-top 50px
  text-align right
  padding-right 100px 
</style>
