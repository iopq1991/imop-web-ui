import request from '@/assets/js/axios';

export function Common_login(username, password) {
  return request({url: '/user/login', data: {username, password}})
}

export function Common_getInfo(token) {
  return request({url: '/user/info', data: {token}})
}

export function Common_logout() {
  return request({url: '/user/logout'})
}

// 获取行业信息
export function Common_getIndustries() {
  return request({url: '/system/getIndustryTypes'})
}

// 获取省份
export function Common_getPlatForm() {
  return request({url: '/system/getProvinceList'})
}

// 获取城市
export function Common_getCities() {
  return request({url: '/system/getProvinceCities'})
}

//获取菜单
export function Common__getMenuList() {
  return request({url: 'menu/getMenuList?privilege=100,200'});
}
