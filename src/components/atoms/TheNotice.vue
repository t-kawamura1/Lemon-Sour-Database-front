<template>
  <div class="the-notice">{{ noticeText }}</div>
</template>

<script>
export default {
  props: {
    noticeText: String,
  },
};
</script>

<style scoped lang="scss">
.the-notice {
  background-color: $light-green;
  color: $base-yellow;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 1.8rem;
}
</style>
