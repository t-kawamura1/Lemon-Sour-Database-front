<template>
  <div class="pc-selects-set">
    <form class="pc-selects-form" @submit.prevent="packSelectedValues">
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[0]"
        :sort-values="selectsManufacturers"
        @input="selectedManufacturer = $event"
      ></input-select>
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[1]"
        :sort-values="selectsIngredients"
        @input="selectedIngredient = $event"
      ></input-select>
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[2]"
        :sort-values="selectsOrders"
        @input="selectedOrder = $event"
      ></input-select>
      <button class="pc-search-button" type="submit">検索</button>
    </form>
    <div
      class="pc-selects-errors"
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
.pc-selects-set {
  .pc-selects-form {
    display: flex;
    margin-bottom: 15px;
    .pc-input-select {
      padding: 9px 0 9px 3px;
      width: 150px;
      font-size: 1.5rem;
      &:hover {
        cursor: pointer;
      }
    }
    .pc-search-button {
      width: 50px;
      font-size: 1.5rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .pc-selects-errors {
    text-align: left;
    padding-left: 15px;
  }
}
</style>
