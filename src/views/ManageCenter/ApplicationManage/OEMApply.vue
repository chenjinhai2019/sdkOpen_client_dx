<template>
  <div class="">
    <el-main>
      <el-row class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'applicationManage' }">应用管理</el-breadcrumb-item>
          <el-breadcrumb-item>公版OEM申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="创建App"></el-step>
          <el-step title="UI配置">
            <el-steps :active="active1"></el-steps>
          </el-step>
          <el-step title="功能配置"></el-step>
          <el-step title="自动构建"></el-step>
          <el-step title="发布" v-if="showPublish"></el-step>
        </el-steps>
      </el-row>
      <el-row class="step-containers">
        <!-- 第一步：创建App -->
        <div class="step-container create-app" v-show="active===0">
          <el-row>
            App名称：<el-input v-model="appName" placeholder="请输入您的App名称，如Mlight"></el-input>
          </el-row>
          <el-row>
            App包名：<el-input v-model="appPackName" placeholder="请输入一个合理的包名，如com.jx.smart"></el-input>
          </el-row>
          <el-row>
            App版本号：<el-input v-model="appVersion" placeholder="请输入一个版本号"></el-input>
          </el-row>
          <el-row>
            <!-- 此处可以添加一个动画，后期添加 -->
            <el-button type="primary" v-show="changeBtnShow" @click="createApplication">修改</el-button>
          </el-row>
        </div>
        <!-- 第二步： UI配置 -->
        <div class="step-container" v-show="active===1">
          <div class="step1-0" v-show="active1===1">
            <!-- 第一步 Logo设置 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <!-- <div class="overlay"></div> -->
                  <img class="logo-img" :src="logo" alt="">
                </div>
              </el-col>
              <el-col class="cont">
                <div>
                  logo:
                  <el-upload
                    class="upload-demo"
                    action="/upload"
                    :show-file-list="false"
                    :on-exceed="logoHandleExceed"
                    :on-success="logoUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过5M</div>
                  </el-upload>
                </div>
                <p>App应用图标</p>
                <p>分辨率：1024*1024</p>
                <p>格式：.png</p>
                <p>文件大小： 小于5M</p>
              </el-col>
            </el-row>
          </div>
          <div class="step1-1" v-show="active1===2">
            <!-- 第二步 启动图片设置 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <img class="start-img" :src="startImg" alt="">
                </div>
              </el-col>
              <el-col class="cont">
                <div>
                  启动图片:
                  <el-upload
                    class="upload-demo"
                    action="/upload"
                    :show-file-list="false"
                    :on-exceed="logoHandleExceed"
                    :on-success="startImgUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过5M</div>
                  </el-upload>
                </div>
                <p>App启动图片</p>
                <p>分辨率：1024*1024</p>
                <p>格式：.png</p>
                <p>文件大小： 小于5M</p>
              </el-col>
            </el-row>
          </div>
          <div class="step1-2" v-show="active1===3">
            <!-- 第三步 app介绍图片 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <!-- 此处获取图片，进行轮播 -->
                  <div class="swiper-container">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(item,index) in introduceImgs" :key="index">
                        <a href="javascript:;" class="">
                          <img :src="item">
                        </a>
                      </div>
                    </div>
                    <div class="swiper-pagination"></div>
                  </div>
                </div>
              </el-col>
              <el-col class="introduceImg-cont">
                <div class="upload-wrapper">
                  <div class="left">
                    <h2>介绍图片:</h2>
                    <el-switch
                      v-model="useIntroduceImg"
                      :active-text="useIntroduceText"
                      @change="useIntroduceBtn">
                    </el-switch>
                  </div>
                  <div class="right" v-show="useIntroduceImg">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="/upload"
                      :show-file-list="true"
                      :on-exceed="logoHandleExceed"
                      :on-success="introduceImgUpload_1"
                      :limit="1">
                      <el-button slot="trigger" size="small" type="primary">选择</el-button>
                      <!-- <el-button size="small" type="success" @click="submitUpload">点击上传</el-button> -->
                      <!-- <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过5M</div> -->
                    </el-upload>
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="/upload"
                      :show-file-list="true"
                      :on-exceed="logoHandleExceed"
                      :on-success="introduceImgUpload_2"
                      :limit="1">
                      <el-button slot="trigger" size="small" type="primary">选择</el-button>
                    </el-upload>
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="/upload"
                      :show-file-list="true"
                      :on-exceed="logoHandleExceed"
                      :on-success="introduceImgUpload_3"
                      :limit="1">
                      <el-button slot="trigger" size="small" type="primary">选择</el-button>
                    </el-upload>
                    <el-button slot="trigger" size="small" type="success" @click="introduceImgUpload">上传</el-button>
                  </div>
                </div>
                <p>用于让用户更多的了解你的应用，若你不想添加介绍内容，可选择禁用</p>
                <p>分辨率：1024*1024</p>
                <p>格式：.png</p>
                <p>文件大小： 小于5M</p>
              </el-col>
            </el-row>
          </div>
          <div class="step1-3" v-show="active1===4">
            <!-- 第四步 产品图片配置 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <img class="" alt="">
                </div>
              </el-col>
              <el-col class="cont">
                <div>
                  <!--  -->
                  产品类型：  
                  <el-select v-model="selectValue" @change="showProductImg" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.productTypeId"
                      :label="item.productTypeName"
                      :value="item.productTypeId">
                    </el-option>
                  </el-select>
                  <div>
                    <span class="upload-box" v-if="openImgUrl">
                      <div class="upload-title">
                        开
                      </div>
                      <el-upload
                        class="product-upload"
                        action="/upload"
                        :show-file-list="false"
                        :on-success="productOpenImgUpload">
                        <img v-if="openImgUrl" :src='openImgUrl' class="icon">
                        <i v-else class="el-icon-plus product-upload-icon"></i>
                      </el-upload>
                    </span>
                    <span class="upload-box" v-if="openImgUrl">
                      <div class="upload-title">
                        关
                      </div>
                      <el-upload
                        class="product-upload"
                        action="/upload"
                        :show-file-list="false"
                        :on-success="productCloseImgUpload">
                        <img v-if="closeImgUrl" :src='closeImgUrl' class="icon">
                        <i v-else class="el-icon-plus product-upload-icon"></i>
                      </el-upload>
                    </span>
                  </div>
                </div>
                <p>自定义图片要求：</p>
                <p>分辨率：200*200</p>
                <p>格式：.png</p>
                <p>文件大小： 小于5M</p>
              </el-col>
            </el-row>
          </div>
          <div class="step1-3" v-show="active1===5">
            第五步
          </div>
          <div class="step1-3" v-show="active1===6">
            第六步
          </div>
        </div>
        <!-- 第三步：功能配置  -->
        <div class="step-container" v-show="active===2">
          
        </div>
        <!-- 第四步：自动构建 -->
        <div class="step-container" v-show="active===3">
          
        </div>
        <!-- 第五步：发布，如果没有权限的话，则隐藏该步骤 -->
        <div class="step-container" v-show="active===4">
          
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
import { mapState } from 'vuex'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper'

export default {
  name: '',
  data() { 
    return {/* 
      active: 0,
      active1: 0, */
      STEPNUM_1: 6,
      introduceImg1: '', // 产品介绍图片
      introduceImg2: '',
      introduceImg3: '',
      selectValue: '', // select选项值
      options: [], // select选项数据
      productData: [], // 产品数据
      openImgUrl: '', // 产品开启图片的url
      closeImgUrl: '', // 产品关闭图片的url
      productTypeId: '', // 产品id
      showPublish: false
    }
  },
  computed: {
    /* 如果是第一步时，显示‘返回’ ，其他步骤时都显示‘上一步’ */
    prevText() {
      return this.active === 0 ? '返回' : '上一步';
    },
    // 保存当前的步骤
    active: {
      get() {
        return this.$store.state.active
      },
      set(val) {
        this.$store.state.active = val
      }
    },
    active1: {
      get() {
        return this.$store.state.active1
      },
      set(val) {
        this.$store.state.active1 = val
      }
    },
    // 获取OEM应用对象，没有时为null
    ...mapState(['oemApplication', 'originAppName', 'originAppPackName', 'originAppVersion', 'logo', 'startImg', 'introduceImgs']), 
    appName: {
      get() {
        return this.oemApplication ? this.oemApplication.appName : ''
      },
      set(val) {
        this.$store.state.oemApplication.appName = val;
      }
    },
    appPackName: {
      get() {
        return this.oemApplication ? this.oemApplication.appPackName : ''
      },
      set(val) {
        this.$store.state.oemApplication.appPackName = val;
      }
    },
    appVersion: {
      get() {
        return this.oemApplication ? this.oemApplication.appVersion : ''
      },
      set(val) {
        this.$store.state.oemApplication.appVersion = val;
      }
    },
    // 用户修改应用时显示修改按钮
    changeBtnShow() {
      const { oemApplication } = this;
      let { originAppName, originAppPackName, originAppVersion, appName, appPackName, appVersion } = this;
      // console.log(originAppName, appName);
      if (oemApplication.id) {
        if (originAppName !== appName || originAppPackName !== appPackName || originAppVersion !== appVersion) {
          return true;
        }
      } else {
        return false;
      }
    },
    // 是否开启介绍图片
    useIntroduceImg: {
      get() {
        return this.$store.state.useIntroduceImg
      },
      set(val) {
        this.$store.state.useIntroduceImg = val;
      }
    },
    useIntroduceText() {
      if (this.useIntroduceImg === true) {
        return '开'
      } else {
        return '关'
      }
    },
  },
  created() {
    /* this.getLogo()
    this.getStartImg()
    this.getIntroduceImg();
    this.getProductImg(); */
    // 获取logo
    if (this.active === 1 && this.active1 === 1) {
      this.getLogo()
    }
    // 获取启动图片
    if (this.active === 1 && this.active1 === 2) {
      this.getStartImg()
    }
    // 获取介绍图片
    if (this.active === 1 && this.active1 === 3) {
      this.getIntroduceImg();
    } 
    // 获取产品图片
    if (this.active === 1 && this.active1 === 4) {
      this.getProductImg();
    }
  },
  mounted() {
    this.$store.dispatch('checkOemApplication');
  },
  methods: {
    // 创建app的应用名，包名和版本号
    createApplication() {
      const { oemApplication, appName, appPackName, appVersion } = this;
      const id = oemApplication.id;
      const params = this.$qs.stringify({
        id,
        appName,
        appPackName,
        appVersion
      })
      // console.log(params);
      this.$axios.post('/oemApplication', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('创建成功')
        } else {
          this.$message.error(`${rs.msg}`);
        }
      })
    },

    // 获取logo
    getLogo() {
      this.$store.dispatch('getLogo');
    },
    // logo上传超过限制
    logoHandleExceed() {
      this.$message.warning('仅能上传一张图片')
    },
    // 上传logo成功，修改logo
    logoUpload(response, file, fileList) {
      const logo = response.data;
      // 修改logo
      const params = this.$qs.stringify({
        logo
      })
      this.$axios.patch('/oemApplication/ui/logo', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
        }
        // 成功后重新渲染logo
        this.getLogo();
      })
    },

    // 获取启动图片
    getStartImg() {
      this.$store.dispatch('getStartImg');
    },
    // 上传启动图片成功， 修改启动图片
    startImgUpload(response, file, fileList) {
      const startImg = response.data;
      // 修改logo
      const params = this.$qs.stringify({
        startImg
      })
      this.$axios.patch('/oemApplication/ui/startImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
        }
        // 成功后重新渲染启动页
        this.getStartImg()
      })
    },

    // 获取介绍图片
    getIntroduceImg() {
      this.$store.dispatch('getIntroduceImg');
    },
    // 修改是否需要上传介绍图片
    useIntroduceBtn() {
      const { useIntroduceImg } = this;
      this.$store.commit('useIntroduceImg', { useIntroduceImg })
      console.log(this.useIntroduceImg);
    },
    // 上传介绍图片成功后， 修改介绍图片
    // 三张图片分开上传
    introduceImgUpload_1(response) {
      this.introduceImg1 = response.data
      console.log(this.introduceImg1);
    },
    introduceImgUpload_2(response) {
      this.introduceImg2 = response.data
    },
    introduceImgUpload_3(response) {
      this.introduceImg3 = response.data
    },
    introduceImgUpload() {
      // debugger;
      let { introduceImg1, introduceImg2, introduceImg3 } = this;
      if (!introduceImg1) {
        this.introduceImg1 = this.introduceImgs[0];
      }
      if (!introduceImg2) {
        this.introduceImg2 = this.introduceImgs[1];
      }
      if (!introduceImg3) {
        this.introduceImg3 = this.introduceImgs[2];
      }
      const introduceImg = `${introduceImg1};${introduceImg2};${introduceImg3}`
      console.log(introduceImg);
      const { useIntroduceImg } = this;
      const params = this.$qs.stringify({
        introduceImg,
        useIntroduceImg
      })
      this.$axios.patch('/oemApplication/ui/introduceImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
        }
        // 成功后重新渲染介绍图片页
        this.getIntroduceImg()
      })
    }, 

    // 获取产品图片
    getProductImg() {
      this.$axios.get('/oemApplication/ui/productImg').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.productData = rs.data
        this.productData.forEach((item, index) => {
          const obj = {}
          obj.productTypeName = item.productTypeName;
          obj.productTypeId = item.productTypeId;
          this.options.push(obj);
        })
      })
    },
    showProductImg() {
      // console.log(this.selectValue);
      const { selectValue, productData } = this;
      this.productData.forEach((item) => {
        if (selectValue === item.productTypeId) {
          this.openImgUrl = item.openImg ? item.openImg : item.defaultOpenImg;
          this.closeImgUrl = item.closeImg ? item.closeImg : item.defaultCloseImg;
          this.productTypeId = item.productTypeId;
        }
      })
    },
    // 产品开启图片上传
    productOpenImgUpload(response, file, fileList) {
      const openImg = response.data
      // console.log(openImg);
      const productTypeId = this.productTypeId;
      const params = this.$qs.stringify({
        productTypeId,
        openImg
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
        }
        // 成功后重新渲染产品启动图片
        this.productImgRender();
      })
    },
    // 产品关闭图片上传
    productCloseImgUpload(response) {
      const closeImg = response.data
      // console.log(this.closeImg);
      const productTypeId = this.productTypeId;
      const params = this.$qs.stringify({
        productTypeId,
        closeImg
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
        }
        // 成功后重新渲染产品关闭图片
        this.productImgRender();
      })
    },
    
    next() {
      const { STEPNUM_1, oemApplication } = this;
      
      if (this.active === 0) {
        this.active = 1;
      }
      if (this.active === 1) {
        this.active1++;
        if (this.active1 > STEPNUM_1) {
          this.active = 2
          return false
        }
      }
      if (this.active >= 2 && this.active !== 1) {
        this.active++
      }
      console.log(this.active, this.active1);
      // 第一步 this.active = 1，如果没有id，则创建app; 如果有id，则直接进入下一步
      if (!oemApplication.id) { // 没有创建app
        if (this.active === 1) {
          // console.log(111);
        }
        /* if (this.active === 2 && this.active1 === 0) {
          console.log(2222);
        } */
      } else { // 已经创建app
        // 获取logo
        if (this.active === 1 && this.active1 === 1) {
          this.getLogo()
        }
        // 获取启动图片
        if (this.active === 1 && this.active1 === 2) {
          this.getStartImg()
        }
        // 获取介绍图片
        if (this.active === 1 && this.active1 === 3) {
          this.getIntroduceImg();
        } 
        // 获取产品图片
        if (this.active === 1 && this.active1 === 4) {
          this.getProductImg();
        }
      }

      // 保存当前的步骤
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
      // this.$store.commit('stepNow', { active: this.active, active1: this.active1 });
    },
    prev() {
      if (this.active !== 1 && this.active !== 0) {
        this.active--
      }
      if (this.active === 0) {
        this.$router.push('/manageCenter/applicationManage')
      }
      if (this.active === 1) {
        this.active1--
        if (this.active1 < 1) {
          this.active = 0;
          // return false;
        }
        console.log(this.active, this.active1);
      }
      // 保存当前的步骤
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
      // this.$store.commit('stepNow', { active: this.active, active1: this.active1 });
    }
  },
  watch: {
    introduceImgs(val) {
      this.$nextTick(() => {
        const introduceImgSwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 操作后是否停止autoplay
          },
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-main
  width 1200px
  margin 0 auto
  padding 0 50px
  text-align center
  padding-bottom 50px
  .breadcrumb
    margin-bottom 50px
    .el-breadcrumb
      height 60px
      line-height 60px
      font-size 16px
  .step-containers
    width 90%
    margin 50px auto 0
    .step-container
      .el-row 
        margin-bottom 25px
      .el-input 
        width 300px
      .app-config 
        .img-box
          .phone-box 
            width 200px
            height 400px
            float right
            margin-right 100px
            position relative
            .overlay
              width 100%
              height 100%
              border-radius 10%
              background #000
              position absolute
              z-index 2
              left 0
              top 0
              opacity 0.2
            .phone
              width 100% 
            .logo-img
              width 30px
              height 30px  
              position absolute
              z-index 3
              left 40px
              top 60px
            .start-img
              width 170px 
              height 360px 
              position absolute
              left 15px
              top 26px
            .swiper-container
              width 170px 
              height 360px
              position absolute
              left 15px
              top 26px
        .cont 
          font-size 22px
          text-align left
          .upload-box 
            display flex
            .upload-title
              margin-right 20px
            .product-upload
              border 1px dashed #d9d9d9
              border-radius 6px
              width 120px
              height 120px
              cursor pointer
              position relative
              overflow hidden
              &:hover 
                border-color: #409EFF
              .product-upload-icon 
                font-size 28px
                color #8c939d
                width 120px
                height 120px
                line-height 120px
                text-align center
              .icon 
                width 120px
                height 120px
                display block
          div 
           margin-bottom 30px   
          p 
            font-size 18px
            line-height 30px 
        .introduceImg-cont
          font-size 22px
          text-align left 
          .upload-wrapper
            display flex
            margin-bottom 30px
            .left 
              width 120px
            .right
              flex 1
              .upload-demo
                display inline-block
          p 
            font-size 18px
            line-height 30px     
    .create-app
      height 170px    
  .button-box
    margin-top 50px
    text-align right
    padding-right 100px
</style>
