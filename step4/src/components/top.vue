<template>
  <div class='top'>
    top
    {{$store.state.bar}}
  </div>
</template>

<script>
  const fetchInitialData = ({ store }) => {
    return store.dispatch('fetchBar');
  };
export default {
  name: 'top',
  asyncData: fetchInitialData,
  mounted() {
    // fetchInitialData({store: this.$store});
  },
};
</script>

<style scoped>
.top{
    width: 100%;
    height: 100px;
    background: red;
}
</style>