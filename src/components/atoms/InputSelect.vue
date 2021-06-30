<template>
  <div class="input-select">
    <select :value="selected" @change="$emit('input', $event.target.value)">
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
  data() {
    return {
      selected: "",
    };
  },
  props: {
    sortType: String,
    sortValues: Array,
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
