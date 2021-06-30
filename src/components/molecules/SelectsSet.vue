<template>
  <form class="selects-set" @submit.prevent="packSelectedValues">
    <input-select
      :sort-type="selectsTypes[0]"
      :sort-values="selectsManufacturers"
      :value="selectedManufacturer"
      @input="selectedManufacturer = $event"
    ></input-select>
    <input-select
      :sort-type="selectsTypes[1]"
      :sort-values="selectsIngredients"
      :value="selectedIngredient"
      @input="selectedIngredient = $event"
    ></input-select>
    <input-select
      :sort-type="selectsTypes[2]"
      :sort-values="selectsOrders"
      :value="selectedOrder"
      @input="selectedOrder = $event"
    ></input-select>
    <button type="submit">検索</button>
  </form>
</template>

<script>
import InputSelect from "@/components/atoms/InputSelect";

export default {
  components: {
    InputSelect,
  },
  data() {
    return {
      selectedManufacturer: "",
      selectedIngredient: "",
      selectedOrder: "",
      selectedValues: [],
    };
  },
  props: {
    selectsTypes: Array,
    selectsManufacturers: Array,
    selectsIngredients: Array,
    selectsOrders: Array,
  },
  methods: {
    packSelectedValues() {
      this.selectedValues.push(this.selectedManufacturer);
      this.selectedValues.push(this.selectedIngredient);
      this.selectedValues.push(this.selectedOrder);
      this.$emit("sortBy", this.selectedValues);
      this.selectedValues = [];
    },
  },
};
</script>

<style scoped lang="scss">
.selects-set {
  display: flex;
}
</style>
