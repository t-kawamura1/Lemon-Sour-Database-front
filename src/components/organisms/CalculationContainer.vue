<template>
  <div class="calculation-container">
    <div class="calculation-container-heading">
      <slot name="calculation-heading"></slot>
    </div>
    <div class="calculation-container-text-calculation-main">
      <slot name="calculation-text-main"></slot>
    </div>
    <div class="calculation-container-calculate-alcohol">
      <slot name="calculation-calculate-alcohol"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.calculation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .calculation-container-heading {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  .calculation-container-text-calculation-main {
    margin-bottom: 30px;
    text-align: left;
  }
}
</style>
