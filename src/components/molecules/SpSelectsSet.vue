<template>
  <div class="sp-selects-set">
    <form class="sp-selects-form" @submit.prevent="packSelectedValues">
      <div class="sp-input-selects">
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[0]"
          :sort-values="selectsManufacturers"
          @input="selectedManufacturer = $event"
        ></input-select>
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[1]"
          :sort-values="selectsIngredients"
          @input="selectedIngredient = $event"
        ></input-select>
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[2]"
          :sort-values="selectsOrders"
          @input="selectedOrder = $event"
        ></input-select>
      </div>
      <button class="sp-search-button" type="submit">検索</button>
    </form>
    <div
      class="sp-selects-errors"
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
.sp-selects-set {
  .sp-selects-form {
    display: flex;
    .sp-input-selects {
      display: flex;
      flex-direction: column;
      .sp-input-select {
        padding: 3px 0 3px 6px;
        width: 150px;
        font-size: 1.2rem;
      }
    }
    .sp-search-button {
      font-size: 1.2rem;
    }
  }
  .sp-selects-errors {
    margin-top: 10px;
    text-align: left;
    // padding-left: 15px;
    font-size: 1.2rem;
  }
}
</style>
