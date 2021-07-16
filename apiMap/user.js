import request from '@/api/config/request'
import { IUserQuery, Profile } from '@/store/modules/user'


export const login = (data) => {
  return request.post(
    '/auth/login',
    data
  )
}

// 获取用户信息

export const getUserInfo = (data) => {
  return request.post('/auth/info', data)
}

// 获取用户列表
export const getUsers = (params) => {
  const { pageNum = 0, pageSize = 10, username = '', status, mobile = '' } = params
  return request.get('/user', {
    params: {
      pageNum,
      pageSize,
      username,
      status,
      mobile
    }
  })
}

// 删除用户
export const removeUser = (id) => {
  return request.delete(`/user/${id}`)
}

// 添加用户
export const addUser = (data) => {
  return request.post('/auth/register', data)
}

// 编辑用户
export const updateUser = (id, data) => {
  return request.put(`/user/${id}`, data)
}
