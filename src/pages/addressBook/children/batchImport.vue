/*****************************************************************
*     参数:
*      props：
*         businessId:'1'  //string类型，非必填，业务方调用id
*         importList: [    //Array类型，非必填，导入的目标群组list
*             {name:'帜讯公司南京',groupId:12}
*         ]
*     事件：
*      emit：
*        loadSubNodes：加载子节点
*                参数：node resolve
******************************************************************/

<template>
  <div class="batchImport full-ctn">
      <div class="sub-title"> <el-button icon="el-icon-arrow-left" @click="clickBack()">返回</el-button> <span class="m-l-10 font-s-16">批量导入</span></div>
      <div class="batchImport-con ">
           <div class="white-bg p-20">
             <p>文件中的联系人将被导入至</p>
             <div class="p-t-20 p-b-20 import-border-bottom" >
                 <!-- <el-button >
                   <i><svg-icon iconClass="operator" className="svg-icon-operator font-s-14"></svg-icon></i>
                   安康市党委</el-button> -->
                   <el-tag size="medium">
                     <i><svg-icon iconClass="operator" className="svg-icon-operator font-s-14"></svg-icon></i>
                     安康市党委
                   </el-tag>
                 <el-button type="text">修改</el-button>
             </div>
             <div class="m-t-10">
                 <el-alert
                      title="支持文件格式：XLS、XLSX、CSV"
                      :closable="false"
                      type="warning">
                 </el-alert>
                  <el-button type="primary" class="m-t-10">
                    <svg-icon iconClass="upLoadFile" className="svg-icon-upLoadFile font-s-14"></svg-icon>
                    上传文件</el-button>
                  <el-button type="text" class="m-t-10">下载模板</el-button>
                  <el-button type="text" class="m-t-10" @click="handleCreateGroup()">新建群组</el-button>
             </div>
           </div>
      </div>
      <create-group ref="createGroupDialog" :multiSelect="false"></create-group>
  </div>
</template>

<script>
import createGroup from './createGroup.vue';
export default {
  components: {createGroup},
  data() {
    return {

    }
  },
  props: {
      businessId: {     //业务方调用id
          type: String,
          default: null
      },
      importList:{
          type: Array,
          default: function(){
            return [];
          }
      }
  },
  methods:{
      handleCreateGroup(){
         var that = this;
         that.$refs['createGroupDialog'].isVisible = true;
      },
      clickBack(){
         this.$emit('clickBackBtn');
      }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/defines.scss";
  .batchImport{
       height: 100%;
       .white-bg{
          height: 100%;
          background-color: $color-bg-white;
       }
       .header{
          margin-left: 20px;
       }
       .batchImport-con{
          position: absolute;
          padding-top: 0.75rem;
          height: 100%;
          width: 100%;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          z-index: 1;
       }
       .sub-title {
           margin-bottom: .14rem;
           padding: .145rem .3rem;
           border: 1px solid $gray-border-color;
           font-size: .16rem;
           background-color: $color-bg-white;
           position: absolute;
           top: 0;
           width: 100%;
           z-index: 2;
       }
       .import-border-bottom{
          border-bottom:1px solid #e7e7e7
       }
       .svg-icon-operator{
          color: $color-primary;
       }
  }

</style>
