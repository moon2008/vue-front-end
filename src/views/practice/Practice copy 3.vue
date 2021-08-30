<template>
  <div>
    <el-container>
      <el-header>顺序练习</el-header>
      <el-main>
        <!-- <router-view></router-view> -->
        <h1>{{ $store.state.my_path }}</h1>
        <!-- <input type="button" @click="sub1" value="touch"> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Practice',
    data() {
      return {
        my_path: ''
      }
    },
    methods: {
      // sub1() {
      //   this.$store.commit('sub')
      // }
    },
    // watch: {
    //   '$route.path': function (newVal, oldVal) {
    //     console.log(newVal + '...' + oldVal)
    //     this.content = newVal
    //     switch (newVal) {
    //       case '/Practice/1': {
    //         this.content = '顺序练习 >> 初级'
    //         break
    //       }
    //       case '/Practice/2': {
    //         this.content = '顺序练习 >> 中级'
    //         break
    //       }
    //       case '/Practice/3': {
    //         this.content = '顺序练习 >> 高级'
    //         break
    //       }
    //       case '/Practice/4': {
    //         this.content = '顺序练习 >> 专业'
    //         break
    //       }
    //     }
    //   }
    // }
  }
</script>

<style scoped>
  .exam {
    padding-top: 10px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-header {
    background-color: #d3e3fa;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 30px;
  }

  .el-main {
    background-color: #f5f8ff;
    color: #333;
    text-align: center;
    line-height: 300px;
  }

</style>
