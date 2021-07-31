<template>
  <div class="sour-flags">
    <zero-flag
      :flag-set="flagAttribute"
      v-for="(flagAttribute, index) in flagAttributes"
      :key="index"
    ></zero-flag>
  </div>
</template>

<script>
import ZeroFlag from "@/components/atoms/ZeroFlag";

export default {
  components: {
    ZeroFlag,
  },
  props: {
    flagAttributes: Array,
  },
};
</script>

<style scoped lang="scss">
.sour-flags {
  display: flex;
  justify-content: space-between;
}
</style>
