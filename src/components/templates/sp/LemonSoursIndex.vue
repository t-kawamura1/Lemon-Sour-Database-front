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
    z-index: $z-header;
  }
  .sp-notice {
    position: fixed;
    width: 100%;
  }
  .sp-sours-index-main {
    padding: 10px;
    margin-top: $header-height;
    margin-bottom: $footer-height;
  }
  .sp-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
