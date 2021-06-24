<template>
  <div class="sidebar">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="menus">
      <slot name="menus"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sidebar {
  width: 300px;
  height: 100vh;
  background: radial-gradient(
    circle farthest-corner at -50px -100px,
    white,
    $base-yellow 35%,
    $aged-yellow
  );
  padding: 60px 30px;
  .title {
    margin-bottom: 60px;
  }
}
</style>
