<template>
  <div class="pc-sours-index-container">
    <div class="pc-container-heading">
      <slot name="pc-heading"></slot>
    </div>
    <div class="pc-container-selects-set">
      <slot name="pc-selects-set"></slot>
    </div>
    <div class="pc-container-index-items">
      <slot name="pc-sours-index-items"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.pc-sours-index-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  .pc-container-heading {
    font-size: 2.7rem;
    margin-bottom: 45px;
  }
  .pc-container-selects-set {
    margin-bottom: 30px;
  }
}
</style>
