<template>
  <section class="goods-container">
    <div>
      <p>请选择您想创建的商品类型</p>
    </div>
    <div class="m-t-10">
      <el-button>资源套餐商品</el-button>
    </div>
    <div class="m-t-10">
      <el-button>运营服务商品</el-button>
    </div>
  </section>
</template>

<script>
  export default {
    name: "make-goods"
  }
</script>

<style scoped lang="scss">
  .goods-container {
    padding: 40px;
    p {
      font-size: 18px;
      display: inline-block;
    }
  }
</style>
