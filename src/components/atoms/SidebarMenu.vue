<template>
  <!-- 他のページ実装後にrouter-linkに切り替えを -->
  <a href="#" class="sidebar-menu">{{ menuNameText }}</a>
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
