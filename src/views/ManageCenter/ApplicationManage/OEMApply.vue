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
          <el-step title="创建App" @click.native="step1"></el-step>
          <el-step title="UI配置" @click.native="step2">
            <el-steps :active="active1"></el-steps>
          </el-step>
          <el-step title="功能配置" @click.native="step3"></el-step>
          <el-step title="自动构建" @click.native="step4"></el-step>
          <el-step title="发布" @click.native ="step5"></el-step>
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
                    :before-upload="beforeLogoUpload"
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
                    :before-upload="beforeStartImgUpload"
                    :on-success="startImgUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过5M</div>
                  </el-upload>
                </div>
                <p>App启动图片</p>
                <p>分辨率：1242*2808</p>
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
                <p>分辨率：1242*2808</p>
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
                  <div class="productList-wrapper">
                    <ul class="productList">
                      <li class="productList-item" v-for="(item,index) in productData" :key="index">
                        <img :src="item.openImg? item.openImg: item.defaultOpenImg" alt="">
                        <span>{{item.productTypeName}}</span>
                      </li>
                    </ul>
                  </div>
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
                      <i class="delete" @click.stop="deleteOpenImg">×</i>
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
                      <i class="delete" @click.stop="deleteCloseImg">×</i>
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
            <!-- 第五步 服务协议和隐私声明 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <div class="oemStyle">
                    <div class="serviceAgreement">服务协议:{{serviceAgreementDocument}}</div>
                    <div style="margin:10px 0;"></div>
                    <div class="privacyStatement">隐私声明:{{privacyStatementDocument}}</div>
                  </div>
                </div>
              </el-col>
              <el-col class="cont url-upload">
                <div>
                  服务协议：<el-input v-model="serviceAgreementUrl" placeholder="填写url或上传文件"></el-input>
                  <el-upload
                    class="upload-demo"
                    action="/upload"
                    :limit="1"
                    :on-success="serviceAgreementUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <a>点击此处下载模板</a>
                </div>
                <div>
                  隐私声明：<el-input v-model="privacyStatementUrl" placeholder="填写url或上传文件"></el-input>
                  <el-upload
                    class="upload-demo"
                    action="/upload"
                    :limit="1"
                    :on-success="privacyStatementUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <a>点击此处下载模板</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="step1-3" v-show="active1===6">
            <!-- 第六步 OEM应用的风格设置 -->
            <el-row class="app-config" :gutter="50" type="flex">
              <el-col class="img-box">
                <div class="phone-box">
                  <img class="phone" src="./imgs/phone.jpg" alt="">
                  <div class="oemStyle">
                    <div class="tab" :style="{backgroundColor: tabRailingColor}">tab颜色</div>
                    <div class="bg" :style="{backgroundColor: backgroundColor}">background颜色</div>
                  </div>
                </div>
              </el-col>
              <el-col class="cont oemStyle">
                <!-- 颜色取色器 -->
                <div class="block">
                  <div class="demonstration">tab颜色设置</div>
                  <el-color-picker v-model="tabRailingColor" @change="setOEMStyle"></el-color-picker>
                </div>
                <div class="block">
                  <div class="demonstration">背景颜色设置</div>
                  <el-color-picker v-model="backgroundColor" @change="setOEMStyle"></el-color-picker>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 第三步：功能配置  -->
        <div class="step-container" v-show="active===2">
          <el-row class="func-config">
            <div class="switch-box">
              支持远程服务： 
              <el-switch
                v-model="remoteService"
                active-text="开"
                inactive-text="关"
                @change="setOemFunction">
              </el-switch>
            </div>
            <div class="switch-box">
              支持控制SIG Mesh设备： 
              <el-switch
                v-model="controlSigMesh"
                active-text="开"
                inactive-text="关"
                @change="setOemFunction">
              </el-switch>
            </div>
            <div class="switch-box">
              支持用户免登陆： 
              <el-switch
                v-model="userLogin"
                active-text="开"
                inactive-text="关"
                @change="setOemFunction">
              </el-switch>
            </div>
            <p>若用户需要登录App,需配置认证邮箱</p>
          </el-row>
          <el-row class="hide-box" v-show="!userLogin">
            <h3>认证邮箱</h3>
            <p>在用户注册的时候，需要用您的企业邮箱来给用户发送激活信息，请确保您所填邮箱的有效性。若您不填写该项，将默认使用晶讯邮箱发送给用户激活信息。</p>
            <el-form :model="form" ref="form" label-width="100px" :rules="rules">
              <el-form-item label="邮箱服务器" prop='host'>
                <el-input v-model="form.host" clearable></el-input>
              </el-form-item>
              <el-form-item label="账号" prop='username'>
                <el-input v-model="form.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop='password'>
                <el-input v-model="form.password" clearable show-password></el-input>
              </el-form-item>
              <el-form-item label="验证邮箱" prop='email'>
                <el-input v-model="form.email" clearable></el-input>
                <el-button type="primary" @click="verifyEmail">验证邮箱有效性</el-button>
              </el-form-item>
            </el-form>
            <p>验证邮箱的有效性：我们将尝试用您提供的账号和密码登录您提供的邮箱服务器，并向您提供的验证邮箱发送一封确认邮件，点击确认邮件中提供的连接完成邮箱的有效性验证</p>
          </el-row>
        </div>
        <!-- 第四步：自动构建 -->
        <div class="step-container" v-show="active===3">
          <el-row class="create-box">
            <div class="create" v-if="packageState===0">
              <h3>构建app需要一定的时间，请耐心等待</h3>
              <el-button type="primary" @click="createPackage">构建</el-button>
            </div>
            <div class="create-success" v-if="packageState===2">
              <h3>构建成功</h3>
            </div>
            <div class="create-info" v-if="packageState===1">
              <h3>您的app还在构建中，请耐心等待，感谢您的理解</h3>
            </div>
            
          </el-row>
        </div>
        <!-- 第五步：发布 -->
        <div class="step-container" v-show="active===4">
          <el-row class="publish-box">
            <div class="publish" v-if="publishState===0">
              <h3>应用状态：开发中</h3>
              <p>发布前请确认您的应用信息,提交发布后将无法修改</p>
              <el-form :model="publishForm" ref="publishForm" label-width="140px" :rules="publishRules">
                <el-form-item label="Google邀请账号" prop='googleAccount'>
                  <el-input v-model="publishForm.googleAccount"></el-input>
                  <el-button type="primary">操作指南</el-button>
                </el-form-item>
                <el-form-item label="AppStore邀请账号" prop='appStoreAccount'>
                  <el-input v-model="publishForm.appStoreAccount"></el-input>
                  <el-button type="primary">操作指南</el-button>
                </el-form-item>
                <el-form-item label="国内Android市场" prop='androidMarket'>
                  <el-input v-model="publishForm.androidMarket"></el-input>
                  <el-button type="primary">软著模板</el-button>
                </el-form-item>
              </el-form>
              <p>联系我们的业务人员进行线下沟通，当我们收到业务人员通知后，我们将在一周内完成ios应用上架，三个工作日内完成Android应用上架。（排除应用市场审核方原因，对于此类情况我们会及时进行通知）</p>
              <div>
                <span>业务人员： XXX</span>
                <span>联系电话： XXX-XXXXXXX</span>
                <span>服务时间： 9:00-18:00</span>
              </div>
              <el-button class="publish-btn" type="primary" @click="publishApp">发布</el-button>
            </div>

            <div class="publish-info" v-if="publishState===1">
              <p>我们已收到您的发布申请</p>
              <p>若您还未与我们的业务人员进行线下沟通，请及时沟通，若您还已与我们的业务人员沟通完成，请耐心等待，我们会加班加点为您发布应用。</p>
            </div>

            <div class="publish-success" v-if="publishState===3">
              <p>恭喜您，应用已发布</p>
            </div>
          </el-row>
        </div>
      </el-row>
      <el-row class="button-box">
        <el-button @click="prev">{{prevText}}</el-button>
        <el-button @click="next" v-show="showNextBtn">下一步</el-button>
      </el-row>
    </el-main>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper'
import BScroll from 'better-scroll'


export default {
  name: '',
  data() { 
    return {
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
      serviceAgreementDocument: '', // 服务协议
      privacyStatementDocument: '', // 隐私声明
      serviceAgreementUrl: '',
      privacyStatementUrl: '',
      tabRailingColor: '',
      backgroundColor: '',
      remoteService: false, // 支持远程服务
      controlSigMesh: false, // 支持控制SIG Mesh设备
      userLogin: false, // 支持用户免登陆
      form: {
        host: '',
        username: '',
        password: '',
        email: '',
      },
      rules: {
        host: [
          { required: true, message: '请输入邮箱服务地址' }
        ],
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        email: [
          { required: true, message: '请输入邮箱' }
        ],
      },
      packageState: '', // 应用构建状态
      publishForm: {
        googleAccount: '',
        appStoreAccount: '',
        androidMarket: '',
      },
      publishRules: {
        googleAccount: [
          { required: true, message: '请输入google邀请账号' }
        ],
        appStoreAccount: [
          { required: true, message: '请输入AppStore邀请账号' }
        ],
        androidMarket: [
          { required: true, message: '请输入国内Android市场' }
        ],
      },
      publishState: 0, // 应用发布状态
      showNextBtn: true,
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
    // 获取OEM应用的服务协议和隐私声明
    if (this.active === 1 && this.active1 === 5) {
      this.getAgreementAndStatement();
    }
    // 获取OEM应用的风格设置
    if (this.active === 1 && this.active1 === 6) {
      this.getOEMStyle();
    }
    // 获取OEM应用的功能配置
    if (this.active === 2) {
      this.getOemFunction();
    }
    // 检查OEM应用构建情况
    if (this.active === 3) {
      this.checkPackage();
    }
    // 检查OEM应用发布情况
    if (this.active === 4) {
      this.checkPublishState();
    }
  },
  mounted() {
    this.$store.dispatch('checkOemApplication');
  },
  methods: {
    step1() {
      this.active = 0;
      this.active1 = 0;
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
    },
    step2() {
      this.active = 1;
      this.active1 = 1;
      this.getLogo()
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
    },
    step3() {
      this.active = 2;
      this.active1 = 6;
      this.getOemFunction();
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
    },
    step4() {
      this.active = 3;
      this.active1 = 6;
      this.checkPackage();
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
    },
    step5() {
      this.active = 4;
      this.active1 = 6;
      this.checkPublishState();
      this.$cookies.set('active', this.active)
      this.$cookies.set('active1', this.active1)
    },
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
    // 检查上传logo图片是否符合要求
    beforeLogoUpload(file) {
      console.log(file)
      const isPNG = file.type === 'image/png';
      const limit5M = file.size / 1024 / 1024 < 5;
      const isSize = new Promise((resolve, reject) => {
        let width = 1024;
        let height = 1024;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          let valid = img.width === width && img.height === height;
          valid ? resolve() : reject();
        }
        img.src = _URL.createObjectURL(file);
      }).then(() => {
        return file;
      }, () => {
        this.$message.error('图片尺寸限制为1024*1024')
      })
      if (!isPNG) {
        this.$message.error('上传头像图片只能是png格式');
      }
      if (!limit5M) {
        this.$message.error('上传头像图片大小不能超过5MB');
      }
      return isPNG && limit5M && isSize;
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
    // 检查上传logo是否符合要求
    beforeStartImgUpload() {

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
        this.$nextTick(() => {
          this.menuScroll = new BScroll('.productList-wrapper', {
            bounce: true,
            momentumLimitDistance: 5,
            scrollY: true,
            scrollbar: false,
            mouseWheel: true,
          })
        })
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
        openImg,
        closeImg: this.closeImgUrl
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
          // 成功后重新渲染产品启动图片
          this.productImgRender();
        } else {
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    // 产品关闭图片上传
    productCloseImgUpload(response) {
      const closeImg = response.data
      // console.log(this.closeImg);
      const productTypeId = this.productTypeId;
      const params = this.$qs.stringify({
        productTypeId,
        openImg: this.openImgUrl,
        closeImg
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('上传成功')
          // 成功后重新渲染产品关闭图片
          this.productImgRender();
        } else {
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    productImgRender() {
      this.$axios.get('/oemApplication/ui/productImg').then((prodData) => {
        this.productData = prodData.data.data;
        // console.log(this.productData);
        const { selectValue } = this;
        this.productData.forEach((item) => {
          if (selectValue === item.productTypeId) {
            this.openImgUrl = item.openImg ? item.openImg : item.defaultOpenImg;
            this.closeImgUrl = item.closeImg ? item.closeImg : item.defaultCloseImg;
          }
        })
      })
    }, 
    deleteOpenImg() {
      const openImg = null;
      const productTypeId = this.productTypeId;
      const params = this.$qs.stringify({
        productTypeId,
        openImg,
        closeImg: this.closeImgUrl
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('删除成功')
          this.productImgRender();
        } else {
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    deleteCloseImg() {
      const closeImg = null;
      const productTypeId = this.productTypeId;
      const params = this.$qs.stringify({
        productTypeId,
        openImg: this.openImgUrl,
        closeImg
      })
      this.$axios.patch('/oemApplication/ui/productImg', params).then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.$message.success('删除成功')
          this.productImgRender();
        } else {
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    // 获取OEM应用的服务协议和隐私声明
    getAgreementAndStatement() {
      this.$axios.get('/oemApplication/ui/agreementAndStatement').then((res) => {
        const rs = res.data;
        // console.log(rs);
        this.serviceAgreementUrl = rs.data.serviceAgreementUrl;
        this.privacyStatementUrl = rs.data.privacyStatementUrl;
        this.serviceAgreementDocument = rs.data.serviceAgreementDocument
        this.privacyStatementDocument = rs.data.privacyStatementDocument
      })
    },
    // 修改OEM应用的服务协议和隐私声明
    changeAgreementAndStatement(params) {
      this.$axios.patch('/oemApplication/ui/agreementAndStatement', params).then((res) => {
        const rs = res.data;
        console.log(rs)
        if (rs.success === true) {
          this.$message.success('上传成功')
          this.getAgreementAndStatement()
        } else {
          this.$message.error(`${rs.msg}`)
        }
      })
    },
    // 上传服务协议和隐私声明文件
    serviceAgreementUpload(response) {
      const serviceAgreementDocument = response.data;
      console.log(serviceAgreementDocument);
      const params = this.$qs.stringify({
        serviceAgreementDocument,
        privacyStatementDocument: this.privacyStatementDocument,
        serviceAgreementUrl: this.serviceAgreementUrl,
        privacyStatementUrl: this.privacyStatementUrl
      })
      this.changeAgreementAndStatement(params);
    },
    privacyStatementUpload(response) {
      const privacyStatementDocument = response.data;
      console.log(privacyStatementDocument);
      const params = this.$qs.stringify({
        privacyStatementDocument,
        serviceAgreementDocument: this.serviceAgreementDocument,
        serviceAgreementUrl: this.serviceAgreementUrl,
        privacyStatementUrl: this.privacyStatementUrl
      })
      this.changeAgreementAndStatement(params);
    },
    // 获取OEM应用的风格设置
    getOEMStyle() {
      this.$axios.get('/oemApplication/ui/style').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.tabRailingColor = `#${rs.data.tabRailingColor}`;
        this.backgroundColor = `#${rs.data.backgroundColor}`;
        // console.log(this.tabRailingColor, this.backgroundColor);
      })
    },
    // 修改OEM应用的风格设置
    setOEMStyle() {
      const tabRailingColor = this.tabRailingColor.substr(1);
      // console.log(tabRailingColor);
      const backgroundColor = this.backgroundColor.substr(1);
      const params = this.$qs.stringify({
        tabRailingColor,
        backgroundColor
      })
      this.$axios.patch('/oemApplication/ui/style', params).then((res) => {
        const rs = res.data;
        this.getOEMStyle();
        // console.log(this.tabRailingColor, this.backgroundColor);
      })
    },
    // 获取OEM应用的功能配置
    getOemFunction() {
      this.$axios.get('/oemApplication/function').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.remoteService = rs.data.remoteService
        this.controlSigMesh = rs.data.controlSigMesh
        this.userLogin = rs.data.userLogin
      })
    },
    // 修改OEM应用的功能配置
    setOemFunction() {
      let { remoteService, controlSigMesh, userLogin } = this;
      const params = this.$qs.stringify({
        remoteService,
        controlSigMesh,
        userLogin
      })
      this.$axios.patch('/oemApplication/function', params).then((res) => {
        if (res.data.success === true) {
          this.$message.success('修改成功')
        }
      }).catch((err) => {
        this.$message.error(err);
      })
    },
    // 验证邮箱有效性
    verifyEmail() {
      const { form } = this;
      const params = this.$qs.stringify(form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post('/oemApplication/email', params).then((res) => {
            const rs = res.data;
            if (rs.success === true) {
              this.$message.info('验证成功，请激活邮箱');
            } else {
              this.$message.error(`${rs.msg}`);
            }
          }).catch((error) => {
            this.$message.error(error);
          })
        }
      })
    },
    // 检查认证邮箱是否已激活
    checkEmail() {
      this.$axios.get('/oemApplication/checkEmail').then((res) => {
        const rs = res.data;
        if (rs.data.active === false) {
          this.$message.info('邮箱还未激活，将默认使用晶讯邮箱发送给用户激活信息')
        } else {
          this.$message.success('邮箱已激活')
        }
      })
    },
    // 检查OEM应用构建情况
    checkPackage() {
      this.$axios.get('/oemApplication/checkPackage').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.packageState = rs.data.packageState;
      })
    },
    // 构建OEM应用
    createPackage() {
      this.$axios.post('/oemApplication/package').then((res) => {
        this.$message.success('构建成功，请等待')  
        this.checkPackage()
      })
    },
    // 检查OEM应用发布情况
    checkPublishState() {
      this.$axios.get('/oemApplication/checkPublish').then((res) => {
        const rs = res.data;
        console.log(rs);
        this.publishState = rs.data.state;
      })
    },
    // 发布OEM应用
    publishApp() {
      const power = parseInt(this.$cookies.get('z_pub_pow'), 10);
      const { publishForm } = this;
      // debugger;
      this.$refs.publishForm.validate((valid) => {
        if (valid) {
          if (power !== 0) {
            this.$message.error('抱歉，你没有发布的权限')
            return false;
          } else {
            const params = this.$qs.stringify(publishForm); 
            this.$axios.post('/oemApplication/publish', params).then((res) => {
              const rs = res.data;
              if (rs.success === true) {
                this.$message.success('发布成功');
                this.checkPublishState()
              } else {
                this.$message.error(`${rs.msg}`);
              }
            })
          }
        }
      })
    },

    next() {
      const { STEPNUM_1, oemApplication } = this;
      // debugger;
      if (this.active === 0) {
        this.active = 1;
      }
      if (this.active === 1) {
        this.active1++;
        // 获取logo
        if (this.active1 === 1) {
          this.getLogo()
        }
        // 获取启动图片
        if (this.active1 === 2) {
          this.getStartImg()
        }
        // 获取介绍图片
        if (this.active1 === 3) {
          this.getIntroduceImg();
        } 
        // 获取产品图片
        if (this.active1 === 4) {
          this.getProductImg();
        }
        // 获取OEM应用的服务协议和隐私声明
        if (this.active1 === 5) {
          this.getAgreementAndStatement();
        }
        // 获取OEM应用的风格设置
        if (this.active1 === 6) {
          this.getOEMStyle();
        }
        // 保存当前的步骤
        this.$cookies.set('active', this.active)
        this.$cookies.set('active1', this.active1)
        if (this.active1 > STEPNUM_1) {
          this.active = 2;
          // 获取OEM应用的功能配置
          if (this.active === 2) {
            this.getOemFunction();
          }
          this.active1 = STEPNUM_1;
          this.$cookies.set('active', this.active)
          this.$cookies.set('active1', this.active1)
          return false;
        }
      }
      if (this.active === 2) {
        this.active = 3;
        this.checkEmail(); // 验证邮箱
        this.checkPackage();
        this.$cookies.set('active', this.active)
        return false;
      }
      if (this.active === 3) {
        this.active = 4; // 发布
        this.checkPublishState();
        this.showNextBtn = false;
        this.$cookies.set('active', this.active)
        return false;
      }
      console.log(this.active, this.active1);
      // 第一步 this.active = 1，如果没有id，则创建app; 如果有id，则直接进入下一步
      if (!oemApplication.id) { // 没有创建app
        
      } else { // 已经创建app
        
      }
      // this.$store.commit('stepNow', { active: this.active, active1: this.active1 });
    },
    prev() {
      // debugger;
      if (this.active === 4) {
        this.active = 3;
        this.showNextBtn = true;
        this.checkPackage();
        this.$cookies.set('active', this.active)
        return false;
      }
      if (this.active === 3) {
        this.active = 2;
        this.getOemFunction();
        this.$cookies.set('active', this.active)
        return false;
      }
      if (this.active === 2) {
        this.active = 1;
        // 获取OEM应用的风格设置
        if (this.active1 === 6) {
          this.getOEMStyle();
        }
        this.$cookies.set('active', this.active)
        return false;
      }
      
      if (this.active === 1) {
        this.active1--
        // 获取logo
        if (this.active1 === 1) {
          this.getLogo()
        }
        // 获取启动图片
        if (this.active1 === 2) {
          this.getStartImg()
        }
        // 获取介绍图片
        if (this.active1 === 3) {
          this.getIntroduceImg();
        } 
        // 获取产品图片
        if (this.active1 === 4) {
          this.getProductImg();
        }
        // 获取OEM应用的服务协议和隐私声明
        if (this.active1 === 5) {
          this.getAgreementAndStatement();
        }
        
        if (this.active1 < 1) {
          this.active = 0;
          this.active1 = 0;
          this.$cookies.set('active', this.active)
          this.$cookies.set('active1', this.active1)
          return false;
        }
        this.$cookies.set('active', this.active)
        this.$cookies.set('active1', this.active1)
      }
      if (this.active === 0) {
        this.$router.push('/manageCenter/applicationManage')
      }
      
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
  padding-bottom 50px
  .breadcrumb
    margin-bottom 50px
    .el-breadcrumb
      height 60px
      line-height 60px
      font-size 16px
  .el-steps
    .el-step
      cursor pointer
  .step-containers
    width 90%
    margin 50px auto 0
    .step-container
      .el-row 
        margin-bottom 25px
      .el-input 
        width 300px
      .app-config 
        text-align center
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
            .productList-wrapper
              width 150px 
              height 356px
              position absolute
              left 14px
              top 28px 
              padding 0 10px
              cursor pointer
              overflow hidden
              .productList-item
                height 50px
                line-height 50px
                border-bottom 1px solid #ccc
                display flex
                img
                  width 40px 
                  height 40px
                  display inline-block
                  margin-top 5px
                span 
                  margin-left 10px
            .oemStyle
              width 150px 
              height 356px
              position absolute
              left 14px
              top 28px 
              padding 0 10px
              .tab 
                width 100%
                height 50px
                background #333
                margin-bottom 20px
              .bg
                width 100%
                height 50px
                background #999        
        .cont 
          font-size 22px
          text-align left
          .upload-box 
            display flex
            .delete  
              display inline-block
              width 20px
              height 20px
              line-height 20px
              text-align center
              font-size 20px
              position absolute
              right 333px
              cursor pointer
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
        .url-upload
          padding-top 20px
          a 
            font-size 14px
            color blue
            cursor pointer
        .oemStyle
          padding-top 20px    
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
      text-align center 
    .func-config
      padding-left 200px
      text-align left
      .switch-box
        font-size 16px 
        font-weight 600 
        &:first-child
          margin-top 20px
        margin-bottom 20px 
        .el-switch 
          margin-left 15px
    .hide-box
      padding-left 200px
      h3 
        font-size 16px 
        font-weight 600 
        margin-bottom 20px
      p 
        width 500px 
        line-height 30px
        margin-bottom 20px
      .el-form 
        padding 20px 0  
    .create-box
      text-align center  
      h3 
        font-size 18px
        margin 50px 0  
    .publish-box
      margin-left 200px
      .publish,.publish-info,.publish-success
        h3
          font-size 18px
          font-weight bold
          margin-top 20px
          margin-bottom 10px
        p
          width 600px
          font-size 16px  
          line-height 30px
        .el-form
          margin-top 30px
        span
          display inline-block
          font-size 16px  
          margin-top 10px  
        .publish-btn
          margin-top 30px
          margin-left 260px
  .button-box
    margin-top 50px
    text-align right
    padding-right 100px
</style>
