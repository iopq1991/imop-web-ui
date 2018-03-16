/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/3/7
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <el-dialog :title="msg.OPERATE_MSG.EXPORTGROUPMSG" :visible.sync="isVisible" width="30%">
    <el-form>
      <el-form-item>
        <div class="p-l-30 p-r-30">
          <div>导出位置:</div>
          <div class="export-tree">
            <core-tree ref="coreTree"
                       :dataSource="dataSource"
                       :isOperate="false"
                       @loadSubNodes="loadSubNodes"
                       @itemClick="handleItemClick">
            </core-tree>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="p-l-30 p-r-30">
          <span>导出方式:</span>
          <el-radio-group v-model="radioValue" class="p-l-20">
            <el-radio :label="item.value" v-for="item in radioOptions" :key="item.value" class="form-radio">
              {{item.name}}
            </el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.stop="handleCancel">取 消</el-button>
      <el-button type="primary" @click.stop="handleSave">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import msg from '@/assets/js/msg.js'
  import defaultUrls from '@/assets/js/defaultUrls.js'

  import coreTree from '@/components/tree/treeCore.vue'

  const radioOptions = [
    {
      name: '仅当前群组', value: 0,
    },
    {name: '当前群组及其子级群组', value: 1}
  ]

  export default {
    components: {
      coreTree
    },
    data() {
      return {
        isVisible: false,
        msg: msg,
        dataSource: [],
        radioValue: "",
        radioOptions: radioOptions,
        selectedData: []
      }
    },
    methods: {
      handleOpenExportDialog() {
        this.isVisible = true
        this.$nextTick(function () {
          this.loadInitTree()
        })
      },
      loadInitTree() {
        this.$nextTick(function () {
          this.$emit('loadInitExportTree')
        })
      },
      loadSubNodes(node, resolve) {
        this.$emit('loadSubNodes', node, resolve)
      },
      handleItemClick(node, data) {
        this.validHasGroupNodeData(node.data)
        node.data.selected = !node.data.selected
        this.$emit('itemClick', node)
      },
      validHasGroupNodeData(data) {
        var self = this
        var flag = true
        for (var i = 0; i < self.selectedData.length; i++) {
          var item = self.selectedData[i]
          //是否多选

          if (item.id != data.id && !self.multiple) {
            self.selectedData[i].selected = false
          }

          if (item.id == data.id) {
            flag = false
          }
        }

        if (flag) {
          self.selectedData.push(data)
        }
      },
      handleCancel() {
        this.isVisible = false
      },
      handleSave() {
        this.isVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/css/defines";

  .export-tree {
    border: 1px solid $light-border-color;
    > .mbr-tree {
      padding: .15rem .3rem .2rem .3rem;
      height: 2rem !important;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
