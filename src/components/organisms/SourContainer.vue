<template>
  <div class="sour-container">
    <div class="sour-container-sour-display">
      <slot name="sour-display"></slot>
    </div>
    <!-- ↓↓flexboxの配置調整のために一枚入れる -->
    <div class="sour-container-attributes-box">
      <div class="sour-container-sour-flags">
        <slot name="sour-flags"></slot>
      </div>
      <div class="sour-container-sour-attributes">
        <slot name="sour-attributes"></slot>
      </div>
    </div>
    <div class="sour-container-button-drink-today">
      <slot name="button-drink-today"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sour-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .sour-container-sour-display {
    width: $sour-column-width;
    padding: 0 15px;
  }
  .sour-container-attributes-box {
    width: $sour-column-width;
    .flags {
      margin-bottom: 30px;
    }
  }
}
</style>
