<template>
  <div class="template-pc-home">
    <div class="pc-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-home-main">
      <slot name="home-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-home {
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
  .pc-home-main {
    padding: 60px 30px;
    .pc-home-container {
      margin-left: $sidebar-width;
    }
  }
}
</style>
