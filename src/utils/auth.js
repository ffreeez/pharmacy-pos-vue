import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const bearerToken = `Bearer ${token}`
  return Cookies.set(TokenKey, bearerToken)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
