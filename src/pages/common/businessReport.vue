<template>
  <div class="business-report-container home-common">
    <div class="title">
      <v-title title="经营报表"/>
    </div>
    <manage :list="list"/>
  </div>
</template>

<script>
  import manage from '@/components/manage';
  import vTitle from '@/components/title';
  import mixin from './mixin';
  export default {
    name: "businessReport",
    data() {
      return {
      }
    },
    mixins:[mixin],
    components: {
      vTitle, manage
    }
  }
</script>

<style scoped lang="scss">
  .business-report-container {
    .title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
  }
</style>
