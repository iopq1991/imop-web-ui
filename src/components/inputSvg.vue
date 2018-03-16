/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/28
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <div>
    <div class="clearfix m-b-10" v-for="(item,index) in propertyOptions" :key="index">
      <el-input type="text" v-model="item.name" class="pull-left input-reset-180 p-r-10"></el-input>
      <el-button @click.stop="handleAdd" size="small" class="input-reset-b">
        <i class="el-icon-plus"></i>
      </el-button>
      <el-button @click.stop="handleMinus(index)" size="small" class="input-reset-b">
        <i class="el-icon-minus"></i>
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      propertyOptions: {
        type: Array,
        default: () => {
          return [this.itemOption]
        }
      },
      itemOption: {
        type: Object,
        default: () => {
          return {name: ''}
        }
      }
    },
    methods: {
      handleAdd() {
        this.$emit('add')
      },
      handleMinus(index) {
        this.$emit('minus', index)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/css/defines.scss";

  .input-reset-b {
    background-color: $tag-bg;
    border-color: $color-primary;
    color: $color-primary;
  }
</style>
