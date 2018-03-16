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
  <div class="full-ctn">
    <div class="setting-container" v-if="!isVisible">
      <div class="vfull-head white-bg sub-title">群组</div>
      <div class="vfull-query">
        <div class="vfull-operate white-bg text-right">
          <el-select class="p-r-10 select-reset" v-model="groupValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="input-reset"
                    placeholder="请输入关键字搜索"
                    v-model="searchValue"
                    @input="handleSearchInput"
                    @keyup.enter.native="handleSearchKey"
                    suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>
      <div class="vfull-body">
        <div class="vfull-group full-ctn white-bg">
          <div class="hfull-tree">
            <group-left
              ref="groupLeft"
              :isOperate="isOperate"
              @loadInitTree="loadInitTree"
              @loadSubNodes="loadSubNodes"
              @itemClick="handleItemClick"
              @add="handleAdd"
              @append="handleAppend"
              @edit="handleEdit"
              @moveDown="handleMoveDown"
              @import="handleImport"
              @statistics="handleStatistics"
              @moveEmpty="handleMoveEmpty"
              @delete="handleDelete"
              @currentChange="handleCurrentChange">
            </group-left>
            <group-dialog ref="groupDialog"
                          :multiple="isMultiple"
                          @loadSubNodes="loadSubNodes"
                          @loadInitDialogTree="loadInitDialogTree"
                          @dialogSave="handleDialogSave">
            </group-dialog>
          </div>
          <div class="hfull-body">
            <div class="auto-bar member-wrap">
              <group-right ref="groupRight"
                           @sort="handleSort"
                           @batchAdd="handleBatchAdd"
                           @formAdd="handleFormAdd"
                           @formEdit="handleFormEdit"
                           @groupJoin="handleGroupJoin"
                           @moveDown="handleMoveDown"
                           @shiftOut="handleShiftOut"
                           @delete="handleDelete"
                           @export="handleExport">
              </group-right>
            </div>
          </div>
          <group-form ref="groupForm"
                      @selectGroup="handleFormSelectGroup"
                      @top="handleTop"
                      @groupJoin="handleGroupJoin"
                      @moveDown="handleMoveDown"
                      @deleteMember="handleDelete">
          </group-form>
          <group-export ref="groupExport"
                        @loadInitExportTree="loadInitExportTree"
                        @loadSubNodes="loadSubNodes">
          </group-export>
        </div>
        <operate-dialog ref="operateDialog"></operate-dialog>
        <sort-dialog ref="sortDialog"></sort-dialog>
        <group-confirm ref="groupConfirm"
                       @loadInitConfirmTree="loadInitConfirmTree"
                       @loadSubNodes="loadSubNodes"
                       :multiple="true">
        </group-confirm>
      </div>
    </div>
    <group-import ref="groupImport"
                  :importList="importList"
                  @importBack="handleImportBack" v-else>
    </group-import>
  </div>
</template>

<script>
  import msg from '@/assets/js/msg.js';
  import groupApi from '@/api/group.js'
  import {validateReal, validateChinese} from '@/assets/js/utils.js'

  import operateDialog from './children/groupAddDialog.vue'
  import groupLeft from './children/groupLeft.vue';
  import groupRight from './children/groupRight.vue';
  import sortDialog from './children/groupSortDialog.vue'
  import groupDialog from './children/groupDialog.vue'
  import groupImport from './children/groupImport.vue'
  import groupConfirm from './children/groupConfirm.vue'
  import groupForm from './children/groupForm.vue'
  import groupExport from './children/groupExport.vue'

  const options = [{name: '联系人', value: '0'}, {name: '群组', value: '1'}]

  export default {
    components: {
      groupLeft, groupRight, operateDialog, sortDialog, groupDialog, groupImport, groupConfirm, groupForm, groupExport
    },
    data() {
      return {
        msg: msg,
        options: options,
        groupID: "",
        groupValue: '',//群组选中下拉值
        searchValue: '',//关键字搜索
        isOperate: true,
        isMultiple: false,//是否多选
        rootNode: {},//根节点
        currectNode: {}, //当前选中的节点
        isVisible: false,
        importList: [],
        statisticsType: 1,//统计类型 1、仅针对当前群组 2、针对当前群组及子级
        invocationModel: "",//调用模式
        _formChildComponent: {}//联系人组件
      }
    },
    methods: {
      //关键字搜索
      handleSearchInput() {
        if (this.groupValue == "") {
          this.$x.toast(msg.DEFAULT_MSG.DEFAULTSELECTMSG)
          return
        }

        //输入2个汉字、7位数字以后
        if (validateChinese(this.searchValue)) {
          //联系人
          if (this.groupValue == 0) {
            groupApi.getSearchMemberService(this)
          }
          //群组---搜索到的群组以高亮显示，定位到第一个群组
          else if (this.groupValue == 1) {
            groupApi.getSearchGroupService(this, 'right')
          }
        }
      },
      //回件-关键字搜索
      handleSearchKey() {
        if (this.groupValue == "") {
          this.$x.toast(msg.DEFAULT_MSG.DEFAULTSELECTMSG)
          return
        }

        if (this.searchValue == "") {
          this.$x.toast(msg.DEFAULT_MSG.DEFAULTSEARCHKEYMSG)
          return
        }

        //输入2个汉字、7位数字以后
        if (validateChinese(this.searchValue)) {
          //联系人--群组定位到根节点
          if (this.groupValue == 0) {
            groupApi.getSearchMemberService(this)
          }
          //群组---搜索到的群组以高亮显示，定位到第一个群组
          else if (this.groupValue == 1) {
            groupApi.getSearchGroupService(this)
          }
        }
      },
      //群组管理-加载左侧树根节点数据
      loadInitTree() {
        groupApi.getRootGroupService(this, 'left')
      },
      //群组管理-加载右侧列表
      loadInitTable(nodeData) {
        this.$refs['groupRight'].groupEntity = nodeData
        this.$refs['groupRight'].isSort = false
        this.$refs['groupRight'].allChecked = false
        this.$refs['groupRight'].groupList = []
        this.$refs['groupRight'].loadData()
      },
      loadInitDialogTree() {
        groupApi.getRootGroupService(this, 'dialog')
      },
      loadInitConfirmTree() {
        groupApi.getRootGroupService(this, 'confirm')
      },
      loadInitExportTree() {
        groupApi.getRootGroupService(this, 'export')
      },
      loadSubNodes(node, resolve) {
        groupApi.getChildGroupService(this, node, resolve)
      },
      handleCurrentChange(node) {
        this.currectNode = node
      },
      handleItemClick(node) {
        this.currectNode = node
        this.loadInitTable(node.data)
      },
      handleAdd() {
        this.rootNode = this.$refs['groupLeft'].getNode(this.groupID)
        this.currectNode = this.rootNode
        this.handleAppend(this.rootNode, this.rootNode.store)
      },
      //排序
      handleSort() {
        this.$refs['sortDialog'].dialogVisible = true
      },
      //加入群组
      handleGroupJoin() {
        this.isMultiple = false
        this.invocationModel = 'join'
        this.$refs['groupDialog'].handleOpenDialog()
      },
      //添加下一级
      handleAppend(node, treeStore) {
        this.currectNode = node
        this.$refs['operateDialog'].title = msg.FORM_MSG.ADDGROUPNAMEMSG
        this.$refs['operateDialog'].operateType = 1
        this.$refs['operateDialog'].groupName = ""
        this.$refs['operateDialog'].treeNode = node
        this.$refs['operateDialog'].treeStore = treeStore
        this.$refs['operateDialog'].isVisible = true
      },
      //重命名
      handleEdit(node, treeStore) {
        this.currectNode = node
        this.$refs['operateDialog'].title = msg.FORM_MSG.EDITDEPARTEMT
        this.$refs['operateDialog'].operateType = 2
        this.$refs['operateDialog'].groupName = node.label
        this.$refs['operateDialog'].treeNode = node
        this.$refs['operateDialog'].treeStore = treeStore
        this.$refs['operateDialog'].isVisible = true
      },
      //移动
      handleMoveDown(node, treeStore) {
        this.currectNode = node
        this.isMultiple = false
        this.invocationModel = 'moveDown'
        this.$refs['groupDialog'].handleOpenDialog()
      },
      //批量导入
      handleImport(node, treeStore) {
        this.currectNode = node
        this.isVisible = true
        this.importList.push({
          id: node.key,
          name: node.label
        })
      },
      //批量添加
      handleBatchAdd() {
        this.isVisible = true
      },
      //统计群组、操作选择
      handleStatistics(statisticsType) {
        this.statisticsType = statisticsType
      },
      //清空
      handleMoveEmpty(node) {
        debugger
        this.currectNode = node
        groupApi.getClearGroupService(this)
      },
      //删除
      handleDelete(node, treeStore) {
        this.currectNode = node
        this.$refs['groupConfirm'].isChildGroup = node.data.hasChildren
        this.$refs['groupConfirm'].groupEntity = node.data
        this.$refs['groupConfirm'].groupNode = node
        this.$refs['groupConfirm'].isVisible = true
      },
      //删除联系人
      handleDeleteMember() {

      },
      //置顶
      handleTop(row) {
        groupApi.getTopService(this, row)
      },
      //移出
      handleShiftOut() {

      },
      //单条添加
      handleFormAdd() {
        this.$refs['groupForm'].title = msg.FORM_MSG.ADDMEMBERMSG
        this.$refs['groupForm'].popoverVisible = false
        this.$refs['groupForm'].dialogVisible = true
      },
      //单条编辑
      handleFormEdit(row) {
        this.$refs['groupForm'].personEntity = row
        this.$refs['groupForm'].title = msg.FORM_MSG.EDITMEMBERMSG
        this.$refs['groupForm'].popoverVisible = true
        this.$refs['groupForm'].dialogVisible = false
      },
      //导出通讯录
      handleExport() {
        this.$refs['groupExport'].handleOpenExportDialog()
      },
      //批量导入返回
      handleImportBack() {
        this.isVisible = false
        this.groupValue = ""
        this.searchValue = ""
      },
      //选择群组
      handleFormSelectGroup(groupList, childSub) {
        this.isMultiple = true
        this.invocationModel = "form"
        this._formChildComponent = childSub
        this.$refs['groupDialog'].selectedData.push(...groupList)
        this.$refs['groupDialog'].handleOpenDialog()
      },
      //选择群组保存数据
      handleDialogSave(result) {
        //调用模式
        //联系人表单
        if (this.invocationModel == "form") {
          //编辑
          if (this.$refs['groupForm'].popoverVisible) {
            this._formChildComponent.$refs['groupContactEdit'].contactData.orgIdList.push(...result)
          }

          //新增
          if (this.$refs['groupForm'].dialogVisible) {
            this._formChildComponent.$refs['groupContactAdd'].contactData.orgIdList.push(...result)
          }
        }
        //加入群组
        else if (this.invocationModel == "join") {

        }
        //移出
        else if (this.invocationModel == "moveDown") {
          groupApi.getGroupMoveDownService(this, result)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/defines.scss";

  $title-height: .73rem;
  $title-height-s: 1.47rem;
  .vfull-query {
    position: absolute;
    top: $title-height;
    height: $title-height;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
  }

  .setting-container {
    > .vfull-head {
    }

    > .vfull-query {
      > .vfull-operate {
        padding: .21rem;
      }
    }

    > .vfull-body {
      padding-top: $title-height-s;
      > .vfull-group {
        padding: 0rem .21rem .42rem .21rem;
      }
    }
  }

  .white-bg {
    background: #fff;
  }

  .sub-title {
    margin-bottom: 0.14rem;
    padding: 0.2rem;
    border: 1px solid $gray-border-color;
    font-size: .16rem;
  }

  .sub-operate {

  }

  .vfull-group {
    > .group-title {
      font-size: 18px;
      line-height: 50px;
      background: #fff;
      padding: 0 0 0 10px;
    }
    > .hfull-tree {
      position: absolute;
      width: 2.72rem;
      height: 100%;
      left: .21rem;
      top: 0;
      padding-bottom: .42rem;
      > .set-group-left {
        z-index: 1;
        border: 1px solid #ddd;
      }
    }
    > .hfull-body {
      padding-left: 2.91rem;
      padding-right: .21rem;
      padding-bottom: .42rem;
      > .member-wrap {
        position: relative;
        height: 100%;
        border: 1px solid #ddd;
        border-left: 0px solid;
        z-index: 1;
      }
    }
  }

  .hfull-tree .el-tree {
    width: 2.72rem !important;
  }

  .input-reset {
    width: 3rem !important;
  }

  .select-reset {
    width: 1rem;
  }
</style>
