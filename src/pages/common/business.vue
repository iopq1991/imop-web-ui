<template>
  <div class="business-container home-common">
    <div class="title">
      <v-title title="业务运营"/>
    </div>
    <manage :list="list"/>
  </div>
</template>

<script>
  import manage from '@/components/manage';
  import vTitle from '@/components/title';
  import business from '@/assets/images/business.png';
  import mixin from './mixin';

  export default {
    name: "business",
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
  .business-container {
    .title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
  }
</style>
