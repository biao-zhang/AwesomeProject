import http from './fetch'
const baseURL = '/sc'

// 验证码
export const captchatoken = (params) => {
    return http.fetchPost(`${baseURL}/captcha/token`, params)
}