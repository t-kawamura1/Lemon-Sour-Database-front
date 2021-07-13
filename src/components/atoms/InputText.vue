<template>
  <input
    class="input-text"
    :type="inputAttributes[0]"
    :placeholder="inputAttributes[1]"
    :name="inputAttributes[2]"
    @change="$emit('input', $event)"
  />
</template>

<script>
export default {
  props: {
    inputAttributes: Array,
  },
};
</script>

<style scoped lang="scss">
.input-text {
}
</style>
