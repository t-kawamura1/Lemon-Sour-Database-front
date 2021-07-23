<template>
  <div class="user-password-reset-container">
    <div class="user-password-reset-container-heading">
      <slot name="user-password-reset-heading"></slot>
    </div>
    <div class="user-password-reset-container-password-reset">
      <slot name="password-reset"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.user-password-reset-container {
  display: flex;
  flex-direction: column;
  .user-password-reset-container-heading {
    font-size: 2.7rem;
    margin-bottom: 30px;
  }
}
</style>
