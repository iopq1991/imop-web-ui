<template>
  <div class="app-breadcrumb">
    <el-button size="mini" @click="$router.back()"><i class="el-icon-arrow-left"></i>返回</el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title && index==levelList.length-1">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1"
              class="no-redirect">{{item.meta.title}}</span>
          <!--<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>-->
          <span v-else>{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        this.levelList = matched
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb{
    position:fixed;
    left:180px;
    right:0;
    top:66px;
    height:68px;
    line-height:68px;
    font-size:0;
    background:#fff;
    border-bottom:1px solid #ddd;
    transition:left 0.45s;
    button{
      margin-left:40px;
      margin-right:20px;
      width:70px;
      color:#333;
      font-size:12px;
      vertical-align: middle;
    }
  }
</style>
<style lang="scss">
  .app-breadcrumb{
    .el-breadcrumb{
      display:inline-block;
      vertical-align: middle;
    }
    .el-breadcrumb__item{
      font-size:16px;
      color:#333;
    }
  }
</style>
