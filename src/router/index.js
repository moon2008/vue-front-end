import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home.vue'  //不能实现懒加载

const Home = () => import('../views/home/Home')
const Practice = () => import('../views/practice/Practice')
const Exam = () => import('../views/exam/Exam')
const AboutTheme = () => import('../views/about-theme/AboutTheme')
const InterpriseExam = () => import('../views/interprise-exam/InterpriseExam')
const Score = () => import('../views/score/Score')
const ConnectUs = () => import('../views/connect-us/ConnectUs')
const Login = () => import('../components/common/Login')

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Practice',
    name: 'Practice',
    component: Practice,
    children: [
      {
        path: '1',
        name: 'Practice1',
        component: () => import('../views/practice/Practice')
      },
      {
        path: '2',
        name: 'Practice2',
        component: () => import('../views/practice/Practice')
      },
      {
        path: '3',
        name: 'Practice3',
        component: () => import('../views/practice/Practice')
      },
      {
        path: '4',
        name: 'Pracetice4',
        component: () => import('../views/practice/Practice')
      }
    ]
  },
  {
    path: '/Exam',
    name: 'Exam',
    component: Exam,
    children: [
      {
        path: '1',
        name: 'Exam1',
        component: () => import('../views/exam/Exam')
      },
      {
        path: '2',
        name: 'Exam2',
        component: () => import('../views/exam/Exam')
      },
      {
        path: '3',
        name: 'Exam3',
        component: () => import('../views/exam/Exam')
      },
      {
        path: '4',
        name: 'Exam4',
        component: () => import('../views/exam/Exam')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/practice/test')
  },
  {
    path: '/AboutTheme',
    name: 'AboutTheme',
    component: AboutTheme
  },
  {
    path: '/InterpriseExam',
    name: 'InterpriseExam',
    component: InterpriseExam
  },
  {
    path: '/Score',
    name: 'Score',
    component: Score
  },
  {
    path: '/ConnectUs',
    name: 'ConnectUs',
    component: ConnectUs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// routes.beforeEach((to, from, next) => {
//   if (to.path === '/Login') {
//     next()
//   } else {
//     const token = sessionStorage.getItem('userStatus')
//     if (!token) {
//       next('/Login')
//     } else {
//       next()
//     }
//   }
// })

export default router
