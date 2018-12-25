import http from './fetch'
const baseUrl = '/cm'

// 广告列表
export const advlist = (params) => {
    return http.fetchPost(`${baseUrl}/adv/list`,params)
}

// 广告添加
export const advadd = (params) => {
    return http.fetchPost(`${baseUrl}/adv/add`,params)
}