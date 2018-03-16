/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/24
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <el-dialog
    ref="dialog"
    :title="title"
    :visible.sync="isVisible"
    @close="handleCloseDialog" @open="handleOpenDialog" center width="35%">
    <div class="set-group">
      <header class="group-head">
        <div class="el-select group-select">
          <div class="el-select__tags">
            <transition-group>
              <el-tag size="small" type="current" v-for="(item,index) in selectedNodes" v-if="item.data.selected"
                      :key="item.key" closable
                      @close="handleTagClose(item,index)">
                {{item.label}}
              </el-tag>
            </transition-group>
          </div>
          <el-input placeholder="请选择群组" readonly></el-input>
        </div>
      </header>
      <div class="group-body">
        <div class="full content">
          <div class="set-group-title clearfix">
            <span>群组</span>
            <el-button v-show="isAddGroup" @click="handleAddGroup">{{addMsg}}</el-button>
            <el-input class="input-reset pull-right" placeholder="请输入关键字搜索" v-model="searchKey"
                      @input="handleSearchInput"
                      @keyup.enter.native="handleSearchInput"
                      suffix-icon="el-icon-search"></el-input>
          </div>

          <core-tree ref="coreTree" class="content-tree"
                     :dataSource="dataSource"
                     :isOperate="isOperate"
                     :isExpand="isExpand"
                     @loadSubNodes="loadSubNodes"
                     @itemClick="handleItemClick">
          </core-tree>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="bt-cancel" @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import msg from '@/assets/js/msg.js';
  import groupApi from '@/api/group.js'
  import coreTree from '@/components/tree/treeCore.vue'

  export default {
    components: {coreTree},
    data() {
      return {
        title: msg.OPERATE_MSG.SELECTGROUPMSG,
        addMsg: msg.OPERATE_MSG.ADDGROUPMSG,
        isVisible: false,
        isExpand: false,//只有点箭头图标的时候才会展开或者收缩节点
        isClose: 0,//1:关闭  2：保存 3：取消
        selectedNodes: [],//选择的节点集
        dataSource: [],
        searchKey: '',//搜索关键字
      }
    },
    props: {
      isAddGroup: { //新增群组
        type: Boolean,
        default: false
      },
      isOperate: {
        type: Boolean,
        default: false
      },
      multiple: { //是否多选
        type: Boolean,
        default: false
      }
    },
    methods: {
      //打开弹出框
      handleOpenDialog() {
        this.isVisible = true
        this.loadInitTree()
      },
      //关闭弹出框
      handleCloseDialog() {
        this.selectedData = []
        this.dataSource = []
        this.searchKey = ''
        this.isVisible = false
        this.$emit('closeDialog')
      },
      //初始化加载树
      loadInitTree() {
        this.$nextTick(function () {
          this.$emit('loadInitDialogTree')
        })
      },
      //加载子节点
      loadSubNodes(node, resolve) {
        this.$emit('loadSubNodes', node, resolve)
      },
      //关键字搜索
      handleSearchInput() {
        if (this.searchKey == '') {
          this.loadInitTree()
        }
        else {
          groupApi.getSearchGroupService(this, 'dialog')
        }
      },
      //子节点点击
      handleItemClick(node) {
        this.isHasSelectedItem(node)
        node.data.selected = !node.data.selected
        this.removeNoSelectedItem()
        this.$emit('itemClick', node)
      },
      //取消事件
      handleCancel() {
        this.isVisible = false
        this.$emit('dialogCancel')
      },
      //保存事件
      handleSave() {
        if (this.selectedNodes.length) {
          this.isVisible = false
          this.$emit('dialogSave', this.selectedNodes)
        }
        else {
          this.$x.toast(msg.VALIDATE.SELECTGROUPMSG)
        }
      },
      //选择项移除
      handleTagClose(item, index) {
        this.selectedData.splice(index, 1)
      },
      //新增群组
      handleAddGroup() {
        this.$emit('addGroup')
      },
      //是否存在选中数据
      isHasSelectedItem(node) {
        var self = this
        var flag = true
        for (var i = 0; i < self.selectedNodes.length; i++) {
          var item = self.selectedNodes[i]
          //单选
          if (item.key != node.key && !self.multiple) {
            self.selectedNodes[i].data.selected = false
            var otherNode = self.$refs['coreTree'].getNode(item.key)
            if (otherNode) {
              otherNode.data.selected = false
            }
          }

          //替换选中数据项
          if (item.id == node.key) {
            flag = false
            self.selectedNodes.splice(i, 1, node)
          }
        }

        if (flag) {
          self.selectedNodes.push(node)
        }
      },
      //移除未选中的项
      removeNoSelectedItem() {
        var result = []
        this.selectedNodes.forEach(row => {
          if (row.data.selected) {
            result.push(row)
          }
        })

        this.selectedNodes = []
        this.selectedNodes.push(...result)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/defines";

  .el-tag--current {
    background-color: $tag-bg;
    border-color: $color-primary;
    color: $color-primary;
  }

  .set-group {
    height: 4rem;
    font-size: $font-size !important;
    > .group-head {
      width: 100%;
      position: relative;
      > .group-select {
        width: 100%;
      }
    }
    > .group-body {
      width: 100%;
      height: 3.68rem;
      position: relative;
      > .content {
        margin: 10px 0 0 0;
        border: 1px solid #ddd;
        > .content-tree {
          padding: .15rem .3rem .2rem .3rem;
          height: 3.1rem !important;
          overflow-y: auto;
          overflow-x: hidden;
        }
      }
    }
  }

  .set-group-title {
    padding: .115rem;
    border-bottom: 1px solid #ddd;
    background: $tag-bg-color;
    span {
      font-weight: bolder;
    }
    > .set-group-icon {
      color: $color-primary;;
    }
    > .input-reset {
      width: 3rem !important;
    }
  }

  .setting-app-tree-container {
    padding: 0 20px;
    .setting-app-tree-left {
      width: 100%;
      padding-top: 10px;
      text-align: left;
      overflow: hidden;
      .setting-app-tree-content {
        overflow: hidden;
        overflow-x: scroll;
      }
    }
  }

  .setting-app-tree-ul {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
  }

  .setting-w50 {
    width: 3rem;
    overflow: hidden;
  }

  .setting-select-tag {
    position: relative;
    display: inline-block;
    background: $tag-bg-color;
    height: 0.30rem;
    line-height: 0.3rem;
    text-align: center;
    padding: 0px 0.16rem;
    border-radius: 3px;
    color: $lmenu-color;
    font-size: 14px;
    margin: 0 0.2rem 0.2rem 0;
    border: 1px solid $color-delete;

    .fa-close {
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
    }
  }

  .setting-close {
    position: absolute;
    border-radius: .5rem;
    border: 1px solid $color-delete;
    background: $color-delete;
    color: #fff;
    right: -8px;
    top: -8px;
    font-size: 14px;
    cursor: pointer;
  }
</style>

<style lang="scss">
  @import "../../../assets/css/defines";

  .el-tag--current {
    > .el-icon-close {
      background-color: inherit !important;
      color: $color-primary !important;
    }

    > .el-icon-close:hover {
      background-color: inherit !important;
    }

  }

</style>
