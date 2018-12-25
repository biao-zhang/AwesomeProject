import http from './fetch'
const baseUrl = '/file'

// 图片上传
export const upload = (params) => {
  let headers={
      'Content-Type' : 'multipart/form-data'
    }

  return http.fetchPost(`${baseUrl}/upload`,params,headers)
}
