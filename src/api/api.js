import request from '@/api/config';

//登录
export const login = params => { return request({url: '/login',  method: 'post', data: params }); }

//登出
export const logout = () => { return request({url: '/logout',  method: 'get' }); }

//获取菜单
export const gainMenu = () => { return request({url: '/gainMenu',  method: 'get' }); }

//修改密码
export const changePassword = params => { return request({url: '/changePassword',  method: 'post' , data: params}); }