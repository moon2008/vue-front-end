<template>
  <div class="record">
    <el-container>
      <el-header>考试记录</el-header>
      <el-main>
        <el-table :data="tableData" height="250" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="score" label="成绩">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'Record',
    data() {
      return {
        tableData: [{
          date: '2017-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          score: '100'
        }, {
          date: '2018-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          score: '100'
        }, {
          date: '2019-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          score: '100'
        }, {
          date: '2020-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          score: '100'
        }, {
          date: '2021-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          score: '100'
        }, {
          date: '2022-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          score: '100'
        }]
      }
    }
  }

</script>
<style scoped>
  .record {
    padding-top: 10px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */

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
  }

</style>
