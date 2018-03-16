<template>
  <div class="accept-container home-common">
    <div class="title">
      <v-title title="受理审批"/>
    </div>
    <manage :list="list"/>
  </div>
</template>

<script>
  import manage from '@/components/manage';
  import vTitle from '@/components/title';
  import {routerMap} from '@/pages/common/router';
  import mixin from './mixin';

  export default {
    name: "accept",
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
  .accept-container {
    .title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
  }
</style>
