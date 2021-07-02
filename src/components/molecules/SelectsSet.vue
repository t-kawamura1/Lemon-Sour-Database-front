<template>
  <div class="selects-set">
    <form class="selects-form" @submit.prevent="packSelectedValues">
      <input-select
        :sort-type="selectsTypes[0]"
        :sort-values="selectsManufacturers"
        @input="selectedManufacturer = $event"
      ></input-select>
      <input-select
        :sort-type="selectsTypes[1]"
        :sort-values="selectsIngredients"
        @input="selectedIngredient = $event"
      ></input-select>
      <input-select
        :sort-type="selectsTypes[2]"
        :sort-values="selectsOrders"
        @input="selectedOrder = $event"
      ></input-select>
      <button type="submit">検索</button>
    </form>
    <div
      class="selects-errors"
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
    >
      <error-message :error-message-text="errorMessage"></error-message>
    </div>
  </div>
</template>

<script>
import InputSelect from "@/components/atoms/InputSelect";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    InputSelect,
    ErrorMessage,
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
    errorMessages: Array,
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
  .selects-form {
    display: flex;
    margin-bottom: 15px;
  }
  .selects-errors {
    text-align: left;
    padding-left: 15px;
  }
}
</style>
