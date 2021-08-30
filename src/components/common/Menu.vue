<template>
  <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#1E59A9" text-color="#fff" active-text-color="#ffd04b">

    <el-menu-item index="/Home">首页</el-menu-item>
    <el-submenu index="/Practice">
      <template #title>顺序练习</template>
      <el-menu-item index="/Practice/1">初级</el-menu-item>
      <el-menu-item index="/Practice/2">中级</el-menu-item>
      <el-menu-item index="/Practice/3">高级</el-menu-item>
      <el-menu-item index="/Practice/4">专业</el-menu-item>
    </el-submenu>
    <el-submenu index="/Exam">
      <template #title>等级考试</template>
      <el-menu-item index="/Exam/1">初级</el-menu-item>
      <el-menu-item index="/Exam/2">中级</el-menu-item>
      <el-menu-item index="/Exam/3">高级</el-menu-item>
      <el-menu-item index="/Exam/4">专业</el-menu-item>
    </el-submenu>
    <el-menu-item index="/AboutTheme">专题消防</el-menu-item>
    <el-menu-item index="/InterpriseExam">单位自主考试</el-menu-item>
    <el-menu-item index="/Score">积分兑换</el-menu-item>
    <el-menu-item index="/ConnectUs">联系我们</el-menu-item>
    <div>
      <div class="own">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>账户</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        activeIndex: '/Home',
        activeIndex2: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
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
        // console.log(key, keyPath)
      },
    },
  }

</script>

<style>
  .router-link-exact-active {
    color: white;
    /* font-weight: 100;
  font-style: italic;
  font-size: 20px;
  text-decoration: underline;
  background-color: aquamarine; */
  }

  .own {
    margin-top: 15px;
    padding-left:10 0px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #abd2f8;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
