<template>
  <div class="unauthenticated-sidebar-menus">
    <div class="unauthenticated-menu" v-for="(menuName, index) in menuNames" :key="index">
      <div
        class="unauthenticated-menu-without-dropdown"
        v-if="!menuName.dropdown"
        @click="$emit('link', menuName.name)"
      >
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
      </div>
      <div
        class="unauthenticated-menu-with-dropdown"
        v-else
        @click="dropdown"
      >
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
        <ul class="unauthenticated-menu-dropdown" :class="{ isActive }">
          <li
            class="unauthenticated-menu-dropdown-list"
            v-for="(dropdownFunction, index) in dropdownFunctions"
            :key="index"
            @click="$emit('modal', dropdownFunction)"
          >
            <list-dropdown :dropdown-text="dropdownFunction"></list-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/atoms/SidebarMenu";
import ListDropdown from "@/components/atoms/ListDropdown";

export default {
  components: {
    SidebarMenu,
    ListDropdown,
  },
  props: {
    menuNames: Array,
    dropdownFunctions: Array,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    dropdown() {
      return (this.isActive = !this.isActive);
    },
  },
};
</script>

<style scoped lang="scss">
.unauthenticated-menu {
  margin-bottom: 45px;
  &:hover {
    cursor: pointer;
  }
  .unauthenticated-menu-with-dropdown {
    position: relative;
    .unauthenticated-menu-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $font-color-bg-yellow;
      top: 50px;
      right: -20px;
      list-style: none;
      padding: 0;
      .unauthenticated-menu-dropdown-list {
        padding: 6px 12px;
        cursor: pointer;
        &:first-child {
          border-bottom: 1px solid $font-color-bg-yellow;
        }
      }
    }
    .isActive {
      display: block;
    }
  }
}
</style>
