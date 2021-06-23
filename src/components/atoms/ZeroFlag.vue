<template>
  <div class="zero-flag" v-show="flagSet[1]">
    {{ flagSet[0] }}
  </div>
</template>

<script>
export default {
  props: {
    flagSet: Array,
  }
};
</script>

<style scoped lang="scss">
.zero-flag {
  display: inline-block;
  background: $base-yellow;
  width: 180px;
  height: 30px;
  line-height: 30px;
  color: #0C5F41;
  // font-weight: 700;
  letter-spacing: 2px;
  border-right: solid 3px #8DC21F;
  border-bottom: solid 3px #8DC21F;
}
</style>
