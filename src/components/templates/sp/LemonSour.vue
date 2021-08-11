<template>
  <div class="template-sp-lemon-sour">
    <div class="sp-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-lemon-sour-main">
      <div class="sp-sour-container">
        <slot name="sour-container"></slot>
      </div>
      <div class="sp-review-container">
        <slot name="review-container"></slot>
      </div>
    </div>
    <div class="sp-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-lemon-sour {
  display: flex;
  flex-wrap: wrap;
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
    z-index: $z-notice;
  }
  .sp-lemon-sour-main {
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
