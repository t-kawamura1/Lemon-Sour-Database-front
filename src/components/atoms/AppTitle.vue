<template>
  <div class="app-title" @click="$emit('link', 'toHome')">
    <h1>Lemon Sour DB</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.app-title {
  color: $font-color-bg-yellow;
  &:hover {
    cursor: pointer;
  }
}
</style>
