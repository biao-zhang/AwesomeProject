import http from './fetch'
const baseURL = '/uc'

// 登录页
export const uclogin = (params) => {
    return http.fetchPost(`${baseURL}/login`, params)
}