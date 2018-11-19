<template>
  <div id="app">
    <router-view/>
    <FootGuide v-show="$route.meta.showFoot"/>
  </div>
</template>

<script>
  import FootGuide from './components/FootGuide/FootGuide.vue'
  export default {
    components: {
      FootGuide
    },
    mounted(){
      this.$store.dispatch('getAddress')
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
