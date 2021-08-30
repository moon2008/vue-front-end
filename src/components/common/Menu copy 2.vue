<template>
  <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#1E59A9" text-color="#fff" active-text-color="#ffd04b">

    <!-- <div v-for="menu in routers" :key="menu"> -->
      <el-menu-item v-if="menu.name='Home'" :index="menu.path">
        <template #title>首页</template>
      </el-menu-item>
      <el-submenu v-else-if="menu.name='Practice'" :index="menu.path">
        <template #title>顺序练习</template>
        <el-menu-item v-for="child in menu.children" :key="child" :index="child.path">
          {{ child.name }}
        </el-menu-item>
      </el-submenu>
      <el-submenu v-else-if="menu.name='Exam'">
        <template #title>等级考试</template>
        <el-menu-item v-for="child in menu.children" :key="child" :index="child.path">
          {{ child.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else-if="menu.name='AboutTheme'" :index="menu.path">专题消防</el-menu-item>
      <el-menu-item v-else-if="menu.name='InterpriseExam'" :index="menu.path">单位自主考试</el-menu-item>
      <el-menu-item v-else-if="menu.name='Score'" :index="menu.path">积分兑换</el-menu-item>
      <el-menu-item v-else-if="menu.name='ConnectUs'" :index="menu.path">联系我们</el-menu-item>
    <!-- </div> -->
  </el-menu>


</template>

<script>
  // import {
  //   onBeforeMount,
  //   reactive,
  //   toRefs
  // } from 'vue'
  // import {useRouter} from 'vue-router'
  export default {
    name: 'Menu',
    data() {
      // return {
      //   activeIndex: '1',
      //   activeIndex2: '1'
      // }
    },
    methods: {
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath)
      // }
    },
    // setup() {
    //   const router = useRouter()
    //   const state = reactive({
    //     routers: []
    //   })
    //   onBeforeMount(() => {
    //     state.routers = router.options.routes
    //     // state.defaultHeight.height = document.body.clientHeight + "px"
    //   })

    //   // const onCollapse = () => {
    //   //   if (state.isCollapse) {
    //   //     state.asideWidth = '220px'
    //   //     state.isCollapse = false
    //   //   } else {
    //   //     state.isCollapse = true
    //   //     state.asideWidth = '64px'
    //   //   }
    //   // }

    //   // const onRefresh = () => {
    //   //   router.push({
    //   //     path: 'main'
    //   //   })
    //   // }
    //   return {
    //     ...toRefs(state),
    //     // onCollapse,
    //     // onRefresh
    //   }
  //   }
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
