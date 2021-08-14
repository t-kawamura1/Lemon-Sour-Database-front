<template>
  <img
    class="user-image"
    :src="userImageUrl"
    alt="ユーザーの画像"
    width="180"
    height="180"
  />
</template>

<script>
export default {
  props: {
    userImageUrl: String,
  },
};
</script>

<style scoped lang="scss">
.user-image {
  border-radius: 50%;
  object-fit: cover;
}
</style>
