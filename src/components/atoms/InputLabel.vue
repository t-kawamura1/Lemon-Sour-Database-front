<template>
  <label class="input-label">{{ labelText }}</label>
</template>

<script>
export default {
  props: {
    labelText: String,
  },
};
</script>

<style scoped lang="scss">
.input-label {
  font-size: 1.3rem;
}
</style>
