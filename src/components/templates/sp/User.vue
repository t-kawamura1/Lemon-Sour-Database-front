<template>
  <div class="template-sp-user">
    <div class="sp-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-user-main">
      <slot name="user-container"></slot>
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
.template-sp-user {
  display: flex;
  flex-wrap: wrap;
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
  .sp-user-main {
    margin-top: $header-height;
    padding: 30px 0;
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
