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
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="20%">
    <el-form>
      <el-form-item :label="sortByLabel" :label-width="sortLabelWidth">
        <el-select class="p-r-10 select-reset" v-model="sortByValue" placeholder="请选择">
          <el-option
            v-for="item in sortByOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="sortTypeLabel" :label-width="sortLabelWidth">
        <el-select class="p-r-10 select-reset" v-model="sortByValue" placeholder="请选择">
          <el-option
            v-for="item in sortTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.stop="handleCancel">取 消</el-button>
      <el-button type="primary" @click.stop="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Vue from 'vue'
  import msg from '@/assets/js/msg.js'
  import defaultUrls from '@/assets/js/defaultUrls.js'

  const sortByOptions = [{name: '添加时间', value: 0}, {name: '姓名字母', value: 1}]

  const sortTypeOptions = [{name: '正序', value: 0}, {name: '倒序', value: 1}]

  const defaultOptions = {
    dialogVisible: false,
    dialogTitle: msg.FORM_MSG.CONTACTSORTMSG,
    sortByLabel: msg.FORM_MSG.SORTBYMSG,
    sortTypeLabel: msg.FORM_MSG.SORTTYPEMSG,
    sortLabelWidth: '100px',
    sortByValue: '',
    sortTypeValue: '',
    sortByOptions: sortByOptions,
    sortTypeOptions: sortTypeOptions
  }

  export default {
    name: 'sort-dialog',
    data() {
      return defaultOptions
    },
    methods: {
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {

      }
    }
  }
</script>
<style scoped lang="scss">
  .select-reset {
    width: 2rem !important;
    margin-left: 20px;
  }

</style>
