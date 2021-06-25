<template>
  <div>
  <select :value="refinedSelect" @change="refinedSelect = $event.target.value">
    <option disabled value="">メーカーを選択</option>
    <option value="アサヒ">アサヒ</option>
    <option value="キリン">キリン</option>
    <option value="サッポロ">サッポロ</option>
    <option value="サントリー">サントリー</option>
    <option value="宝酒造">宝酒造</option>
  </select>
    <p>{{ refinedSelect }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refinedSelect: "",
    }
  },
};
</script>

<style scoped lang="scss">
.sour-name {
  font-size: 3rem;
  font-weight: 700;
  color: $font-color-bg-white;
  letter-spacing: 1.5px;
}
</style>
