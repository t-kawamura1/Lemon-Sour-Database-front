<template>
  <div class="modal">
    <div class="modal-user-registration">
      <slot name="modal-user-registration"></slot>
    </div>
    <div class="modal-user-login">
      <slot name="modal-user-login"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>
