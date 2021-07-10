<template>
  <button class="button-user-submit" type="submit">
    {{ userSubmitText }}
  </button>
</template>

<script>
export default {
  props: {
    userSubmitText: String,
  },
};
</script>

<style scoped lang="scss">
.button-user-submit {
  cursor: pointer;
}
</style>
