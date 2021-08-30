<template>
  <div id="main">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/layout/Layout'

  export default {
    name: 'App',
    components: {
      Layout
    },
    watch: {
      //监视非DOM组件的变化
      // this.$route.path
      '$route.path': function (newVal, oldVal) {
        // console.log(newVal + '...' + oldVal)
        switch (newVal) {
          case '/Practice/1': {
            this.$store.state.my_path = '顺序练习'
            this.$store.state.my_path_child = '初级'
            break
          }
          case '/Practice/2': {
            this.$store.state.my_path = '顺序练习'
            this.$store.state.my_path_child = '中级'
            break
          }
          case '/Practice/3': {
            this.$store.state.my_path = '顺序练习'
            this.$store.state.my_path_child = '高级'
            break
          }
          case '/Practice/4': {
            this.$store.state.my_path = '顺序练习'
            this.$store.state.my_path_child = '专业'
            break
          }
          case '/Exam/1': {
            this.$store.state.my_path = '等级考试'
            this.$store.state.my_path_child = '初级'
            break
          }
          case '/Exam/2': {
            this.$store.state.my_path = '等级考试'
            this.$store.state.my_path_child = '中级'
            break
          }
          case '/Exam/3': {
            this.$store.state.my_path = '等级考试'
            this.$store.state.my_path_child = '高级'
            break
          }
          case '/Exam/4': {
            this.$store.state.my_path = '等级考试'
            this.$store.state.my_path_child = '专业'
            break
          }
        }
      }
    },
  }
</script>

<style lang="scss">
  @import "assets/disk/css/base.css";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
