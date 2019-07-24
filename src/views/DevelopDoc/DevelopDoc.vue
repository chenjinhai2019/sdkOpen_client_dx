<template>
  <div>
    <div class="main-wrap">
      <div class="menu-wrapper">
        <div class="search-box">
          <el-input v-model="keyword" size="medium" suffix-icon="el-icon-search"></el-input>
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
          padding-left 10px    
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
