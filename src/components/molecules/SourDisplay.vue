<template>
  <div class="sour-display">
    <sour-name class="display-name" :sour-name-text="sourName"></sour-name>
    <sour-image class="display-image" :sour-image-url="sourImage"></sour-image>
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
    sourName: String,
    sourImage: String,
  },
};
</script>

<style scoped lang="scss">
.sour-display {
  .display-name {
    margin-bottom: 30px;
  }
}
</style>
