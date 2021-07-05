<template>
  <div class="header-icons">
    <div v-for="(headerIcon, index) in headerIcons" :key="index">
      <icon :icon-text="headerIcon"></icon>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    headerIcons: Array,
  },
};
</script>

<style scoped lang="scss">
.header-icons {
  display: flex;
  height: $header-height;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  color: $base-yellow;
  background-color: $font-color-bg-yellow;
}
</style>
