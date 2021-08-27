<template>
  <div class="sour-attributes">
    <table
      class="sour-attributes-table"
      v-for="(tableAttribute, index) in tableAttributes"
      :key="`table-${index}`"
    >
      <sour-attribute :attribute-set="tableAttribute"></sour-attribute>
    </table>
    <sour-attribute-note
      class="sour-attributes-sour-attribute-note"
      v-for="(sourAttributeNote, index) in sourAttributeNotes"
      :key="`note-${index}`"
      :sour-attribute-note-text="sourAttributeNote"
    ></sour-attribute-note>
  </div>
</template>

<script>
import SourAttribute from "@/components/atoms/SourAttribute";
import SourAttributeNote from "@/components/atoms/SourAttributeNote";

export default {
  components: {
    SourAttribute,
    SourAttributeNote,
  },
  props: {
    tableAttributes: Array,
    sourAttributeNotes: Array,
  },
};
</script>

<style scoped lang="scss">
.sour-attributes {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .sour-attributes-table {
    border-collapse: collapse;
    margin: 0 auto;
    padding: 0;
    width: $sour-column-width;
  }
  .sour-attributes-sour-attribute-note {
    margin-top: 10px;
  }
}
</style>
