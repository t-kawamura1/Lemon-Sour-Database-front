<template>
  <div class="selects-set">
    <input-select
      :sort-type="selectsTypes[0]"
      :sort-values="selectsManufacturers"
      @input="$emit('sortBy', $event)"
    ></input-select>
    <input-select
      :sort-type="selectsTypes[1]"
      :sort-values="selectsIngredients"
      @input="$emit('sortBy', $event)"
    ></input-select>
    <input-select
      :sort-type="selectsTypes[2]"
      :sort-values="selectsOrders"
      @input="$emit('sortBy', $event)"
    ></input-select>
  </div>
</template>

<script>
import InputSelect from "@/components/atoms/InputSelect";

export default {
  components: {
    InputSelect,
  },
  props: {
    selectsTypes: Array,
    selectsManufacturers: Array,
    selectsIngredients: Array,
    selectsOrders: Array,
  },
};
</script>

<style scoped lang="scss">
.selects-set {
  display: flex;
}
</style>
