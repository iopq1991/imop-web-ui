import Axios from './axios';
import {Loading, Message, MessageBox} from 'element-ui';

const msgDialog = {
  alert: MessageBox.alert,
  confirm: MessageBox.confirm,
  prompt: MessageBox.prompt,
  toast: Message, //msg, type = [success,info,warning,error], duration
  loading: Loading.service
};

var $x = {
  http: Axios,
  get(url, pars, config) {
    if (pars) {
      pars.f_rnd = +new Date;  // 防止火狐缓存GET请求
      url += url.indexOf('?') > -1 ? '&' : '?';
      url += Object.keys(pars).map(key => key + '=' + pars[key]).join('&');
    }
    return Axios.get(url, config)
  },
  post: Axios.post,
  ...msgDialog
};
export default $x;
