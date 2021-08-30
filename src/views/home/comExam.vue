<template>
  <div class="exam">
    <el-container>
      <el-header>等级考试</el-header>
      <el-main>
        <div class="demo-image">
          <div class="block" v-for="(url,index) in urls" :key="url" @click="start(index)">
            <el-image class="img" :src="url"></el-image>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'comExam',
    data() {
      return {
        urls: [
          "https://picture.1kb.site/lp_home/exam_Advanced.png",
          "https://picture.1kb.site/lp_home/exam_Intermediate.png",
          "https://picture.1kb.site/lp_home/exam_Advanced.png",
          "https://picture.1kb.site/lp_home/exam_Professional.png"
        ]
      }
    },
    methods: {
      start(index) {
        this.$router.replace('/Exam/' + (index + 1))
      }
    }
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
    line-height: 160px;
  }

  .block {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    float: left;
    width: 25%;
    max-height: 200px;
    padding: 20px;
  }

  .el-image {
    height: 100%;
    width: 100%;
    max-width: 200px;
    box-sizing: border-box;
  }

  .demo-image {
    display: flex;
    /* margin-top: 100px; */
    justify-content: center;
  }

  .block {
    width: 200px;
    height: 200px;
    background-color: rgb(250,235,215);
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .block~.block {
    margin-left: 15px;
  }

  .block img {
    width: 100%;
    height: 100%;
  }

  .block:hover {
    transform: scale(1.03);
  }

  .img {
  }
</style>
