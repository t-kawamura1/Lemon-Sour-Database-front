<template>
  <div class="template-pc-lemon-sour">
    <div class="pc-sidebar-layout">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-lemon-sour-main">
      <div class="pc-sour-container">
        <slot name="sour-container"></slot>
      </div>
      <div class="pc-review-container">
        <slot name="review-container"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.template-pc-lemon-sour {
  display: flex;
  .pc-sidebar-layout {
    position: fixed;
  }
  .pc-lemon-sour-main {
    padding: 60px 30px;
    .pc-sour-container {
      margin-left: $sidebar-width;
    }
  }
}
</style>
