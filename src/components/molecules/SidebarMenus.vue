<template>
  <div>
    <div v-for="(menuName, index) in menuNames" :key="index" class="menu">
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
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  margin-bottom: 45px;
}
</style>
