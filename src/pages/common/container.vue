<template>
  <div class="container">
    <router-view name="aside"></router-view>
    <router-view></router-view>
    <section class="main">
      <router-view name="main"></router-view>
    </section>
  </div>

</template>

<script>
  export default {
    name: "container"
  }
</script>

<style scoped lang="scss">
  .container {
    .main {
      margin-left: 180px;
      margin-top:56px;
      background:#fff;
      transition:all 0.5s;
      &.collapse{
        margin-left:50px;
      }
    }
  }
</style>
