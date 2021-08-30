<template>
  <div>
    <el-container class="outside">
      <el-header>当前位置：{{ $store.state.my_path }}</el-header>

      {{$store.state.subjects}}
      <el-container>
        <el-main>
          <!-- <el-radio label="A"><a style="font-size: 16px">this is a</a></el-radio> <br> -->
          <!--具体题目内容-->
          <!--答题内容区域-->
          <template class="topicContent" v-for="(subject,questionIndex) in subjects" :key="subject.uid"
            v-show="questionIndex===questionID">
            <el-card class="box-card-question" v-if="subject.kind === 'singleq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <span style="color:green">(单选题)</span>{{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <!-- 题目选项 -->
              <!-- <div v-for="(answer,choiceIndex) in subject.answer" :key="choiceIndex" class="input-text"
                @click="getChoice(questionIndex,choiceIndex)">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
                <span>{{ numToChoice(choiceIndex) }}.&nbsp;{{answer}}</span>
              </div> -->
              <!-- 单选题 -->
              <div class="input-text" @click="getChoice(questionIndex, 0, subject)" v-if="subject.optionA">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 0">
                <span>{{ numToChoice(0) }}.&nbsp;{{subject.optionA}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 1, subject)" v-if="subject.optionB">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 1">
                <span>{{ numToChoice(1) }}.&nbsp;{{subject.optionB}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 2, subject)" v-if="subject.optionC">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 2">
                <span>{{ numToChoice(2) }}.&nbsp;{{subject.optionC}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 3, subject)" v-if="subject.optionD">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 3">
                <span>{{ numToChoice(3) }}.&nbsp;{{subject.optionD}}</span>
              </div>
            </el-card>

            <!-- 多选题 -->
            <el-card v-if="subject.kind === 'multipleq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <span color="green">(多选题)</span>{{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="input-text" @click="getCheckBox(questionIndex,-1, subject)" v-if="subject.optionA">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex">
                <span>{{ numToChoice(0) }}.&nbsp;{{subject.optionA}}</span>
              </div>
              <div class="input-text" @click="getCheckBox(questionIndex,-1, subject)" v-if="subject.optionB">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex">
                <span>{{ numToChoice(1) }}.&nbsp;{{subject.optionB}}</span>
              </div>
              <div class="input-text" @click="getCheckBox(questionIndex,-1, subject)" v-if="subject.optionC">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex">
                <span>{{ numToChoice(2) }}.&nbsp;{{subject.optionC}}</span>
              </div>
              <div class="input-text" @click="getCheckBox(questionIndex,-1, subject)" v-if="subject.optionD">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex">
                <span>{{ numToChoice(3) }}.&nbsp;{{subject.optionD}}</span>
              </div>
            </el-card>

            <!-- 判断题 -->
            <el-card v-if="subject.kind === 'judgeq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <span style="color:green">(判断题)</span>{{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="input-text" @click="getChoice(questionIndex, 0)">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 0">
                <span>{{ numToChoice(0) }}.&nbsp;对</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 1)">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 1">
                <span>{{ numToChoice(1) }}.&nbsp;错</span>

              </div>
            </el-card>


            <!-- 简答题 -->
            <el-card v-if="subject.kind === 'saq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <span style="color:green">(简答题)</span>{{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="input-text">
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
                </el-input>
              </div>
            </el-card>

            <!-- 视频题 -->
            <el-card v-if="subject.kind === 'videoq'" v-show="questionIndex===questionID">
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <span style="color:green">(视频题)</span>{{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>

              <!-- <Myvideo></Myvideo> -->
              <!-- <video src="https://video.1kb.site/xf/%EF%BC%88%E4%B8%80%EF%BC%89%20%E9%AB%98%E5%B1%82%E4%BD%8F%E5%AE%85%E5%B0%8F%E5%8C%BA%E7%AF%87%2000_04_00-00_06_40.mp4"></video> -->
              <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                :options="playerOptions">
              </video-player> -->
              <video id="myVideo" class="video-js" controls="true" controlslist="nodownload">
                <source :src="subject.src" type="video/mp4">
                当前视频无法播放
              </video>
              <div class="input-text" @click="getChoice(questionIndex, 0)" v-if="subject.optionA">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 0">
                <span>{{ numToChoice(0) }}.&nbsp;{{subject.optionA}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 1)" v-if="subject.optionB">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 1">
                <span>{{ numToChoice(1) }}.&nbsp;{{subject.optionB}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 2)" v-if="subject.optionC">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 2">
                <span>{{ numToChoice(2) }}.&nbsp;{{subject.optionC}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 3)" v-if="subject.optionD">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 3">
                <span>{{ numToChoice(3) }}.&nbsp;{{subject.optionD}}</span>
              </div>
            </el-card>
          </template>

          <!-- 答题进度条 -->
          <div class="progress-area">
            <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" :status="progressStyle"
              v-if="progressPercent">
            </el-progress>
          </div>

          <el-divider></el-divider>
          <el-button type="primary" @click="prevSubject">上一题</el-button>
          <el-button type="primary" @click="nextSubject">下一题</el-button>
          <el-button type="primary" style="float: right;" @click="analysis=true">查看解析</el-button>
          <div v-show="analysis">通过这里查看解析</div>
        </el-main>
        <el-aside>
          <el-card class="box-card-sheet">
            <template #header>
              <div class="card-header">
                <span>答题卡</span>
              </div>
              <div class="tag-group" ref="tags">
                <el-tag type="primary" effect="plain" v-for="index in subjects.length" style="cursor: pointer"
                  @click="goToQues(index)">
                  {{index}}
                </el-tag>
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
    reactive,
    defineComponent
  } from 'vue';
  import axios from "axios"
  // import Myvideo from "content/Myvideo"
  import {
    VideoPlayer
  } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  export default {
    name: 'Practice',
    component: {
      VideoPlayer
    },
    data() {
      return {
        my_path: '',
        analysis: false,
        questionID: 0,
        checkedID: -1, //选项的索引值，未选择时为-1
        progressPercent: 0,
        progressStyle: 'warning',
        newArr: [],
        // videoUrl: "https://video.1kb.site/xf/%E9%AB%98%E5%B1%82%E4%BD%8F%E5%AE%85%E5%B0%8F%E5%8C%BA%E6%B6%88%E9%98%B2%E6%BC%94%E4%B9%A0.mp4",
        // playerOptions: {
        //   playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        //   autoplay: false, // 如果为true,浏览器准备好时开始回放。
        //   muted: false, // 默认情况下将会消除任何音频。
        //   loop: false, // 是否视频一结束就重新开始。
        //   preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        //   language: 'zh-CN',
        //   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        //   fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        //   sources: [{
        //     type: "video/mp4", // 类型
        //     // src: this.source // url地址
        //     src: "https://video.1kb.site/xf/%E9%AB%98%E5%B1%82%E4%BD%8F%E5%AE%85%E5%B0%8F%E5%8C%BA%E6%B6%88%E9%98%B2%E6%BC%94%E4%B9%A0.mp4"
        //   }],
        //   poster: '', // 封面地址
        //   notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //   controlBar: {
        //     timeDivider: true, // 当前时间和持续时间的分隔符
        //     durationDisplay: true, // 显示持续时间
        //     remainingTimeDisplay: true, // 是否显示剩余时间功能
        //     fullscreenToggle: true // 是否显示全屏按钮
        //   }
        // }

        // subjects: [{
        //     id: 0,
        //     question: '江苏的省会城市是哪个？',
        //     answer: ['南京', '广州', '杭州'],
        //     rightAnswer: '南京'
        //   }
        // ]
      }
    },
    methods: {
      //点击下一题触发
      nextSubject() {
        //判断是否是最后一题
        if (this.questionID === this.subjects.length - 1) {
          this.questionID = this.subjects.length - 1
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
        this.analysis = false
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
        this.analysis = false

      },
      //每次点击选项都触发，获取题号和选项，并放到store中保存
      getChoice(quesIndex, choiceIndex, subject) {
        var correctness = false
        this.subjects.forEach(item => {
          if (subject.kind === "singleq") {
            if (item.uid === quesIndex) {
              if (this.numToChoice(choiceIndex) === item.answer) {
                correctness = true
              }
              console.log(this.numToChoice(choiceIndex) + "....." + item.answer + "....." + correctness);
            }
          }else if (subject.kind === "multipleq") {
            if (item.uid === quesIndex) {
              
            }
          }
        })
        var choice = {
          quesIndex: quesIndex,
          // choiceIndex: choiceIndex,
          correctness: correctness,
          score: subject.score
        }
        this.checkedID = choiceIndex
        this.$refs.tags.children[quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
        this.$store.commit('updateRecord', choice)
        this.changeProgress()
      },
      getCheckBox(quesIndex, choiceIndex, score) {

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
        var subjectsLen = this.subjects.length
        this.progressPercent = Math.floor(storeLen / subjectsLen * 100)
        if (this.progressPercent === 100) {
          this.progressStyle = 'success'
        }
      },
      goToQues(index) {
        this.questionID = index - 1
        this.showChoice(this.questionID)
      },
      //提交并评分
      submitAll() {
        //判断是否还有未选择的题目
        var storeLen = this.$store.state.choices.length
        var subjectsLen = this.subjects.length
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
          this.$router.push('/score')
        }
      },

      numToChoice(num) {
        return String.fromCharCode(num + 65)
      },
      randomArr(newArr, origin, num) {
        for (let i = 0; i < num; i++) {
          let temp = Math.floor(Math.random() * origin.length); //取随机下标
          if (newArr[temp] !== null && origin[temp] !== undefined) {
            newArr.push(origin[temp]);
            let uid = {
              "uid": newArr.length - 1
            }
            Object.assign(newArr[newArr.length - 1], uid)
            if (newArr[newArr.length - 1].kind === "multipleq") {
              let da = []
              Object.assign(newArr[newArr.length - 1], da)
            }
          }
          origin.splice(temp, 1) //删除已添加的元素
        }
        console.log(newArr);
      },
      tosource(source) {
        this.source = source;
      },
    },
    created() {
      this.$store.dispatch('getData')
    },
    mounted() {
      // this.$store.state.scorePerQues = Math.floor(100 / this.subjects.length)
      this.showChoice(this.questionID)
      var choices = this.$store.state.choices
      choices.forEach(item => {
        this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
      })
      this.changeProgress()
    },
    setup() {
      return {
        textarea: ref('')
      }
    },
    computed: {
      subjects() {
        // this.randomArr(this.newArr, this.$store.state.singleq, 2);
        this.randomArr(this.newArr, this.$store.state.multipleq, 3);
        // this.randomArr(this.newArr, this.$store.state.judgeq, 3);
        // this.randomArr(this.newArr, this.$store.state.videoq, 1);
        // this.randomArr(this.newArr, this.$store.state.saq, 2);
        // console.log(this.newArr);
        return this.newArr
      }
    }
  }

</script>

<style scoped>
  .outside {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    /* max-height: 600px; */
    height: 100%;
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
    max-height: 300px;
    height: 100%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card-sheet {
    width: 100%;
    height: 100%;
  }

  /* new */
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
    font-size: 1.4rem;
  }

  .input-text {
    height: 100%;
    line-height: 3rem;
    font-size: 1.4rem;
    margin: 1rem 0;
    font-family: "Hiragino Sans GB";
  }


  .input-text input {
    margin-right: 1rem;
  }

  /*自定义单选框样式*/
  input[type="radio"] {
    opacity: 0;
  }

  input[type="radio"]+span {
    position: relative;
  }

  input[type="radio"]+span::before {
    content: '';
    position: absolute;
    left: -2.4rem;
    top: .1rem;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    border: .1rem solid #999;
  }

  input[type="radio"]+span::after {
    content: '';
    position: absolute;
    left: -2rem;
    top: .5rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }

  input[type="radio"]:checked+span::before {
    border: .1rem solid #409EFF;
  }

  input[type="radio"]:checked+span::after {
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

  video {
    height: 100%;
    width: 100%;
  }

</style>
