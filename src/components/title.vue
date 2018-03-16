<template>
  <div class="title-container">
    <div><span>{{title}}</span></div>
  </div>
</template>

<script>
  export default {
    name: "vTitle",
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/assets/css/defines.scss';
  .title-container {
    >div{
      position:relative;
      &:before{
        content:' ';
        position:absolute;
        width:3px;
        height:100%;
        background-color:$color-light;
      }
      span{
        padding-left:8px;
      }
    }
  }
</style>
