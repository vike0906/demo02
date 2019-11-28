import request from '@/api/config';
import qs from 'qs';

//获取全部用户
export const getUsers = params => {return request({url: '/system/users',  method: 'get', data: qs.stringify(params)})}

//禁用/删除用户

//新增/修改用户信息

//获取全部角色

//禁用/删除角色

//新增/修改角色信息

//获取全部权限

//禁用/删除权限

//新增/修改权限信息