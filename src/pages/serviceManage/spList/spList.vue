<template>
  <div class="search-options">
    <Search @query="query">
      <div slot="rol_1">
        <el-form-item label="渠道">
          <Platform :platform.sync="searchOptions.channelId" :city.sync="searchOptions.city"/>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-input v-spcode placeholder="支持填写同省至多10个企业编号" v-model="searchOptions.spCode"></el-input>
        </el-form-item>
      </div>
      <div slot="rol_2">
        <el-form-item label="开户日期">
          <time-picker :startTime.sync="searchOptions.openStartTime" :endTime.sync="searchOptions.openEndTime"/>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="searchOptions.spName"></el-input>
        </el-form-item>
      </div>
      <div slot="rol_3">
        <el-form-item label="企业类型">
          <el-select v-model="searchOptions.spType" placeholder="请选择企业类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="正式" value="1"></el-option>
            <el-option label="测试" value="3"></el-option>
            <el-option label="体验" value="2"></el-option>
            <el-option label="联通" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业联系人">
          <el-input v-model="searchOptions.contactName"></el-input>
        </el-form-item>
      </div>
      <div slot="rol_4">
        <el-form-item label="帜讯销售">
          <el-input v-model="searchOptions.customerManagerName"></el-input>
        </el-form-item>
        <el-form-item label="企业状态">
          <el-checkbox-group v-model="searchOptions.statuses">
            <el-checkbox label="0" name="status">正常</el-checkbox>
            <el-checkbox label="3" name="status">预开户</el-checkbox>
            <el-checkbox label="2" name="status">冻结</el-checkbox>
            <el-checkbox label="1" name="status">销户</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </Search>
    
    <List :selectList.sync="selectList" :selection="true" :data="tableData" @query="query" :dataCount="dataCount">
      <span slot="multi">
        <el-button @click="batchOperation('freeze')" size="mini">冻结</el-button>
        <el-button @click="batchOperation('thaw')" size="mini">解冻</el-button>
        <el-button @click="batchOperation('changeSale')" size="mini">变更销售</el-button>
      </span>
      <el-table-column fixed prop="spCode" label="企业编号" min-width="80"></el-table-column>
      <el-table-column fixed prop="spName" label="企业名称" min-width="140"></el-table-column>
      <el-table-column label="渠道" min-width="110">
        <template slot-scope="{row:{platform,city}}">
          <span>{{PLATFORM[platform] || '' + '/'+ (CITY_MAP[city] || '')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户日期" min-width="140">
        <template slot-scope="{row:{ctime}}">
          <span>{{dateFormat(ctime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="企业类型" min-width="75">
        <template slot-scope="{row:{cropType}}">{{SP_TYPE[cropType] || '无'}}</template>
      </el-table-column>
      <el-table-column prop="customerManagerName" label="帜讯销售" min-width="75"></el-table-column>
      <el-table-column label="企业状态" min-width="65">
        <template slot-scope="{row:{status}}"><span :class="LABEL_STATUS[status]"></span><span class="p-l-10">{{SP_STATUS[status]}}</span></template>
      </el-table-column>
      <el-table-column :fixed="$store.state.common.isMobile?false:'right'" class="text-center" label="操作" width="190">
        <template slot-scope="{row:{spId,status}}">
          <template v-if="status == SP_STATUS_MAP.NORMAL">
            <router-link :to="{name:'spEdit',params:{id:spId}}">
              <el-button type="text" size="small">修改</el-button>
            </router-link>
            <el-button @click="cancellation(spId)" type="text" size="small">销户</el-button>
            <el-button @click="showUpdatePop(SP_STATUS_MAP.FREEZE,spId)" type="text" size="small">冻结</el-button>
          </template>
          <template v-else-if="status == SP_STATUS_MAP.PRE_OPEN">
            <router-link :to="{name:'spEdit',params:{id:spId}}">
              <el-button type="text" size="small">修改</el-button>
            </router-link>
            <el-button @click="cancellation(spId)" type="text" size="small">销户</el-button>
          </template>
          <template v-else-if="status == SP_STATUS_MAP.FREEZE">
            <router-link :to="{name:'spEdit',params:{id:spId}}">
              <el-button type="text" size="small">修改</el-button>
            </router-link>
            <el-button @click="showUpdatePop(SP_STATUS_MAP.NORMAL,spId)" type="text" size="small">解冻</el-button>
          </template>
          <template v-else-if="status == SP_STATUS_MAP.CANCELLATION"></template>
        </template>
      </el-table-column>
    </List>
    
    <el-dialog :title="updatePop.status == SP_STATUS_MAP.NORMAL ? '解冻' :SP_STATUS [upDateForm.status]" custom-class="pop-with-remark" :visible.sync="dialogUpdate" width="30%">
      <el-alert :closable="false" title="" :type="updatePop.type" :description="updatePop.description"
                show-icon></el-alert>
      <p class="p-5">{{updatePop.status == SP_STATUS_MAP.NORMAL ? '解冻' :SP_STATUS [upDateForm.status]}}原因 :</p>
      <el-input type="textarea" :rows="2" placeholder="请输入原因" v-model="upDateForm.remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button @click="toUpdateStatus" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="帜讯销售变更" center custom-class="pop-change-sale" :visible.sync="dialogChangeSale" width="30%">
      <el-form size="small" @submit.native.prevent="" ref="sale" :rules="rules" label-width="135px" :model="changeSaleForm">
        <div style="padding-left: 30px;font-size: 14px;line-height: 35px;">{{saleInfo}}</div>
        <el-form-item label="新帜讯销售姓名" prop="customerManagerName">
          <el-input v-model="changeSaleForm.customerManagerName"/>
        </el-form-item>
        <el-form-item label="新帜讯销售手机号" prop="customerManagerMdn">
          <el-input v-model.number="changeSaleForm.customerManagerMdn"/>
        </el-form-item>
        <el-form-item label="变更原因" prop="remark">
          <el-input type="textarea" :rows="2" placeholder="请输入原因" v-model="changeSaleForm.remark"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeSale = false">取 消</el-button>
        <el-button @click="toChangeSale" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {Busi_spManage_getSpList, Busi_spManage_update, Busi_spManage_batchUpdate, Busi_spManage_batchChange} from '../api'
  import Platform from '@/components/PlatformSelector/platformSelector'
  import {Alert} from 'element-ui'
  import Vue from 'vue'
  import {SP_STATUS, SP_STATUS_MAP, SP_TYPE ,LABEL_STATUS} from '@/assets/js/constant'
  import {dateFormat} from '@/assets/js/formatDate'
  import {validateMdn,PLATFORM,CITY_MAP} from '@/assets/js/utils'
  import TimePicker from '@/components/TimePicker/TimePicker.vue'
  Vue.use(Alert)
  
  const searchOptions = {
    spType : '',
    statuses: [],
    channelId: '1',
    city: '',
    openStartTime: '',
    openEndTime: '',
    customerManagerName: '',
    customerManagerMdn: '',
    spName: '',
    spCode: '',
  }
  const changeSaleForm = {
    customerManagerName: '',
    customerManagerMdn: '',
    remark: '',
    spIds: []
  }
  
  export default {
    name: "spManageIndex",
    data() {
      return {
        PLATFORM: PLATFORM(),
        CITY_MAP: CITY_MAP(),
        tableData: [],  // 列表数据
        dataCount: 0,   // 分页, 数据总数
        selectList: [], // 选中项的集合
        searchOptions: Object.assign({}, searchOptions),  // 搜索条件
        SP_STATUS: SP_STATUS,  // 企业状态集合
        SP_STATUS_MAP: SP_STATUS_MAP,  // 企业状态集合,
        LABEL_STATUS:LABEL_STATUS,  // 企业状态图标集合
        SP_TYPE: SP_TYPE, // 企业类型集合
        dialogUpdate: false,  // 控制冻结销户操作的弹窗
        dialogChangeSale: false,  // 控制变更记录弹窗
        saleInfo: '',     // 销售弹窗的销售姓名和手机号
        updatePop: {type: '', isAll: false, description: '', status: ''},  // 控制冻结销户弹窗的内容
        upDateForm: {   // 冻结销户操作的参数
          remark: '',
          spId: '',
          status: ''
        },
        changeSaleForm: Object.assign({}, changeSaleForm), // 变更销售的请求参数
        rules: {         // 变更销售表单验证规则
          customerManagerName: [
            {required: true, message: '新帜讯销售姓名不能为空', trigger: 'blur'}
          ],
          customerManagerMdn: [
            {required: true,trigger: 'blur', validator: validateMdn}
          ],
          remark: [
            {required: true, message: '原因不能为空', trigger: 'blur'}
          ],
        },
        getCityAndPlatform: (platId, cityId) => {
          let {platform = '', city = ''} = getCityAndPlatform(platId, cityId)
          return platform + '/' + city
        },
        dateFormat: dateFormat
      }
    },
    created() {
      this.query()
    },
    components: {Platform, TimePicker},
    methods: {
      query(pageInfo = {curPage: 1, pageLimit: 10}) {
        let param =Object.assign({},this.searchOptions, {queryInfo: pageInfo})
        param.spCode = param.spCode.replace(/\，/g,',')
        Busi_spManage_getSpList(param).then(({data, dataCount}) => {
          this.tableData = data
          this.dataCount = dataCount
        })
      },
      batchOperation(type) {
        if (!this.selectList.length) {
          this.$message({message: '请至少选择一个企业!', type: 'warning'});
          return
        }
        switch (type) {
          case 'freeze':
            this.showUpdatePop(SP_STATUS_MAP.FREEZE, null, true);
            break;
          case 'thaw':
            this.showUpdatePop(SP_STATUS_MAP.NORMAL, null, true);
            break;
          case 'changeSale':
            this.changeSale();
            break;
        }
      },
      changeSale() {
        Object.assign(this.changeSaleForm, changeSaleForm)
        this.saleInfo = `共选择了${this.selectList.length}家公司`
        this.dialogChangeSale = true
        this.$nextTick(() => {
          this.$refs.sale.clearValidate()
        })
      },
      async toChangeSale() {
        let valid = await this.$refs.sale.validate()
        if (!valid) return
        let res = null
        let param = Object.assign({}, this.changeSaleForm, {spIds: this.selectList.map(item => item.spId)})
        res = await Busi_spManage_batchChange(param)
        if (!res) return
        this.$message({message: res.message, type: 'success'})
        this.query()
        this.dialogChangeSale = false
      },
      cancellation(id) {
        this.upDateForm.remark = ''
        this.dialogUpdate = true
        this.updatePop = {
          type: 'warning',
          description: `此操作无法撤回！销户后，企业将无法再恢复正常状态，是否确定销户？`,
          status: SP_STATUS_MAP.CANCELLATION,
          isAll: false,
        }
        Object.assign(this.upDateForm, {spId: id, status: SP_STATUS_MAP.CANCELLATION})
      },
      showUpdatePop(status, id, isAll) {
        this.upDateForm.remark = ''
        let description = ''
        if (isAll) {
          let freezeSpNum = this.selectList.filter(item => item.status == SP_STATUS_MAP.FREEZE).length
          let normalSpNum = this.selectList.filter(item => item.status == SP_STATUS_MAP.NORMAL).length
          let restSpNum = this.selectList.length - (status == SP_STATUS_MAP.NORMAL ? freezeSpNum : normalSpNum)
          if ((status == SP_STATUS_MAP.NORMAL && freezeSpNum === 0) || (status == SP_STATUS_MAP.FREEZE && normalSpNum === 0)) {
            this.$message({message: `请至少选择一个状态为${status == SP_STATUS_MAP.NORMAL ? "冻结" : "正常"}的企业`, type: 'warning'});
            return
          }
          description = status == SP_STATUS_MAP.NORMAL ? `解冻后，企业将恢复一切业务操作,您总共选择了 ${this.selectList.length} 家企业，
            其中有${freezeSpNum}家企业将被解冻,  ${!restSpNum ? '' : '有' + restSpNum + '家企业不做解冻操作,'} 是否确认解冻？` : `冻结后，企业将不能进行任何业务操作，且不能登录一信通企业信息服务平台，您总共选择了${this.selectList.length} 家企业，其中有${normalSpNum}家企业将被冻结，${!restSpNum ? '' : '有' + restSpNum + '家企业不做冻结操作,'}是否确认冻结？`
        } else {
          description = status == SP_STATUS_MAP.NORMAL ? '解冻后，企业将恢复一切业务操作，是否确认解冻？' : '冻结后，企业将不能进行任何业务操作，且不能登录一信通企业信息服务平台，是否确认冻结？'
        }
        this.dialogUpdate = true
        this.updatePop = {
          type: 'warning',
          description: description,
          status: status,
          isAll: isAll,
        }
        Object.assign(this.upDateForm, {spId: id, status: status})
      },
      async toUpdateStatus() {
        if (!this.upDateForm.remark) {
          this.$message({message: '原因不能为空', type: 'warning'});
          return
        }
        let res = null
        if (this.updatePop.isAll) {
          let status = this.updatePop.status == SP_STATUS_MAP.NORMAL ? SP_STATUS_MAP.FREEZE : SP_STATUS_MAP.NORMAL
          let spIds = this.selectList.reduce((prev, cur) => {
            if (cur.status == status) prev.push(cur.spId)
            return prev
          }, [])
          let param = Object.assign({}, this.upDateForm, {spIds: spIds})
          delete param.spId
          res = await Busi_spManage_batchUpdate(param)
        } else {
          res = await Busi_spManage_update(this.upDateForm)
        }
        if (!res) return
        this.$message({message: res.message, type: 'success'})
        this.query()
        this.dialogUpdate = false
      }
    }
  }
</script>


