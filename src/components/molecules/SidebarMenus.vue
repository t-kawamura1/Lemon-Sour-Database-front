<template>
  <div class="sidebar-menus">
    <div
      class="menu"
      v-for="(menuName, index) in menuNames"
      :key="index"
      @click="$emit('link', menuName)"
    >
      <sidebar-menu :menu-name-text="menuName"></sidebar-menu>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/atoms/SidebarMenu";

export default {
  components: {
    SidebarMenu,
  },
  props: {
    menuNames: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  margin-bottom: 45px;
  &:hover {
    cursor: pointer;
  }
}
</style>
