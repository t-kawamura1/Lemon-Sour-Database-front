<template>
  <div class="template-pc-lemon-sour">
    <div class="pc-lemon-sour-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-lemon-sour-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-lemon-sour-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-lemon-sour-main">
      <div class="pc-lemon-sour-sour-container">
        <slot name="sour-container"></slot>
      </div>
    </div>
    <div class="pc-lemon-sour-side-blank">
      <slot name="side-blank"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-lemon-sour {
  display: flex;
  flex-direction: column;
  .pc-lemon-sour-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-lemon-sour-notice {
    margin: 0 $sidebar-width;
    z-index: $z-notice;
  }
  .pc-lemon-sour-main {
    margin: 0 $sidebar-width / 2 0 $sidebar-width;
    padding: 60px 10px;
  }
  .pc-lemon-sour-side-blank {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
