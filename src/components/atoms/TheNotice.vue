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
  flex-direction: column;
  justify-content: center;
  background-color: $light-green;
  color: #333113;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0 63px;
  height: $header-height;
  box-shadow: 0 3px 3px $silver;
}
</style>
