import { createStore } from 'vuex'
import axios from 'axios'
import {
  getSingleQData,
  getMultipleQData,
  getJudgeQData,
  getRankQData,
  getVideoQData,
  getSaQData,
  getGameQData
} from 'network/question'

export default createStore({
  state: {
    my_path: '',
    my_path_child: '',
    choices: [], // 保存各题号及其对应的选项
    scorePerQues: 0,
    score: 0,
    singleq: [],
    multipleq: [],
    judgeq: [],
    rankq: [],
    saq: [],
    videoq: [],
    gameq: [],
    newArr: [],
    right: 0,
    error: 0
  },
  mutations: {
    updateRecord (state, choice) { // 添加题目和答案
      // console.log('执行updataRecord函数')
      let flag = false
      if (state.choices.length === 0) {
        state.choices.push(choice)
        flag = true
        // return true
      }

      state.choices.forEach(item => {
        if (item.quesIndex === choice.quesIndex) {
          item.choiceIndex = choice.choiceIndex
          item.correctness = choice.correctness
          flag = true
          // return true
        }
      })
      if (!flag) {
        state.choices.push(choice)
        // return true
      }
      state.right = 0
      state.error = 0
      state.choices.forEach(item => {
        if (item.correctness === true) {
          state.right += 1
        } else if (item.correctness === false) {
          state.error += 1
        }
      })
      // console.log('正确数量' + state.right)
      // console.log('错误数量' + state.error)
      // return false
    },
    getScore (state) {
      console.log(state.choices)
      state.choices.forEach(item => {
        if (item.correctness === true) {
          // state.score += state.scorePerQues
          state.score += Number(item.score)
          // state.result += 1
          // console.log(item.score)
        }
      })
    },
    // 重置state中的所有值，重新答题的时候触发
    resetStore (state) {
      state.choices = []
      state.scorePerQues = 0
      state.score = 0
      state.right = 0
      state.error = 0
    },
    getdata (state, res) {
      state.singleq = res[0]
      state.multipleq = res[1]
      state.judgeq = res[2]
      state.rankq = res[3]
      state.saq = res[4]
      state.videoq = res[5]
      state.gameq = res[6]
    }
  },
  getters: {
    rightNum (state) {
      return state.right
    },
    errorNum (state) {
      return state.error
    },
    rightRate (state, getters) {
      if ((getters.rightNum + getters.errorNum) === 0) {
        return 100 + '%'
      } else {
        return (Math.round(getters.rightNum / (getters.rightNum + getters.errorNum) * 10000) /
          100.00) + '%'
      }
    }
  },
  actions: {
    getData (context) {
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
        context.commit('getdata', res)
      }).catch(err => {
        console.log('-------------error------------')
        console.log(err)
      })
    }
  }
})
