<template>
  <div>
    <el-container class="outside">
      <el-header>当前位置：
        <router-link tag="li" to="/Home">
          <a target="_blank">首页</a>
        </router-link>
        >> {{ $store.state.my_path }} >> {{ $store.state.my_path_child }}
      </el-header>

      <!-- {{$store.state.subjects}} -->
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
                  <el-tag type="success" size="medium" effect="dark">
                    单选题
                  </el-tag>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
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
                  <el-tag type="success" size="medium" effect="dark">
                    多选题
                  </el-tag>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="input-text" @click="getChoice(questionIndex,0, subject)" v-if="subject.optionA">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="A">
                <span>{{ numToChoice(0) }}.&nbsp;{{subject.optionA}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,1, subject)" v-if="subject.optionB">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="B">
                <span>{{ numToChoice(1) }}.&nbsp;{{subject.optionB}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,2, subject)" v-if="subject.optionC">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="C">
                <span>{{ numToChoice(2) }}.&nbsp;{{subject.optionC}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,3, subject)" v-if="subject.optionD">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="D">
                <span>{{ numToChoice(3) }}.&nbsp;{{subject.optionD}}</span>
              </div>
            </el-card>

            <!-- 判断题 -->
            <el-card v-if="subject.kind === 'judgeq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <el-tag type="success" size="medium" effect="dark">
                    判断题
                  </el-tag>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="input-text" @click="getChoice(questionIndex, 0, subject)">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 0">
                <span>{{ numToChoice(0) }}.&nbsp;对</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex, 1, subject)">
                <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === 1">
                <span>{{ numToChoice(1) }}.&nbsp;错</span>
              </div>
            </el-card>

            <!-- 排序题 -->
            <el-card v-if="subject.kind === 'rankq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <el-tag type="success" size="medium" effect="dark">
                    排序题
                  </el-tag>
                  请将<font color="red">选项区的选项</font>按照顺序，拖动到<font color="red">答题区</font>，并从上到下按照顺序排列好 <br>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
                </span>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="col-3">
                  <h3>答题区</h3>
                  <draggable class="list-group" :list="rankrelist" group="people" itemKey="option">
                    <template #item="{ element, index }">
                      <div class="list-group-item">{{ index + 1 }}、{{ element.option }} </div>
                    </template>
                  </draggable>
                </div>

                <div class="col-3">
                  <h3>选项区</h3>
                  <draggable class="list-group" :list="rankoplist" group="people" itemKey="option">
                    <template #item="{ element, index }">
                      <div class="list-group-item">{{ index + 1 }}、{{ element.option }} </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </el-card>

            <!-- 简答题 -->
            <el-card v-if="subject.kind === 'saq'" v-show="questionIndex===questionID">
              <!-- 题目内容 -->
              <div slot="header" class="clearfix">
                <span class="ques-head">
                  <el-tag type="success" size="medium" effect="dark">
                    简答题
                  </el-tag>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
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
                  <el-tag type="success" size="medium" effect="dark">
                    视频题
                  </el-tag>
                  {{questionIndex + 1}}、({{subject.score}}分){{subject.question}}
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
              <div class="input-text" @click="getChoice(questionIndex,0, subject)" v-if="subject.optionA">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="A">
                <span>{{ numToChoice(0) }}.&nbsp;{{subject.optionA}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,1, subject)" v-if="subject.optionB">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="B">
                <span>{{ numToChoice(1) }}.&nbsp;{{subject.optionB}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,2, subject)" v-if="subject.optionC">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="C">
                <span>{{ numToChoice(2) }}.&nbsp;{{subject.optionC}}</span>
              </div>
              <div class="input-text" @click="getChoice(questionIndex,3, subject)" v-if="subject.optionD">
                <input type="checkbox" :id="questionIndex" :name="'ques'+questionIndex" value="D">
                <span>{{ numToChoice(3) }}.&nbsp;{{subject.optionD}}</span>
              </div>
            </el-card>
          </template>

          <!-- 答题进度条
          <div class="progress-area">
            <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" :status="progressStyle"
              v-if="progressPercent">
            </el-progress>
          </div> -->

          <el-divider></el-divider>
          <el-button type="primary" @click="prevSubject">上一题</el-button>
          <el-button type="primary" @click="nextSubject">下一题</el-button>
          <el-button type="primary" style="float: right;" @click="analysis=true" v-show="analy">查看解析</el-button>
          <div v-show="analysis">{{ analysis_content }}</div>
        </el-main>
        <el-aside>
          <el-card>
            <span>剩余时间</span>
            <div class="item-data">
              <Time @show="handInHand" :status="submitView" :examtime="examtime" v-if="examtime!=''"></Time>
            </div>
            <el-divider></el-divider>
            <span>当前进度</span>
            <div class="item-press">
              {{ $store.state.choices.length}} / {{ subjects.length }}
            </div>
            <div class="progress-area">
              <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" :status="progressStyle"
                v-if="progressPercent">
              </el-progress>
            </div>
          </el-card>

          <el-card class="box-card-sheet">
            <template #header>
              <div class="card-header">
                <span>答题卡</span>
              </div>
            </template>
            <div class="tag-group" ref="tags">
              <el-tag type="primary" effect="plain" v-for="index in subjects.length" style="cursor: pointer"
                @click="goToQues(index)">
                {{index}}
              </el-tag>
            </div>

            <el-button class="button" type="text" @click="submitAll">提交</el-button>
            <el-dialog title="答题情况" v-model="centerDialogVisible" width="30%" :before-close="handleClose" center>
              <span>答对 : {{ $store.getters.rightNum }} 题</span> <br>
              <span>答错 : {{ $store.getters.errorNum }} 题</span> <br>
              <span>正确率 : {{ $store.getters.rightRate }}</span> <br>
              <span>错误选项如下 </span> <br>
              <div class="tag-group" ref="errortags">
                <el-tag type="danger" effect="dark" v-for="item in errorIndex" style="cursor: pointer"
                  @click="goToQues(item)">
                  {{item}}
                </el-tag>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
                  <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
              </template>
            </el-dialog>
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
  import draggable from "vuedraggable"
  import rawDisplayer from "@/components/content/raw-displayer"
  import Time from "./Time.vue"
  // import Myvideo from "content/Myvideo"
  import {
    VideoPlayer
  } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  export default {
    name: 'Exam',
    display: "Two Lists",
    order: 1,
    components: {
      VideoPlayer,
      draggable,
      rawDisplayer,
      Time
    },
    data() {
      return {
        my_path: '',
        analy: false,
        analysis: false,
        questionID: 0,
        checkedID: -1, //选项的索引值，未选择时为-1
        progressPercent: 0,
        progressStyle: 'warning',
        newArr: [],
        centerDialogVisible: false, // 是否弹窗
        errorIndex: [],
        // rankoplist: [],
        rankrelist: [],
        submitView: false,
        examtime: "",
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
          } else if (subject.kind === "judgeq") {
            var result = -1
            if (item.uid === quesIndex) {
              if (subject.answer === "T") {
                result = 0
              } else {
                result = 1
              }
              if (choiceIndex === result) {
                correctness = true
              } else {}
              console.log((choiceIndex === 0 ? "对" : "错") + "....." + (result === 0 ? "对" : "错") + "....." +
                correctness);
            }
          } else if (subject.kind === "multipleq" || subject.kind == "videoq") {
            var multboxs = document.getElementsByName('ques' + quesIndex)
            if (item.uid === quesIndex) {
              let answer = ""
              // item.da = [];
              // for (var i = 0; i < multboxs.length; i++) {
              // if (multboxs[i].checked) {
              //   console.log(multboxs[i].checked);
              //   item.da.push(multboxs[i].value)
              // }

              // console.log(item.da.indexOf(this.numToChoice(choiceIndex)))
              // if (item.da.indexOf(this.numToChoice(choiceIndex)) != -1) {
              //   item.da.pop(multboxs[i].value)
              //   multboxs[i].checked = false
              // console.log("取消选择"+this.numToChoice(i) + "项");

              // }else{
              //   item.da.push(multboxs[i].value)
              //   multboxs[i].checked = true
              //   console.log("选择"+this.numToChoice(i) + "项");
              // }
              if (item.da.indexOf(this.numToChoice(choiceIndex)) != -1) {
                // item.da.pop(multboxs[choiceIndex].value)
                item.da.splice(choiceIndex, 1)
                multboxs[choiceIndex].checked = false
                // console.log("取消选择" + this.numToChoice(choiceIndex) + "项");

              } else {
                item.da.push(multboxs[choiceIndex].value)
                multboxs[choiceIndex].checked = true
                // console.log("选择" + this.numToChoice(choiceIndex) + "项");
              }
              item.da = item.da.sort();
              // }

              item.da.forEach(opt => {
                answer += opt
              })
              if (answer === item.answer) {
                correctness = true
              }
              console.log(answer + "....." + item.answer + "....." + correctness);
            }
          }
        })
        var choice = {
          quesIndex: quesIndex,
          choiceIndex: choiceIndex,
          correctness: correctness,
          score: subject.score
        }
        if (subject.kind === "singleq" || subject.kind === "judgeq") {
          this.checkedID = choiceIndex
        }
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
          this.centerDialogVisible = true
          this.errorIndex = []
          this.$store.state.choices.forEach(item => {
            if (item.correctness === false) {
              this.errorIndex.push(item.quesIndex + 1)
              this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--danger el-tag--dark'
            }
          })
          this.analy = true
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

      numToChoice(num) {
        return String.fromCharCode(num + 65)
      },
      randomArr(newArr, origin, num) {
        let arrFilter = []
        switch (this.$store.state.my_path_child) {
          case '初级': {
            arrFilter = origin.filter((item) => {
              return item.type == 1
            })
            break;
          }
          case '中级': {
            arrFilter = origin.filter((item) => {
              return item.type == 2
            })
            break;
          }
          case '高级': {
            arrFilter = origin.filter((item) => {
              return item.type == 3
            })
            break;
          }
          case '专业': {
            arrFilter = origin.filter((item) => {
              return item.type == 4
            })
            break;
          }
          default: {
            break;
          }
        }
        for (let i = 0; i < num; i++) {
          let temp = Math.floor(Math.random() * arrFilter.length); //取随机下标
          if (newArr[temp] !== null && arrFilter[temp] !== undefined) {
            newArr.push(arrFilter[temp]);
            let uid = {
              "uid": newArr.length - 1
            }
            Object.assign(newArr[newArr.length - 1], uid)
            if (newArr[newArr.length - 1].kind === "multipleq" || newArr[newArr.length - 1].kind === "videoq") {
              let da = {
                "da": []
              }
              Object.assign(newArr[newArr.length - 1], da)
            }
          }
          arrFilter.splice(temp, 1) //删除已添加的元素
        }
        // console.log(newArr);
      },
      tosource(source) {
        this.source = source;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 自动交卷（时间到）
      handInHand() {
        // this.signView = true; // 正确与错误
        // this.passView = true; // 通过或者未通过
        // this.checkResult = true; // 左侧栏、右侧栏、答题结果栏
        // if (this.checking === false) {
        //   this.answersData.value = this.radio || "";
        //   this.upAnswer(1, JSON.stringify(this.answersData)); //提交答案
        // } else {
        //   this.upAnswer(1, JSON.stringify(this.checkData)); //提交答案
        // }
      },
      // 倒计时处理
      madeTime(serverTime1, begin1, duration1) {
        var serverTime = new Date(serverTime1); // 系统时间
        var duration = duration1; //考试时间
        if (begin1 != null) {
          var begin = new Date(begin1); //开始时间
          var residue = begin.getTime() + duration * 1000 - serverTime.getTime(); // 倒计时
        } else {
          // eslint-disable-next-line no-redeclare
          var residue = duration * 1000 - serverTime.getTime(); // 倒计时
        }
        return residue;
      },
      // 时间戳时分秒
      toHHmmss(data) {
        let date = {};
        let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = (data % (1000 * 60)) / 1000;
        date.hours = hours;
        date.minutes = minutes;
        date.seconds = seconds;
        return date;
      },
      getrankoplist() {
        var list = []
        this.subjects.forEach((item) => {
          if (item.uid === this.questionID && item.kind === "rankq") {
            if (item.option1 != null) {
              list.push({
                "option": item.option1,
                "id": 1
              })
            } else {}
            if (item.option2 != null) {
              list.push({
                "option": item.option2,
                "id": 2
              })
            } else {}
            if (item.option3 != null) {
              list.push({
                "option": item.option3,
                "id": 3
              })
            } else {}
            if (item.option4 != null) {
              list.push({
                "option": item.option4,
                "id": 4
              })
            } else {}
            if (item.option5 != null) {
              list.push({
                "option": item.option5,
                "id": 5
              })
            } else {}
            // console.log("111111");
          }
        })
        // this.rankoplist = list
        console.log(list);
        return list
      }
      // add: function () {
      //   this.list.push({
      //     name: "Juan"
      //   });
      // },
      // replace: function () {
      //   this.list = [{
      //     name: "Edgard"
      //   }];
      // },
      // clone: function (el) {
      //   return {
      //     name: el.name + " cloned"
      //   };
      // },
      // log: function (evt) {
      //   window.console.log(evt);
      // }
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
      this.$store.state.right = 0;
      this.$store.state.error = 0;

    },
    beforeUnmount() {
      var choices = this.$store.state.choices
      if (choices.length != 0) {
        choices.forEach(item => {
          this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--primary el-tag--plain'
        })
      }
      this.$store.state.choices = []
    },
    setup() {
      return {
        textarea: ref('')
      }
    },
    // watch: {
    //   //监视非DOM组件的变化
    //   // this.$route.path
    //   '$route.path': function (newVal, oldVal) {
    //     console.log(newVal + '...' + oldVal)
    //     // if (newVal === '/login') {
    //     //   console.log('欢迎进入登录页面');
    //     // } else if (newVal === '/register') {
    //     //   console.log('欢迎进入注册页面');
    //     // }
    //   }
    // },
    computed: {
      subjects() {
        // 重新计算后信息清除
        for (var i = 0; i < this.newArr.length; i++) {
          var multboxs = document.getElementsByName('ques' + i) // 题目选项信息清除
          for (var j = 0; j < multboxs.length; j++) {
            multboxs[j].checked = false
          }
        }
        this.newArr = [] //防止刷新后
        var choices = this.$store.state.choices
        choices.forEach(item => {
          this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--primary el-tag--plain'
        })
        this.$store.state.score = 0
        this.$store.state.choices = []

        this.progressPercent = 0;
        this.examtime = this.toHHmmss(
          this.madeTime(
            new Date(),
            new Date(),
            30 * 60
          )
        );
        // console.log("页面刷新，subjects计算属性被执行")
        this.randomArr(this.newArr, this.$store.state.singleq, 2);
        this.randomArr(this.newArr, this.$store.state.multipleq, 3);
        this.randomArr(this.newArr, this.$store.state.judgeq, 3);
        this.randomArr(this.newArr, this.$store.state.videoq, 1);
        this.randomArr(this.newArr, this.$store.state.rankq, 1);
        this.randomArr(this.newArr, this.$store.state.saq, 2);

        console.log(this.newArr);
        return this.newArr
      },
      analysis_content() {
        var note = ""
        this.subjects.forEach((item) => {
          if (item.uid === this.questionID) {
            note = "答案" + item.answer + "\n解析" + item.note
          }
        })
        return note
      },
      rankoplist() {
        var list = []
        this.subjects.forEach((item) => {
          if (item.uid === this.questionID && item.kind === "rankq") {
            if (item.option1 != null) {
              list.push({
                "option": item.option1,
                "id": 1
              })
            } else {}
            if (item.option2 != null) {
              list.push({
                "option": item.option2,
                "id": 2
              })
            } else {}
            if (item.option3 != null) {
              list.push({
                "option": item.option3,
                "id": 3
              })
            } else {}
            if (item.option4 != null) {
              list.push({
                "option": item.option4,
                "id": 4
              })
            } else {}
            if (item.option5 != null) {
              list.push({
                "option": item.option5,
                "id": 5
              })
            } else {}
            // console.log("111111");
          }
        })
        // this.rankoplist = list
        console.log(list);
        return list
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

  /* .mulopt {
    height: 100%;
    line-height: 3rem;
    font-size: 1.4rem;
    margin: 1rem 0;
    font-family: "Hiragino Sans GB";
  } */
  el-tag {
    text-align: center;
    width: 60px;
  }

  .box-card-sheet {
    padding-top: 5px;
  }

  .menu-item {
    padding: 14px 0;
    border-bottom: 1px solid #dedede;
  }

  .menu-item:last-child {
    border: none;
  }

  .item-label {
    margin-bottom: 6px;
  }

  .item-data {
    font-size: 18px;
    line-height: 22px;
    color: #ff0000;
    font-weight: 400;
  }

  .item-press {
    line-height: 17px;
    margin-bottom: 7px;
    color: #27274a;
    font-size: 14px;
  }

</style>
