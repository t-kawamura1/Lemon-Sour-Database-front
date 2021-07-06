<template>
  <div class="sp-sours-index-container">
    <div class="sp-container-heading">
      <slot name="sp-heading"></slot>
    </div>
    <div class="sp-container-selects-set">
      <slot name="sp-selects-set"></slot>
    </div>
    <div class="sp-container-index-items">
      <slot name="sp-sours-index-items"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sp-sours-index-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  .sp-container-heading {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
  .sp-container-selects-set {
    margin-bottom: 20px;
  }
}
</style>
