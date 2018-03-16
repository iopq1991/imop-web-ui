<template>
  <section class="spOpen-container">

    <div class="content-container">

      <!--企业信息-->
      <div>
        <div class="title">
          <v-title title="企业信息" class="line"></v-title>
        </div>
        <sp-info :preData="spInfo" :showBtn="false" ref="spInfo"/>
      </div>

      <!--  渠道信息-->
      <div class="title">
        <v-title title="渠道信息" class="line"></v-title>
      </div>
      <channel-info :preData="channelInfo" :showBtn="false" ref="channelInfo"/>

      <!--账户信息-->
      <div class="title">
        <v-title title="账户信息" class="line"></v-title>
      </div>
      <account-info :showBtn="false" ref="accountInfo"/>
    </div>
    <div class="text-center btn-group">
      <el-button>返回</el-button>
      <el-button type="primary" @click="handleSaveInfo('0')">保存</el-button>
      <el-button type="primary" @click="handleSaveInfo('1')">提交审核</el-button>
    </div>
  </section>
</template>

<script>
  import SpInfo from '../spOpen/components/SpInfo'
  import ChannelInfo from '../spOpen/components/ChannelInfo'
  import AccountInfo from '../spOpen/components/AccountInfo'
  import {SP_get_spNotice_list, Busi_sale_open} from '../api/business';
  import VTitle from '@/components/title';

  export default {
    name: "spOpenIndex",
    data() {
      return {
        visible: false,
        spInfo: {},
        successInfo: {},
        channelInfo: {},
        sendMessage: {
          content: ''
        }
      }
    },
    components: {
      SpInfo, ChannelInfo, AccountInfo, VTitle
    },
    methods: {
      handleSaveInfo(temp) {
        const uploadForm = this.$refs.spInfo.upLoadForm;
        //console.log(uploadForm.keys());
        let ky = uploadForm.entries();
        console.log(ky.next())
        let validateNum = 3;
        // this.$refs.spInfo.$children[0].validate((valid) => {
        //   if (valid) {
        //     validateNum++;
        //   }
        //
        // });
        // this.$refs.channelInfo.$children[0].validate((valid) => {
        //   if (valid) {
        //     validateNum++;
        //   }
        // });
        // this.$refs.accountInfo.$children[0].validate((valid) => {
        //   if (valid) {
        //     validateNum++;
        //   }
        // });
        console.log(validateNum);
        if (validateNum === 3) {
          const spInfo = this.$refs.spInfo.formData;
          const accountInfo = this.$refs.accountInfo.formData;
          const channelInfo = this.$refs.channelInfo.formData;
          const data = Object.assign({operation: temp}, spInfo, accountInfo, channelInfo);
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            if (key === 'fileData') {
              Object.keys(data[key]).forEach((item) => {
                formData.append(item, data[key][item]);
              })
            } else if (key === 'industrys') {
              formData.append(key, data[key].join(','));
            } else {
              formData.append(key, data[key]);
            }

          });
          Busi_sale_open(formData).then((res) => {
            if (res.code == 200) {
              if (res.data.status === '0000') {
                this.$route.push({name:'acceptTips',query:{text:"受理单保存成功!"}});
              } else if (res.data.status === "0001") {
                this.$route.push({name:'acceptTips',query:{text:"受理单提交审核成功!"}});
              }
            } else {
              throw res;
            }
          }).catch((res) => {
            this.$message(res.message || "请求失败");
          });
        }

      }
    }

  }
</script>

<style scoped lang='scss'>
  .spOpen-container {
    padding: 30px 40px;
    .step {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f7f7fb;
      text-align: center;
      overflow: hidden;
      li {
        height: 46px;
        line-height: 46px;
        flex: 1;
        position: relative;
        color: #959698;
        font-size: 16px;
        span {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          line-height: 24px;
          text-align: center;
          color: #757575;
          margin-right: 15px;
          font-weight: bold;
          border: 1px solid #959698;
        }
        &.active {
          border-right: none;
          color: #3399ff;
          span {
            color: #fff;
            background-color: #3399ff;
            border: 1px solid #f6fafc;
          }
        }
      }
    }
    .content-container {
      .el-form-item {
        label {
          text-align: center;
        }
      }
      .credit-item {
        height: 50px;
        line-height: 50px;
      }
      .sp-info {
        margin: 0 auto;
        width: 850px;
        h1 {
          font-size: 18px;
          font-weight: normal;
          color: #333;
          margin: 24px auto 20px auto;
          text-align: center;
        }
        ul {
          width: 50%;
          margin: auto;
        }
        li {
          margin-bottom: 26px;
          display: flex;
          > span {
            display: block;
            &:nth-child(1) {
              flex: 0 0 110px;
              text-align: right;
              margin-right: 15px;
            }
            &:nth-child(2) {
              flex: 1;
              color: #169BD5;
            }
          }

          &:nth-last-child(1) {
            margin-bottom: 30px;
          }
        }
        .tips {
          height: 35px;
          margin: 10px 10px 30px 10px;
          background: #fff7ef;
          line-height: 35px;
          color: #d88236;
          .el-icon-close {
            font-size: 20px;
            color: #333;
            cursor: pointer;
            float: right;
            margin-top: 7px;
            margin-right: 10px;
          }
        }
      }
    }
    .alert {
      margin: 15px auto;
      background-image: none;
      box-shadow: none;
      text-shadow: none;
      padding: 9px 19px 9px 15px;
      border-radius: 3px;
      background-color: #daeffd;
      color: #2b6a94;
      border-color: #2b6a94;
    }
    .line {
      border-bottom: 1px solid #ddd;
      padding-bottom: 25px;
      margin-bottom: 20px;
    }
    .title {
      color: #269ef7;
    }
    .btn-group {
      button {
        width: 128px;
        height: 36px;
      }
    }
  }

</style>
<style lang="scss">


  .sp-message {
    .el-dialog__body {
      padding: 0 20px;
    }
  }

  .step-icon {
    font-size: 23px;
    position: absolute;
    right: -23px;
    top: 12px;
    fill: #c0c7cc;
  }
</style>
