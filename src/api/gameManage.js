import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/gameManage/list',
    method: 'get',
    params
  })
}

export function getStatus(params) {
  return request({
    url: '/vue-admin-template/gameManage/list',
    method: 'get',
    params
  })
}
