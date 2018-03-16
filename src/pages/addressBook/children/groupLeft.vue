/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/7
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <div class="set-group-left">
    <header class="vfull-head">
      <div class="set-group-title">
        <span>通讯录</span>
        <a href="javascript:void(0)" class="pull-right set-group-icon" @click="handleAdd">
          <svg-icon iconClass="group" className="group"></svg-icon>
          新建群组
        </a>
      </div>
    </header>
    <div class="vfull-body">
      <div class="full">
        <core-tree ref="coreTree" class="full-core-tree"
                   :dataSource="dataSource"
                   :isOperate="isOperate"
                   :isExpand="isExpand"
                   @loadSubNodes="loadSubNodes"
                   @itemClick="itemClick"
                   @append="handleAppend"
                   @edit="handleEdit"
                   @moveDown="handleMoveDown"
                   @import="handleImport"
                   @moveEmpty="handleMoveEmpty"
                   @delete="handleDelete"
                   @currentChange="handleCurrentChange">
        </core-tree>
      </div>
    </div>
    <div class="vfull-foot bg-white clearfix">
      操作统计
      <span class="p-l-10 font-s-14 op-dropdown-span" v-if="statisticsType==1">{{msg.OPERATE_MSG.ONLYOPERATEMSG}}</span>
      <span class="p-l-10 font-s-14 op-dropdown-span" v-else>{{msg.OPERATE_MSG.MULTIPLENODEMSG}}</span>
      <el-dropdown class="pull-right" @command="handleStatistics">
        <span class="el-dropdown-link op-dropdown-link">
          切换<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="op-dropdown-menu">
          <el-dropdown-item command="1"><span
            :class="statisticsType==1?'op-span-check':'op-span-check-none'"><svg-icon
            iconClass="check" className="check"></svg-icon></span>{{msg.OPERATE_MSG.ONLYOPERATEMSG}}
          </el-dropdown-item>
          <el-dropdown-item command="2"><span :class="statisticsType==2?'op-span-check':'op-span-check-none'">
               <svg-icon iconClass="check" className="check"></svg-icon></span>{{msg.OPERATE_MSG.MULTIPLENODEMSG}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import msg from '@/assets/js/msg.js';
  import defaultUrls from '@/assets/js/defaultUrls.js'

  import Vue from 'vue'
  import coreTree from '@/components/tree/treeCore.vue'

  export default {
    components: {
      coreTree
    },
    props: {
      groupID: {
        type: String,
        default: ""
      },
      isOperate: { //树形节点是否需要重新染 默认false,渲染成带打钩;true,渲染成带有操作按钮
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isExpand: false,//只有点箭头图标的时候才会展开或者收缩节点
        dataSource: [],
        statisticsType: 1,//数据统计类型1、默认仅当前群组  2、当前群组及子级
        msg: msg
      }
    },
    mounted() {
      this.loadInitTree()
    },
    methods: {
      loadInitTree() {
        this.$emit('loadInitTree')
      },
      loadSubNodes(node, resolve) {
        this.$emit('loadSubNodes', node, resolve)
      },
      getNode(key) {
        return this.$refs['coreTree'].getNode(key)
      },
      getRootNode() {
        return this.$refs['coreTree'].getRootNode()
      },
      itemClick(node) {
        this.$refs['coreTree'].node = []
        var currentNode = this.getRootNode(node.key)
        this.$emit('itemClick', node, currentNode)
      },
      handleCurrentChange(data) {
        this.$emit('currentChange', data)
      },
      //新建群组
      handleAdd() {
        this.$emit('add', this)
      },
      //添加下一级
      handleAppend(node, treeStore) {
        this.$emit('append', node, treeStore)
      },
      //重命名
      handleEdit(node, treeStore) {
        this.$emit('edit', node, treeStore)
      },
      //移动
      handleMoveDown(node, treeStore) {
        this.$emit('moveDown', node, treeStore)
      },
      //批量添加
      handleImport(node, treeStore) {
        this.$emit('import', node, treeStore)
      },
      //清空
      handleMoveEmpty(node) {
        this.$emit('moveEmpty', node)
      },
      //删除
      handleDelete(node, treeStore) {
        this.$emit('delete', node, treeStore)
      },
      //切换事件
      handleStatistics(command) {
        if (command == 1) {
          this.statisticsType = 1
        }
        else {
          this.statisticsType = 2
        }

        this.$emit('statistics', this.statisticsType)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/css/defines.scss";

  .set-group-left {
    position: relative;
    width: 100%;
    height: 100%;
    > .vfull-head {
      > .set-group-title {
        padding: .115rem;
        border-bottom: 1px solid #ddd;
        font-size: $font-size !important;
        background: $tag-bg-color;
        span {
          font-weight: bolder;
          font-size: $font-size;
        }
        > .set-group-icon {
          font-size: $font-size;
          color: $color-primary;
        }
      }
    }

    > .vfull-body {
      padding-top: .43rem;
      > .full {
        overflow-x: hidden;
        overflow-y: auto;
      }
    }

    > .vfull-foot {
      height: .43rem;
      border-top: 1px solid #ddd;
      padding: 11.5px 10px;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .op-dropdown-link {
    color: $color-primary;
  }

  .op-dropdown-span {
    font-weight: normal;
    color: $color-primary;
  }

  .op-dropdown-menu {
    > .el-dropdown-menu__item {
      padding: 5px 15px;
    }
    > .el-dropdown-menu__item:first-child {
      padding-top: 2px;
    }
    > .el-dropdown-menu__item:last-child {
      padding-bottom: 2px;
    }
  }

  .op-span-check {
    color: $color-primary;
    margin-right: .1rem;
    > .op-span-label {
      width: auto;
    }
  }

  .op-span-check-none {
    color: #fff;
    margin-right: .1rem
  }

  .full-core-tree {
    margin: .25rem 0;
  }

  .fa-plus {
    font-size: .2rem;
    display: inline-block;
    width: .3rem;
    height: .3rem;
  }

  .group {
    width: 18px;
    height: 18px;
    cursor: pointer;
    font-size: $font-size;
  }
</style>

