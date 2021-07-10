<template>
  <div class="template-pc-lemon-sours-index">
    <div class="pc-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-sours-index-main">
      <slot name="pc-sours-index-container"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-lemon-sours-index {
  display: flex;
  .pc-sidebar {
    position: fixed;
  }
  .pc-sours-index-main {
    margin-left: $sidebar-width;
    padding: 60px 30px;
  }
}
</style>
