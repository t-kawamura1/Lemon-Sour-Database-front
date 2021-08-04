<template>
  <div class="template-sp-home">
    <div class="sp-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-home-main">
      <slot name="home-container"></slot>
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
.template-sp-home {
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
  }
  .sp-home-main {
    margin-top: $header-height;
    margin-bottom: $footer-height;
    padding: 30px 0;
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
