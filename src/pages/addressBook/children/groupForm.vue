/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/23
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <div class="w100 mbr-wrap-form">
    <--edit-->
    <el-popover
      transition="slide-fade"
      v-model="popoverVisible"
      placement="right"
      trigger="click"
      popper-class="h100 auto-bar">
      <div class="el-dialog__header">
        <span class="el-dialog__title">{{title}}</span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="handleDialogClose">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <group-contact ref="groupContactEdit"
                     class="group-contact"
                     :itemWidth="'150px'"
                     :labelWidth="'100px'"
                     :isGroupEdit="true"
                     :personData="personEntity"
                     :bottomBtn="defaultBtnOption"
                     @handleSelectGroup="handleSelectGroup"
                     @handleStick="handleStick"
                     @handleJionGroup="handleJionGroup"
                     @handlePersonMove="handlePersonMove"
                     @handleShiftOut="handleShiftOut"
                     @handlePersonDelete="handlePersonDelete"
      >
      </group-contact>
    </el-popover>
    <--add-->
    <el-dialog :title="title"
               :before-close="handleDialogClose"
               :visible.sync="dialogVisible" width="35%">
      <group-contact ref="groupContactAdd"
                     class="group-contact"
                     :itemWidth="'150px'"
                     :labelWidth="'100px'"
                     @handleSelectGroup="handleSelectGroup">
      </group-contact>
    </el-dialog>
  </div>
</template>
<script>
  import msg from '@/assets/js/msg.js';
  import defaultUrls from '@/assets/js/defaultUrls.js'
  import groupContact from './editContact.vue'

  export default {
    components: {groupContact},
    data() {
      return {
        title: "",
        dialogVisible: false,
        popoverVisible: false,
        defaultBtnOption: {
          sendMessageVisible: true,
          sendEmailVisible: true,
          stickVisible: false,
          saveVisible: false,
          moreVisible: false
        },
        personEntity: {}//成员实体
      }
    },
    created() {

    },
    methods: {
      handleDialogClose() {
        this.popoverVisible = false
        this.dialogVisible = false
      },
      handleSelectGroup(groupList) {
        this.$emit('selectGroup', groupList, this)
      },
      //置顶
      handleStick() {
        this.$emit('top', this.personEntity)
      },
      //加入群组
      handleJionGroup() {
        this.$emit('groupJoin', this.personEntity)
      },
      //移动
      handlePersonMove() {
        this.$emit('moveDown', this.personEntity)
      },
      //移出
      handleShiftOut() {
        this.$emit('shiftOut', this.personEntity)
      },
      //删除
      handlePersonDelete() {
        this.$emit('delete', this.personEntity)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../assets/css/defines.scss";
  @import "../../../assets/css/animation.scss";

  .mbr-wrap-form {
    width: 100%;
    .el-popover {
      width: 6rem !important;
      right: .2rem;
      top: .42rem;
    }
    .el-dialog__body {
      padding-bottom: 10px;
    }
  }

  .group-contact {
    height: 450px;
  }
</style>
