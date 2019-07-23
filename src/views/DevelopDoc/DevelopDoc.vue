<template>
  <div class="main-wrap">
    <div class="container">
      <div class="row">
        <div class="col-md-4">.col-md-4</div>
        <div class="col-md-4">.col-md-4</div>
        <div class="col-md-4">.col-md-4</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  created() {
    this.initMenuData();
  },
  methods: {
    initMenuData() {
      this.$axios.get('/document/allIndex').then((res) => {
        const rs = res.data.data;
        if (res.data.success === true) {
          console.log(rs);
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-wrap
  width 1200px
  height 500px
  margin 0 auto 
</style>
