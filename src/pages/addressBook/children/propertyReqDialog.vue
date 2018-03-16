/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/27
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <el-dialog :title="msg.title" :visible.sync="isVisible" width="30%">
    <el-form class="dialog-require">
      <el-form-item label="" prop="name">
        <el-checkbox v-for="(item,index) in requriseData" :key="index" v-model="item.isChecked"
                     class="pull-left  form-checkbox">{{item.name}}
        </el-checkbox>
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

  const requriseData = [
    {name: '姓名', isChecked: false},
    {name: '性别', isChecked: false},
    {name: '头像', isChecked: false},
    {name: '出生日期', isChecked: false},
    {name: '职能', isChecked: false},
    {name: '手机', isChecked: false},
    {name: '邮箱', isChecked: false},
    {name: '固定电话', isChecked: false},
    {name: '工号', isChecked: false}
  ]

  export default {
    components: {},
    data() {
      return {
        msg: {
          title: msg.FORM_MSG.SETREQURISEMSG,
        },
        isVisible: false,
        requriseData: requriseData
      }
    },
    methods: {
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
  @import "../../../assets/css/defines.scss";

  .dialog-require {
    height: 1rem;
  }

  .dialog-footer {
    text-align: center;
  }

  .input-reset-h {
    height: .3rem;
  }

  .form-address-content {
    margin-left: .25rem;
    background: $tag-bg-color;
    padding: .2rem;
  }

  .form-checkbox {
    width: 25%;
    margin-left: 30px;
  }
</style>
<style lang="scss">
  @import "../../../assets/css/defines.scss";

  .form-checkbox .el-checkbox__inner {
    width: 14px;
    height: 14px;
  }

  .form-radio .el-radio__inner {
    width: 14px;
    height: 14px;
  }

  .form-address-content .input-reset-60 .el-input__inner {
    height: .26rem;
  }

  .add-to {
    color: $color-primary;
  }
</style>
