import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/users/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function getUser() {
  return request({
    url: '/users/get',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/users/update',
    method: 'put',
    data
  })
}

export function deleteUser() {
  return request({
    url: '/users/delete',
    method: 'del'
  })
}

export function createUser(data) {
  return request({
    url: '/users/create',
    method: 'post',
    data
  })
}
