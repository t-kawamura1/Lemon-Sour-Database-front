<template>
  <div class="template-pc-lemon-sours-index">
    <div class="pc-sidebar-layout">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-sours-index-container-layout">
      <slot name="sours-index-container"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-lemon-sours-index {
  display: flex;
  .pc-sidebar-layout {
    position: fixed;
  }
  .pc-sours-index-container-layout {
    margin-left: $sidebar-width;
    padding: 60px;
  }
}
</style>
