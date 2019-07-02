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
        <!-- 产品定义 -->
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
          <el-row  style="text-align:center; margin-top:30px" v-if="!id">
            <el-button type="primary" @click="createProduct">创建产品</el-button>
          </el-row>
        </div>
        <!-- 功能配置 -->
        <div class="step-container product-func-wrap" v-show="productActive===1">
          <h2>产品基本信息：</h2>
          <div class="product-info">
            <div class="left">
              <img :src="productInfo.img" alt="">
            </div>
            <div class="right">
                <div class="item">
                  <span>产品名</span>
                  <span>{{productInfo.name}}</span>
                </div>
                <div class="item">
                  <span>类型</span>
                  <span>{{productInfo.typeName}}</span>
                </div>
                <div class="item">
                  <span>品牌</span>
                  <span>{{productInfo.brand}}</span>
                </div>
                <div class="item">
                  <span>网络类型</span>
                  <span>{{productInfo.comunicationType}}</span>
                </div>
                <div class="item">
                  <span>状态</span>
                  <span style="margin-top:-4px">{{productInfo.state}}</span>
                </div>
                <div class="item">
                  <span>创建时间</span>
                  <span>{{productInfo.createTime}}</span>
                </div>
                <div class="item">
                  <span>Product ID</span>
                  <span>{{productInfo.id}}</span>
                </div>
            </div>
          </div>
          <h2>产品功能：</h2>
          <div class="product-func">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedFunc" @change="checkedFuncChange">
              <el-checkbox v-for="item in this.funcOptions" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
            <el-row>
              <el-table :data="funcTable" style="width: 100%" border>
                <el-table-column
                  label="功能名"
                  prop="name"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="标识符"
                  prop="identifier"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="传输类型"
                  prop="transferType"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="数据类型"
                  prop="dataType"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="参数定义"
                  prop="paramDefinitionName"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button>编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </div>
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
        <el-button @click="prev">{{prevText}}</el-button>
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
      productInfo: {},
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
      },
      funcOptions: [],
      checkAll: false,
      checkedFunc: [], // 已选中的功能
      isIndeterminate: false,
      funcTable: [], // 功能表格数据
    }
  },
  computed: {
    prevText() {
      return this.productActive === 0 ? '返回' : '上一步';
    },
  },
  created() {
    if (this.productActive === 0) {
      this.getProductInfo();
      this.getProductList();
    }
    if (this.productActive === 1) {
      this.getProductInfo();
      this.getProductDefaultPower();
    }
  },
  methods: {
    // 获取产品基本信息
    getProductInfo() {
      // console.log(this.id);
      const { productInfoForm } = this;

      if (this.id) {
        this.$axios.get(`/product/v1/${this.id}/baseinfo`).then((res) => {
          if (res.data.success === true) {
            const rs = res.data.data;
            // console.log(rs);
            if (rs.comunicationType === 1) {
              rs.comunicationType = 'wifi'
            } else if (rs.comunicationType === 2) {
              rs.comunicationType = 'sig mesh'
            }
            if (rs.state === 0) {
              rs.state = '开发中';
            } else if (rs.state === 1) {
              rs.state = '申请上线';
            } else if (rs.state === 2) {
              rs.state = '已上线';
            } 
            productInfoForm.typeId = rs.typeId;
            productInfoForm.brand = rs.brand;
            productInfoForm.name = rs.name;
            productInfoForm.comunicationType = rs.comunicationType;
            this.textareaValue = rs.describtion;
            this.productInfo = rs;
            console.log(this.productInfo);
          }
        })
      }
    },
    // 获取产品类型列表
    getProductList() {
      this.$axios.get('/product/v1/type').then((res) => {
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
          this.$axios.post('/product/v1', params).then((res) => {
            if (res.data.success === true) {
              this.id = res.data.data.id;
              this.$router.replace({ name: 'createProduct', query: { id: this.id } })
              this.$message.success('创建成功')
            }
          })
        }
      })
    },
    // 修改产品
    changeProduct() {
      const { productInfoForm, textareaValue } = this;

      if (productInfoForm.comunicationType === 'wifi') {
        productInfoForm.comunicationType = 1;
      } else if (productInfoForm.comunicationType === 'sig mesh') {
        productInfoForm.comunicationType = 2;
      } 
      const params = this.$qs.stringify({
        typeId: productInfoForm.typeId,
        brand: productInfoForm.brand,
        name: productInfoForm.name,
        comunicationType: productInfoForm.comunicationType,
        describtion: textareaValue
      })
      // console.log(params);
      this.$refs.productInfo.validate((valid) => {
        if (valid) {
          this.$axios.patch(`/product/v1/${this.id}/baseinfo`, params).then((res) => {
            if (res.data.success === true) {
              this.productActive = 1;
              this.$router.replace({ name: 'createProduct', query: { id: this.id, typeId: productInfoForm.typeId } })
              this.getProductDefaultPower();
              this.$cookies.set('productActive', 1);
            }
          })
        }
      })
    },
    // 获取产品默认功能
    getProductDefaultPower() {
      const productTypeId = this.$route.query.typeId;
      this.$axios.get(`/commonProduct/${productTypeId}/defaultPower`).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.productFuncLists = rs.data;
          // 将产品所有的功能名放入一个数组中，供复选框使用
          this.productFuncLists.forEach((item) => {
            this.funcOptions.push(item.name);
          })
          console.log(this.productFuncLists);
          console.log(this.funcOptions);
        }
      })
    },
    // 产品功能全选
    checkAllChange(val) {
      this.checkedFunc = val ? this.funcOptions : [];
      this.isIndeterminate = false;
    },
    checkedFuncChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.funcOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.funcOptions.length;
    },
    // 下一步
    next() {
      if (this.productActive === 0) {
        this.changeProduct();
      }
      if (this.productActive === 1) {
        this.productActive = 2;
        this.$cookies.set('productActive', 2)
      }
      if (this.productActive > 2) {
        this.productActive = 2
      }
    },
    // 上一步
    prev() {
      if (this.productActive === 2) {
        this.productActive = 1;
        this.$cookies.set('productActive', this.productActive);
        return false;
      }
      if (this.productActive === 1) {
        this.productActive = 0;
        this.getProductInfo();
        this.getProductList();
        this.$cookies.set('productActive', this.productActive);
        return false;
      }
      if (this.productActive === 0) {
        this.$router.push('/manageCenter/productManage/product')
      }
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
    .product-func-wrap
      h2  
        font-size 18px
        font-weight 400 
        margin 30px 0 30px 20px     
      .product-info
        font-size 14px
        display flex
        padding 0 20px
        border-bottom 1px solid #ccc
        .left 
          flex 1
          img 
            width 150px
            margin-top 20px
        .right 
          flex 3   
          display flex
          flex-wrap wrap
          .item
            width 150px 
            display flex
            flex-direction column
            span:first-child
              font-size 14px
              color #C5C5C5
            span:nth-child(2)
              font-size 16px
              color #8B8B8B  
            span 
              text-align center    
              margin-bottom 20px  
      .product-func
        padding 0 20px
        .el-checkbox
          margin-bottom 20px  
        .el-checkbox-group 
          margin-bottom 10px
.button-box
  margin-top 50px
  text-align right
  padding-right 100px 
</style>
