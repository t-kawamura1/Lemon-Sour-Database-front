<template>
  <div class="template-pc-lemon-sours-index">
    <div class="pc-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-sours-index-main">
      <slot name="pc-sours-index-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-lemon-sours-index {
  display: flex;
  flex-direction: column;
  .pc-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-notice {
    margin-left: $sidebar-width;
    z-index: $z-notice;
  }
  .pc-sours-index-main {
    margin-left: $sidebar-width;
    padding: 60px 30px;
  }
}
</style>
