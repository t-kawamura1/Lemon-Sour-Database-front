<template>
  <div class="template-pc-user">
    <div class="pc-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-main">
      <slot name="user-container"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-user {
  display: flex;
  flex-direction: column;
  .pc-sidebar {
    position: fixed;
  }
  .pc-notice {
    margin-left: $sidebar-width;
  }
  .pc-luser-main {
    padding: 60px 30px;
    .pc-user-container {
      margin-left: $sidebar-width;
    }
  }
}
</style>
