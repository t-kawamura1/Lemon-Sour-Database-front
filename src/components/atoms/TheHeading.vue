<template>
  <div class="the-heading">{{ headingText }}</div>
</template>

<script>
export default {
  props: {
    headingText: String,
  },
};
</script>

<style scoped lang="scss">
.the-heading {
  font-weight: 700;
  color: $font-color-bg-white;
  letter-spacing: 1.5px;
  text-align: left;
  width: 100%;
}
</style>
