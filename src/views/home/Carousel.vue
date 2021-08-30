<template>
  <div class="block">
    <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
    <el-carousel height="300px">
      <el-carousel-item v-for="img in urls" :key="img">
        <template #placeholder>
          <div class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </template>
        <template #error>
          <div class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </template>
        <div class='carl'>
          <el-image :src="img" style="max-width: 500px; width: 100%; height:100%" fit="contain"></el-image>
        </div>

      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    data() {
      return {
        urls: [
          "https://picture.1kb.site/carousel/消防轮播1.jpeg",
          "https://picture.1kb.site/carousel/消防轮播2.jpeg",
          "https://picture.1kb.site/carousel/消防轮播3.jpeg",
          "https://picture.1kb.site/carousel/消防轮播4.jpeg"
        ]
      }
    }
  }

</script>
<style>
  .block {
    margin-top: 10px;
  }

  .carl {
    width: "500px";
    align-items: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
  }
  .el-carousel__item:nth-child(n) {
    background-color: #d3dce6;
  } 
  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */

</style>
