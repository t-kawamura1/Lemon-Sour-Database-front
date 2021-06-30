<template>
  <div class="error-message">
    {{ errorMessageText }}
  </div>
</template>

<script>
export default {
  props: {
    errorMessageText: String,
  }
};
</script>

<style scoped lang="scss">
.error-message {
  color: $font-color-error;
}
</style>
