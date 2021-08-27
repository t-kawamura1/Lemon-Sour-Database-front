<template>
  <div class="sour-attribute-note">
    {{ sourAttributeNoteText }}
  </div>
</template>

<script>
export default {
  props: {
    sourAttributeNoteText: String,
  },
};
</script>

<style scoped lang="scss">
.sour-attribute-note {
  font-size: 1.4rem;
}
</style>
