<template>
  <div class="pc-sours-index-items">
    <div
      class="pc-index-item"
      v-for="(lemonSour, index) in lemonSours"
      :key="index"
      @click="$emit('link', ['toLemonSour', lemonSour.id])"
    >
      <sour-name
        class="pc-item-name"
        :sour-name-text="lemonSour.name"
      ></sour-name>
      <sour-image
        class="pc-item-image"
        :sour-image-url="lemonSour.sour_image.url"
      ></sour-image>
    </div>
    <error-message
      :error-message-text="errorMessage"
      v-show="isActive"
    ></error-message>
  </div>
</template>

<script>
import SourName from "@/components/atoms/SourName";
import SourImage from "@/components/atoms/SourImage";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    SourName,
    SourImage,
    ErrorMessage,
  },
  props: {
    lemonSours: Array,
    errorMessage: String,
  },
  computed: {
    isActive() {
      return this.lemonSours.length == 0;
    },
  },
};
</script>

<style scoped lang="scss">
.pc-sours-index-items {
  display: flex;
  flex-wrap: wrap;
  .pc-index-item {
    width: 240px;
    height: 240px;
    border: solid 1px gray;
    border-radius: 5%;
    padding: 10px;
    margin: 0 10px 20px 0;
    .pc-item-name {
      font-size: 1.5rem;
    }
    .pc-item-image {
      width: 180px;
      height: 180px;
      margin: 0 auto;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
