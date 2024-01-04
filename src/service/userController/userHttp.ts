import http from '../http'

const request = `/api/user`

/**
 * 用户接口
 */
export default {
  getUserListByRoleId(params: any) {
    return http.post(`${request}/selectPage`, params)
  },

  deleteUser(params: any) {
    return http.delete(`${request}/deleteBatch`, params)
  },
  saveOrUpdateUser(params: any) {
    return http.put(`${request}/update`, params)
  }
}
