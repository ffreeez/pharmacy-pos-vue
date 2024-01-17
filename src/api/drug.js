import request from '@/utils/request'

export function getAllDrugs() {
  return request({
    url: '/drugs/getall',
    method: 'get'
  })
}

export function getDrug(id) {
  return request({
    url: `/drugs/get/${id}`,
    method: 'get'
  })
}

export function updateDrug(id, data) {
  return request({
    url: `/drugs/update/${id}`,
    method: 'put',
    data
  })
}

export function deleteDrug(id) {
  return request({
    url: `/drugs/delete/${id}`,
    method: 'delete'
  })
}

export function createDrug(data) {
  return request({
    url: '/drugs/create',
    method: 'post',
    data
  })
}
