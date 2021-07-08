<template>
  <div class="icon">
    <font-awesome-icon :icon="iconText" />
  </div>
</template>

<script>
export default {
  props: {
    iconText: String,
  },
};
</script>

<style scoped lang="scss"></style>
