<template>
  <div class="template-sp-lemon-sours-index">
    <div class="sp-header-layout">
      <slot name="header"></slot>
    </div>
    <div class="sp-sours-index-container-layout">
      <slot name="sours-index-container"></slot>
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
.template-sp-lemon-sours-index {
  display: flex;
  .sp-header-layout {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: 10;
  }
  .sp-sours-index-container-layout {
    margin-top: $header-height;
    padding: 30px;
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
