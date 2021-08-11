<template>
  <div class="template-sp-user-password-reset">
    <div class="sp-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-user-password-reset-main">
      <slot name="user-password-reset-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-user-password-reset {
  display: flex;
  flex-direction: column;
  .sp-user-password-reset-main {
    padding: 60px 30px;
  }
}
</style>
