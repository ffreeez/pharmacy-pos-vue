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

export function getAllUsers() {
  return request({
    url: '/users/getall',
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: `/users/get${id}`,
    method: 'get'
  })
}

export function updateIsAdmin(id, data) {
  return request({
    url: `/users/update/isadmin/${id}`,
    method: 'put',
    data
  })
}

export function resetpassword(id, data) {
  return request({
    url: `/users/update/password/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/delete/${id}`,
    method: 'delete'
  })
}

export function createUser(data) {
  return request({
    url: '/users/create',
    method: 'post',
    data
  })
}
