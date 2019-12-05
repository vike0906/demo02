import request from '@/api/config';
import qs from 'qs';

//登录
export const login = params => { return request({url: '/login',  method: 'post', data: qs.stringify(params) }); }

//登出
export const logout = () => { return request({url: '/logout',  method: 'post' }); }

//修改密码
export const changePassword = params => { return request({url: '/change-psd',  method: 'post' , data: qs.stringify(params)}); }