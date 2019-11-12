<template>
  <div class='app'>
    <Top></Top>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from './top.vue';
import Bottom from './bottom.vue';
export default {
  name: 'app',
  components: {
    Top,
    Bottom
  },
};
</script>

<style scoped>
.app{}
</style>