<template>
  <div class="home-wrapper">
    <div class="home">
      <el-row class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(bannerImg,index) in bannerImgs" :key="index">
            <a href="javascript:;" class="">
              <img :src="bannerImg.src" :alt="bannerImg.title">
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper'
import { mapState } from 'vuex'
import Footer from 'layout/Footer'

export default {
  name: '',
  data() { 
    return {

    };
  },
  computed: {
    ...mapState({
      bannerImgs: state => state.bannerImgs,
    }),
  },
  mounted() {
    this.$store.dispatch('getBannerImg');
  },
  watch: {
    bannerImgs(vaule) {
      this.$nextTick(() => {
        const bannerSwiper = new Swiper('.swiper-container', {
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
    },
  },
  components: {
    Footer,
  },
}
</script>

<style lang="stylus" scoped>
.home-wrapper
  padding-top 0
img
  width 100%
</style>
