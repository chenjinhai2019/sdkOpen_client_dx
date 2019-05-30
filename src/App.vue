<template>
  <div id="app">
    <Header v-show="!$route.meta.hideHeader"></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from 'layout/Header'

export default {
  name: 'App',
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  mounted() {
    this.$store.dispatch('getUserInfo');
  },
  methods: {
    
  },
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
