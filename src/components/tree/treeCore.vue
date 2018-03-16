/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/7
** 修改人:
** 修改日期:
** 描 述:
**     props：
**         dataSource：[{
**                id:'',
**                name:'',
**                selected:false, //默认false没有选中，true选中打钩
**                childNodes:[],//默认为空数组
**           }]
**
**     methods：
**        loadSubNodes：加载子节点
**                参数：node resolve
**           itemClick：节点事件
**                参数：data,node,element
**         appendClick：新增节点
**                参数：node,store
**           editClick：编辑节点
**                参数：node,store
**      events:
**      current-change： 选中节点变化
**-----------------------------------------------------------------
******************************************************************/
<template>
  <el-tree
    ref="tree"
    :data="dataSource"
    :props="defaultProps"
    :load="loadSubNodes"
    :expand-on-click-node="isExpand"
    :render-content="renderContent"
    @node-click="itemClick"
    @current-change="currentChange"
    highlight-current
    lazy
    class="mbr-tree"
    node-key="id">
  </el-tree>
</template>
<script>
  import Vue from 'vue';
  import treeOperate from './treeOperate.vue'
  import {Tree} from 'element-ui';

  Vue.use(Tree)

  export default {
    name: 'core-tree',
    props: {
      isExpand: {  //是否在点击节点的时候展开或者收缩节点， 默认值为false
        type: Boolean,
        default: false
      },
      isOperate: { //树形节点是否需要重新染 默认false,渲染成带打钩;true,渲染成带有操作按钮
        type: Boolean,
        default: false
      },
      dataSource: {//数据源
        type: Array,
        default: []
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'childNodes',
          label: 'name',
          disabled: '!canClick',
          isLeaf: function (data, node) {
            return !data.hasChildren
          }
        },
        node: []
      };
    },
    mounted() {

    },
    methods: {
      loadSubNodes(node, resolve) {
        if (node.level === 0) {
          return resolve([]);
        }

        if (node.data.childNodes && node.data.childNodes.length > 0) {
          resolve(node.data.childNodes)
        }
        else {
          this.$emit("loadSubNodes", node, resolve)
        }
      },
      getNode(key) {
        return this.$refs['tree'].getNode(key);
      },
      getRootNode() {
        return this.$refs['tree'].root
      },
      currentChange(data, node) {
        this.$emit('currentChange', data, node)
      },
      renderContent(h, {node, data, store}) {
        var self = this
        return h(treeOperate, {
          props: {
            data: data,
            treeNode: node,
            treeStore: store,
            renderOperate: self.isOperate
          },
          on: {
            appendClick(node, store) {
              self.appendClick(node, store)
            },
            editClick(node, store) {
              self.editClick(node, store)
            },
            deleteClick(node, store) {
              self.deleteClick(node, store)
            },
            onlyClick(node) {
              self.onlyClick(node)
            },
            multipleClick(node) {
              self.multipleClick(node)
            },
            moveDownClick(node, store) {
              self.moveDownClick(node, store)
            },
            importClick(node, store) {
              self.importClick(node, store)
            },
            moveEmptyClick(node) {
              self.moveEmptyClick(node)
            }
          }
        })
      },
      itemClick(data, node) {
        this.$emit('itemClick', node, data)
      },
      appendClick(node, treeStore) {
        this.$emit('append', node, treeStore)
      },
      editClick(node, treeStore) {
        this.$emit('edit', node, treeStore)
      },
      deleteClick(node, treeStore) {
        this.$emit('delete', node, treeStore)
      },
      importClick(node, treeStore) {
        this.$emit('import', node, treeStore)
      },

      multipleClick(node, statisticsType) {
        this.$emit('multiple', node, statisticsType)
      },
      moveDownClick(node, treeStore) {
        this.$emit('moveDown', node, treeStore)
      },
      moveEmptyClick(node) {
        this.$emit('moveEmpty', node)
      },
      onlyClick(node, statisticsType) {
        this.$emit('only', node, statisticsType)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .mbr-tree {
    width: 100% !important;
  }
</style>
