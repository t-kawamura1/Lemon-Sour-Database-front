<template>
  <a href="#">{{ menuNameText }}</a>
</template>

<script>
export default {
  props: {
    menuNameText: String,
  },
};
</script>

<style scoped lang="scss">
.sidebar-menu {
  color: $font-color-bg-yellow;
  font-size: 2rem;
}
</style>
