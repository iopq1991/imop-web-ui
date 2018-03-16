/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/7
** 修改人:
** 修改日期:
** 描 述:
**-----------------------------------------------------------------
******************************************************************/

<template>
  <div class="setting-container full-ctn">
    <div class="vfull-head white-bg sub-title">属性管理</div>
    <div class="vfull-body">
      <div class="full-ctn white-bg">
        <div class="hfull-body">
          <div class="auto-bar">
            <div class="hfull-head sub-title-s"><span>系统属性</span></div>
            <div class="hfull-system">
              <el-button v-for="(item,index) in systemDataSource" :key="index"
                         :class="item.type==1?'hfull-address-btn hfull-default-btn':' hfull-default-btn'">
                {{item.name}}
              </el-button>
            </div>
            <div class="hfull-head sub-title-s clearfix ">
              <span>自定义属性</span>
              <el-button class="pull-right m-l-10 hfull-custom-btn" type="primary" @click="handleSetRequired">
                设置必填项
              </el-button>
              <el-button class="pull-right hfull-custom-btn" type="primary" @click="handleAddCustom">
                新增自定义属性
              </el-button>
            </div>
            <div class="hfull-custom">
              <draggable element="tbody"
                         v-model="customDataSource"
                         :options="dragOptions"
                         :move="handleMove"
                         @update="handleDragEnd">
                         <span class="el-tag hfull-custom-tag"
                               v-for="(item,index) in customDataSource"
                               :class="item.type==1?'el-tag hfull-custom-tag hfull-address-tag':'el-tag hfull-custom-tag'"
                               @dblclick="handleEditProperty"
                               :key="index" closable
                               @close="handleTagClose(item,index)">
                      {{item.name}}
                      <i class="el-tag__close el-icon-close"></i>
                         </span>
              </draggable>
            </div>
          </div>
          <add-dialog ref="addDialog"></add-dialog>
          <req-dialog ref="reqDialog"></req-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import propertyApi from '@/api/property.js'
  import addDialog from './children/propertyAddDialog.vue'
  import reqDialog from './children/propertyReqDialog.vue'
  import draggable from 'vuedraggable'

  const systemData = [
    {name: '姓名', type: 0},
    {name: '性别', type: 0},
    {name: '头像', type: 0},
    {name: '出生日期', type: 0},
    {name: '职能', type: 0},
    {name: '手机', type: 1},
    {name: '邮箱', type: 1},
    {name: '固定电话', type: 1}
  ]

  export default {
    components: {addDialog, draggable, reqDialog},
    data() {
      return {
        systemDataSource: [],
        customDataSource: []
      }
    },
    mounted() {
      this.loadInitData()
    },
    methods: {
      loadInitData() {
        propertyApi.getSystemPropertyService(this)
        propertyApi.getCustomPropertyService(this)
      },
      handleAddCustom() {
        this.$refs['addDialog'].isVisible = true
      },
      handleSetRequired() {
        this.$refs['reqDialog'].isVisible = true
      },
      handleTagClose() {

      },
      handleEditProperty(item) {
        this.$refs['addDialog'].propertyId = item.id
        this.$refs['addDialog'].propertyEntity = item
        this.$refs['addDialog'].isVisible = true
      },
      handleMove(evt) {

      },
      handleDragEnd(evt) {

      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/defines.scss";

  $title-height: .73rem;
  .setting-container {
    > .vfull-head {
    }
    > .vfull-body {
      padding-top: $title-height;
    }
  }

  .white-bg {
    background: #fff;
  }

  .hfull-system, .hfull-custom {
    margin: 10px 32px 0 22px;
  }

  .sub-title {
    padding: 0.2rem 0.2rem;
    border: 1px solid $gray-border-color;
    font-size: .16rem;
  }

  .sub-title-s {
    padding: 0.2rem 0.2rem 0.16rem 0.2rem;
    border-bottom: 1px solid $gray-border-color;
    font-size: $font-size;
    font-weight: bolder;
    > span {
      border-left: 2px solid $color-primary;
      padding-left: .1rem;
      font-size: $font-size;
      color: $lmenu-color;
    }
  }

  .hfull-default-btn {
    width: .8rem;
    margin: .1rem;
    color: $lmenu-color;
    border: 1px solid $light-border-color;
  }

  .hfull-custom-btn {
    background-color: $color-primary;
    border-color: $color-primary;
  }

  .hfull-address-btn {
    border: 1px solid $address-boder-color;
  }

  .hfull-custom-tag {
    background-color: $tag-bg;
    border-color: $tag-bd-color;
    color: $color-primary;
    margin: .1rem;
    min-width: .8rem;
    text-align: center;
  }

  .hfull-address-tag {
    border-color: $color-primary;
  }
</style>
<style lang="scss">
  @import "../../assets/css/defines.scss";

  .hfull-custom-tag {
    > .el-icon-close {
      background-color: inherit;
      color: $color-primary;
    }

    > .el-icon-close:hover {
      background-color: $color-primary;
      color: #fff;
    }
  }
</style>



