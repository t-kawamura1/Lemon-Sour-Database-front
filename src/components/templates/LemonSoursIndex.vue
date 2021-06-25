<template>
  <div class="lemon-sours-index-template">
    <div v-if="$mq === 'pc'" class="sidebar-layout">
      <slot name="sidebar"></slot>
    </div>
    <div v-if="$mq === 'sp'">
      <slot name="header"></slot>
    </div>
    <div class="sours-index-container-layout">
      <slot name="sours-index-container"></slot>
    </div>
    <div v-if="$mq === 'sp'">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.lemon-sours-index-template {
  display: flex;
  .sidebar-layout {
    position: fixed;
  }
  .sours-index-container-layout {
    margin-left: $sidebar-width;
  }
}
</style>
