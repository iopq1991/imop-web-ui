<template>
  <div class="full-ctn addressBook">
    <header class="vfull-head">
    </header>
    <section class="vfull-body">
      <div class="full">
        <div class="full-ctn v-top cnt-body">
          <div class="hfull-left l-menu">
            <LeftMenu></LeftMenu>
          </div>
          <div class="hfull-body full app-body">
            <div class="full">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import LeftMenu from './children/leftMenu.vue';
  import './module.js';
  export default {
    components: {
      LeftMenu
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/defines.scss";
  .l-menu {
    width: 0;
    overflow: visible;
  }

  .cnt-body {
    //background: $body-bg-color;

    > .lay-cell {
      vertical-align: top;
    }
    > .l-menu {
      margin: .2rem 0 0 0;
      width: 180px;
      background-color: $addressBook-left-menu;
    }

    > .app-body {
      padding-left: 195px;
      margin: .2rem 0 0 0;
      > div {
        overflow-y: auto;
        padding: 0;
      }
    }
    //左菜单不显示的时候，隐藏左侧
    > .l-menu:empty {
      display: none;
      & + .app-body {
        padding-left: 0;
      }
    }
  }

  .vfull-body {
    //padding-top: 0.9rem;
  }
  .addressBook{
     width: 1200px;
     margin: 0 auto;
  }
</style>
