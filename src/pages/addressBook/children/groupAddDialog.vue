/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      ly
** 创建日期:    2018/2/23
** 修改人:
** 修改日期:
** 描 述:
**     data：
**            groupName:群组名称
**		         treeNode:节点node
**		        treeStore:节点Store
**		      operateType:操作类型,1、新增  2、编辑
**     methods：
**         handleCancel:取消事件
**           handleSave:保存事件
**-----------------------------------------------------------------
******************************************************************/

<template>
  <el-dialog :title="title" :visible.sync="isVisible" width="25%">
    <el-form>
      <el-form-item :label="groupLabel" :label-width="groupLabelWidth">
        <el-input class="input-reset" v-model="groupName" auto-complete="off"></el-input>
        <el-alert :title="errorMsg" v-if="errorMsg!=''" type="default" @close="handleErrorMsgClose"></el-alert>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.stop="handleCancel">取 消</el-button>
      <el-button type="primary" @click.stop="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import msg from '@/assets/js/msg.js'
  import defaultUrls from '@/assets/js/defaultUrls.js'
  import {validateReal} from '@/assets/js/utils.js'

  export default {
    components: {},
    name: 'operate-dialog',
    data() {
      return {
        isVisible: false,
        title: "",
        groupLabel: msg.FORM_MSG.GROUPNAMEMSG,
        groupLabelWidth: '100px',
        groupName: '',
        treeNode: null,
        treeStore: null,
        operateType: 0,
        errorMsg: ""
      }
    },
    methods: {
      handleCancel() {
        this.handleResetForm()
      },
      handleSave() {
        var self = this
        if (self.groupName == "") {
          self.errorMsg = msg.VALIDATE.NO_GROUPNAME
          return
        }
        else {
          //是否包含特殊字符#$%^&<>。
          var spReg = /[#$%^&<>。]/
          if (spReg.test(self.groupName)) {
            self.errorMsg = msg.VALIDATE.NO_GROUPNAME_SP
            return
          }

          //验证是否包含中文字符
          if (validateReal(self.groupName) >= 40) {
            self.errorMsg = msg.VALIDATE.NO_GROUPNAME_MORE
            return
          }
        }

        //服务参数
        var params = {}
        var serviceUrl = ""
        if (self.operateType == 1) {
          params = {
            newName: self.groupName,
            groupId: self.treeNode.key
          }

          serviceUrl = defaultUrls.group.addGroupUrl;
          //请求服务
          self.$x.post(serviceUrl, params).then(res => {
            if (res.success) {
              self.$x.toast(msg.DEFAULT_MSG.ADDMSG)
              var result = {
                id: res.data,
                name: self.groupName,
                hasChildren: false,
                highLight: false,
                selected: false,
                childCount: 0
              }

              self.treeNode.isLeaf = false
              self.treeNode.isLeafByUser = false
              self.treeNode.data.hasChildren = true
              self.treeNode.data.childCount++
              self.treeNode.doCreateChildren([result])
              //展开节点
              self.treeNode.expand();
              self.handleResetForm()
            }
            else {
              self.$x.toast(res.msg)
            }
          })
        }
        else if (self.operateType == 2) {
          params = {
            newName: self.groupName,
            id: self.treeNode.key
          }

          serviceUrl = defaultUrls.group.editGroupUrl;

          //请求服务
          self.$x.post(serviceUrl, params).then(res => {
            if (res.success) {
              self.$x.toast(msg.DEFAULT_MSG.ADDMSG);
              self.treeNode.data.name = self.groupName
              self.handleResetForm()
            }
            else {
              self.$x.toast(res.msg)
            }
          })
        }
      },
      handleErrorMsgClose() {
        this.errorMsg = ""
      },
      handleResetForm() {
        this.errorMsg = ""
        this.groupName = ""
        this.operateType = 0
        this.isVisible = false;
      }
    }
  }
</script>
<style scoped lang="scss">
  .input-reset {
    width: 280px !important;
    margin-left: 20px;
  }

  .el-alert--default {
    width: 280px;
    margin: 12px 0 0 20px;
    background-color: #fff7f0;
    color: #f67a17;
    font-size: 12px;
    padding: 1px 16px;
  }
</style>
