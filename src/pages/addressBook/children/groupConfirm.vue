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
  <el-dialog class="wrong-container" :title="msg.DEFAULT_MSG.DELETEGROUPMSG" :visible.sync="isVisible" width="30%">
    <el-form>
      <el-form-item class="wrong-form-item" prop="name" :label-width="'40px'">
        <div class="clearfix">
          <span class="pull-left"><svg-icon iconClass="wrong" className="wrong"></svg-icon></span>
          <div class="pull-left p-l-30">
            <div class="wrong-tip-title">{{msg.DEFAULT_MSG.DELETEGROUPMSG + '？'}}</div>
            <div class="wrong-tip-msg" v-if="!isMember&&!isChildGroup">
              {{msg.DEFAULT_MSG.GONLYDETELEMSG}}
            </div>
            <div class="wrong-tip-msg" v-if="!isMember&&isChildGroup">
              {{msg.DEFAULT_MSG.GMULTIPLEDETELEMSG}}
            </div>
            <div v-if="isMember">
              <div>群组内联系人</div>
              <el-radio-group v-model="radioValue" @change="handleRadioChange">
                <el-radio :label="item.value" v-for="item in radioOptions" :key="item.value" class="form-radio">
                  {{item.name}}
                </el-radio>
              </el-radio-group>
              <div class="wrong-core-tree" v-if="radioValue==2">
                <core-tree ref="coreTree"
                           :dataSource="dataSource"
                           :isOperate="isOperate"
                           @loadSubNodes="loadSubNodes"
                           @itemClick="handleItemClick">
                </core-tree>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.stop="handleCancel">取 消</el-button>
      <el-button type="primary" @click.stop="handleDelete">全部删除</el-button>
      <el-button type="primary" v-show="isChildGroup" @click.stop="handleChildDelete">删除子级群组</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import groupApi from '@/api/group.js'
  import msg from '@/assets/js/msg.js'
  import coreTree from '@/components/tree/treeCore.vue'

  const radioOptions = [
    {name: '移出', value: 0},
    {name: '删除', value: 1},
    {name: '移动至', value: 2}
  ]

  export default {
    components: {coreTree},
    data() {
      return {
        msg: msg,
        isVisible: false,
        isMember: false,//是否有联系人
        isChildGroup: true,//是否有子级群组
        radioOptions: radioOptions,
        radioValue: 0,
        groupNode: {},//群组节点
        groupEntity: {},//群组实体
        dataSource: [],
        selectedData: []
      }
    },
    props: {
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
      loadInitTree() {
        this.$nextTick(function () {
          this.$emit('loadInitConfirmTree')
        })
      },
      loadSubNodes(node, resolve) {
        this.$emit('loadSubNodes', node, resolve)
      },
      handleRadioChange() {
        if (this.radioValue == 2) {
          this.loadInitTree()
        }
      },
      handleItemClick(node) {
        this.isHasSelectedItem(node.data)
        node.data.selected = !node.data.selected
        this.removeNoSelectedItem()
        this.$emit('itemClick', node)
      },
      handleCancel() {
        this.isVisible = false
      },
      //全部删除
      handleDelete() {
        groupApi.getDeleteGroupService(this, 'alldelete')
      },
      //仅删除子群组
      handleChildDelete() {
        groupApi.getDeleteGroupService(this, 'childdelete')
      },
      //是否存在选中项
      isHasSelectedItem(data) {
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
      //移除未选中的项
      removeNoSelectedItem() {
        var result = []
        this.selectedData.forEach(row => {
          if (row.selected) {
            result.push(row)
          }
        })

        this.selectedData = []
        this.selectedData.push(...result)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/css/defines";

  .wrong-container {
    > .el-dialog__body {
      padding: 20px 20px;
    }
  }

  .wrong-form-item {
    margin-bottom: 0 !important;
  }

  .wrong-tip-title {
    font-size: $font-size;
    font-weight: bolder;
  }

  .wrong-tip-msg {
    font-size: .12rem;
    color: $wrong-color;
  }

  .wrong-core-tree {
    border: 1px solid $light-border-color;
    > .mbr-tree {
      margin-top: .1rem;
      height: 2rem;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .wrong {
    width: .5rem;
    height: .5rem;
    fill: $wrong-bg-color;
  }
</style>

<style lang="scss">
  .form-radio .el-radio__inner {
    width: 14px;
    height: 14px;
  }
</style>
