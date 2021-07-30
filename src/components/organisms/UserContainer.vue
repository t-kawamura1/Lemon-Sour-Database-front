<template>
  <div class="user-container">
    <div class="user-container-heading">
      <slot name="user-heading"></slot>
    </div>
    <div class="user-container-edit">
      <slot name="user-edit"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-container-heading {
    font-size: 2.7rem;
    margin-bottom: 30px;
  }
}
</style>
