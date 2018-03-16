import {getStorage, setStorage} from '@/assets/js/utils';
import {Common_getPlatForm, Common_getIndustries, Common_getCities} from '@/api/common';

export default {
  namespaced: true,
  state: {
    headMenu: [
      {
        title: '首页',
        path: '/index'
      },
      {
        title: '服务管理',
        path: '/service-manage'
      },
      {
        title: '受理审批',
        path: '/accept'
      },
      {
        title: '经营报表',
        path: '/business-report'
      },
      {
        title: '业务运营',
        path: '/business'
      }
    ],
    menuList: [],
    platformInfo: getStorage('platformInfo') || [],
    industries: getStorage('industries') || [],
  },
  mutations: {
    STORE_PLATFORM_AND_CITIES: (state, list) => {
      state.platformInfo = list;
      setStorage('platformInfo', list);
    },
    STORE_INDUSTRIES: (state, list) => {
      state.industries = list;
      setStorage('industries', list);
    },
    STOE_SET_MENUS: (state, list) => {
      state.menuList = list;
      const menu = [...list];
      state.headMenu = menu.map(item => {
        item.path = item.menuUrl;
        item.title = item.menuName;
        return item;
      });
    }
  },
  actions: {
    async getPlatform({commit}) {

      try {
        const Platform = await Common_getPlatForm();
        const CityMap = await Common_getCities();
        const cityList = (id) => {
          const list = [];
          CityMap.data.forEach((item) => {
            if (item.pid === String(id)) {
              list.push(item);
            }
          });
          return list;
        };
        Platform.data.forEach((item) => {
          item.cities = cityList(item.id);
        });

        commit("STORE_PLATFORM_AND_CITIES", Platform.data);
      } catch (e) {
        commit("STORE_PLATFORM_AND_CITIES", []);
      }

    },
    getIndustries({commit}) {
      Common_getIndustries().then(({data = []}) => {
        commit('STORE_INDUSTRIES', data);
      })
    }
  }
}
