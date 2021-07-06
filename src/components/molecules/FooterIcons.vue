<template>
  <div class="footer-icons">
    <div v-for="(footerIcon, index) in footerIcons" :key="index">
      <icon :icon-text="footerIcon[0]" class="footer-icon"></icon>
      <span class="footer-icon-title">{{ footerIcon[1] }}</span>
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
    footerIcons: Array,
  },
};
</script>

<style scoped lang="scss">
.footer-icons {
  display: flex;
  height: $footer-height;
  padding: 0 15px;
  justify-content: space-around;
  align-items: center;
  color: $font-color-bg-yellow;
  background-color: $base-yellow;
  .footer-icon {
    font-size: 4.5rem;
    margin-bottom: 6px;
  }
  .footer-icon-title {
    font-size: 1.5rem;
  }
}
</style>
