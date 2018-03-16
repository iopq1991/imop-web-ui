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
      <div class="sub-title"><el-button icon="el-icon-arrow-left">返回</el-button><span class="m-l-20 font-s-16">批量导入</span></div>
      <div class="batchImport-con ">
           <div class="white-bg p-20">
               <p class="bold">为您上的文件匹配字段描述</p>
               <el-alert
                    title="请为您的每一列联系人属性选择正确的字段描述，如果没有满足您的要求，可自定义或忽略它。手机、微信、邮箱不能同时为空。"
                    :closable="true"
                    class="m-t-10"
                    type="warning">
               </el-alert>
               <div class="m-t-10 clearfix">
                    <el-button type="primary" plain>忽略表头</el-button>
                    <span class="m-l-10">您的表格可能包含表头（表格第一项），您可以点击此按钮去除，避免将表头导入</span>
                    <span class="pull-right">已导入<span>x</span>列</span>
               </div>
               <div class="m-t-20">
                    <table>
                          <thead>
                              <tr>
                                  <th>
                                    <el-dropdown :hide-on-click="false" @visible-change="handleVisibleChange">
                                        <span class="el-dropdown-link">
                                          一级群组<i class="el-icon-caret-bottom" :class=""></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                  </th>
                                  <th>
                                      <el-dropdown :hide-on-click="false">
                                          <span class="el-dropdown-link">
                                            二级群组<i class=" el-icon-caret-bottom"></i>
                                          </span>
                                          <el-dropdown-menu slot="dropdown">
                                              <el-dropdown-item>黄金糕</el-dropdown-item>
                                              <el-dropdown-item>狮子头</el-dropdown-item>
                                              <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                          </el-dropdown-menu>
                                      </el-dropdown>
                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          姓名<i class=" el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          手机<i class="el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          邮箱<i class="el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          生日<i class="el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          性别<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          自定义<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                  </th>
                                  <th>
                                    <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                          一级群组<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>11</td>
                                  <td>22</td>
                                  <td>33</td>
                                  <td>44</td>
                                  <td>55</td>
                                  <td>66</td>
                                  <td>77</td>
                                  <td>88</td>
                                  <td>99</td>
                              </tr>
                          </tbody>
                    </table>
                    <div class="p-t-20 p-b-10">
                         <span class="m-r-20">联系人信息相同时:</span>
                         <el-radio-group v-model="havePersonStatus"  >
                            <el-radio :label="3" size="medium">生成新联系人</el-radio>
                            <el-radio :label="6" size="medium">覆盖</el-radio>
                            <el-radio :label="9" size="medium">不导入</el-radio>
                         </el-radio-group>
                    </div>
                    <el-alert
                         title="联系人手机号码相同时，即为信息相同"
                         :closable="true"
                         class="m-t-10"
                         type="warning">
                    </el-alert>
                    <el-button type="primary" class="m-t-20">确认导入</el-button>
               </div>
           </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        activeCaretVisible:false,
        havePersonStatus:null,
        importList:[
            {name:""}
        ]
    }
  },
  props: {
      businessId: {     //业务方调用id
          type: String,
          default: null
      }
  },
  methods:{
      handleVisibleChange(){

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
           margin-bottom: 0.14rem;
           padding: 0.145rem 20px;
           border: 1px solid $gray-border-color;
           font-size: .16rem;
           background-color: $color-bg-white;
           position: absolute;
           top: 0;
           width: 100%;
           z-index: 2;
       }
       table{
           width: 100%;
           border-collapse:collapse;
           border-spacing:0;
           border:0;
           thead{
               th{
                    padding: 10px 10px;
                    text-align: center;
                    background-color: $table-head-color;
                    border-top:1px solid $light-border-color;
                    border-bottom:1px solid $light-border-color;
               }
           }
           tbody{
               tr{

               }
               td{
                    padding: 10px 10px;
                    text-align: center;
                    border-bottom:1px solid $tbody-boder-color;
               }
               tr:hover > td{
                    background-color: #f5f7fa;
               }
           }
       }

  }

</style>
