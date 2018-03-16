<template>
  <el-dialog
    ref="dialog"
    :title="title"
    :visible.sync="isVisible"
    width="550px"
    class="create-group-dialog"
    @close="handleCloseDialog" @open="handleOpenDialog">
    <div class="create-group">
      <header class="group-head">
        <el-form :label-position="'top'" label-width="70px" ref="createGroupForm" :rules="rules" :model="groupForm">
          <el-form-item label="新建" prop="groupName">
            <el-input v-model="groupForm.groupName" placeholder="请输入群组名称"></el-input>
          </el-form-item>
        </el-form>
      </header>
      <div class="group-body">
        <div class="full content">
          <div class="create-group-title clearfix">
            <span>为<span class="m-l-5 m-r-5 selectedGroup">{{selectedGroup.length>0?selectedGroup[0].name:''}}</span>的</span>
            <el-select v-model="groupLevel" placeholder="请选择" class="pull-right">
              <el-option
                v-for="item in groupLevelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <core-tree ref="coreTree"
                     v-loading="ztreeLoading"
                     :dataSource="dataSource"
                     :isOperate="isOperate"
                     :isExpand="isExpand"
                     class="p-t-10 groupZtree"
                     @loadSubNodes="loadSubNodes"
                     @itemClick="handleItemClick">
          </core-tree>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer create-group-footer setting-app-btn">
      <el-button type="primary" @click="handleSave('createGroupForm')">确 定</el-button>
      <el-button class="bt-cancel" @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import msg from '@/assets/js/msg.js';
  import defaultUrls from '@/assets/js/defaultUrls.js'
  import coreTree from '@/components/tree/treeCore.vue'
  import Vue from 'vue'
  const treeData = [{
    id: 10,
    name: "上海帜训科技股份有限公司",
    childNodes: [{
      id: 1,
      name: "上海总部",
      childNodes: [],
      checked: false
    }, {
      id: 2,
      name: "南京分公司",
      childNodes: [],
      checked: false
    }],
    checked: false
  }]
  export default {
    name: 'create-group',
    components: {coreTree},
    data() {
      return {
        title: '新建群组',
        isVisible: false,
        isExpand: false,//只有点箭头图标的时候才会展开或者收缩节点
        isClose: 0,//1:关闭  2：保存 3：取消
        selectedData: [],
        selectedGroup:[],
        dataSource: [],
        groupForm: {
            groupName:''
        },//群组名称,
        groupLevelList:[
            {label:'平级群组',value:0},
            {label:'下级群组',value:1}
        ], //选择群组等级
        groupLevel:0, //群组等级
        ztreeLoading:false,
        rules:{
            groupName:{ required: true, message: '请输入群组名称', trigger: 'blur' },
        }
      }
    },
    props: {
      isOperate: { //树形节点是否需要重新染 默认false,渲染成带打钩;true,渲染成带有操作按钮
          type: Boolean,
          default: false
      },
      multiSelect:{   //是否点击多选
        type: Boolean,
        default: false
      }
    },
    methods: {
        handleCloseDialog(){
            this.selectedData = [];
            this.dataSource = [];
            this.selectedGroup = [];
            this.isVisible = false;
            this.$refs['createGroupForm'].resetFields();
        },
        handleOpenDialog(){
            this.isVisible = true
            this.loadInitTree();
        },
        loadInitTree() {
            var that = this;
            this.$nextTick(function () {
                that.ztreeLoading = false;
                that.$x.post(defaultUrls.getOrgSubNodes, {id:''}).then(res => {
                    that.ztreeLoading = false;
                    if (res.success) {
                       that.dataSource = res.data;
                    } else {
                       that.$message({
                         showClose: true,
                         type: 'error',
                         message: res.errorMsg
                       });
                    }
                }).catch(res => {
                    that.ztreeLoading = false;
                })
                that.dataSource =  JSON.parse(JSON.stringify(treeData));
                that.$emit('loadInitDialogTree')
                console.log(JSON.stringify(that.dataSource));
            })
        },
        loadSubNodes(node, resolve) {
        //  this.$emit('loadSubNodes', node, resolve)
        },
        handleItemClick(node, currentNode){
          var that = this;
          this.validHasGroupNodeData(node.data)
          if (currentNode.length > 1) {
            currentNode.forEach(function (item) {
              item.checked = !item.checked
            })
          }else {
            node.data.checked = !node.data.checked
          }
          this.selectedGroup = [];
          this.selectedData.forEach(function(item){
                if(item.checked){
                      that.selectedGroup.push(item);
                }
          })
        },
        handleSave(formName){
            let that = this;
            let params = {
                name: that.groupForm.groupName,
                groupLevel: that.groupLevel,
                groupId:10
            };
            this.$refs[formName].validate((valid) => {
                  if (valid) {
                    if(that.selectedGroup.length == 0){
                        that.$message({
                            showClose: true,
                            type: 'info',
                            message: '请选择群组'
                        });
                        return false
                    }
                    that.$x.post(defaultUrls.getOrgSubNodes,params).then(res => {
                        that.ztreeLoading = false;
                        if (res.success) {
                            that.$message({
                                showClose: true,
                                type: 'success',
                                message: res.errorMsg
                            });
                            that.isVisible = false;
                            that.$emit('createGroupSuccess',[].push(params));
                        } else {
                            that.$message({
                               showClose: true,
                               type: 'error',
                               message: res.errorMsg
                            });
                        }
                    }).catch(res => {
                        that.ztreeLoading = false;
                    })
                  }
            });
            console.log(params)
        },
        handleCancel(){
            this.isVisible = false;
            this.$refs['createGroupForm'].resetFields();
        },
        validHasGroupNodeData(data) {
          var that = this
          var flag = true
          for (var i = 0; i < that.selectedData.length; i++) {
            var item = that.selectedData[i]
            //是否多选
            if (item.id != data.id && !that.multiSelect) {
              that.selectedData[i].checked = false
            }

            if (item.id == data.id) {
              flag = false
            }
          }
          if (flag) {
            that.selectedData.push(data)
          }
        }
    },
    mounted(){

    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/css/defines";

    .create-group {
      > .group-head {
        width: 100%;
        position: relative;
      }
      > .group-body {
        width: 100%;
        position: relative;
        > .content {
          margin: 10px 0 0 0;
          border: 1px solid #ddd;
        }
      }
      .selectedGroup{
         color: $color-primary;
      }
    }
    .create-group-title {
      padding: .115rem;
      border-bottom: 1px solid #ddd;
      background: $tag-bg-color;
      span {
        font-weight: bolder;
      }
      > .create-group-icon {
        color: $color-primary;;
      }
      > .input-reset {
        width: 3rem !important;
      }
    }
    .create-group-footer {
      text-align: center;
    }
    .groupZtree{
        height: 3rem;
        overflow: auto;
    }
</style>
<style  lang="scss">
     .create-group-dialog{
         .el-dialog__body{
            padding: 10px 20px;
         }
     }

</style>
