<template>
  <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#1E59A9" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="1">
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-submenu index="2">
      <template #title>顺序练习</template>
      <el-menu-item index="2-1"><router-link to="/Practice"><a style='color:white'>初级</a></router-link></el-menu-item>
      <el-menu-item index="2-2"><router-link to="/Practice"><a style='color:white'>中级</a></router-link></el-menu-item>
      <el-menu-item index="2-3"><router-link to="/Practice"><a style='color:white'>高级</a></router-link></el-menu-item>
      <el-menu-item index="2-4"><router-link to="/Practice"><a style='color:white'>专业</a></router-link></el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template #title>等级考试</template>
      <el-menu-item index="3-1"><router-link to="/Exam"><a style='color:white'>初级</a></router-link></el-menu-item>
      <el-menu-item index="3-2"><router-link to="/Exam"><a style='color:white'>中级</a></router-link></el-menu-item>
      <el-menu-item index="3-3"><router-link to="/Exam"><a style='color:white'>高级</a></router-link></el-menu-item>
      <el-menu-item index="3-4"><router-link to="/Exam"><a style='color:white'>专业</a></router-link></el-menu-item>
    </el-submenu>
    <el-menu-item index="4"><router-link to="/AboutTheme">专题消防</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/InterpriseExam">单位自主考试</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/Score">积分兑换</router-link></el-menu-item>
    <el-menu-item index="7"><router-link to="/ConnectUs">联系我们</router-link></el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
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

</style>
