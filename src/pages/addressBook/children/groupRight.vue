/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/9
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/
<template>
  <div class="wrap-table">
    <div class="wrap-operate clearfix">
      <div class="wrap-inline wrap-inline-span">{{groupEntity.name}}{{total > 0 ? '(' + total + ')人' : ''}}</div>
      <div class="wrap-inline wrap-inline-s pull-right">
        <el-button size="small" plain @click="handleSingleAdd">{{msg.add}}</el-button>
        <el-button size="small" plain @click="handleBatchAdd">{{msg.import}}</el-button>
        <el-button size="small" plain @click="handleExport">{{msg.export}}</el-button>
        <el-button size="small" plain @click="handleSort">{{msg.sort}}</el-button>
        <el-popover ref="tableHeaderOption" popper-class="wrap-popper"
                    placement="bottom-end" width="90" trigger="click"
                    @show="popoverVisible=true"
                    @hide="popoverVisible=false">
          <div class="wrap-container clearfix p-l-5" slot="reference" :class="{active:popoverVisible}">
            <svg-icon iconClass="list" className="list"></svg-icon>
          </div>
          <div class="content">
            <ul>
              <li v-for="item in customTHeaderOptions" @change="handleCustomHeaderChange(item)">
                <el-checkbox v-model="item.isChecked">{{item.name}}</el-checkbox>
              </li>
            </ul>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="set-member-table">
      <el-table ref="memberTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @select="handleSelectRow"
                @select-all="handleSelectAll">
        <el-table-column fixed="left" type="selection" width="40"></el-table-column>
        <el-table-column :prop="item.propertyName"
                         :label="item.name"
                         :key="index"
                         v-for="(item,index) in defaultTHeaderOptions"
                         v-if="item.isChecked"
                         min-width="100">
        </el-table-column>
        <el-table-column :prop="item.propertyName"
                         :label="item.name"
                         :key="item.name"
                         v-for="(item,index) in customTHeaderOptions"
                         v-if="item.isChecked"
                         min-width="100">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="50">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handelEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="wrap-pagination">
        <div class="set-pagination-operate clearfix">
          <el-checkbox v-model="isAllChecked" class="pull-left m-t-5" :disabled="tableData.length==0?true:false"
                       @change="handleChangeSelectAll">全选
          </el-checkbox>
          <el-select v-model="defaultPageValue"
                     :disabled="tableData.length==0?true:false"
                     class="select-reset p-l-20 pull-left"
                     size="small" placeholder="批量操作"
                     @change="handlePageOperate">
            <el-option
              v-for="item in defaultPageOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <pagination ref="memberPagination" class="set-pagination pull-right"
                      :total="total"
                      :pageSize="pageSize"
                      :pageSizes="pageSizes"
                      @current-change="handleCurrentChange"
                      @sizeChange="handleSizeChange"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import msg from '@/assets/js/msg.js';
  import defaultUrls from '@/assets/js/defaultUrls.js'
  import groupApi from '@/api/group.js'
  import propertyApi from '@/api/property.js'
  import pagination from '@/components/pagination.vue'

  const paginationOptions = [
    {name: msg.OPERATE_MSG.JOINGROUPMSG, value: 0},
    {name: msg.OPERATE_MSG.MOVEDOWNMSG, value: 1},
    {name: msg.OPERATE_MSG.SHIFOUTMSG, value: 2},
    {name: msg.OPERATE_MSG.DELETEMSG, value: 3}
  ]

  const defaultHeaderOptions = [
    {name: '姓名', propertyName: 'name', isChecked: true},
    {name: '头像', propertyName: 'img', isChecked: false},
    {name: '性别', propertyName: 'sex', isChecked: true},
    {name: '手机', propertyName: 'mdn', isChecked: true},
    {name: '邮箱', propertyName: 'mail', isChecked: true}
  ]

  const customHeaderOptions = [
    {name: '出生日期', propertyName: 'createTime', isChecked: false},
    {name: '职能', propertyName: 'position', isChecked: false},
    {name: '固定电话', propertyName: 'telephone', isChecked: false},
    {name: 'APP', propertyName: 'app', isChecked: false},
    {name: '微信', propertyName: 'wechat', isChecked: false},
    {name: '钉钉', propertyName: 'dingding', isChecked: false}
  ]

  export default {
    components: {
      pagination
    },
    props: {
      //当前组织树选中的节点数据
      currectNodeData: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        groupEntity: {},//群组实体信息
        groupList: [],//群组数据集
        query: {},//查询项
        tableData: [],//群组联系人数据集
        isAllChecked: false,//是否全选，默认false,没有选中
        isOperate: false,
        isAdmin: false,//是否为（系统超级管理员、通讯录管理员，以及不在任何群组中的联系人的创建者）
        defaultPageOptions: paginationOptions,//默认批量操作项
        defaultPageValue: '',//默认批量操作
        defaultTHeaderOptions: defaultHeaderOptions,//列表表头项
        customTHeaderOptions: [],
        popoverVisible: false,
        total: 0,
        pageSizes: [10],
        pageSize: 15,
        currentPage: 1,
        percentAge: 0,
        multipleSelection: [],
        msg: {
          add: msg.OPERATE_MSG.SINGLEMSG,
          import: msg.OPERATE_MSG.BATCHMSG,
          export: msg.OPERATE_MSG.EXPORTMSG,
          sort: msg.OPERATE_MSG.SORTMSG,
          dialogTitle: msg.OPERATE_MSG.SINGLEMSG,
        }
      }
    },
    methods: {
      //组件初始化
      loadData() {
        new Promise((resolve, reject) => {
          this.loadPropertyData()
          resolve();
        }).then(() => {
          this.loadTableData();
        })
      },
      //属性初始化
      loadPropertyData() {
        groupApi.getSystemPropertyService(this)
        groupApi.getCustomPropertyService(this)
      },
      //列表初始化
      loadTableData() {
        groupApi.getMemberListService(this)
      },
      //单条添加
      handleSingleAdd() {
        this.$emit('formAdd')
      },
      //批量添加
      handleBatchAdd() {
        this.$emit('batchAdd')
      },
      //导出
      handleExport() {
        this.$emit('export')
      },
      //编辑
      handelEdit(row) {
        this.$emit('formEdit', row)
      },
      //排序
      handleSort() {
        this.$emit('sort')
      },
      //分页事件
      handleCurrentChange(val) {
        var self = this
        self.allChecked = false
        self.currentPage = val
        self.loadData()
      },
      //分页事件
      handleSizeChange(val) {
        var self = this
        self.allChecked = false
        self.pageSize = val
        self.loadData()
      },
      //批量操作
      handlePageOperate(val) {
        if (val == 0) {
          //加入群组
          this.$emit('groupJoin')
        }
        else if (val == 1) {
          //移动
          this.$emit('moveDown')
        }
        else if (val == 2) {
          //
          this.$emit('shiftOut')
        }
        else if (val == 3) {
          //删除
          //只有系统超级管理员、通讯录管理员，以及不在任何群组中的联系人的创建者可以进行联系人删除操作
          this.$emit('Ｍｅｍｂｅｒ')
        }
      },
      //全选
      handleSelectAll(selection) {
        this.isAllChecked = !this.isAllChecked
        if (this.isAllChecked) {
          this.multipleSelection.push(...this.tableData)
        }
        else {
          this.multipleSelection = []
        }
      },
      //全选change事件
      handleChangeSelectAll() {
        if (this.isAllChecked) {
          this.multipleSelection.push(...this.tableData)
          this.tableData.forEach(row => {
            this.$refs['memberTable'].toggleRowSelection(row);
          })
        }
        else {
          this.multipleSelection = []
          this.$refs['memberTable'].clearSelection()
        }
      },
      //选中某一项
      handleSelectRow(selection, row) {
        var flag = false
        for (let i = 0; i < this.multipleSelection.length; i++) {
          var item = this.multipleSelection[i]
          if (item.id == row.id) {
            console.log(11111)
            this.multipleSelection.splice(i, 1)
            flag = true
            break
          }
        }

        if (!flag) {
          this.multipleSelection.push(row)
        }

        console.log(this.multipleSelection)

        if (this.multipleSelection.length == this.tableData.length) {
          this.isAllChecked = true
        }
        else {
          this.isAllChecked = false
        }
      },
      //自定义Table头部
      handleCustomHeaderChange(item) {
        console.log(item)
        var result = []
        this.customTHeaderOptions.forEach(item => {
          if (item.isChecked) {
            result.push(item)
          }
        })

        if (result.length > 3) {
          item.isChecked = false
          this.$x.toast(msg.DEFAULT_MSG.TABLEHEADMSG)
          return
        }
      }
    },
    watch: {
      //树节点变化后, 重新加载
      currectNodeData(newVal) {
        this.groupEntity = newVal;
        this.loadData();
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../../../assets/css/defines.scss";

  .wrap-table {
    position: relative;
    height: 100%;
    z-index: 1;
  }

  .wrap-operate {
    border-bottom: 1px solid #ddd;
  }

  .wrap-inline {
    display: inline-block;
    > .wrap-inline-operate {
      margin-left: 10px;
    }
    button {
      border-radius: 0px;
      margin: 9px 5px;
      padding: 5px 15px;
    }
  }

  .wrap-inline-span {
    margin: 11.5px 0 11.5px 13px;
    font-weight: bolder;
  }

  .wrap-inline-s:last-child {
    margin-right: 0rem;
  }

  .wrap-container {
    display: inline-block;
    vertical-align: middle;
    &.active {
      color: $color-primary;
    }
    span {
      display: block;
      float: left;
      text-align: center;
      width: 24px;
      height: 20px;
      line-height: 20px;
      background: #f56c6c;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
    }
    .list {
      width: 20px;
      height: 24px;
      float: left;
      margin-right: 12px;
      cursor: pointer;
      margin-top: -4px;
    }
  }

  .wrap-pagination {
    margin-top: 20px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .shift-out:hover {
    background-color: #dc711f !important;
  }

  .sort-complete:hover {
    background-color: #dc711f !important;
  }

  .delete-complete {
    color: #f2543c;
    border: 1px solid #f2543c;
    &:hover {
      border: 1px solid #cc4632;
      color: #df4b34;
    }
  }

  .set-member {
    display: flex;
    display: -webkit-flex;
    height: 4rem;
    > .member-left {
      width: 3.2rem;
      height: 100%;
    }
    > .member-body {
      width: 3.2rem;
      padding-left: 0rem;
    }
  }

  .set-member-table {
    margin: 10px 10px 0 10px;
  }

  .set-pagination-operate {
    width: 100%;
    padding-left: .14rem;
    > .select-reset {
      width: 1.5rem;
    }
  }

  .set-pagination {
    margin-top: 0rem;
  }

  .setting-app-tree-container {
    padding: 0 20px;
    .setting-app-tree-left {
      width: 100%;
      padding-top: 10px;
      text-align: left;
      overflow: hidden;
      .setting-app-tree-content {
        overflow: hidden;
        overflow-x: scroll;
      }
    }
  }

  .setting-app-tree-ul {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
  }

  .setting-w50 {
    width: 3rem;
    overflow: hidden;
  }

  .setting-select-tag {
    display: inline-block;
    justify-content: space-between;
    align-items: center;
    margin: 0 .1rem .1rem 0;
    .fa-close {
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
    }
  }

  .setting-close {
    position: relative;
    border-radius: .5rem;
    border: 1px solid red;
    background: red;
    color: #fff;
    top: -16px;
    right: -22px;
    font-size: 15px;
  }
</style>

<style lang="scss">
  .wrap-popper {
    padding: 0 !important;
    min-width: 110px !important;
    .content {
      ul {
        li {
          padding: 7.5px 15px;
          font-size: 12px;
          p {
            color: #616161;
            margin-bottom: 10px;
          }
          span {
            color: #959698;
          }
          &:hover {
            background: #fafafc;
            cursor: pointer;
          }
        }
        li:first-child {
          padding-top: 15px;
        }
        li:last-child {
          padding-bottom: 15px;
        }
      }
    }
  }
</style>
