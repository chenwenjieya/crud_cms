import http from '../http'

const request = `/api/user`

/**
 * 登陆接口
 */
export default {
  login(params: any) {
    return http.post(`${request}/login`, params)
  }
}
