<template>
  <div class="sour-container">
    <div class="display">
      <slot name="sour-display"></slot>
    </div>
    <!-- ↓↓flexboxの配置調整のために一枚入れる -->
    <div class="attributes-box">
      <div class="flags">
        <slot name="sour-flags"></slot>
      </div>
      <div class="attributes">
        <slot name="sour-attributes"></slot>
      </div>
    </div>
    <div class="favorite">
      <slot name="sour-favorite"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sour-container {
  display: flex;
  flex-wrap: wrap;
  .display {
    margin-right: 45px;
  }
  .flags {
    margin-bottom: 30px;
  }
}
</style>
