<template>
  <ul class="manage-container clearfix">
    <router-link v-for="(item,index) in list" :key="index" tag="li" :to="item.path" v-if="item.meta && item.meta.title">
      <img :src="item.meta && item.meta.src" alt=""/>
      <span>{{item.meta.title}}</span>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "manage",
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .manage-container {
    text-align: center;
    li {
      width: 280px;
      height: 100px;
      line-height: 100px;
      border: 1px solid #ccc;
      border-radius: 4px;
      position: relative;
      margin: 30px 100px 0 0;
      float: left;
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
        margin: 20px;
        position: absolute;
        left: 0;
        top: 0;
      }
      &:nth-of-type(3n+1) {
        margin-left: 40px;
      }
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }

  }
</style>
