// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import $x from '@/assets/js/$x';
import global from '@/assets/js/global';
import router from './permission';
import store from './store';
import './components';
import '@/icons' // icon
import './assets/css/dist/index.css';
//css加载
import '@/assets/css/common.scss'
import '@/assets/css/acceptance/index.scss'
import '@/assets/directive'

Vue.config.productionTip = false;
Vue.prototype.$x = Vue.$x = $x;
Vue.prototype.GLOBAL = global;

window.IBSS = new Vue({
  el: '#app',
  router, store,
  components: {App},
  template: '<App/>'
});
