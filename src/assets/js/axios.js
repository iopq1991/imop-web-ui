import {Message} from 'element-ui'
import Axios from 'axios';
import {getStorage} from './utils';

Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
Axios.defaults.baseURL = process.env.BASE_API;
// 请求拦截（配置发送请求的信息）
// Axios.defaults.transformRequest = function (request) {
//   return JSON.stringify(request)
// };
Axios.interceptors.request.use(function (config) {
  config.headers['yxt-token'] = getStorage('loginToken'); // 让每个请求携带自定义token 请根据实际情况自行修改
  // 处理请求之前的配置
  return config;
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
Axios.interceptors.response.use(function (response) {
  /*if(response.data.errorCode === '-000001'){
    window.location.href = response.data.data;
  }*/
  // 处理响应数据
  let data = response.data;
  if (data.code == '200') {
    return data;
  } else {
    Message({
      showClose: true,
      type: 'error',
      message: data.message || "请求失败"
    });
  }

}, function (error) {
  // 处理响应失败
  /* ElementUI.Message({
       showClose: true,
       message: '请求失败！',
       type: 'error'
   });*/
  return Promise.reject(error);
});
export default Axios
