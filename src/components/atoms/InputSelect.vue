<template>
  <select class="input-select" @change="$emit('input', $event.target.value)">
    <option disabled value="">{{ sortType }}</option>
    <option
      v-for="(sortValue, index) in sortValues"
      :key="index"
      :value="sortValue"
    >
      {{ sortValue }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    sortType: String,
    sortValues: Array,
  },
};
</script>

<style scoped lang="scss"></style>
