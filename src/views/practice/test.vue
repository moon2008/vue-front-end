<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div v-for="(test, index) in tests" :key="index">
              <p>{{index + 1}}.{{test.timu}}</p>
              <el-checkbox-group v-if="test.type == '多选'" v-model="test.da">
                <!-- label绑定答案的值,可以绑定索引index,也可以绑定答案内容city -->
                <el-checkbox v-for="(city,index) in test.xuanxiang" :label="index" :key="index">{{city}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-else-if="test.type == '单选'" v-model="test.da">
                <el-radio v-for="(city,index) in test.xuanxiang" :label="index" :key="index">{{city}}</el-radio>
              </el-radio-group>
              <div v-else>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="test.da"></el-input>
              </div>
            </div>
          </div>
          <br />
          <!-- <div>
            <router-link :to="{name:'first',params:{username:'小灰灰',code:1}}">跳转第1页</router-link>
            <router-link :to="{name:'second',params:{username:'小灰灰',code:1}}">跳转第2页</router-link>
            <router-link :to="{name:'third',params:{username:'小灰灰',code:1}}">跳转第3页</router-link>
          </div>-->
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h3>题号:</h3>
            <div class="tihao">
              <!-- <span class="ti active">{{index + 1}}</span> -->
              <div v-for="(test,index) in tests" :key="index">
                <span v-if="test.da.length == '0'" class="ti">
                  {{index + 1}}
                  <!-- {{key}} -->
                </span>
                <span v-else class="ti active">{{index + 1}}</span>
              </div>
            </div>
          </div>
          <div>
            <el-button @click="submitCount" type="primary">提交考卷</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        tests: [{
            timu: "我是第一题,多选题",
            type: "多选",
            xuanxiang: ["A哈哈", "B休息", "C方法", "D晋级"],
            // 答案存放数组
            da: []
          },
          {
            timu: "我是第二题,单选题",
            type: "单选",
            xuanxiang: ["AAA烦", "BBB我", "CCC人", "DDD去"],
            // 答案存放字符串
            da: ""
          },
          {
            timu: "我是第三题,问答题",
            type: "问答",
            xuanxiang: ["AA反打", "BB烦", "CC粉丝", "DD让人"],
            // 答案存放字符串
            da: ""
          }
        ]
      };
    },
    created() {},
    updated() {},
    methods: {
      submitCount() {
        console.log("提交试卷");
        // 是否答完
        let isComplete = true;
        this.tests.forEach((val, index) => {
          if(val.da.constructor === Array) {
            val.da = val.da.map(item => { 
              return String.fromCharCode(item + 65)
            })
          }
          else if (val.da.constructor === Number) {
            val.da = String.fromCharCode(Number(val.da) + 65)
          }
        })
        console.log(this.tests);
        this.tests.forEach((val, i) => {
          if ((val.da.constructor === Array && val.da.length === 0)
           ||(val.da.constructor === String && val.da ===""
           ||(val.da.constructor === Number && val.da ===""))) {
            isComplete = false;
            return;
          }
        })
        if (isComplete) {
          // 答题完整,可以提交,在这里进行提交数据操作
          alert('交卷成功!');
        } else {
          alert('未打完,请继续答卷!');
        }
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  /* 题目*/
  .tihao {
    display: flex;
    justify-content: space-around;
  }

  .ti {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 27px;
    border: 1px solid #bbb;
    color: #bbb;
    border-radius: 50%;
    text-align: center;
  }

  .active {
    background-color: blue;
    color: white;
  }

</style>
