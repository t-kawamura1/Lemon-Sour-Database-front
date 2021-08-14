<template>
  <div class="template-pc-calculation">
    <div class="pc-calculation-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-calculation-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-calculation-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-calculation-main">
      <slot name="calculation-container"></slot>
    </div>
    <div class="pc-calculation-side-blank">
      <slot name="side-blank"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-calculation {
  .pc-calculation-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-calculation-notice {
    margin: 0 $sidebar-width / 2 0 $sidebar-width;
    z-index: $z-notice;
  }
  .pc-calculation-main {
    margin: 0 $sidebar-width / 2 0 $sidebar-width;
    padding: 60px 30px;
  }
  .pc-calculation-side-blank {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
