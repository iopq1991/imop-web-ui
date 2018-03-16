<template>
  <div class="industries">
    <div class="tag-list">
      <span class="tag label label-info" v-for="(item,i) in checkedIndustries" :key="item.id">{{item.name}}
        <span v-if="!preview" @click="delChecked(i,item.id)" class="cursor el-icon-close"></span>
      </span>
    </div>
    <div class="tag-panel m-t-10">
      <span @click="arrowLeft" class="el-icon-caret-left  arrow cursor"></span>
      <span @click="arrowRight" class="el-icon-caret-right arrow cursor"></span>
      <div class="industry-panel clearfix">
        <ul class="clearfix" :style="{left:(moveDistance + 'px'),width:(maxLength * EACH_WIDTH + 'px')}">
          <li class="fl" v-for="(industry,index) in industries" :key="industry.parentId"
              :class="{active:index=== industrySelect}">
            <span @click="selectIndustry(index)" class="cursor">{{industry.name}}</span>
          </li>
        </ul>
      </div>
      <div class="sub-industry">
        <el-checkbox-group :disabled="preview" v-model="checkedIds" :max="max">
          <el-checkbox  @change="selectSubIndustry($event,item)" :label="item.id" v-for="item in subIndustries" :key="item.id">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'industries',
    data() {
      return {
        industrySelect: 0,
        moveDistance: 0,
        maxWidth: 1600,
        moveRecord: 0,
        EACH_WIDTH: 85,
        checkedIndustries: [],
        checkedIds: []
      }
    },
    props: {
      max: {
        type: Number,
      },
      checkedList: {
        type: Array,
        default :()=> []
      },
      preview: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      industries() {
        return this.$store.state.common.industries
      },
      maxLength() {
        return this.$store.state.common.industries.length + 1
      },
      subIndustries() {
        return this.$store.state.common.industries.length && this.$store.state.common.industries[this.industrySelect]['subTypes'] || []
      }
    },
    created() {
      if (!this.industries.length) {
        this.$store.dispatch('common/getIndustries')
      }
    },
    methods: {
      selectIndustry(index) {
        this.industrySelect = index
      },
      arrowLeft() {
        if (this.moveRecord >= (this.maxLength - 10)) return
        this.moveRecord++
        this.moveDistance -= this.EACH_WIDTH
      },
      arrowRight() {
        if (!this.moveRecord) return
        this.moveRecord--
        this.moveDistance += this.EACH_WIDTH
      },
      selectSubIndustry(check, item) {
        let index = this.checkedIndustries.findIndex(industry => industry.id === item.id)
        check ? this.checkedIndustries.push(item) : this.checkedIndustries.splice(index, 1)
        this.$emit('update:checkedList',  this.checkedIndustries.map(item=>item.id));
      },
      delChecked(index, industryId) {
        this.checkedIndustries.splice(index, 1)
        this.checkedIds = this.checkedIds.filter(id => id !== industryId);
        this.$emit('update:checkedList',  this.checkedIndustries.map(item=>item.id));
      }
    },
    watch: {
      // checkedIndustries(list) {
      //   console.log(list);
      //   list=list.map(item=>item.id)
      //   this.$emit('update:checkedList', list)
      // },
      defaultList(list) {
        if (list.length) {
          this.checkedIndustries = [...list]
        }
      },
      checkedList(data){
        const list=[];
        data.forEach((check)=>{
          this.industries.forEach((item)=>{
            item.subTypes.forEach((sub)=>{
              if(sub.id==check){
                list.push(sub);
              }
            })
          })
        });
        this.checkedIndustries=list;
        this.checkedIds=data;
      }
    }
  }
</script>
<style lang='scss' scoped rel='stylesheet/scss' type='text/scss'>
  @import "src/assets/css/defines.scss";

  .industries {
    display: inline-block;
  }

  .tag {
    display: inline-block;
    margin-top: 2px;
    margin-right: 10px;
    line-height: 16px;
    padding: 4px 9px;
    color: white;
    font-weight: normal;
    background-color: $btn;
    font-size: 12px;
    border-radius: 4px;
  }

  .tag-panel {
    background-color: #f0f0f0;
    width: 800px;
    padding: 0 5px 5px 5px;
    position: relative;
  }

  .industry-panel {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    position: relative;
    ul {
      padding-left: 15px;
      position: absolute;
    }
    li {
      padding: 0 15px;
      height: 50px;
      max-width: 85px;
      span {
        color: rgba(98, 98, 98, 0.7);
      }
      &.active, &:hover {
        border-bottom: 3px solid $mainBg;
        span {
          color: #000;
        }
      }
    }
  }

  .arrow {
    width: 20px;
    margin-top: 10px;
    margin-left: -5px;
    font-size: 16px;
    line-height: 30px;
    position: absolute;
    height: 30px;
    z-index: 9;
    background-color: #e6e6e6;
    &.el-icon-caret-right {
      text-align: right;
      right: 0;
    }
  }

  .sub-industry {
    background-color: #fff;
    padding: 10px 10px 7px 10px;
  }
</style>
<style lang='scss' rel='stylesheet/scss' type='text/scss'>
  .industries {
    .el-checkbox, .el-checkbox + .el-checkbox {
      margin: 0 30px 5px 0;
    }
    .el-checkbox__label {
      font-size: 12px;
    }
  }
</style>
