'use strict';
module.exports = {
  dev: {
    NODE_ENV: '"development"',
    BASE_API: '"http://10.0.10.58:9098"' ,  // 王伟
    //BASE_API: '"http://10.0.10.17:9999"',   // 宋展贺
    SSO_URL:'"http://zhhy-sso.test61.umss.cn/dist/login.html?redirectUrl"',
    SSO:'"https://zhhy-sso-test61.umss.cn/sso/token/get"'
  },
  demo: {
    BASE_API: '""'
  },
  test: {
    BASE_API: '""',
    SSO_URL:'"http://zhhy-sso.test61.umss.cn/dist/login.html?redirectUrl"'
  },
  production: {
    BASE_API: '""'
  }
};
