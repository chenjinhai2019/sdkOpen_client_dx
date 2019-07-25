<template>
  <div>
    <div class="main-wrap">
      <div class="menu-wrapper">
        <div class="search-box">
          <el-input v-model="keyword" size="medium" suffix-icon="el-icon-search" @blur="search()"></el-input>
         <!--  <div class="search-cont">
            <ul>
              <li v-for="(item,index) in searchData" :key="index">{{item.title}}</li>
            </ul>
          </div> -->
        </div>
        <ul class="developDoc-menu">
          <li class="nav-item">
            <template>
              <div class="nav-group" v-for="(item,key) in menuData" :key="key">
                <el-link :underline="false" :class="{active : activeId == item.id}" @click="getDoc(item.id)">{{item.title}}</el-link>
                <ul class="menu-list">
                  <li class="nav-item" v-for="(navItem ,key) in item.children" :key="key">
                    <el-link :underline="false" :class="{active : activeId == navItem.id}" @click="getDoc(navItem.id)">{{navItem.title}}</el-link>
                    <ul class="nav-item-list" v-if="navItem.children" >
                      <li v-for="(navList,key) in navItem.children" :key="key">
                        <el-link :underline="false" :class="{active : activeId == navList.id}" @click="getDoc(navList.id)">{{navList.title}}</el-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </template>
          </li>
        </ul>
      </div>
      <div class="cont-wrapper">
        <div class="subscribe">您可以订阅我们的文档，我们将会第一时间通过邮件提醒您文档有更新。<i>点击退订</i></div>
        <el-card class="content">
          {{docCont}}
        </el-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../layout/Footer' 

export default {
  name: '',
  data() { 
    return {
      menuData: [],
      docCont: '',
      activeId: '',
      keyword: '',
      searchData: [],
    }
  },
  created() {
    this.initMenuData();
  },
  methods: {
    initMenuData() {
      this.$axios.get('/document/allIndex').then((res) => {
        const rs = res.data;
        if (rs.success === true) {
          this.menuData = rs.data;
          console.log(this.menuData);
        }
      })
      this.$axios.get('/document/24').then((res) => {
        this.activeId = 24;
        const rs = res.data;
        console.log(rs);
        this.docCont = rs.data.content;
      })
    },
    // 获取标题对应的文档数据
    getDoc(id) {
      console.log(id);
      this.activeId = id;
      this.$axios.get(`/document/${id}`).then((res) => {
        const rs = res.data;
        console.log(rs);
        this.docCont = rs.data.content;
      })
    },
    // 搜索
    search() {
      const { keyword } = this;
      if (keyword === '') {
        return;
      }
      const params = {
        keyword
      }
      this.$axios.get('/document/search', { params }).then((res) => {
        console.log(res.data);
        const rs = res.data;
        this.searchData = rs.data;
      })
    }
  },
  components: {
    Footer
  }
};
</script>

<style lang="stylus" scoped>
.main-wrap
  width 1200px
  height 560px
  margin 0 auto 
  display flex
  .menu-wrapper
    width 240px
    background #ccc
    padding-left 20px
    box-sizing border-box
    .search-box
      margin-top 20px
      .el-input
        width 80%
      .search-cont
        width 250px
        border 1px solid #333
        background #fff
        position absolute
        top 155px
        z-index 999
        padding 20px
        &::before
          content ''
          position absolute
          left 20px
          top -10px
          width 0
          height 0
          border-left 5px solid transparent
          border-top 5px solid transparent
          border-bottom 5px solid #666
          border-right 5px solid transparent
        li 
          height 30px
          line-height 30px
          cursor pointer
          &:hover
            color #409EFF
    .developDoc-menu
      padding-top 20px
      .nav-item
        .el-link
          display block
          height 40px
          color #444
          line-height 40px
          font-size 14px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          font-weight normal
          &:hover,&.active
            color #409EFF
        .menu-list
          padding-left 20px
          .list-title
            color #666
            line-height 26px
            margin-top 15px
        .nav-item-list
          padding-left 20px    
  .cont-wrapper
    flex 1
    padding 20px
    .subscribe
      margin 20px 0;
      font-size 16px
      i 
        color #409EFF
        cursor pointer
</style>
