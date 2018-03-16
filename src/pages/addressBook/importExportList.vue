
<template>
  <div class="importExportList full-ctn">
      <div class="sub-title">结果导入导出列表</div>
      <div class="importExportList-con ">
           <div class="white-bg p-20">
             <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="导入列表" name="first">
                      <div class="">
                              <div class="p-20 clearfix">
                                  <el-input
                                      placeholder="请输入任务编号回车搜索"
                                      class="pull-right"
                                      style="width:250px"
                                      suffix-icon="el-icon-search"
                                      clearable
                                      v-model="searchKey">
                                  </el-input>
                                  <span class="pull-right m-r-20">
                                      <span>操作员：</span>
                                      <el-input
                                          placeholder="请输入名称回车搜索"
                                          style="width:180px"
                                          suffix-icon="el-icon-search"
                                          clearable
                                          v-model="searchKey">
                                      </el-input>
                                  </span>
                                  <span class="pull-right m-r-20">
                                     <span>时间：</span>
                                      <el-date-picker
                                        v-model="beginTime"
                                        type="date"
                                        style="width:130px"
                                        placeholder="选择日期">
                                      </el-date-picker>
                                      <span>~</span>
                                      <el-date-picker
                                        v-model="endTime"
                                        style="width:130px"
                                        type="date"
                                        placeholder="选择日期">
                                      </el-date-picker>
                                  </span>
                              </div>
                      </div>
                      <el-table
                          v-loading="importTableLoading"
                          element-loading-text="拼命加载中"
                          ref="listTable"
                          :data="importTableData"
                          style="width: 100%"
                          tooltip-effect="dark"
                          class="">
                          <el-table-column
                            prop="name"
                            label="导入时间"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="操作员"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="导入数"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="成功数"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="失败数"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            label="操作"
                            width="100"
                            align="center">
                            <template slot-scope="scope">
                              <el-button
                                type="text"
                                size="small">
                                下载导入结果</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <footer class="m-t-20 clearfix" >
                          <!-- v-if="pageParam.total > 0" -->
                          <el-pagination
                            class="pull-right"
                            @size-change="handleSizeChange"
                            @current-change="handlePageChange"
                            :current-page="pageParam.currentPage"
                            :page-sizes="pageParam.pageSizeList"
                            :page-size="pageParam.pageSize"
                            layout="sizes,total,jumper, prev, pager , next"
                            :total="pageParam.total">
                          </el-pagination>
                        </footer>
                </el-tab-pane>
                <el-tab-pane label="导出列表" name="second" class="second-tab-pane">
                    <div class="">
                      <div class="p-20 clearfix">
                          <el-input
                              placeholder="请输入任务编号回车搜索"
                              class="pull-right"
                              style="width:250px"
                              suffix-icon="el-icon-search"
                              clearable
                              v-model="searchKey">
                          </el-input>
                          <span class="pull-right m-r-20">
                              <span>操作员：</span>
                              <el-input
                                  placeholder="请输入名称回车搜索"
                                  style="width:180px"
                                  suffix-icon="el-icon-search"
                                  clearable
                                  v-model="searchKey">
                              </el-input>
                          </span>
                          <span class="pull-right m-r-20">
                             <span>时间：</span>
                              <el-date-picker
                                v-model="beginTime"
                                type="date"
                                style="width:130px"
                                placeholder="选择日期">
                              </el-date-picker>
                              <span>~</span>
                              <el-date-picker
                                v-model="endTime"
                                style="width:130px"
                                type="date"
                                placeholder="选择日期">
                              </el-date-picker>
                          </span>
                      </div>
                    </div>
                    <el-table
                        v-loading="importTableLoading"
                        element-loading-text="拼命加载中"
                        ref="listTable"
                        :data="importTableData"
                        style="width: 100%"
                        tooltip-effect="dark"
                        class="">
                        <el-table-column
                          prop="name"
                          label="导出时间"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="导入文件名"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="类型"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="操作员"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="100"
                          align="center">
                          <template slot-scope="scope">
                            <el-button
                              type="text"
                              size="small">
                              下载</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <footer class="m-t-20 clearfix" >
                        <!-- v-if="pageParam.total > 0" -->
                        <el-pagination
                          class="pull-right"
                          @size-change="handleSizeChange"
                          @current-change="handlePageChange"
                          :current-page="pageParam.currentPage"
                          :page-sizes="pageParam.pageSizeList"
                          :page-size="pageParam.pageSize"
                          layout="sizes,total,jumper, prev, pager , next"
                          :total="pageParam.total">
                        </el-pagination>
                      </footer>
                </el-tab-pane>
             </el-tabs>
           </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        activeName:'first',
        searchKey:'',
        beginTime:'',
        endTime:'',
        pageParam:{
           total:0,
           pageSize:10,
           pageSizeList:[10,20,50],
           currentPage:1
       },
       importTableLoading:false,
       importTableData:[
         {}
       ],
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
      handleTabClick(){

      },
      handleSizeChange(val){  //表格size改变
         this.pageParam.pageSize = val;
         this.getList();
      },
      handlePageChange(val){  //页码改变
         this.pageParam.currentPage = val;
         this.getList();
      },
      getList(){

      }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/defines.scss";
  .importExportList{
       height: 100%;
       .white-bg{
          height: 100%;
          background-color: $color-bg-white;
       }
       .header{
          margin-left: 20px;
       }
       .importExportList-con{
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
           padding: 0.2rem 0.3rem;
           border: 1px solid $gray-border-color;
           font-size: .16rem;
           background-color: $color-bg-white;
           position: absolute;
           top: 0;
           width: 100%;
           z-index: 1;
       }
  }

</style>
<style lang="scss">
  @import "../../assets/css/defines.scss";
  .importExportList{
      .el-tabs__nav #tab-second:before{
          content: '';
          width: 1px;
          height: 14px;
          left: 0;
          top: 12px;
          position: absolute;
          background-color: $light-border-color;
      }
      .el-tabs__nav-wrap::after{
          background-color: $light-border-color;
          height: 1px;
      }
  }
</style>
