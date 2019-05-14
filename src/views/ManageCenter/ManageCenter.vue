<template>
  <div class="">
    <ManageCenterHeader /> 
    <router-view></router-view>
  </div>
</template>

<script>
import ManageCenterHeader from 'layout/ManageCenterHeader'

export default {
  name: '',
  data() { 
    return {

    }
  },
  components: {
    ManageCenterHeader
  },
}
</script>

<style lang="stylus" scoped>

</style>
