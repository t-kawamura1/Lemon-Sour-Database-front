<template>
  <div class="lemon-sour-template">
    <div v-if="$mq === 'pc'" class="sidebar-layout">
      <slot name="sidebar"></slot>
    </div>
    <div v-if="$mq === 'sp'">
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="sour-container"></slot>
    </div>
    <div>
      <slot name="review-container"></slot>
    </div>
    <div v-if="$mq === 'sp'">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.lemon-sour-template {
  display: flex;
  .sidebar-layout {
    position: fixed;
  }
}
</style>
