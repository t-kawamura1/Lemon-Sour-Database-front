<template>
  <div class="input-select">
    <select @change="onChangeValue">
      <option disabled value="">{{ sortType }}</option>
      <option
        v-for="(sortValue, index) in sortValues"
        :key="index"
        :value="sortValue"
      >
        {{ sortValue }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    sortType: String,
    sortValues: Array,
  },
  methods: {
    onChangeValue() {
      const selected = event.target.value;
      this.$emit("input", selected);
    },
  },
};
</script>

<style scoped lang="scss">
.input-select {
  select {
    font-size: 1.6rem;
    padding: 5px 8px;
    width: 150px;
  }
}
</style>
