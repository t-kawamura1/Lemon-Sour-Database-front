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

<style scoped lang="scss">
.sidebar {
  width: $sidebar-width;
  box-shadow: 1px 0 3px $silver;
  height: 100vh;
  padding: 60px 20px;
  background-color: $lightest-yellow;
  .title {
    margin-bottom: 60px;
  }
}
</style>
