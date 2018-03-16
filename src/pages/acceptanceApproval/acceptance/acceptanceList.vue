<template>
  <div class="search-options">
    <Search :hideSearch="true">
      <div slot="rol_1">
        <el-form-item label="受理单编号:">
          <el-input v-model="searchOptions.acceptanceNo"></el-input>
        </el-form-item>
        <el-form-item label="渠道:">
          <Platform :platform.sync="searchOptions.channelId" :showCity="false"/>
        </el-form-item>
      </div>
      <div slot="rol_2">
        <el-form-item label="申请日期:">
          <time-picker :startTime.sync="searchOptions.createTime" :endTime.sync="searchOptions.createdEndTime"/>
        </el-form-item>
        <el-form-item label="企业编号:">
          <el-input v-spcode v-model="searchOptions.spCode"></el-input>
        </el-form-item>
      </div>
      <div slot="rol_3">
        <el-form-item label="申请人:">
          <el-input v-model="searchOptions.operatorName"></el-input>
        </el-form-item>
        <el-form-item label="企业名称:">
          <el-input v-spcode v-model="searchOptions.spName"></el-input>
        </el-form-item>
      </div>
      <div slot="rol_4">
        <el-form-item label="申请方式:">
          <el-select v-model="searchOptions.source">
            <el-option label="全部" value=""></el-option>
            <el-option label="运营人员" value="0"></el-option>
            <el-option label="销售" value="1"></el-option>
            <el-option label="代理商" value="2"></el-option>
            <el-option label="联通" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </Search>
  
    <el-tabs type="border-card" v-model="tableType" class="m-b-20">
      <el-tab-pane label="开户" name="open">
        <div class="tabContainer">
          <span class="fl m-r-20">受理状态:</span>
          <el-checkbox-group v-model="searchOptions.status">
            <el-checkbox label="0" name="status">草稿</el-checkbox>
            <el-checkbox label="3" name="status">待开户审核</el-checkbox>
            <el-checkbox label="2" name="status">开户审核不通过</el-checkbox>
            <el-checkbox label="1" name="status">预开户成功</el-checkbox>
            <el-checkbox label="5" name="status">开户成功</el-checkbox>
            <el-checkbox label="4" name="status">废弃</el-checkbox>
          </el-checkbox-group>
          <div class="search-query">
            <el-button class="w-80" type="primary" size="mini" @click="query">搜索</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订购" name="order">订购</el-tab-pane>
      <el-tab-pane label="充值" name="charge">充值</el-tab-pane>
      <el-tab-pane label="赠送" name="gift">赠送</el-tab-pane>
      <el-tab-pane label="预支" name="advance">预支</el-tab-pane>
      <el-tab-pane label="销户" name="cancellation">销户</el-tab-pane>
    </el-tabs>
    
    <List :data="tableData" @query="query" :dataCount="dataCount">
      <el-table-column fixed prop="acceptanceNo" label="受理单编号" min-width="75"></el-table-column>
      <el-table-column fixed prop="spCode" label="企业编号" min-width="70"></el-table-column>
      <el-table-column fixed prop="spName" label="企业名称" min-width="100"></el-table-column>
      <el-table-column label="申请人" min-width="55" prop="operatorName"></el-table-column>
      <el-table-column label="申请方式" min-width="60">
        <template slot-scope="{row:{type}}">{{APPLY_TYPE[type]}}</template>
      </el-table-column>
      <el-table-column label="受理状态" min-width="90">
        <template slot-scope="{row:{status}}">{{ACCEPT_STATUS[status]}}</template>
      </el-table-column>
      <el-table-column label="开户日期" min-width="110">
        <template slot-scope="{row:{createTime}}">
          <span>{{dateFormat(createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="80" prop="description"></el-table-column>
      <el-table-column fixed="right" class="text-center" label="操作" width="180">
        <template slot-scope="{row}">
          <el-button @click="cancellation(spId)" type="text" size="small">账户审核</el-button>
          <el-button @click="cancellation(spId)" type="text" size="small">资质审核</el-button>
          <el-button @click="cancellation(spId)" type="text" size="small">开户审核</el-button>
          <el-button @click="noticeDialog(row)" type="text" size="small">通知</el-button>
        </template>
      </el-table-column>
    </List>
    
    <el-dialog title="企业通知" center custom-class="pop-change-sale" :visible.sync="dialogNotice" width="30%">
      <el-form size="small"  @submit.native.prevent="" ref="sale" :rules="rules" label-width="105px" :model="noticeForm">
        <el-form-item class="p-t-10" label="企业通知" prop="required">
          <el-input
            type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="noticeForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="contactMdn">
          <el-input v-model.number="noticeForm.contactMdn"/>
        </el-form-item>
        <el-form-item label="渠道商手机号" prop="channelMdn">
          <el-input  placeholder="请输入原因" v-model="noticeForm.channelMdn"/>
        </el-form-item>
        <el-form-item label="帜讯销售手机号" prop="customerManagerMdn">
          <el-input placeholder="请输入原因" v-model="noticeForm.customerManagerMdn"/>
        </el-form-item>
        <el-form-item label="其他人员手机号" prop="otherMdn">
          <el-input placeholder="请输入原因" v-model="noticeForm.otherMdn"/>
        </el-form-item>
        <el-form-item label="企业邮箱" prop="spEmail">
          <el-input placeholder="请输入原因" v-model="noticeForm.spEmail"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNotice = false">取 消</el-button>
        <el-button @click="toNoticeSp" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {Busi_spOpen_acceptanceList} from '../api/business'
  import Platform from '@/components/PlatformSelector/platformSelector'
  import {ACCEPT_TYPE, ACCEPT_STATUS,APPLY_TYPE} from '@/assets/js/constant'
  import {dateFormat} from '@/assets/js/formatDate'
  import {validateMdn,validateEmail} from '@/assets/js/utils'
  import TimePicker from '@/components/TimePicker/TimePicker.vue'
  
  const searchOptions = {
    status: [],
    channelId: '1',
    acceptanceNo: '',
    createTime: '',
    createdEndTime: '',
    operatorName: '',
    source: '',
    spCode: '',
    spName:''
  }
  const noticeForm = {
    content:'',
    contactMdn:'',
    otherMdn:'',
    customerManagerMdn:'',
    channelMdn:'',
    spEmail:''
  }
  
  export default {
    name: "spManageIndex",
    data() {
      return {
        PLATFORM:window.PLATFORM,
        tableData: [],  // 列表数据
        dataCount: 0,   // 分页, 数据总数
        searchOptions: Object.assign({}, searchOptions),  // 搜索条件
        ACCEPT_TYPE: ACCEPT_TYPE,  // 受理类型集合
        ACCEPT_STATUS: ACCEPT_STATUS,  // 受理状态集合,
        APPLY_TYPE: APPLY_TYPE,  // 申请类型集合,
        dialogNotice: false,  // 控制通知弹窗
        noticeForm: Object.assign({}, noticeForm), // 变更销售的请求参数
        rules: {         // 变更销售表单验证规则
          contactMdn: [
            {trigger: 'blur', validator: validateMdn,required: true}
          ],
          otherMdn: [
            {trigger: 'blur', validator: validateMdn,required: true}
          ],
          channelMdn: [
            {trigger: 'blur', validator: validateMdn,required: true}
          ],
          customerManagerMdn: [
            {trigger: 'blur', validator: validateMdn,required: true}
          ],
          spEmail: [
            {trigger: 'blur', validator: validateEmail,required: true}
          ],
          required: [
            {required: true, message: '原因不能为空', trigger: 'blur'}
          ],
        },
        dateFormat: dateFormat,
        tableType:'open'
      }
    },
    
    created() {
      this.query()
      
    },
    components: {Platform, TimePicker},
    methods: {
      query(pageInfo = {curPage: 1, pageLimit: 10}) {
        Busi_spOpen_acceptanceList(Object.assign(this.searchOptions, {queryInfo: pageInfo})).then(({data, dataCount}) => {
          this.tableData = data
          this.dataCount = dataCount
        })
      },
      toNoticeSp(){
      
      },
      noticeDialog(row){
        this.dialogNotice = true
        this.noticeForm.content = `您所在【${row.spName}】已开户成功，企业编号为【${row.spCode}】。您可通过手机号【${row.feeMdn}】+密码【】的方式进行登录。登录网址【http://6.ums86.com】`
      }
    }
  }
</script>
<style lang="scss">
  .tabContainer{
    position: relative;
    .search-query{
      position: absolute;
      right: 10px;
      top: -3px;
    }
  }
</style>



