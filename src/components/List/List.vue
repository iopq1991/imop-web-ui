<template>
  <div class="table-list clearfix">
    <el-table  ref="table" @select="select" stripe @select-all="selectAll" header-row-class-name="table-header" size="mini" :data="data" style="width: 100%" cell-class-name="table-cell">
      <el-table-column v-if="selection" type="selection" width="30"/>
      <slot></slot>
    </el-table>
    <div class="table-page clearfix">
      <div class="multi-select fl p-l-5">
        <el-checkbox class="m-r-10" v-if="selection" @change="checkedAll" v-model="checked">全选</el-checkbox>
        <slot name="multi"></slot>
      </div>
      <el-pagination class="pagination fr" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50,100,200]" :page-size="pageSize" @size-change="changePageLimit" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        currentPage: 1,
        multipleSelection: [],
        checked: false,
        pageSize: this.pageLimit
      }
    },
    props: {
      selection: {
        type: Boolean,
        default: false
      },
      selectList: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        required: true
      },
      pageLimit: {
        type: Number,
        default: 10
      },
      dataCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('query', {curPage: val, pageLimit: this.pageSize})
      },
      changePageLimit(size){
        this.pageSize = size
        this.$emit('query', {curPage: 1, pageLimit: this.pageSize})
      },
      selectAll(allData) {
        this.multipleSelection = allData
        this.checked = !!allData.length
        this.$emit('update:selectList', allData)
      },
      select(data) {
        this.multipleSelection = data
        this.checked = data.length === this.pageLimit
        this.$emit('update:selectList', data)
      },
      checkedAll(checked) {
        if(checked){
          this.data.forEach(item=> this.$refs.table.toggleRowSelection(item))
          this.$emit('update:selectList', this.data)
        }else {
          this.$refs.table.clearSelection();
          this.$emit('update:selectList', [])
        }
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  .table-header {
    color: #939395;
  }
  
  body .el-pagination {
    font-weight: normal;
    li {
      font-size: 12px;
      &.active {
        background-color: #f4f4f5 !important;
        color: #0097FF !important;
      }
    }
  }
  
  .table-list {
    padding: 0px 10px 10px;
    .el-checkbox {
      margin-left: 5px;
    }
  }
  
  .table-page {
    padding: 15px 20px 15px 0;
    overflow: auto;
  }
</style>
