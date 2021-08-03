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
  display: flex;
  background-color: $light-green;
  color: $base-yellow;
  width: 100%;
  padding: 20px 63px;
}
</style>
