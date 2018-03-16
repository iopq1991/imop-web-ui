/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/3/1
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <batch-import ref="batchImport" :importList="importList" @clickBackBtn="handleBack"></batch-import>
</template>
<script>
  import batchImport from './batchImport.vue'

  export default {
    components: {
      batchImport
    },
    data() {
      return {}
    },
    props: {
      importList: {
        type: Array,
        default: []
      }
    },
    methods: {
      handleBack() {
        this.$emit('importBack')
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
