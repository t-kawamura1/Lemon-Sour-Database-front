<template>
  <div class="records-calendar">
    <v-calendar
      class="records-calendar-v-calendar"
      is-expanded
      :attributes="recordAttributes"
    >
      <template slot="header-title" slot-scope="page">
        <div @click="displayMonthRecord">
          {{ page.yearLabel }}年{{ page.monthLabel }}
        </div>
      </template>
    </v-calendar>
    <div class="records-calendar-color-explanation">
      <div class="rc-color-explanation-green">
        <span class="rc-ceg-circle"></span>
        純アルコール量20g未満。
      </div>
      <div class="rc-color-explanation-yellow">
        <span class="rc-cey-circle"></span>
        純アルコール量20g以上。
      </div>
      <div class="rc-color-explanation-red">
        <span class="rc-cer-circle"></span>
        純アルコール量40g以上。
      </div>
    </div>
    <div class="records-calendar-record-by-month"></div>
  </div>
</template>

<script>
// import Icon from "@/components/atoms/Icon";

export default {
  components: {
    // Icon,
  },
  props: {
    recordsLessThanTwenty: Array,
    recordsFromTwentyToThirtyNine: Array,
    recordsFortyOrMore: Array,
    recordsDateAndSour: Array,
  },
  data() {
    return {};
  },
  computed: {
    recordAttributes() {
      return [
        ...this.recordsLessThanTwenty.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-green",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
        ...this.recordsFromTwentyToThirtyNine.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-yellow",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
        ...this.recordsFortyOrMore.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-red",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
      ];
    },
  },
  methods: {
    displayMonthRecord() {
      console.log("いけた");
      // const thisMonth = document.querySelector(".vc-title").innerHTML
    },
  },
};
</script>

<style scoped lang="scss">
.records-calendar {
  width: 300px;
  .records-calendar-v-calendar {
    margin-bottom: 30px;
  }
  .records-calendar-color-explanation {
    margin-bottom: 30px;
    .rc-color-explanation-green {
      margin-bottom: 6px;
      .rc-ceg-circle {
        content: "";
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background-color: $calendar-green;
        vertical-align: top;
        margin-right: 6px;
      }
    }
    .rc-color-explanation-yellow {
      margin-bottom: 6px;
      .rc-cey-circle {
        content: "";
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background-color: $calendar-yellow;
        vertical-align: top;
        margin-right: 6px;
      }
    }
    .rc-color-explanation-red {
      .rc-cer-circle {
        content: "";
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background-color: $calendar-red;
        vertical-align: top;
        margin-right: 6px;
      }
    }
  }
  .records-calendar-record-by-month {
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss">
.highlight-bg-green {
  background-color: $calendar-green;
}
.highlight-bg-yellow {
  background-color: $calendar-yellow;
}
.highlight-bg-red {
  background-color: $calendar-red;
}
</style>
