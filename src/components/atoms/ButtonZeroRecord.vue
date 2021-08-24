<template>
  <div class="button-zero-record" @click="$emit('zeroRecord')">
    {{ buttonZeroRecordText }}
  </div>
</template>

<script>
export default {
  props: {
    buttonZeroRecordText: String,
  },
};
</script>

<style scoped lang="scss">
.button-zero-record {
  cursor: pointer;
  background-color: $light-green;
  color: $lightest-yellow;
  border: 1px solid $light-green;
  border-radius: 15px;
  padding: 9px 12px;
  &:hover {
    background-color: $lightest-yellow;
    border: 1px solid $light-green;
    color: $light-green;
  }
}
</style>
