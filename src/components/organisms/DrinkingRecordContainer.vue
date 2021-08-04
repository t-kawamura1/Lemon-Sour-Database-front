<template>
  <div class="drinking-record-container">
    <div class="drinking-record-container-heading">
      <slot name="drinking-record-heading"></slot>
    </div>
    <div class="drinking-record-container-">
      <slot name="drinking-record-"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.drinking-record-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .drinking-record-container-heading {
    font-size: 2rem;
    margin-bottom: 30px;
  }
}
</style>
