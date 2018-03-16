<template>
  <el-form labelWidth="150px" size="small" :model="formData" ref="channelInfoForm" :rules="ruleForm"
           class="channel-info">
    <el-row>
      <el-col :span="12">
        <el-form-item label="渠道商姓名" prop="name">
          <el-input :disabled="preview==='preview'" v-model="formData.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="渠道商手机号" prop="mdn">
          <el-input :disabled="preview==='preview'" v-model="formData.mdn"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="!preview" v-show="showBtn">
      <el-col :span="12">
        <el-form-item label=" ">
          <el-button @click="next(1)">上一步</el-button>
          <el-button type="primary" @click="next(3)">下一步</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>


<script>

  import editMixin from './editMixin';
  import {
    Busi_get_spInfo,
    Busi_add_channelInfo
  } from '@/pages/acceptanceApproval/api/business';

  export default {
    name: "channelInfo",
    data() {
      return {
        formData: {
          spId: '',//企业id
          name: '', //渠道销售名字
          mdn: '',//渠道销售手机号
          channelId: '', //省份
          city: '', // 城市
        },
        ruleForm: {
          name: [{message: '请填写渠道商姓名', required: true}],
          mdn: [{message: '渠道商手机号', required: true}]
        }
      }
    },
    mixins: [editMixin],
    created() {
      this.$nextTick(() => {
        IBSS.$on('getSpId', (spId, channelId, city) => {
          this.spId = spId;
          this.formData.channelId = channelId;
          this.formData.city = city;
        })
      });
    },
    beforeDestroy() {
      IBSS.$off('getSpId')
    },
    methods: {
      next(step) {
        if (step == 1) {
          const spId = this.spId;
          Busi_get_spInfo({spId}).then((res) => {
            const data = res.data;
            const {spName, contactName, contactPhone, customerManagerName, customerManagerMdn, area, email, telephone, mobile, address, zipCode, industryType, description, certificationType, unifiedSocialCreditCode, businessLicensePath,city,channelId} = data.enterpriseVO;
            const customerManagerPhone = customerManagerMdn;
            const spType = String(data.enterpriseVO.cropType);
            const attributes = data.enterpriseVO.attributes || [];
            const agentName = attributes[0].attrValue;
            const agentCertificateType = attributes[1].attrValue;
            const agentCertificateNumber = attributes[2].attrValue;
            const industrys = industryType.split(',');//["1102", "1001"]
            const userVO = data.userVO;
            const administratorName = userVO.name;
            const administratorPassword = userVO.passWord;
            const administratorMoblie = userVO.mobile;
            const isValidate = false;
            const fileData = {};
            if (certificationType === 1) {
              fileData.socialCreditCode = unifiedSocialCreditCode;
              fileData.businessLicensePath = businessLicensePath;
            } else if (certificationType === 3) {

            }
            fileData.certificateType = String(certificationType);
            this.$emit('handleNext', step, {
              spName,
              contactName,
              contactPhone,
              spType,
              customerManagerName,
              customerManagerPhone,
              area,
              email,
              telephone,
              mobile,
              address,
              zipCode,
              description,
              agentCertificateType,
              agentName,
              agentCertificateNumber,
              industrys,
              administratorName,
              administratorPassword,
              administratorMoblie,
              isValidate,
              spId,
              fileData,
              city,
              channelId
            })
          })
        } else {
          this.formData.spId = this.spId;
          this.$refs.channelInfoForm.validate((valid) => {
            if (!valid) {
              return;
            }
            Busi_add_channelInfo(this.formData).then((res) => {
              if (res.code === 200) {
                this.$refs.channelInfoForm.resetFields();
                IBSS.$emit('getId', res.data.id, this.spId);
                this.$emit('handleNext', step);
              }

            });
          });
        }
      },
    }
  }
</script>
<style lang="scss">
  .channel-info {
    .el-input__inner {
      width: 320px;
    }
  }
</style>

