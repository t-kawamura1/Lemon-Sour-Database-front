<template>
  <div class="modal-title">{{ modalTitleText }}</div>
</template>

<script>
export default {
  props: {
    modalTitleText: String,
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: $font-color-bg-white;
}
</style>
