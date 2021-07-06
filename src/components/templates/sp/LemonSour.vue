<template>
  <div class="template-sp-lemon-sour">
    <div class="sp-header-layout">
      <slot name="header"></slot>
    </div>
    <div class="sp-lemon-sour-main">
      <div class="sp-sour-container">
        <slot name="sour-container"></slot>
      </div>
      <div class="sp-review-container">
        <slot name="review-container"></slot>
      </div>
    </div>
    <div class="sp-footer-layout">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-sp-lemon-sour {
  display: flex;
  flex-wrap: wrap;
  .sp-header-layout {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: 10;
  }
  .sp-lemon-sour-main {
    margin-top: $header-height;
    .sp-sour-container {
      padding: 30px;
    }
  }
  .sp-footer-layout {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: 10;
    bottom: 0;
  }
}
</style>
