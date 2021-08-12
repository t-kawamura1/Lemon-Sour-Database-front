<template>
  <div class="template-pc-user-password-reset">
    <div class="pc-user-password-reset-side-blank-left">
      <slot name="side-blank-left"></slot>
    </div>
    <div class="pc-user-password-reset-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-password-reset-main">
      <slot name="user-password-reset-container"></slot>
    </div>
    <div class="pc-user-password-reset-side-blank-right">
      <slot name="side-blank-right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-user-password-reset {
  display: flex;
  flex-direction: column;
  .pc-user-password-reset-side-blank-left {
    position: fixed;
    top: 0;
    left: 0;
  }
  .pc-user-password-reset-notice {
    margin: 0 $sidebar-width / 2;
    z-index: $z-notice;
  }
  .pc-user-password-reset-main {
    padding: 60px 30px;
    margin: 0 $sidebar-width / 2;
  }
  .pc-user-password-reset-side-blank-right {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
