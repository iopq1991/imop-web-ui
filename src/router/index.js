import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/pages/login/login.vue')
const NotFound = () => import('@/pages/404.vue')

import addressBook from '../pages/addressBook/router';
import common from '@/pages/common/router';



Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: Login},
    ...common,
    ...addressBook,
    {path: '*', name: '404', component: NotFound}
  ]
})
