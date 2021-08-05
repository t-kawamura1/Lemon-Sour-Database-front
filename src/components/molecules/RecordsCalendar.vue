<template>
  <div class="records-calendar">
    <v-calendar
      is-expanded
      :attributes="recordAttributes"
    ></v-calendar>
  </div>
</template>

<script>
// import Icon from "@/components/atoms/Icon";

export default {
  components: {
    // Icon,
  },
  props: {
    dateAndDrinkingAmounts: Array,
    sourDrank: Array,
  },
  data() {
    return {

    };
  },
  computed: {
    recordAttributes() {
      return [
        ...this.dateAndDrinkingAmounts.map(record => ({
          dates: record.drinking_date,
          highlight: true,
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
          },
        }))
      ];
    },
  },
  methods: {
    filterByDate(date) {
      const selectedRecords= this.drinkingRecords.filter(
        record => record.drinking_date == date
      )
      console.log(selectedRecords)
    },
  },
};
</script>

<style scoped lang="scss">
.records-calendar {
  width: 300px;
}
</style>

<style lang="scss">
.records-calendar-highlight-bg {
  background-color: $base-yellow;
}
</style>
