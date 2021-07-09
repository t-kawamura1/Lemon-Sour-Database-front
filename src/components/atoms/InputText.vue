<template>
  <input
    class="input-text"
    :type="inputAttributes[0]"
    :placeholder="inputAttributes[1]"
    @change="$emit('input', $event.target.value)"
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
