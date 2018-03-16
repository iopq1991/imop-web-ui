const Index = () => import('@/pages/common/home');
const ServiceManage = () => import('@/pages/common/serviceManage');
const Accept = () => import('@/pages/common/accept');
const BusinessReport = () => import('@/pages/common/businessReport');
const Business = () => import('@/pages/common/business');
const Container = () => import('@/pages/common/container');
const Aside = () => import ('@/pages/common/components/aside');

const OpenApply = () => import('@/pages/acceptanceApproval/openApply/openApply');
const acceptanceList = () => import('@/pages/acceptanceApproval/acceptance/acceptanceList');
const SpOpen = () => import('@/pages/acceptanceApproval/spOpen/spOpen');
const spList = () => import('@/pages/serviceManage/spList/spList');
const spEdit = () => import('@/pages/serviceManage/spEdit/spEdit');
const AcceptList =() =>import('@/pages/acceptanceApproval/openApply/tips');
//产品管理
const MakeProduct = () => import('@/pages/serviceManage/productManage/makeProduct');
const ProductList = () => import('@/pages/serviceManage/productManage/productList');
const MakeGoods = () => import('@/pages/serviceManage/productManage/makeGoods');
const GoodsList = () => import('@/pages/serviceManage/productManage/goodsList');
import giftApply from '@/assets/images/giftApply.png';
import rechargeApply from '@/assets/images/rechargeApply.png';
import adviceApply from '@/assets/images/adviceApply.png';
import cancelApply from '@/assets/images/cancelApply.png';
import orderApply from '@/assets/images/orderApply.png';
import acceptList from '@/assets/images/acceptList2.png';
import openApply from '@/assets/images/openApply.png';

import businessAccept from '@/assets/images/business.png';
import product from '@/assets/images/product.png';
import order from '@/assets/images/order.png';
import accountManage from '@/assets/images/accountManage.png';
import message from '@/assets/images/message.png';
import spManage from '@/assets/images/spManage.png';
import spListIcon from '@/assets/images/spList.png';

export const accept = {
  path: '/accept',
  component: Container,
  children: [
    {
      path: '',
      name: 'accept',
      component: Accept
    },
    {
      path: 'accept-list',
      name: 'acceptList',
      meta: {
        title: '受理单列表',
        src: acceptList
      },
      components: {
        aside: Aside,
        main: acceptanceList
      }
    },
    {
      path: 'open-apply',
      name: 'openApply',
      meta: {
        title: '开户申请',
        src: openApply
      },
      components: {
        main: OpenApply,
        aside: Aside
      }
    },
    {
      path: 'order-apply',
      name: 'orderApply',
      meta: {
        title: '订购申请',
        src: orderApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'recharge-apply',
      name: 'rechargeApply',
      meta: {
        title: '充值申请',
        src: rechargeApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'gift-apply',
      name: 'giftApply',
      meta: {
        title: '赠送申请',
        src: giftApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'advice-apply',
      name: 'adviceApply',
      meta: {
        title: '预支申请',
        src: adviceApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'cancel-apply',
      name: 'cancelApply',
      meta: {
        title: '销户申请',
        src: cancelApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'pool-list',
      name: 'poolList',
      meta: {
        title: '消息池列表',
        src: cancelApply
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'accept-tips',
      name: 'acceptTips',
      meta: {
      },
      components: {
        aside: Aside,
        main:AcceptList
      }
    },
  ]
};

export const serviceManage = {
  path: '/service-manage',
  component: Container,
  children: [
    {
      path: '',
      name: 'serviceManage',
      component: ServiceManage
    },
    {
      path: 'sp-manage',
      name: 'spManage',
      meta: {
        title: '企业管理',
        src: spManage
      },
      redirect: '/service-manage/sp-manage/sp-open',
      component: Container,
      children: [
        {
          path: 'sp-open',
          name: 'spOpen',
          meta: {
            title: '企业开户',
            src: spManage
          },
          components: {
            aside: Aside,
            main: SpOpen
          }
        },
        {
          path: 'sp-list',
          name: 'spList',
          meta: {
            title: '企业列表',
            src: spListIcon
          },
          components: {
            aside: Aside,
            main: spList
          }
        },
        {
          path: 'sp-edit',
          name: 'spEdit',
          components: {
            aside: Aside,
            main: spEdit
          }
        },
      ]
    },
    {
      path: 'product-manage',
      name: 'productManage',
      meta: {
        title: '商品管理',
        src: product
      },
      components: {
        default: Container
      },
      redirect: '/service-manage/product-manage/make-product',
      children: [
        {
          path: 'make-product',
          name: 'makeProduct',
          meta: {
            title: '新建产品',
            src: spManage
          },
          components: {
            aside: Aside,
            main: MakeProduct
          }
        },
        {
          path: 'product-list',
          name: 'productList',
          meta: {
            title: '产品列表',
            src: spListIcon
          },
          components: {
            aside: Aside,
            main: ProductList
          }
        },
        {
          path: 'make-goods',
          name: 'makeGoods',
          meta: {
            title: '新建商品',
            src: spListIcon
          },
          components: {
            aside: Aside,
            main: MakeGoods
          }
        },
        {
          path: 'goods-list',
          name: 'goodsList',
          meta: {
            title: '商品列表',
            src: spListIcon
          },
          components: {
            aside: Aside,
            main: GoodsList
          }
        },
      ]
    },
    {
      path: 'business-accept',
      name: 'businessAccept',
      meta: {
        title: '业务受理',
        src: businessAccept
      },
      redirect: '/service-manage/business-accept/business-config',
      component: Container,
      children: [
        {
          path: 'business-config',
          name: 'businessConfig',
          meta: {
            title: '业务配置',
            src: spListIcon
          },
          components: {
            aside: Aside,
          }
        },
        {
          path: 'sp-order',
          name: 'spOrder',
          meta: {
            title: '企业订购',
            src: spListIcon
          },
          components: {
            aside: Aside,
          }
        },
        {
          path: 'spRecharge',
          name: '',
          meta: {
            title: '企业充值',
            src: spListIcon
          },
          components: {
            aside: Aside,
          }
        },
        {
          path: 'sp-gift',
          name: 'spGift',
          meta: {
            title: '企业赠送',
            src: spListIcon
          },
          components: {
            aside: Aside,
          }
        },
        {
          path: 'sp-advance',
          name: 'spAdvance',
          meta: {
            title: '企业预支',
            src: spListIcon
          },
          components: {
            aside: Aside,
          }
        }
      ]
    },
    {
      path: 'order-manage',
      name: 'orderManage',
      meta: {
        title: '订单管理',
        src: order
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'account-manage',
      name: 'accountManage',
      meta: {
        title: '账户管理',
        src: accountManage
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'bill-manage',
      name: 'billManage',
      meta: {
        title: '账务管理',
        src: message
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'message-manage',
      name: 'messageManage',
      meta: {
        title: '消息管理',
        src: message
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'center-manage',
      name: 'centerManage',
      meta: {
        title: '中心管理',
        src: message
      },
      components: {
        aside: Aside
      }
    }
  ]
};

export const businessReport = {
  path: '/business-report',
  component: Container,
  children: [
    {
      path: '',
      name: 'businessReport',
      component: BusinessReport
    },
    {
      path: 'account',
      name: 'account',
      meta: {
        title: '对账单',
        src: accountManage
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'income-report',
      name: 'incomeReport',
      meta: {
        title: '收入报表',
        src: order
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'cost-profit',
      name: 'costProfit',
      meta: {
        title: '成本利润',
        src: businessAccept
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'cancel-back',
      name: 'cancelBack',
      meta: {
        title: '销账回款',
        src: product
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'performance-assessment',
      name: 'performanceAssessment',
      meta: {
        title: '绩效考核',
        src: accountManage
      },
      components: {
        aside: Aside
      }
    }
  ]
};

export const business = {
  path: '/business',
  component: Container,
  children: [
    {
      path: '',
      name: 'business',
      component: Business
    },
    {
      path: 'contact-business',
      name: 'contactBusiness',
      meta: {
        title: '通讯业务',
        src: businessAccept
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'application-business',
      name: 'applicationBusiness',
      meta: {
        title: '应用业务',
        src: order
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'data-business',
      name: 'dataBusiness',
      meta: {
        title: '数据业务',
        src: accountManage
      },
      components: {
        aside: Aside
      }
    },
    {
      path: 'sp-business',
      name: 'spBusiness',
      meta: {
        title: '企业上云',
        src: message
      },
      components: {
        aside: Aside
      }
    },
  ]

};

export default [
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  ...[serviceManage, accept, businessReport, business]
];

export const routerMap = {
  accept, serviceManage, businessReport, business
};
