<template>
  <headerComponent></headerComponent>
  <!-- <sellingCompomemtVue></sellingCompomemtVue> -->
  <router-view></router-view>
</template>

<script>
// import sellingCompomemtVue from './components/selling/form-one-seller.vue'

export default {
  name: 'App',
  components:{
    // sellingCompomemtVue
  }
}
</script>
<style >
body {
  margin: 0;
  /* background-color: #f3efe8; */
  background-color: #efefef;
  padding: 0;
  z-index: -1;
  overflow-x: hidden;
}
</style>
