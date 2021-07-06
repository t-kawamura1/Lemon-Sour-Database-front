<template>
  <div class="sour-name">{{ sourNameText }}</div>
</template>

<script>
export default {
  props: {
    sourNameText: String,
  },
};
</script>

<style scoped lang="scss">
.sour-name {
  font-size: 2.7rem;
  font-weight: 700;
  color: $font-color-bg-white;
  letter-spacing: 1.5px;
}
</style>
