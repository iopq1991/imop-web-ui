import {routerMap} from '@/pages/common/router';

export default {
  computed: {
    list() {
      const name = this.$options.name;
      const router = routerMap[name];
      let list = [];
      if (router.children && router.children.length) {
        list = router.children.reduce((route, current) => {
          if (current.path) {
            const item = {...current};
            item.path = router.path + '/' + current.path;
            route.push(item);
          }
          return route;
        }, [])
      }
      return list;
    }
  }
}
