<template>
  <button class="button-calculation-record" type="submit">
    {{ buttonCalcRecText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonCalcRecText: String,
  }
};
</script>

<style scoped lang="scss">
.button-calculation-record {
  cursor: pointer;
  background-color: $aged-yellow;
  color: $lightest-yellow;
  border: 1px solid $aged-yellow;
  border-radius: 15px;
  // font-size: 1.4rem;
  padding: 6px 12px;
  &:hover {
    background-color: $lightest-yellow;
    border: 1px solid $aged-yellow;
    color: $aged-yellow;
  }
}
</style>
