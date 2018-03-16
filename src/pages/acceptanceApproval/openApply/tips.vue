<template>
  <section class="tips-container text-center">
    <span class="el-icon-success"></span>
    <h3>{{text}}</h3>
    <p>您可至受理单列表继续修改受理单或提交审核。</p>
    <el-button type="primary" @click="$router.push('/accept/accept-list')">受理单列表</el-button>
  </section>
</template>

<script>
  export default {
    name: "tips",
    data() {
      return {
        text: ""
      }
    },
    created() {
      this.text = this.$route.query.text;
    }
  }
</script>

<style scoped lang="scss">
  .tips-container {
    padding-top: 50px;
    .el-icon-success {
      font-size: 60px;
      color: #65af45;
    }
    padding-bottom: 300px;
    h3 {
      margin: 20px auto;
      font-size: 20px;
    }
    p {
      margin: 10px auto;
    }
  }
</style>
