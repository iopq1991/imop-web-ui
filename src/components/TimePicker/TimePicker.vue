<template>
  <div class="time" @click.stop="">
    <div @click="showTimePick" class="value cursor p-l-15"><span>{{timeValue}}</span><span v-show="timeValue.length" @click.stop="empty" class="fr close p-r-5 el-icon-close"></span></div>
    <div v-show="showTab" class="content">
      <div class="time-tab clearfix">
        <div class="fl text-center" :class="{active:mode==='m'}" @click="changeMode('m')">按月</div>
        <div class="fl text-center" :class="{active:mode==='d'}" @click="changeMode('d')">按日</div>
      </div>
      <el-date-picker value-format="yyyy-MM" @change="selectMonth" name="m" v-show="mode==='m'" ref="month" v-model="timeMonth" type="month"></el-date-picker>
      <el-date-picker value-format="yyyy-MM-dd" @change="selectDay" name="dd" :unlink-panels="true" v-show="mode==='d'" ref="day" v-model="timeDay" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </div>
  </div>
</template>

<script>
  let event = null
  export default {
    name: "timePicker",
    data() {
      return {
        timeMonth: '',
        timeDay:'',
        timeValue: '',
        mode: 'm',
        showTab: false,
      }
    },
    props: {
      startTime:{
        type:String,
        default:''
      },
      endTime:{
        type:String,
        default:''
      },
    },
    mounted() {
      event = () => {
        this.showTab = false
      }
      document.body.addEventListener('click', event)
    },
    beforeDestroy() {
      document.body.removeEventListener('click', event)
    },
    methods: {
      showTimePick() {
        this.showTab = true
        this.mode = 'm'
        this.$nextTick(() => {
          this.$refs.month.focus()
        })
      },
      changeMode(mode) {
        this.mode = mode
        this.showTab = true
        this.$nextTick(() => {
          document.querySelector('input[name=' + mode + ']').focus()
        })
      },
      selectMonth(time) {
        if(!time) return
        let [year, month] = time.split('-')
        let lastDay = new Date(year, month, 0)
        this.showTab = false
        this.timeValue = time
        this.$emit('update:startTime',year + '-' + month +'-'+ '01')
        this.$emit('update:endTime',year + '-' + month + '-' + lastDay.getDate())
      },
      selectDay(time){
        if(!time || !time.length) return
        this.timeValue = time.join("~")
        this.$emit('update:startTime',time[0])
        this.$emit('update:endTime', time[1])
        this.showTab = false
      },
      empty(){
        this.$emit('update:startTime','')
        this.$emit('update:endTime', '')
        this.timeValue = ''
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .time {
    .value {
      border: 1px solid #dcdfe6;
      width: 100%;
      border-radius: 4px;
      line-height: 32px;
      height: 32px;
      span{
        font-size: 12px;
      }
    }
    position: relative;
    .time-tab {
      position: absolute;
      z-index: 10;
      line-height: 32px;
      width: 100%;
      border: 1px solid #dcdfe6;
      background-color: #fff;
      border-top: none;
      div {
        width: 50%;
        cursor: pointer;
        &.active {
          background-color: #48b0f7;
          color: #fff;
        }
      }
    }
    .el-date-editor {
      position: absolute;
      width: 100%;
      height: 27px;
    }
    .close{
      line-height: 30px;
      &:hover{
        color: darkgray;
      }
    }
  }
</style>
