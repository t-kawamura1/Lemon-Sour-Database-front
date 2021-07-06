<template>
  <div class="sour-image">
    <img :src="sourImageUrl" alt="レモンサワーの画像" />
  </div>
</template>

<script>
export default {
  props: {
    sourImageUrl: String,
  },
};
</script>

<style scoped lang="scss">
.sour-image {
  img {
    width: 100%;
  }
}
</style>
