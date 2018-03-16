/*****************************************************************
** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
** 创建人:      hc
** 创建日期:    2018/2/7
** 修改人:
** 修改日期:
** 描 述:
**     props：
**        nodeData:节点数据
**		    treeNode:节点node
**		   treeStore:节点Store
**	 renderOperate:默认false：需要操作项;true：与之相反
**
**     methods：
**               handleOpreateCommand:操作项事件
**
**-----------------------------------------------------------------
******************************************************************/
<template>
    <span class="op-span-item">
      <span :class="showClass">
        <span class="op-span-icon">
          <svg-icon v-if="treeNode.level!=1" iconClass="grouping" className="grouping"></svg-icon>
          <svg-icon v-else iconClass="all" className="all"></svg-icon>
        </span>
        <span class="op-span-label">{{treeNode.label}}</span>
      </span>

      <span class="op-span-operate" v-if="renderOperate" @click.stop>
         <el-dropdown trigger="click"
                      @command="handleOpreateEvent">
           <span class="pull-left op-span-down"><svg-icon iconClass="down" className="down"></svg-icon></span>
           <el-dropdown-menu slot="dropdown" class="op-dropdown">
             <el-dropdown-item command="1" v-if="treeNode.level!=1">{{operateMsg.add}}</el-dropdown-item>
             <el-dropdown-item command="2" v-if="treeNode.level!=1">{{operateMsg.edit}}</el-dropdown-item>
             <el-dropdown-item command="3">{{operateMsg.delete}}</el-dropdown-item>
             <el-dropdown-item command="4" hidden><span
               :class="statisticsType==1?'op-span-check':'op-span-check-none'"><svg-icon
               iconClass="check" className="check"></svg-icon></span>{{operateMsg.only}}</el-dropdown-item>
             <el-dropdown-item command="5" hidden><span :class="statisticsType==2?'op-span-check':'op-span-check-none'">
               <svg-icon iconClass="check"
                         className="check"></svg-icon></span>{{operateMsg.multiple}}</el-dropdown-item>
             <el-dropdown-item command="6" v-if="treeNode.level!=1">{{operateMsg.import}}</el-dropdown-item>
             <el-dropdown-item command="7" v-if="treeNode.level!=1">{{operateMsg.moveDown}}</el-dropdown-item>
             <el-dropdown-item command="8">{{operateMsg.empty}}</el-dropdown-item>
           </el-dropdown-menu>
        </el-dropdown>
      </span>
  	</span>
</template>
<script>
  import Vue from 'vue'
  import msg from '@/assets/js/msg.js'
  import defaultUrls from '@/assets/js/defaultUrls.js'
  import SvgIcon from "../SvgIcon/index.vue";

  export default {
    components: {SvgIcon},
    data() {
      return {
        operateMsg: {
          add: msg.OPERATE_MSG.ADDGROUPNAMEMSG,
          edit: msg.OPERATE_MSG.EDITGROUPNAMEMSG,
          delete: msg.OPERATE_MSG.DELETEMSG,
          only: msg.OPERATE_MSG.ONLYOPERATEMSG,
          multiple: msg.OPERATE_MSG.MULTIPLENODEMSG,
          import: msg.OPERATE_MSG.BATCHMSG,
          moveDown: msg.OPERATE_MSG.MOVEDOWNMSG,
          empty: msg.OPERATE_MSG.EMPTYMSG
        },
        statisticsType: 1,//统计类型1、仅针对当前群组 2、针对当前群组及子级
        operateType: 0//操作类型
      }
    },
    props: {
      nodeData: Object,
      treeNode: Object,
      treeStore: Object,
      renderOperate: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleOpreateEvent(command) {
        var self = this
        self.operateType = command
        if (command == 1) {
          self.$emit('appendClick', self.treeNode, self.treeStore)
        }
        else if (command == 2) {
          self.$emit('editClick', self.treeNode, self.treeStore)
        }
        else if (command == 3) {
          self.$emit('deleteClick', self.treeNode, self.treeStore)
        }
        else if (command == 4) {
          self.statisticsType = 1
          self.$emit('statistics', self.treeNode, self.statisticsType)
        }
        else if (command == 5) {
          self.statisticsType = 2
          self.$emit('statistics', self.treeNode, self.statisticsType)
        }
        else if (command == 6) {
          self.$emit('importClick', self.treeNode, self.treeStore)
        }
        else if (command == 7) {
          self.$emit('moveDownClick', self.treeNode, self.treeStore)
        }
        else if (command == 8) {
          self.$emit('moveEmptyClick', self.treeNode, self.treeStore)
        }
      }
    },
    computed: {
      showClass() {
        if (this.treeNode.data.selected && this.treeNode.data.highLight) {
          return 'op-span-check op-span-highLight'
        }

        if (this.treeNode.data.selected && !this.treeNode.data.highLight) {
          return 'op-span-check'
        }

        if (!this.treeNode.data.selected && this.treeNode.data.highLight) {
          return 'op-span-highLight'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/defines.scss";

  $font-size: 14px;

  .mbr-tree {
    .el-tree-node__content:hover {
      position: relative;
      .op-span-operate {
        display: inline-block;
      }
    }
  }

  .op-span-item {
    width: 100%;
    position: relative;
    > .op-span-operate {
      margin-left: 0.1rem;
      display: none;
      position: absolute;
      right: 0.1rem;
      top: 0.03rem;
      > .input-reset {
        width: 4rem !important;
      }
    }

    > .op-span-check {
      border: 1px solid #f67a17;
      padding: 2px 10px;
      background: #fde4de;
    }

    > .op-span-highLight {
      padding: 2px 10px;
      background: #fde4de;
    }
  }

  .op-dropdown {
    > .el-dropdown-menu__item {
      padding: 5px 15px;
    }
    > .el-dropdown-menu__item:first-child {
      padding-top: 2px;
    }
    > .el-dropdown-menu__item:last-child {
      padding-bottom: 2px;
    }
  }

  .op-span-label {
    display: inline-block;
    overflow: hidden;
    word-break: break-all;
    box-sizing: border-box;
    text-overflow: ellipsis;
    line-height: 16px;
    font-size: $font-size;
    position: relative;
    top: .025rem;
    width: 70%;
  }

  .op-span-icon {
    color: $color-primary;
    font-size: $font-size;
    > svg {
      fill: $color-primary;
    }
  }

  .op-span-down {
    color: $color-bg-operate;
  }

  .op-span-check {
    color: $color-primary;
    margin-right: .1rem;
    > .op-span-label {
      width: auto;
    }
  }

  .op-span-check-none {
    color: #fff;
    margin-right: .1rem
  }

  .grouping, .all {
    font-size: $font-size;
  }

  .down {
    width: .16rem;
    height: .16rem;
  }

</style>
