<template>
  <div class="app">
    <div v-if="$route.path!='/'&&$route.path!='/login'">
      <div class="header">
        <v-header/>
      </div>
      <div class="enter">
        <v-enter/>
      </div>
    </div>
    <header v-else class="header">
      <div class="logo">
        <img :src="logo"/>
        <h3>综合管理运营平台</h3>
      </div>
    </header>
    <router-view></router-view>
  </div>

</template>

<script>
  import vHeader from '@/components/layout/header';
  import vEnter from '@/components/layout/entry.vue';
  import logo from '@/assets/images/logo.png';

  export default {
    name: 'App',
    data() {
      return {
        logo
      }
    },
    components: {
      vHeader, vEnter
    },
    watch:{
      '$route' (to) {
        if(to.fullPath.indexOf('/addressBook')>-1){
          document.body.className="full-ctn";
        }else{
          document.body.className="";
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  $homeColor: #e6e6e8;
  .app {
    background-color: $homeColor;
    height: 100%;
    padding-top: 85px;
    padding-bottom: 85px;
    .header {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid #ddd;
      background:#fff;
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
    }
    .enter {
      position: fixed;
      top: 65px;
      width: 100%;
      z-index: 102;
    }
  }
</style>
