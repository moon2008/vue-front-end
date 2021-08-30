import { createStore } from 'vuex'

const user = {
  state: () => ({
    name: 'Tom',
    slogen: 'Jerry'
  }),
  mutations: {
    setname (state, myname) {
      state.name = myname
    }
  },
  getters: {
    fullname (state) {
      return state.name + state.slogen
    },
    // 调用本模块getters
    fullname2 (state, getters) {
      return getters.fullname + '--'
    },
    // 调用全局getters
    fullname3 (state, getters, rootState) { // rootState根域
      // 直接调用全局的state
      return getters.fullname + rootState.mypath
    }
  },
  actions: {
    // dosome ({ state, commit }) { // 解构形式
    //   setTimeout(() => {
    //     commit('setname', 'hello vuex')
    //   })
    // }
    dosome (context) { // 解构形式
      setTimeout(() => {
        context.commit('setname', 'hello vuex')
      })
    }
  }

}

export default createStore({

  // 配置选项
  //  全局状态
  state: {
    num: 0,
    dnum: 0,
    my_path: 'mypath'
  },
  //  定义处理函数
  mutations: {
    sub (state) {
      state.num++
    },
    sub2 (state, payload) {
      console.log(payload)
      state.dnum += (payload.count + payload.num)
    }
  },
  getter: {
    vuxnum (state) {
      return state.num * state.num
    },
    test (state, getters) {
      // 两个参数分别是state与getter中的属性
      return state.mypath
    }
  },
  actions: {
    demo (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 3000)
    },
    func ({ state, commit, getters }, payload) {
      state.num = 9
      commit('sub')

      console.log(payload)
      console.log(payload.name)
    }
  },
  // 将单一状态树，划分为多个模块
  modules: {
    user,
    article: {
      state: {

      },
      mutations: {

      },
      getters: {

      }
    }

  }
})
