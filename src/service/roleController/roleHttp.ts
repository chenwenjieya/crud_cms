import http from '../http'

const request = `/api/role`

/**
 * 角色接口
 */
export default {
  /**
   * 获取角色列表
   */
  getRoleList(params: any) {
    return http.post(`${request}/page`, params)
  },

  /**
   * 删除角色
   */
  deleteRole(params: any) {
    return http.delete(`${request}/deleteBatch`, params)
  },

  /**
   * 新增/编辑角色
   */
  saveOrUpdateRole(params: any) {
    return http.post(`${request}/save`, params)
  }
}
