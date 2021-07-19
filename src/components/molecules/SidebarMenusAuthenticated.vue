<template>
  <div class="authenticated-sidebar-menus">
    <div
      class="authenticated-sidebar-menu"
      v-for="(menuName, index) in menuNames"
      :key="index"
    >
      <div
        class="authenticated-menu-without-dropdown"
        v-if="!menuName.dropdown"
        @click="$emit('link', menuName.name)"
      >
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
      </div>
      <div class="authenticated-menu-with-dropdown" v-else @click="dropdown">
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
        <ul class="authenticated-menu-dropdown" :class="{ isActive }">
          <li
            class="authenticated-menu-dropdown-list"
            @click="$emit('link', dropdownFunctions[0])"
          >
            <list-dropdown
              :dropdown-text="dropdownFunctions[0]"
            ></list-dropdown>
          </li>
          <li
            class="authenticated-menu-dropdown-list"
            @click="$emit('submitUser')"
          >
            <list-dropdown
              :dropdown-text="dropdownFunctions[1]"
            ></list-dropdown>
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
.authenticated-sidebar-menu {
  margin-bottom: 45px;
  &:hover {
    cursor: pointer;
  }
  .authenticated-menu-with-dropdown {
    position: relative;
    .authenticated-menu-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $font-color-bg-yellow;
      top: 50px;
      right: -20px;
      list-style: none;
      padding: 0;
      .authenticated-menu-dropdown-list {
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
