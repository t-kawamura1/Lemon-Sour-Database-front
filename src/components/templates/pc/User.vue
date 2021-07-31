<template>
  <div class="template-pc-user">
    <div class="pc-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-main">
      <slot name="user-container"></slot>
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
.template-pc-user {
  .pc-sidebar {
    position: fixed;
  }
  .pc-notice {
    margin: 0 $sidebar-width;
  }
  .pc-user-main {
    margin: 0 $sidebar-width;
    padding-top: 60px;
  }
  .pc-side-blank {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
