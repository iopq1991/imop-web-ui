<template>
  <el-header class="header-container">
    <el-container>
      <div class="logo">
        <img :src="logo"/>
        <h3>综合管理运营平台</h3>
      </div>
      <el-menu mode="horizontal" router :default-active="router">
        <el-menu-item v-for="(menu,index) in headMenu" :key="index" :index="menu.path">{{menu.title}}</el-menu-item>
      </el-menu>
      <div class="other">

        <el-popover placement="bottom" trigger="click" width="300" popper-class="message-popper"
                    @show="handleShowMessage" @hide="handleHideMessage">
          <div class="message-container clearfix" slot="reference" :class="{active:messageActive}">
            <svg-icon iconClass="message" className="message"></svg-icon>
            <span>10</span>
          </div>
          <div class="content">
            <div class="title">
              消息通知
            </div>
            <ul>
              <li>
                <p class="ellipsis">通讯录新增5位联系人</p>
                <span>2018-02-03 10:08</span>
              </li>
              <li>
                <p>通讯录新增5位联系人</p>
                <span>2018-02-03 10:08</span>
              </li>
              <li>
                <p>通讯录新增5位联系人</p>
                <span>2018-02-03 10:08</span>
              </li>
            </ul>
            <div class="more">查看更多</div>
          </div>
        </el-popover>
        <div class="design-contianer">

          <el-dropdown trigger="click" @visible-change='handleVisibleChangeDesign'>
            <span class="el-dropdown-link">
              <svg-icon iconClass="design" className="design" :class="{active:designActive}"></svg-icon>
            </span>
            <el-dropdown-menu slot="dropdown" class="design-dropdown">
              <el-dropdown-item>用户管理</el-dropdown-item>
              <el-dropdown-item>门户管理</el-dropdown-item>
              <el-dropdown-item>日志管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-dropdown class="m-r-20 login" trigger="click" @visible-change="handleVisibleChange">
          <span class="el-dropdown-link" :class="{active:userActive}">
            32444***@qq.com<i class="el-icon--right" :class="userActive?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-login">
            <el-dropdown-item>
              <div class="item">
                <svg-icon iconClass="personCenter" className="icon"></svg-icon>
                <span>个人中心</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="item" @click="dialogVisible=true">
                <svg-icon iconClass="switchSp" className="icon"></svg-icon>
                <span>切换企业</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item><div @click="logout">退出管理</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-container>
    <el-dialog
      :visible.sync="dialogVisible" :modal-append-to-body="false"
      width="30%" title="请选择登陆平台的企业" center>
      <el-carousel type="card" height="150px" :autoplay="false">
        <el-carousel-item v-for="item in 3" :key="item">
          <img src=""/>
          <div>{{item}}</div>
        </el-carousel-item>
      </el-carousel>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false"
               style="width:80%;margin:auto;display:block;background:#269ef7;border-color:#269ef7">确 定</el-button>
      </span>
    </el-dialog>
  </el-header>
</template>

<script>
  import {mapState} from 'vuex';
  import logo from '@/assets/images/logo.png';

  export default {
    name: "vHeader",
    data() {
      return {
        dialogVisible: false,
        logo,
        userActive: false,
        designActive: false,
        messageActive: false
      }
    },
    computed: {
      ...mapState('common', ['headMenu']),
      router() {
        if (this.$route.matched && this.$route.matched.length > 0) {
          return this.$route.matched[0].path;
        }
        return '';
      }
    },
    methods: {
      handleVisibleChange(change) {
        this.userActive = change;
      },
      handleVisibleChangeDesign(change) {
        this.designActive = change;
      },
      handleShowMessage() {
        this.messageActive = true;
      },
      handleHideMessage() {
        this.messageActive = false;
      },
      logout(){
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  $nav_color: #269ef7;
  .header-container {
    background: #fff;
    .el-menu--horizontal {
      border-bottom: none;
      .el-menu-item {
        height: 65px;
        line-height: 65px;
        width: 132px;
        padding: 0;
        text-align: center;
        &.is-active {
          border-bottom: 4px solid $nav_color;
          color: $nav_color;
        }
      }
    }
    .el-menu {
      li {
        font-size: 16px;
        font-family: "Microsoft Yahei", sans-serif;
        color: #333;
      }
    }
    .logo {
      line-height: 65px;
      flex: 1;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      img {
        float: left;
        width: 30px;
        height: 30px;
        margin: 17px 15px 15px 20px;
      }
    }
    .other {
      flex: 1;
      align-self: center;
      text-align: right;
      .el-dropdown-link {
        color: #616161;
        cursor: pointer;
        &.active {
          color: $nav_color;
        }
      }
      .message-container {
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        &.active {
          color: $nav_color;
        }
        span {
          display: block;
          float: left;
          text-align: center;
          width: 24px;
          height: 20px;
          line-height: 20px;
          background: #f56c6c;
          border-radius: 4px;
          font-size: 14px;
          color: #fff;
        }
        .message {
          width: 18px;
          height: 18px;
          float: left;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .design-contianer {
        display: inline-block;
        margin: 0 20px;
        padding: 0 18px;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        color: $nav_color;
        .design {
          font-size: 18px;
          margin-top: 1px;
          cursor: pointer;
          color: #666666;
          &.active {
            color: $nav_color;
          }
        }
      }

    }
    .el-carousel__item {
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .el-header {
    height: 65px !important;
    padding: 0;
  }
</style>
<style lang="scss">
  svg {
    fill: #269ef7;
  }

  .dropdown-login {
    padding: 0;
    .item {
      width: 80px;
      height: 80px;
      margin: 20px;
      background: #fafafc;
      text-align: center;
      span {
        display: block;
        font-size: 12px;
        color: #616161;
      }
      .icon {
        font-size: 20px;
        margin-top: 20px;
      }
    }
    .el-dropdown-menu__item {
      padding: 0;
      margin: 0;
      float: left;
    }
    .el-dropdown-menu__item:nth-of-type(3) {
      float: none;
      clear: both;
      height: 40px;
      line-height: 40px;
      color: #333;
      background: #f7f7fa;
      font-size: 12px;
      text-align: center;
      &:hover{
        color:#269ef7 !important;
      }
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
      background: none;
      span {
        color: #66b1ff;
      }
    }
  }

  .design-dropdown {
    width: 144px;
    font-size: 12px !important;
    color: #616161;
    padding: 0;
    margin: 0;
    text-align: center;
    .el-dropdown-menu__item {
      height: 41px;
      line-height: 41px !important;
      padding: 0 0 5px 0 !important;
      font-size: 12px !important;
      &:hover {
        background: #fafafc !important;
        color:#269ef7 !important;
      }
    }
  }

  .message-popper {
    padding: 0;
    .content {

      .title {
        padding-left: 30px;
        height: 54px;
        line-height: 54px;
        border-bottom: 1px solid #eaeaea;
      }
      ul {
        li {
          padding: 15px 30px;
          border-bottom: 1px solid #eaeaea;
          font-size: 12px;
          p {
            color: #616161;
            margin-bottom: 10px;
          }
          span {
            color: #959698;
          }
          &:hover {
            background: #fafafc;
            cursor: pointer;
          }
        }
      }
      .more {
        height: 40px;
        line-height: 40px;
        background: #f7f7fa;
        font-size: 12px;
        color: #333;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
