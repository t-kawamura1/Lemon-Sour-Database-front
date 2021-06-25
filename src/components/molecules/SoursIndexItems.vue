<template>
  <div class="sours-index-items">
    <div v-for="(lemonSour, index) in lemonSours" :key="index" class="index-item">
      <sour-name class="item-name" :sour-name-text="lemonSour.name"></sour-name>
      <sour-image class="item-image" :sour-image-url="lemonSour.sour_image.url"></sour-image>
    </div>
  </div>
</template>

<script>
import SourName from "@/components/atoms/SourName";
import SourImage from "@/components/atoms/SourImage";

export default {
  components: {
    SourName,
    SourImage,
  },
  props: {
    lemonSours: Array,
  },
};
</script>

<style scoped lang="scss">
.sours-index-items {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  // align-content: space-between;
  .index-item {
    width: 240px;
    height: 240px;
    border: solid 1px gray;
    border-radius: 5%;
    padding: 10px;
    margin: 0 20px 20px 0;
    .item-name {
      font-size: 1.8rem;
    }
  }
}
</style>
