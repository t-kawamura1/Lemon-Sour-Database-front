<template>
  <div class="sours-index-container">
    <div class="container-heading">
      <slot name="heading"></slot>
    </div>
    <div class="container-selects-set">
      <slot name="selects-set"></slot>
    </div>
    <div class="container-index-items">
      <slot name="sours-index-items"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sours-index-container {
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .container-heading {
    margin-bottom: 60px;
  }
  .container-selects-set {
    margin-bottom: 30px;
  }
}
</style>
