<template>
  <div>
    <el-container>
      <el-header>顺序练习</el-header>
      <el-main>
        <!-- <router-view></router-view> -->
        <h1>{{ $store.state.my_path }}</h1>
        {{ $store.state.vuxnum }}
        <button @click="cnum">Actions</button>

        <hr>
        <h3>模块中的state</h3>
        {{ $store.state.user.name }}
        
        <hr>
        {{ $store.getters.fullname}}

        <hr>
        调用user模块的action
        <button @click="cname2">调用user模块的action</button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Practice',
    data() {
      return {
        my_path: '',
        count: 0,
        myname: ''
      }
    },
    computed: {
      mypow() {
        return this.count * this.count;
      },
      vuexpow() {
        return this.$store.state.num * this.$store.state.num
      }
    },
    methods: {
      // sub1() {
      //   this.$store.commit('sub')
      // }
      sub2(){
        const payload = { count:2, num:1}
        this.$store.commit('sub2',payload)
      },
      sub3() {
        const payload = { count:2, num:1}
        this.$store.commit({
          type:'sub2',
          payload
        })
      },
      cnum() {
        this.$store.dispatch('demo')
        this.$store.dispatch('func', { count: 88, num: 87 })
      },
      cname() {
        // 不需要标明模块，他会自己搜索
        this.$store.commit('setname', myname)
      },
      cname2() {
        this.$store.dispatch('dosome')
      }
    },
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
