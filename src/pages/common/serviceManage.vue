<template>
  <div class="service-manage-container home-common">
    <div class="title">
      <v-title title="服务管理"/>
    </div>
    <manage :list="list"/>
  </div>
</template>

<script>
  import manage from '@/components/manage';
  import vTitle from '@/components/title';
  import mixin from './mixin';

  export default {
    name: "serviceManage",
    data() {
      return {}
    },
    mixins: [mixin],
    components: {
      vTitle, manage
    }
  }
</script>

<style scoped lang="scss">
  .service-manage-container {
    .title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
  }
</style>
