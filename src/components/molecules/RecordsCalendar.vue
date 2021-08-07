<template>
  <div class="records-calendar">
    <v-calendar
      class="records-calendar-v-calendar"
      is-expanded
      :attributes="recordAttributes"
    >
      <template slot="header-title" slot-scope="page">
        {{ page.yearLabel }}年{{ page.monthLabel }}
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
    <div class="records-calendar-record-by-month">
      <div>{{ japaneseThisYearMonth }}の記録</div>
      <input type="month" @input="displayAmountsBy($event.target.value)" class="exinput" :value="selectedDate">
      <div>純アルコール量： {{ totalPureAlcohol }} g</div>
      <div>飲酒量： {{ totalDrinking }} ml</div>
    </div>
  </div>
</template>

<script>
// import Icon from "@/components/atoms/Icon";
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";

export default {
  mixins: [CommonData, CommonMethods],
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
    return {
      amountsByMonth: [],
      monthRecord: "",
      vcTitle: "",
      japaneseThisYearMonth: "",
      selectedDate: "",
      totalPureAlcoholByMonth: "",
      totalDrinkingByMonth: "",
    };
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
    totalPureAlcohol() {
      return this.totalPureAlcoholByMonth
    },
    totalDrinking() {
      return this.totalDrinkingByMonth
    }
  },
  methods: {
    convertJapaneseDateToNumericDate(yearMonthString) {
      const oneDigitMonth = /\d{4}年\d{1}月/g
      if (oneDigitMonth.test(yearMonthString)) {
        return yearMonthString.replace(" ", "").replace("年", "-0").replace("月", "")
      } else {
        return yearMonthString.replace(" ", "").replace("年", "-").replace("月", "")
      }
    },
    convertNumericDateToJapaneseDate(yearMonthString) {
      const oneDigitMonth = /\d{4}-0\d{1}/g
      if (oneDigitMonth.test(yearMonthString)) {
        return `${yearMonthString.replace(" ", "").replace("-0", "年")}月`
      } else {
        return `${yearMonthString.replace(" ", "").replace("-", "年")}月`
      }
    },
    getYearMonthFromCalendar() {
      this.vcTitle = document.querySelector(".vc-title").innerHTML
      return this.convertJapaneseDateToNumericDate(this.vcTitle)
    },
    getJapaneseThisYearMonth() {
      const today = new Date();
      const year = today.getFullYear().toString();
      const month = (today.getMonth() + 1).toString();
      this.japaneseThisYearMonth = `${year}年${month}月`;
    },
    displayAmountsBy(yearMonth) {
      const replacedYM = yearMonth.replace(" ", "")
      this.selectedDate = replacedYM
      this.japaneseThisYearMonth = this.convertNumericDateToJapaneseDate(replacedYM)
      const thisMonthRecord = this.amountsByMonth.find(ele => ele.year_month == replacedYM)
      if (thisMonthRecord === undefined) {
        this.totalPureAlcoholByMonth = 0
        this.totalDrinkingByMonth = 0
      } else {
        this.totalPureAlcoholByMonth = thisMonthRecord.total_pure_alcohol
        this.totalDrinkingByMonth = thisMonthRecord.total_drinking
      }
    },
  },
  created() {
    this.getJapaneseThisYearMonth()
    this.selectedDate = this.convertJapaneseDateToNumericDate(this.japaneseThisYearMonth)
  },
  mounted() {
    this.decryptHeaders();
    axios
      .get("/api/v1/drinking_records/amounts_by_month", {
        headers: this.authHeader,
      })
      .then(res => {
        this.amountsByMonth = res.data
        const yearMonth = this.getYearMonthFromCalendar()
        this.displayAmountsBy(yearMonth)
      })
      .catch(err => {
        console.log(err)
      })
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
