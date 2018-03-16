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
  <el-dialog :title="msg.title" :visible.sync="isVisible" width="30%" @close="handleCloseDialog">
    <el-form ref="propertyForm">
      <el-form-item label="" prop="name">
        <div class="el-input el-input--medium el-input--suffix">
          <input v-model="propertyEntity.name" type="text" :maxlength="maxLength" class="el-input__inner input-reset-h">
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i>{{realLength}}/8</i>
            </span>
          </span>
        </div>
        <el-alert :title="msg.errorName" v-if="msg.errorName!=''" type="default"
                  @close="handleErrorMsgClose(1)"></el-alert>
      </el-form-item>

      <el-form-item label="" prop="isAddress">
        <div class="clearfix">
          <el-checkbox v-model="propertyEntity.isAddress" class="pull-left  form-checkbox">是否通讯属性</el-checkbox>
          <div class="pull-left p-l-20" v-show="propertyEntity.isAddress">
            <span>通讯类型：</span>
            <el-select class="select-reset" v-model="propertyEntity.addressValue" placeholder="请选择">
              <el-option
                v-for="item in addressOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-checkbox v-model="propertyEntity.isAddressRequries" class="pull-left  form-checkbox p-l-10">是否必填
          </el-checkbox>
        </div>
        <div>
          <el-alert :title="msg.errorAddressValue" v-if="msg.errorAddressValue!=''" type="default"
                    @close="handleErrorMsgClose(2)"></el-alert>
        </div>
      </el-form-item>

      <el-form-item label="" prop="name">
        <el-radio-group v-model="propertyEntity.addressTypeValue" @change="handleRadioChange">
          <el-radio :label="item.value" v-for="item in addressTypes" :key="item.value" class="form-radio">
            {{item.name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="">
        <div class="form-address-content">
          <div v-if="propertyEntity.addressTypeValue==1">
            <el-checkbox-group v-model="propertyEntity.addressRequriesList">
              <el-checkbox :label="item.name" v-for="(item,index) in addressRequries" :key="index"
                           class="form-checkbox"></el-checkbox>
            </el-checkbox-group>
            内容字数限制
            <el-input-number class="input-reset-60" v-model="propertyEntity.addressRequriesNumber" :min="minValue"
                             :max="20"
                             :controls="false"></el-input-number>
            字
          </div>
          <div v-else-if="propertyEntity.addressTypeValue==2 || propertyEntity.addressTypeValue==3">
            <input-svg ref="singeInputSvg" :propertyOptions="propertyOptions" @add="handlePropertyAdd"
                       @minus="handlePropertyMinus"></input-svg>
          </div>
          <div v-else="propertyEntity.addressTypeValue==4">
            <el-radio-group v-model="propertyEntity.dateProperty">
              <el-radio :label="item.value" v-for="item in datePropertyOptions" :key="item.value"
                        class="form-radio">
                {{item.name}}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-alert :title="msg.errorTypeValue" v-if="msg.errorTypeValue!=''" type="default"
                  @close="handleErrorMsgClose(3)"></el-alert>
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
  import {validateReal} from '@/assets/js/utils.js'
  import inputSvg from "@/components/inputSvg.vue"
  import propertyApi from '@/api/property.js'

  const addressOptions = [{
    name: '手机号码', value: 1
  }, {
    name: '固定电话', value: 2
  }, {
    name: 'app', value: 3
  }, {
    name: '微信', value: 4
  }, {
    name: 'QQ', value: 5
  }]

  const addressTypes = [{
    name: '文本', value: 1
  }, {
    name: '单选', value: 2
  }, {
    name: '多选', value: 3
  },
    {name: '时间', value: 4}
  ]

  const addressRequries = [{
    name: '内容不允许输入特殊字符'
  }, {
    name: '内容只能输入数字'
  }]

  const datePropertyOptions = [{
    name: '仅输入日期', value: 1
  }, {
    name: '仅输入时间', value: 2
  }, {
    name: '输入日期时间', value: 3
  }]

  export default {
    components: {
      inputSvg
    },
    data() {
      return {
        msg: {
          title: msg.FORM_MSG.ADDCUSTOMPROPERTYMSG,
          errorName: '',//验证属性名称错误
          errorAddressValue: '',//验证是否选择通讯属性错误
          errorTypeValue: '',//验证属性类型错误
        },
        isVisible: false,//属性弹出框是否显示
        addressOptions: addressOptions,//通讯属性项
        addressTypes: addressTypes,//属性类型（文本、单选、多选、时间）
        addressRequries: addressRequries,//必填属性项
        datePropertyOptions: datePropertyOptions,
        propertyId: '',//属性ID
        propertyEntity: {
          name: "",//属性名称
          isAddress: false,//是否是通讯属性
          addressValue: "",//通讯属性值
          addressTypeValue: addressTypes[0].value,//属性类型值
          isAddressRequries: false,//是否必填
          addressRequriesList: [],//必填项数据集
          addressRequriesNumber: '',//必填项值
          dateProperty: ''//时间项
        },//属性实体
        maxLength: 16,
        propertyOptions: [{name: ''}]
      }
    },
    methods: {
      handleCancel() {
        this.isVisible = false
        this.handleResetForm()
      },
      handleSave() {
        var self = this
        //验证属性名称
        if (self.propertyEntity.name == "") {
          self.msg.errorName = msg.VALIDATE.NO_PROPERTYNAME
          return
        }
        else {
          //是否包含特殊字符#$%^&<>
          var spReg = /[#$%^&<>]/
          if (spReg.test(self.propertyEntity.name)) {
            self.msg.errorName = msg.VALIDATE.NO_PROPERTYNAME_SP
            return
          }
          else {
            self.msg.errorName = ''
          }

          //验证是否包含中文字符
          if (validateReal(self.propertyEntity.name) > 16) {
            self.msg.errorName = msg.VALIDATE.NO_PROPERTYNAME_MORE
            return
          }
          else {
            self.msg.errorName = ''
          }
        }

        //验证是否选择通讯属性
        if (this.propertyEntity.isAddress && this.propertyEntity.addressValue == '') {
          self.msg.errorAddressValue = msg.VALIDATE.NO_PROPERTYADDRESS_TYPE
          return
        }
        else {
          self.msg.errorAddressValue = ""
        }

        //验证属性类型
        if (this.addressTypeValue == 1) {
          //文本
          if (this.propertyEntity.isAddressRequries && (this.propertyEntity.addressRequriesNumber == '' || this.propertyEntity.addressRequriesNumber == 0)) {
            self.msg.errorTypeValue = msg.VALIDATE.NO_PROPERTYTEXT_NUM
            return
          }
          else {
            self.msg.errorTypeValue = ""
          }
        }
        //单选、多选
        else if (this.propertyEntity.addressTypeValue == 2 || this.propertyEntity.addressTypeValue == 3) {
          var errorMsg = ''
          for (let item of this.propertyOptions) {
            if (item.name == '') {
              errorMsg = msg.VALIDATE.NO_PROPERTYADDRESS_OPTION
              break
            }

            var len = validateReal(item.name)

            if (len > 40) {
              errorMsg = msg.VALIDATE.NO_PROPERTYNAME_MORE
              break
            }

            var spReg = /[@#$%^&<>]/gi
            if (spReg.test(item.name)) {
              errorMsg = msg.VALIDATE.NO_PROPERTYNAME_SP
              break
            }
          }

          if (errorMsg != '') {
            this.msg.errorTypeValue = errorMsg
            return
          }
          else {
            this.msg.errorTypeValue = ''
          }
        }
        //时间
        else {
          if (this.propertyEntity.dateProperty == '') {
            self.msg.errorAddressValue = msg.VALIDATE.NO_PROPERTYADDRESS_DATE
            return
          }
          else {
            self.msg.errorAddressValue = ''
          }
        }
        if (self.propertyId == '') {
          propertyApi.addCustomPropertyService(this)
        }
        else {
          propertyApi.eidtCustomPropertyService(this)
        }
      },
      handleErrorMsgClose(type) {
        if (type == 1) {
          this.msg.errorName = ''
        }
        else if (type == 2) {
          this.msg.errorAddressValue = ''
        }
        else {
          this.msg.errorTypeValue = ''
        }
      },
      handlePropertyAdd() {
        this.propertyOptions.push({
          name: ''
        })
      },
      handlePropertyMinus(index) {
        if (this.propertyOptions.length > 1) {
          this.propertyOptions.splice(index, 1)
        }
      },
      handleRadioChange() {
        this.propertyOptions = [{name: ''}]
        this.propertyEntity.addressRequriesList = []//文本选项为空
        this.propertyEntity.dateProperty = ""//时间选项
        this.propertyEntity.addressRequriesNumber = ""
        this.msg.errorTypeValue = ""
      },
      handleCloseDialog() {
        this.handleResetForm()
      },
      handleResetForm() {
        this.propertyEntity.name = ""
        this.msg.errorName = ""
        this.propertyEntity.isAddress = false
        this.propertyEntity.addressValue = ""
        this.msg.errorAddressValue = ""
        this.propertyEntity.addressTypeValue = addressTypes[0].value
        this.msg.errorAddressValue = ""
        this.propertyEntity.isAddressRequries = false
        this.propertyEntity.addressRequriesNumber = ""
        this.propertyEntity.addressRequriesList = []
        this.propertyEntity.dateProperty = ""
        this.propertyOptions = [{name: ''}]
      }
    },
    computed: {
      //真实长度
      realLength() {
        var len = validateReal(this.propertyEntity.name)

        if (len > 16) {
          this.msg.errorName = msg.VALIDATE.NO_PROPERTYNAME_MORE
        }
        else {
          this.msg.errorName = ""
        }

        var spReg = /[@#$%^&<>]/gi
        if (spReg.test(this.propertyEntity.name)) {
          this.msg.errorName = msg.VALIDATE.NO_PROPERTYNAME_SP
        }
        else {
          this.msg.errorName = ''
        }

        return len >= 16 ? 8 : parseInt(len / 2)
      },
      minValue() {
        if (this.propertyEntity.isAddressRequries) {
          return 1
        }
        else {
          return 0
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/css/defines.scss";

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
    max-height: 1.7rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-alert--default {
    margin: 12px 0 0 0;
    background-color: #fff7f0;
    color: #f67a17;
    font-size: 12px;
    padding: 1px 16px;
  }

  .el-form-item:last-child {
    margin-bottom: 0px !important;
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
