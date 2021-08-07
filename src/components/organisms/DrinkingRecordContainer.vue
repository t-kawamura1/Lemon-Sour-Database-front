<template>
  <div class="drinking-record-container">
    <div class="drinking-record-container-heading">
      <slot name="drinking-record-heading"></slot>
    </div>
    <div class="drinking-record-container-records-calendar">
      <slot name="drinking-record-records-calendar"></slot>
    </div>
    <div class="drinking-record-container-records-by-month">
      <slot name="drinking-record-records-by-month"></slot>
    </div>
    <div class="drinking-record-container-button-calculation-record">
      <slot name="drinking-record-button-calculation-record"></slot>
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
  .drinking-record-container-records-calendar {
    margin-bottom: 20px;
  }
  .drinking-record-container-records-by-month {
    margin-bottom: 30px;
  }
}
</style>
