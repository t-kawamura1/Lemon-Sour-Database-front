<template>
  <div class="sp-home-container">
    <div class="sp-home-container-home-title">
      <slot name="sp-home-title"></slot>
    </div>
    <div class="sp-home-container-home-function-items">
      <slot name="sp-home-function-items"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sp-home-container {
  // background-color: rgba(19, 21, 51, 0.5);
}
</style>
