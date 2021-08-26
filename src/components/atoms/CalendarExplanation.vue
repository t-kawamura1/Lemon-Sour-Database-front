<template>
  <div class="calendar-explanation">
    <span class="calendar-explanation-circle" :class="explanationSet[0]"></span>
    {{ explanationSet[1] }}
  </div>
</template>

<script>
export default {
  props: {
    explanationSet: Array,
  },
};
</script>

<style scoped lang="scss">
.calendar-explanation {
  text-align: left;
  font-size: 1.4rem;
  .calendar-explanation-circle {
    content: "";
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 6px;
  }
  .cec-zero {
    border: 2px solid $calendar-indigo;
  }
  .cec-safety {
    background-color: $calendar-green;
  }
  .cec-warning {
    background-color: $calendar-yellow;
  }
  .cec-dangerous {
    background-color: $calendar-red;
  }
}
</style>
