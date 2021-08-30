import { request } from './request.js'
export function getSingleQData () {
  return request({
    url: 'singleQ/list',
    method: 'get'
    // props: {

    // }
  })
}

export function getMultipleQData () {
  return request({
    url: 'multipleQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getJudgeQData () {
  return request({
    url: 'judgeQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getVideoQData () {
  return request({
    url: 'videoQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getRankQData () {
  return request({
    url: 'rankQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getSaQData () {
  return request({
    url: 'saQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getGameQData () {
  return request({
    url: 'gameQ/list',
    method: 'get'
    // props: {

    // }
  })
}
export function getusersData () {
  return request({
    url: 'users/list',
    method: 'get'
    // props: {

    // }
  })
}
