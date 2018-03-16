import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import {Message} from 'element-ui'
import {getStorage, setStorage} from '@/assets/js/utils';

const loginToken = 'loginToken';

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    next();
  } else {
    if (!getStorage(loginToken)) {
      whiteList.indexOf(to.path) !== -1 ? next() : next('/');
    } else {
      next();
    }
  }

});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});


export default router;
