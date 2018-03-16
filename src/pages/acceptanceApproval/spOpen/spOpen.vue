<template>
  <section class="spOpen-container">
    <header>
      <ul class="step">
        <li v-for="(item,index) in headTitle" :key="index" :class="{'active':nextStep>=item.value}">
          <svg-icon className="step-icon" iconClass="step" v-if="index<headTitle.length-1"></svg-icon>
          <span>{{item.value}}</span>{{item.title}}
        </li>
      </ul>
    </header>
    <div class="content-container">

      <!--企业信息-->
      <div v-show="nextStep===1" class="m-t-30">
        <div class="title">
          <v-title title="企业信息" class="line"></v-title>
        </div>
        <sp-info @handleNext="handleNext" :preData="spInfo"/>
      </div>

      <!--  渠道信息-->
      <channel-info v-show="nextStep===2" @handleNext="handleNext" :preData="channelInfo"/>

      <!--账户信息-->
      <account-info v-show="nextStep===3" @handleNext="handleNext"/>

      <!-- 开户成功-->
      <el-row :gutter="20" v-show="nextStep===4">
        <el-col :span="24" class="text-center">
          <i class="el-icon-success" style="font-size:64px;color:#65af45;margin-top:30px;"></i>
        </el-col>
        <el-col :span="24">
          <div class="sp-info">
            <h1 class="m-t-20 m-b-20 p-l-10">恭喜您，新企业开户成功！</h1>
            <p style="color:#959698;text-align:center;font-size:14px;" class="m-b-30">您可继续为企业配置业务信息，以便企业可以正常使用平台功能！</p>
            <div class="tips"><span class="el-icon-warning m-l-20 m-r-15"></span>本次开户操作前改手机号已是平台注册号码
              <span class="el-icon-close"></span>
            </div>
            <ul class="m-b-30">
              <li><span>企业全称：</span><span>{{successInfo.spName}}</span></li>
              <li><span>企业编号：</span><span>{{successInfo.spCode}}</span></li>
              <li><span>管理员账号：</span><span>{{successInfo.name}}</span></li>
              <li><span>管理员手机号：</span><span>{{successInfo.mobile}}</span></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="24" class="text-center m-t-30">
          <el-button type="primary" size="small" @click="handelSendMessage">通知企业</el-button>
          <el-button type="primary" size="small">业务配置</el-button>
          <el-button size="small" @click="$router.push('/business/sp-manage/index')">企业列表</el-button>
        </el-col>
      </el-row>
    </div>

    <!--通知企业-->
    <el-dialog :visible.sync="visible" title="企业通知" width="40%" custom-class="sp-message">
      <p class="alert">请输入企业的手机号码或邮箱地址，选择通知方式，告知企业开户信息！</p>
      <el-form size="small" labelWidth="150px">
        <el-form-item label="企业通知：">
          <el-input type="textarea" autosize v-model="sendMessage.content"></el-input>
        </el-form-item>
        <el-form-item label="联系人号码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="渠道商销售号码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="帜讯销售号码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="其他人员号码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible=false">取消</el-button>
        <el-button size="small" type="primary" @click="visible=false">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import SpInfo from '../spOpen/components/SpInfo'
  import ChannelInfo from '../spOpen/components/ChannelInfo'
  import AccountInfo from '../spOpen/components/AccountInfo'
  import {SP_get_spNotice_list} from '../api/business';
  import VTitle from '@/components/title';

  export default {
    name: "spOpenIndex",
    data() {
      return {
        headTitle: [{
          title: '企业信息',
          value: 1
        }, {
          title: '渠道信息',
          value: 2
        }, {
          title: '账户信息',
          value: 3
        }, {
          title: '开户成功',
          value: 4
        }],
        nextStep: 1,
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
      handleNext(val, data, result) {
        this.nextStep = val;
        switch (val + '') {
          case '1':
            this.spInfo = data;
            break;
          case '2':
            if (data) {
              this.successInfo = data;
            }
            if (result) {
              this.channelInfo = result;
            }
            break;
          case '4':

            break;
        }
      },
      async handelSendMessage() {
        this.visible = true;
        try {
          const result = await SP_get_spNotice_list(Object.assign({type: 1}, this.successInfo));
          const content = result.data.noticeList[0].content;
          this.sendMessage.content = content;
        } catch (e) {

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
    .title{
      color:#269ef7;
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
