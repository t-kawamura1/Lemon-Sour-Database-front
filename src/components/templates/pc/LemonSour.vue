<template>
  <div class="template-pc-lemon-sour">
    <div class="pc-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-lemon-sour-main">
      <div class="pc-sour-container">
        <slot name="sour-container"></slot>
      </div>
      <div class="pc-review-container">
        <slot name="review-container"></slot>
      </div>
    </div>
    <div class="pc-side-blank">
      <slot name="side-blank"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-lemon-sour {
  display: flex;
  flex-direction: column;
  .pc-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-notice {
    margin: 0 $sidebar-width;
    z-index: $z-notice;
  }
  .pc-lemon-sour-main {
    padding: 60px 10px;
    .pc-sour-container {
      margin: 0 $sidebar-width;
    }
  }
  .pc-side-blank {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
