import { request } from './request.js'
export function getAdminData () {
  return request({
    url: 'admin/list',
    method: 'get'
    // props: {

    // }
  })
}

export function getBanner () {

}
