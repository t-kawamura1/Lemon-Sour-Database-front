<template>
  <div class="template-pc-user-password-reset">
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-password-reset-main">
      <slot name="user-password-reset-container"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-user-password-reset {
  display: flex;
  flex-direction: column;
  .pc-sidebar {
    position: fixed;
  }
  .pc-notice {
    margin-left: $sidebar-width;
  }
  .pc-user-password-reset-main {
    padding: 60px 30px;
    margin-left: $sidebar-width;
  }
}
</style>
