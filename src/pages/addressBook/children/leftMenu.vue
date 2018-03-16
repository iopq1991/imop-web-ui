<template>
  <div class="address-leftMenu">
    <!--<ul>
        <li class="text-center hover">通讯录</li>
        <li class="text-center">属性管理</li>
    </ul>-->
    <el-menu  class="el-menu-demo" :router="true" :default-active="onRoutes">
      <el-submenu index="1">
        <template slot="title">
          <svg-icon iconClass="addressBook" className="svg-icon-addressBook font-s-14 m-r-5"></svg-icon>
          <span class="font-s-14 bold">通讯录</span>
        </template>
        <el-menu-item index="/addressBook/group">群组</el-menu-item>
        <!-- <el-menu-item index="1-1">联系人标签</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="/addressBook/property">
          <svg-icon iconClass="propertyManage" className="svg-icon-propertyManage font-s-14 m-r-5"></svg-icon>
          <span class="font-s-14 bold">属性管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="3">
          <svg-icon iconClass="labelMnanage" className="svg-icon-labelMnanage font-s-14 m-r-5"></svg-icon>
          <span class="font-s-14 bold">标签管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <svg-icon iconClass="addressBookService" className="svg-icon-addressBookService font-s-14 m-r-5"></svg-icon>
        <span class="font-s-14 bold">通讯服务</span>
      </el-menu-item> -->
      <el-submenu index="5" class="noBorder">
        <template slot="title">
            <svg-icon iconClass="dataService" className="svg-icon-dataService font-s-14 m-r-5"></svg-icon>
            <span class="font-s-14 bold">数据中心</span>
        </template>
        <el-menu-item index="/addressBook/importExportList">结果导入导出列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Input, Button, Tabs, TabPane, Dialog, submenu, menuItem} from 'element-ui'

  Vue.use(Button).use(Tabs).use(TabPane).use(Input).use(Dialog)

  export default {
    props: {},
    data() {
      return {
      }
    },
    mounted() {

    },
    computed:{
      onRoutes(){
          let currentRoute = this.$route.path;
          return currentRoute;
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/defines.scss";

  .address-leftMenu {
    width: 180px;
    li {
      line-height: 50px;
    }
    li.el-menu-item {
      &:hover {
        color: $color-primary;
        > svg{
          fill: $color-primary;
        }
      }
    }
    .el-submenu .el-menu-item {
      width: 180px;
      min-width: 180px;
    }
    .el-menu-item.is-active {
        color: $color-primary;
        background-color: #fff !important;
        > svg{
          fill: $color-primary;
        }
    }
    .el-menu-item:hover{
        background-color: #fff;
    }
    .el-menu-demo > li{
        border-bottom: 1px solid #dddddd;
    }
    .noBorder{
        border: none !important;
    }

  }
</style>
<style lang="scss">
    @import "../../../assets/css/defines.scss";
    .el-menu-demo li.el-submenu {
        >.el-submenu__title:hover, .el-submenu__title:focus{
            background-color: #fff !important;
            color: $color-primary !important;
        }

    }
    .el-menu-demo{
        border-right: none;
    }
</style>
