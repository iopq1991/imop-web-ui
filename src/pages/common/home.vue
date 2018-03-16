<template>
  <el-container class="home-container">
    <div class="home-left">
      <div class="top">
        <div class="spLogo">
          <img :src="src" alt=""/>
        </div>
        <div class="spCode">280001</div>
        <div class="spName">企业名称企业名称企业名称企业名称</div>
      </div>
      <div class="bottom">
        <span class="line"></span>
        <p>下载APP</p>
        <div class="code"></div>
      </div>
    </div>
    <div class="home-center">

      <div class="content">
        <div class="title">
          <v-title title="企业管理"></v-title>
        </div>
        <div class="line"></div>
        <ul class="list">
          <router-link v-for="(item ,index) in spManage" :key="index" tag="li" :to="item.path">
            <img :src="item.src" alt="/">
            <span>{{item.text}}</span>
          </router-link>
        </ul>
      </div>
      <div class="content">
        <div class="title">
          <v-title title="平台管理"></v-title>
        </div>
        <div class="line"></div>
        <ul class="list">
          <router-link tag="li" :to="{name:item.path}" v-for="(item ,index) in platformManage" :key="index" style="margin-bottom: 20px;">
            <img :src="item.src" alt="/">
            <span>{{item.text}}</span>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="home-right">
      <div class="top">
        <el-carousel height="116px" arrow="never">
          <el-carousel-item v-for="(item,index) in banner" :key="index">
            <img :src="item.banner" alt=""/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="bottom">
        <div class="title">
          <v-title title="消息通知"></v-title>
        </div>
        <ul>
          <li>
            <p>通讯录新增5位联系人</p>
            <span>2018-02-03  10:08</span>
          </li>
          <li>
            <p>18年1月份企业账单已生成，请注意查收</p>
            <span>2018-02-01  00:23</span>
          </li>
          <li>
            <p>18年1月份企业账单已生成，请注意查收</p>
            <span>2018-02-01  00:23</span>
          </li>
          <li>
            <p>18年1月份企业账单已生成，请注意查收</p>
            <span>2018-02-01  00:23</span>
          </li>
        </ul>
        <a class="more">查看更多</a>
      </div>
    </div>
  </el-container>
</template>

<script>
  import vTitle from '@/components/title';
  import contact from '@/assets/images/contact.png';
  import account from '@/assets/images/account.png';
  import bill from '@/assets/images/bill.png';
  import openSp from '@/assets/images/openSp.png';
  import spList from '@/assets/images/spList.png';
  import acceptList from '@/assets/images/acceptList.png';
  import business from '@/assets/images/business.png';
  import product from '@/assets/images/product.png';
  import order from '@/assets/images/order.png';
  import accountManage from '@/assets/images/accountManage.png';
  import fast from '@/assets/images/fast.png';
  import banner from '@/assets/images/banner.png';
  import zhixun from '@/assets/images/zhixun.jpg'

  export default {
    name: 'home',
    data() {
      return {
        src: zhixun,
        spManage: [
          {
            text: '通讯录',
            src: contact,
            path:'/addressBook/group'
          },
          {
            text: '账号管理',
            src: account,
            path:''
          },
          {
            text: '企业账务',
            src: bill,
            path:''
          }
        ],
        platformManage: [
          {
            text: '企业开户',
            src: openSp,
            path:'spOpen'
          },
          {
            text: '企业列表',
            src: spList,
            path:'spList'
          },
          {
            text: '受理单列表',
            src: acceptList,
            path:'acceptList'
          },
          {
            text: '业务受理',
            src: business
          },
          {
            text: '商品管理',
            src: product
          },
          {
            text: '订单管理',
            src: order
          },
          {
            text: '账户管理',
            src: accountManage
          },
          {
            text: '添加快捷入口',
            src: fast
          }
        ],
        banner: [
          {
            banner
          },
          {
            banner
          }
        ]
      }
    },
    components: {
      vTitle
    },
    created() {

    }

  }
</script>

<style scoped lang="scss">
  .home-container {
    margin: 0 auto;
    width: 1200px;
    border: 1px solid #ddd;
    .home-left {
      flex: 0 0 280px;
      background: #f7f7fa;
      text-align: center;
      .top {
        .spLogo {
          img {
            width: 70px;
            height: 70px;
            margin: 30px auto 20px;
          }
        }
        .spCode {

        }
        .spName {
          margin: 20px auto 15px;
          font-size: 16px;
          color: #333;
        }
      }
      .bottom {
        .line {
          display: block;
          width: 240px;
          height: 1px;
          margin: auto;
          background-color: #eaeaea;
        }
        p {
          margin: 30px auto 20px;
          font-size: 14px;
          color: #616161;
        }
        .code {
          width: 240px;
          height: 240px;
          margin: 0 auto;
          background: #fff url('') no-repeat center center/100% 100%;
        }
      }
    }
    .home-center {
      flex: 1;
      padding: 30px 0 0 20px;
      background: #fff;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      .line {
        height: 1px;
        background: #ccc;
        margin-right: 20px;
      }
      .content {
        .title {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          li {
            margin: 20px 20px 30px 0;
            cursor: pointer;
            width: 135px;
            height: 135px;
            border-radius: 4px;
            border: 1px solid #ccc;
            img {
              display: block;
              width: 60px;
              height: 60px;
              margin: 20px auto;
            }
            span {
              display: block;
              margin: 15px auto;
              text-align: center;
              font-size: 14px;
              color: #616161;
            }
          }
          li:nth-of-type(4n) {
            margin-right: 0;
          }
        }
      }
    }
    .home-right {
      flex: 0 0 280px;
      padding: 20px;
      background: #fff;
      .top {
        .text {
          padding: 0 20px;
          margin-top: 50px;
        }
      }
      .title {
        margin: 30px auto 10px;
        font-size: 16px;
        color: #333;
        &:after {
          content: '';
          display: block;
          height: 1px;
          background: #ddd;
          margin-top: 10px;
        }
      }
      ul {
        li {
          position: relative;
          padding: 0 15px;
          font-size: 16px;
          color: #616161;
          margin-top: 20px;
          &:before {
            content: '';
            display: block;
            width: 3px;
            height: 3px;
            background: #616161;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 10px;
          }
          p {

          }
          span {
            color: #959698;
            display: block;
            font-size: 12px;
            margin-top: 15px;
          }

        }
      }
      .more {
        float: right;
        color: #269efa;
        font-size: 14px;
      }
    }
  }
</style>
