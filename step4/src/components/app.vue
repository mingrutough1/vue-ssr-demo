<template>
  <div id='app'>
    <router-link to="/top">Goto Top</router-link> 
    <router-link to="/bottom">Goto bottom</router-link> 
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    console.log('App.vue beforeCreate');
  },

  created() {
    console.log('App.vue created');
  },

  beforeMount() {
    console.log('App.vue beforeMount');
  },

  mounted() {
    console.log('App.vue mounted');
  }
};
</script>

<style scoped>
.app{}
</style>