<template>
  <div class="search">
    <el-row>
      <el-col :span="22">
        <el-form ref="form" label-width="27%" size="small">
          <div class="search-options">
            <el-row>
              <el-col :span="6">
                <slot name="rol_1"></slot>
              </el-col>
              <el-col :span="6">
                <slot name="rol_2"></slot>
              </el-col>
              <el-col :span="6">
                <slot name="rol_3"></slot>
              </el-col>
              <el-col :span="6">
                <slot name="rol_4"></slot>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-col>
      <el-col :sm="2" v-if="!hideSearch">
        <div class="search-query m-l-5">
          <el-button class="w-80" type="primary" size="small" @click="query">搜索</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {}
    },
    props:{
      hideSearch:{
        default:false
      }
    },
    methods: {
      query() {
        this.$emit('query')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'src/assets/css/acceptance/variables.scss';
  
  .search {
    position: relative;
  }
  
  .search-options {
    padding: 10px 0;
  }
  
  .search-query {
    margin-top: 40px;
    padding: 10px 0;
    margin-left: 4%;
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .empty-item {
    height: 33px;
  }
  .date {
    width: 250px;
    .el-date-picker__header {
      margin: 5px 10px;
    }
    .el-picker-panel__content {
      width: 240px;
      margin: 5px;
    }
  }
  .search {
    .el-form-item__label{
      padding-right: 2%;
    }
    .el-checkbox-group .el-checkbox,body .el-checkbox + .el-checkbox {
      margin-left: 0;
      margin-right: 4%;
    }
    .el-checkbox:last-of-type {
      margin-right: 0;
    }
    .el-checkbox__label {
      padding-left: 5px;
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
    .el-checkbox__inner {
      width: 12px;
      height: 12px;
    }
  }
</style>
