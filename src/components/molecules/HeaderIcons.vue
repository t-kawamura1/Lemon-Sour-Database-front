<template>
  <div class="header-icons">
    <div class="header-icon1" @click="$emit('link', headerIcons[0])">
      <icon :icon-text="headerIcons[0]"></icon>
    </div>
    <div class="header-icon2" @click="dropdown">
      <icon :icon-text="headerIcons[1]"></icon>
      <ul class="header-icon-dropdown" :class="{ isActive }">
        <li
          class="header-icon-dropdown-list"
          v-for="(dropdownFunction, index) in dropdownFunctions"
          :key="index"
          @click="$emit('modal', dropdownFunction)"
        >
          <list-dropdown :dropdown-text="dropdownFunction"></list-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import ListDropdown from "@/components/atoms/ListDropdown";

export default {
  components: {
    Icon,
    ListDropdown,
  },
  props: {
    headerIcons: Array,
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
.header-icons {
  display: flex;
  height: $header-height;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  color: $base-yellow;
  background-color: $font-color-bg-yellow;
  .header-icon2 {
    position: relative;
    .header-icon-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $font-color-bg-yellow;
      right: 0;
      list-style: none;
      padding: 0;
      .header-icon-dropdown-list {
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
