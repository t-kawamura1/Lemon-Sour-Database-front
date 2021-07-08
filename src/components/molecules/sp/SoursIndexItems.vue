<template>
  <div class="sp-sours-index-items">
    <div
      class="sp-index-item"
      v-for="(lemonSour, index) in lemonSours"
      :key="index"
      @click="$emit('link', ['toLemonSour', lemonSour.id])"
    >
      <sour-name
        class="sp-item-name"
        :sour-name-text="lemonSour.name"
      ></sour-name>
      <sour-image
        class="sp-item-image"
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
.sp-sours-index-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 250px;
  .sp-index-item {
    width: 120px;
    height: 120px;
    border: solid 1px gray;
    border-radius: 5%;
    padding: 3px 1px;
    margin-bottom: 15px;
    .sp-item-name {
      font-size: 1.8rem;
    }
    .sp-item-image {
      width: 180px;
      height: 180px;
      margin: 0 auto;
    }
  }
}
</style>
