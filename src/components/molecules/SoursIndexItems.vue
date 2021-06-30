<template>
  <div class="sours-index-items">
    <div
      v-for="(lemonSour, index) in lemonSours"
      :key="index"
      class="index-item"
    >
      <sour-name
        class="item-name"
        :sour-name-text="lemonSour.name"
      ></sour-name>
      <sour-image
        class="item-image"
        :sour-image-url="lemonSour.sour_image.url"
      ></sour-image>
    </div>
    <error-message
      :error-message-text="errorMessage"
      v-show="showNoContents"
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
    showNoContents() {
      return this.lemonSours.length == 0
    }
  }
};
</script>

<style scoped lang="scss">
.sours-index-items {
  display: flex;
  flex-wrap: wrap;
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
