<template>
  <div class="template-pc-drinking-record">
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-drinking-record-main">
      <slot name="drinking-record-container"></slot>
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
.template-pc-drinking-record {
  .pc-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-notice {
    margin: 0 $sidebar-width;
  }
  .pc-drinking-record-main {
    margin: 0 $sidebar-width;
    padding: 60px 10px 0;
  }
  .pc-side-blank {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
