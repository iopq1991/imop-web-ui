<template>
  <div class="entry-container">
    <div class="title">
      <span @mouseenter="handleExpand">
        <svg-icon iconClass="expand" className="expand"></svg-icon>
      </span>
    </div>
    <div class="content" v-show="isShow" @mouseleave="handleLeave">
      <router-link :to="item.path" v-for="(item,index) in imgList" v-if="item.meta" :title="item.meta.title" :key="index">
        <img :src="item.meta.src" alt=""  :key="index"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vEntry",
    data() {
      return {
        isShow: false,
        imgList:[]
      }
    },
    methods: {
      handleExpand() {
        if(!this.$route.matched[0]) return
        const path = this.$route.matched[0].path;
        const list = this.$router.options.routes.filter(item => item.path === path);
        const menuList = [];
        list.forEach((item) => {
          if (item.children && item.children.length) {
            item.children.forEach((route) => {
              if (route.path) {
                const routeItem = {...route};
                routeItem.path = path + '/' + route.path;
                menuList.push(routeItem);
              }

            })
          }
        });
        this.imgList = menuList;
        this.isShow = true;
      },
      handleLeave() {
        this.isShow = false;
      }
    }
  }
</script>

<style  lang="scss">
  .entry-container {
    position: relative;
    .title {
      height: 20px;
      text-align: center;
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 65px;
        height:18px;
        cursor: pointer;
        background:url('~@/assets/images/entery.png') no-repeat;
      }
      .expand {
        position: absolute;
        top:0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height:50px;
      overflow:hidden;
      text-align:center;
      background: #f7f7fa;
      border-bottom: 1px solid #ddd;
      img{
        width:30px;
        height:30px;
        border-radius:4px;
        margin-top:10px;
        margin-right:10px;
        cursor:pointer;
      }
    }
  }
</style>
