<template>
  <tr class="sour-attribute">
    <td class="attr-name">{{ attributeSet[0] }}</td>
    <td class="attr-value">{{ attributeSet[1] }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    attributeSet: Array,
  },
};
</script>

<style scoped lang="scss">
.sour-attribute {
  border: 1px solid gray;
  color: $font-color-bg-white;
  .attr-name {
    padding: 10px;
    border-right: 1px solid gray;
    width: 210px;
  }
  .attr-value {
    text-align: right;
    padding-right: 15px;
    width: 180px;
  }
}
</style>
