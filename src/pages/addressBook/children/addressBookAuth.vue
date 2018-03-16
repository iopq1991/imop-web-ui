/*****************************************************************
*     参数:
*      props：
*         businessId:'1'  //string类型，非必填，业务方调用id
*     事件：
*      emit：
*
******************************************************************/

<template>
  <div class="addressBookAuth">
      <core-tree ref="coreTree" class="content-tree"
                 :dataSource="dataSource"
                 :isOperate="isOperate"
                 :isExpand="isExpand"
                 @loadSubNodes="loadSubNodes"
                 @itemClick="handleItemClick">
      </core-tree>
  </div>
</template>

<script>
import coreTree from '@/components/tree/treeCore.vue';
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
}];
export default {
  name: 'address-book-auth',
  components: {coreTree},
  data() {
    return {
        dataSource:[],
        isOperate:true,
        isExpand:true,
    }
  },
  props: {
      businessId: {     //业务方调用id
          type: String,
          default: null
      }
  },
  methods:{
      clickBack(){
          this.$emit('clickBackBtn');
      },
      handleItemClick(){

      },
      loadSubNodes(){

      }
  },
  mounted(){
      this.$nextTick(function(){
            this.dataSource = treeData;
      })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/defines.scss";
  .batchImport{

  }

</style>
