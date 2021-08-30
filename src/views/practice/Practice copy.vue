<template>
  <div>
    <el-container class="outside">
      <el-header>当前位置：{{ $store.state.my_path }}</el-header>
      <el-container>
        <el-main>
          <!-- <el-radio label="A"><a style="font-size: 16px">this is a</a></el-radio> <br> -->
          <!--具体题目内容-->
          <!--答题内容区域-->
          <el-card class="box-card" v-for="(subject,questionIndex) in singleq" :key="subject.id"
            v-show="questionIndex===questionID">
            <!-- 题目内容 -->
            <div slot="header" class="clearfix">
              <span class="ques-head">题目{{questionIndex + 1}}：{{subject.question}}</span>
            </div>
            <el-divider></el-divider>
            <!-- 题目选项 -->
            <div :key="choiceIndex" class="input-text"
              @click="getChoice(questionIndex,choiceIndex)">
              <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
              <span>{{choiceIndex | numToChoice}}&nbsp;{{subject.optionA}}</span><br>
              <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
              <span>{{choiceIndex | numToChoice}}&nbsp;{{subject.optionB}}</span><br>
              <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
              <span>{{choiceIndex | numToChoice}}&nbsp;{{subject.optionC}}</span><br>
              <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
              <span>{{choiceIndex | numToChoice}}&nbsp;{{subject.optionD}}</span><br>
            </div>

          </el-card>
          
          <!-- 答题进度条 -->
          <div class="progress-area">
            <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" :status="progressStyle">
            </el-progress>
          </div>

          <el-divider></el-divider>
          <el-button type="primary" @click="prevSubject">上一题</el-button>
          <el-button type="primary" @click="nextSubject">下一题</el-button>
          <el-button type="primary" style="float: right;">查看解析</el-button>
        </el-main>
        <el-aside>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>答题卡</span>
              </div>
            </template>

            <el-button class="button" type="text" @click="submitAll">提交</el-button>
          </el-card>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    ref,
    onMounted,
    reactive
  } from 'vue';
  import {
    getSingleQData,
    getMultipleQData,
    getJudgeQData,
    getRankQData,
    getVideoQData,
    getSaQData,
    getGameQData
  } from "network/question";
  import axios from "axios"
  export default {
    name: 'Practice',
    data() {
      return {

        my_path: '',
        questionID: 0,
        checkedID: -1, //选项的索引值，未选择时为-1
        progressPercent: 0,
        progressStyle: 'warning',

        topicTypes: undefined, // 题目类型
        topicClassify: undefined, // 题库分类
        // 需要展示的题目类型
        subjectType: [{
            type: "isRadio",
            value: false
          },
          {
            type: "isCheckbox",
            value: false
          },
          {
            type: "isBlank",
            value: false
          },
          {
            type: "isAnswer",
            value: false
          },
        ], // 需要展示的题目类型
        publishTime: "2021-3-11 16:28",
        authorName: "小明",
        score: 10, // 题的分值
        topicTitle: "以下哪一个原则是规定了一个人在正常情况下应该保持应有的谨慎态度？",
        blankTitle: "锦瑟无端五十弦，一弦一柱思华年。_，望帝春心托杜鹃。沧海月明珠有泪，_。_，只是当时已惘然。",
        // 单选题
        optionRadio: [{
            value: 1,
            label: "optionA"
          },
          {
            value: 2,
            label: "optionB"
          },
          {
            value: 3,
            label: "optionC"
          },
          {
            value: 4,
            label: "optionD"
          }
        ],
        // 多选题
        optionChecked: [{
            value: 1,
            label: "吃饭"
          },
          {
            value: 2,
            label: "睡觉"
          },
          {
            value: 3,
            label: "打游戏"
          },
        ],
        // 答案内容
        topicContent: {
          radioItem: "", // 默认选项（单选题）
          checkedItem: [], // 默认选项（多选题）(必须是空数组形式，否则报错)
          resultContent: undefined, // 填空题答案
          answerItem: undefined, // 简答题内容
        },
      }
    },
    mounted() {
      // 从接口中获取数据
      this.getData("isAnswer");
    },
    methods: {
      //点击下一题触发
      nextSubject() {
        //判断是否是最后一题
        if (this.questionID === this.singleq.length - 1) {
          this.questionID = this.singleq.length - 1
          this.$message({
            message: '已经是最后一题，确认无误可以点击提交',
            center: true,
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        } else {
          this.questionID += 1
        }
        this.checkedID = -1
        this.showChoice(this.questionID)
      },
      //点击上一题触发
      prevSubject() {
        //判断是否是第一题
        if (this.questionID === 0) {
          this.questionID = 0
          this.$message({
            message: '已经是第一题',
            center: true,
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        } else {
          this.questionID -= 1
        }
        this.checkedID = -1
        this.showChoice(this.questionID)
      },
      //提交并评分
      submitAll() {
        //判断是否还有未选择的题目
        var storeLen = this.$store.state.choices.length
        var subjectsLen = this.singleq.length
        if (storeLen < subjectsLen) {
          this.$message({
            message: '提交失败，请完成所有题目再提交',
            center: true,
            type: 'error',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$message({
            message: '提交成功',
            center: true,
            type: 'success',
            showClose: true,
            duration: 1500
          })
          this.$store.commit('getScore')
          // this.$router.push('/score')
        }
      },
      //每次点击选项都触发，获取题号和选项，并放到store中保存
      getChoice(quesIndex, choiceIndex) {
        var correctness = false
        this.singleq.forEach(item => {
          if (item.id === quesIndex) {
            if (item.answer[choiceIndex] === item.rightAnswer) {
              correctness = true
            }
          }
        })
        var choice = {
          quesIndex: quesIndex,
          choiceIndex: choiceIndex,
          correctness: correctness
        }
        this.checkedID = choiceIndex
        this.$refs.tags.children[quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
        this.$store.commit('updateRecord', choice)
        this.changeProgress()
      },
      //每次显示题目的同时获取该题目已选择哪一项并显示
      showChoice(id) {
        var choices = this.$store.state.choices
        var choice = -1
        choices.forEach(item => {
          if (item.quesIndex === id) {
            choice = item.choiceIndex
          }
        })
        this.checkedID = choice
      },
      //更新进度条长度
      changeProgress() {
        var storeLen = this.$store.state.choices.length
        var subjectsLen = this.singleq.length
        this.progressPercent = Math.floor(storeLen / subjectsLen * 100)
        if (this.progressPercent === 100) {
          this.progressStyle = 'success'
        }
      },
      goToQues(index) {
        this.questionID = index - 1
        this.showChoice(this.questionID)
      },
      /**
       * @func 获取table列表数据方法
       * @desc 带参函数
       * @param {String} data - 目前是手写的题目类型，等有接口的时候直接取接口数据就行了，就不需要这个参数了
       * */
      // 从接口中获取数据，具体情况根据接口来
      getData(data) {
        this.$message.success("成功获取数据");
        // 判断题目类型和题库分类，只能展示一个题目
        this.subjectType.filter(filter => filter.type !== data).forEach(map => {
          map.value = false;
        });
        this.subjectType.filter(filter => filter.type === data).forEach(map => {
          map.value = true;
        });
        // 判断题目类型和题库分类
        this.subjectType.filter(filter => filter.value === true).forEach(map => {
          switch (map.type) {
            case "isRadio":
              // 题目类型
              this.topicTypes = "单选";
              // 题库分类
              this.topicClassify = "单选题";
              break;
            case "isCheckbox":
              this.topicTypes = "多选";
              this.topicClassify = "多选题";
              break;
            case "isBlank":
              this.topicTypes = "填空";
              this.topicClassify = "填空题";
              break;
            case "isAnswer":
              this.topicTypes = "简答";
              this.topicClassify = "简答题";
              break;
            default:
              break;
          }
        });
      },
      // 查看解析
      viewAnalysis() {
        let record = {
          title: "答案解析",
          isError: false,
          isResult: false,
          isAnalysis: true,
        };
        this.$refs.DialogModel.show(record);
      },
    },
    mounted() {
      this.$store.state.scorePerQues = Math.floor(100 / this.singleq.length)
      this.showChoice(this.questionID)
      var choices = this.$store.state.choices
      choices.forEach(item => {
        this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
      })
      this.changeProgress()
    },
    filters: {
      //将选项的索引值转化为ABCD...的选项
      numToChoice(num) {
        return String.fromCharCode(num + 65)
      }
    },
    watch: {

    },
    setup() {
      const singleq = ref([])
      const multipleq = ref([])
      const judgeq = ref([])
      const rankq = ref([])
      const saq = ref([])
      const videoq = ref([])
      const gameq = ref([])
      onMounted(() => {
        axios.all([
          getSingleQData(),
          getMultipleQData(),
          getJudgeQData(),
          getRankQData(),
          getSaQData(),
          getVideoQData(),
          getGameQData()
        ]).then(res => {
          // console.log(res);
          singleq.value = res[0]
          multipleq.value = res[1]
          judgeq.value = res[2]
          rankq.value = res[3]
          saq.value = res[4]
          videoq.value = res[5]
          gameq.value = res[6]
        }).catch(err => {
          console.log("-------------error------------");
          console.log(err);
        })
      })

      return {
        singleq,
        multipleq,
        judgeq,
        rankq,
        saq,
        videoq,
        gameq,
      }
    }
  }

</script>

<style scoped>
  .outside {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    height: 500px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
    margin-left: 10px;
    max-width: "300px";
    width: 100%;
  }

  /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */

  .el-header {
    /* background-color: #d3e3fa; */
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: left;
    height: 100%;
    background-color: #f5f8ff;

  }

  .el-radio-group {
    display: block;
    padding: 15px 10px;
    /* 上下15px， 左右10px*/
    line-height: 40px;
  }

  .el-radio {
    font-size: 16px;
  }

  /* 答题卡*/
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 30px;
    height: 100%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
    height: 100%;
  }

  .tag-group {
    margin: 1rem 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .el-tag {
    width: 3rem;
    margin: 0 .8rem .8rem 0;
  }

  .el-card {
    min-height: 30rem;
  }

  .ques-head {
    font-size: 1.6rem;
  }

  .input-text {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.4rem;
    margin: 1rem 0;
  }


  .input-text input {
    margin-right: 1rem;
  }

  /*自定义单选框样式*/
  input[type="radio"] {
    opacity: 0;
  }

  input[type="radio"] + span {
    position: relative;
  }

  input[type="radio"] + span::before {
    content: '';
    position: absolute;
    left: -2.4rem;
    top: .1rem;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    border: .1rem solid #999;
  }

  input[type="radio"] + span::after {
    content: '';
    position: absolute;
    left: -2rem;
    top: .5rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }

  input[type="radio"]:checked + span::before {
    border: .1rem solid #409EFF;
  }

  input[type="radio"]:checked + span::after {
    background: #409EFF;
  }

  /*自定义单选框样式结束*/

  .progress-area {
    margin: 1rem 0;
  }

  .buttons-group {
    text-align: right;
  }

  .buttons-group button {
    width: 9rem;
  }

</style>
