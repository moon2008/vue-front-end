<template>
  <!-- <div class='footer'>
    <span><el-link type="primary" href="https://element-plus.gitee.io/#/zh-CN/component" target="_blank">雨纷纷</el-link></span>
    <el-divider direction="vertical"></el-divider>
    <span><el-link type="success" href="http://m.xiaofang.taiyuan.gov.cn/" target="_blank">旧故里</el-link></span>
    <el-divider direction="vertical"></el-divider>
    <span><el-link type="warning" href="http://github.com/" target="_blank">草木深</el-link></span>
  </div> -->
  <!--  footer start-->
  <div class="container footer-bg">
    <footer class="mb-2 mt-4 pt-5 pb-3">
      <div class="row">
        <div class="col-md-3 text-center">
          <img class="d-inline-block" src="@/assets/images/footer1.png" alt="太原市行业消防知识在线学习平台">
        </div>
        <div class="col-md-6">
          <span class="d-block text-white text-center mt-3">
            <a class="text-white" href="/">网站首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="text-white"
              href="/contact">联系我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="text-white"
              href="#">法律条款</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="text-white" href="#">常见问题</a>
          </span>
          <span class="d-block text-white text-center mt-2">
            版权所有&copy;太原市消防支队
          </span>
          <span class="d-block text-white text-center mt-2">
            地址：太原市北屯路20号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：96119
          </span>
        </div>
        <div class="col-md-3 justify-content-center text-center">
          <img class="d-inline-block" src="@/assets/images/二维码.jpg" style="width:100px" alt="扫描二维码，关注我们"><br>
          <span class="text-white mt-2 d-inline-block">扫一扫，关注我们</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import '@/assets/disk/css/all.css' ;
  export default {
    name: 'Footer'
  }

</script>
<style scoped>
 
  .footer {
    line-height: 100px;
    background-color: #c5dbdf;
    text-align: center;
    margin-top: 10px;
  }

</style>
