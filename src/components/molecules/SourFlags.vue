<template>
  <div class="sour-flags">
    <div v-for="(flagAttribute, index) in flagAttributes" :key="index">
      <zero-flag :flag-set="flagAttribute"></zero-flag>
    </div>
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
  width: 400px;
  justify-content: space-around;
}
</style>
