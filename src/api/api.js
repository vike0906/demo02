import request from '@/api/config';

export default function loginPost(params) {
    return request({
      url: '/login',
      method: 'post',
      data: params
    });
}