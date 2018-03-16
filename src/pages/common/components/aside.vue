<template>
  <div class="aside-container" ref="aside">
    <div>
      <el-menu router :default-active="$route.path" :collapse="isExpand" class="el-menu-vertical-demo">
        <el-menu-item v-for="(item,index) in menuList" :index="item.path" :key="index">
          <template v-if="item.meta&&item.meta.title">
            <i class="el-icon-menu"></i>
            <span slot="title">
            {{item.meta && item.meta.title}}
          </span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <breadcrumb :class="{transition:isExpand}"/>
    <span class="expand">
      <span @click="handleExpand">
         <svg-icon iconClass="fold" class="fold" :class="{isExpand:isExpand}"></svg-icon>
      </span>
    </span>
  </div>

</template>

<script>
  import Breadcrumb from './Breadcrumb';

  export default {
    name: "vAside",
    data() {
      return {
        menuList: [],
        isExpand: false
      }
    },
    components: {
      Breadcrumb
    },
    created() {
      const path = this.$route.matched[0].path;
      const list = this.$router.options.routes.filter(item => item.path === path);
      let menuList = [];
      const filterList = (child, path) => {
        for (let i = 0, len = child.length; i < len; i++) {
          let route = child[i];
          if (route.children && route.children.length) {
            menuList = [];
            let str = path + '/' + route.path;
            filterList(route.children, str);
            if(this.$route.matched[1].name===route.name){
              break;
            }
          } else {
            if (route.path) {
              const routeItem = {...route};
              routeItem.path = path + '/' + route.path;
              menuList.push(routeItem);
            }
          }
        }
      };
      list.forEach((item) => {
        if (item.children && item.children.length) {
          filterList(item.children, item.path);
        }
      });
      this.menuList = menuList;
    },
    methods: {
      handleExpand() {
        this.isExpand = !this.isExpand;
        const mainNode = this.$refs.aside.parentNode.getElementsByClassName('main')[0];
        this.isExpand ? mainNode.className = 'main collapse' : mainNode.className = 'main';
      }
    }
  }
</script>

<style scoped lang="scss">
  .aside-container {
    position: fixed;
    top: 66px;
    bottom: 0;
    z-index: 100;
    background: #f7f7fb;
    border-right: 1px solid #ddd;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
    }
    .el-menu {
      border-right: none;
      background: none;
      .el-menu-item {
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        font-weight: bold;
        color: #525b64;
        &.is-active {
          color: #269ef7;
        }
      }
    }
    .el-menu--collapse {
      width: 50px;
    }
    .expand {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 20px;
      border-top: 1px solid #ddd;
      text-align: right;
      .fold {
        cursor: pointer;
        transform: rotate(180deg);
        &.isExpand {
          transform: rotate(0deg);
        }
      }
    }
    .transition {
      left: 50px;
    }
  }
</style>
