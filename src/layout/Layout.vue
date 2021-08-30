<template>
  <div id="main">
    <Header></Header>
    <Menu></Menu>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import {
    Header,
    Menu,
    Footer
  } from '@/components/common/index.js'

  export default {
    name: 'Layout',
    components: {
      Header,
      Menu,
      Footer
    },
    create() {
      this.$store.dispatch('getdata')
    },
  }

</script>

<style scoped>
  #main {
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 0px;
  }

</style>
