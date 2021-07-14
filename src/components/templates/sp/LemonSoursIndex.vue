<template>
  <div class="template-sp-lemon-sours-index">
    <div class="sp-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-sours-index-main">
      <slot name="sp-sours-index-container"></slot>
    </div>
    <div class="sp-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-sp-lemon-sours-index {
  display: flex;
  flex-direction: column;
  .sp-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: 10;
  }
  .sp-notice {
    margin-top: $header-height;
  }
  .sp-sours-index-main {
    width: 100%;
    padding: 30px;
  }
  .sp-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: 10;
    bottom: 0;
  }
}
</style>
