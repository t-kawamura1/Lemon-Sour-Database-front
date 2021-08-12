<template>
  <div class="calculate-alcohol">
    <error-message
      class="calculate-alcohol-error-message"
      v-for="(errorMessage, index) in errorMessages"
      :key="`error-${index}`"
      :error-message-text="errorMessage"
    ></error-message>
    <day-date-picker
      class="calculate-alcohol-date-picker"
      @input="setDrinkingDate"
    ></day-date-picker>
    <input-select
      class="calculate-alcohol-sour-select"
      :sort-type="soursSelect[0]"
      :sort-values="soursSelect[1]"
      :init-value="sourName"
      @input="setAlcoholContent"
    ></input-select>
    <div class="calculate-alcohol-formula-box">
      <div class="calculate-alcohol-flex-unit1-box">
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            :init-value="sourAlcoholContent"
            @input="alcContent350 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            :init-value="sourAlcoholContent"
            @input="alcContent400 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            :init-value="sourAlcoholContent"
            @input="alcContent500 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
      </div>
      <div class="calculate-alcohol-flex-unit2-box">
        <icon class="calculate-alcohol-x-icon" :icon-text="iconTexts[0]"></icon>
        <icon class="calculate-alcohol-x-icon" :icon-text="iconTexts[0]"></icon>
        <icon class="calculate-alcohol-x-icon" :icon-text="iconTexts[0]"></icon>
      </div>
      <div class="calculate-alcohol-flex-unit3-box">
        <div class="calculate-alcohol-flex-unit3">
          <input-label
            class="calculate-alcohol-capacity-label"
            :label-text="alcoholInputs[1][0].label"
          ></input-label>
          <input-number
            class="calculate-alcohol-drinks-input"
            :input-number-attributes="alcoholInputs[1][0].attributes"
            @input="drinks350 = $event.target.value * 350"
          ></input-number>
          <span class="calculate-alcohol-input-unit">本</span>
        </div>
        <div class="calculate-alcohol-flex-unit3">
          <input-label
            class="calculate-alcohol-capacity-label"
            :label-text="alcoholInputs[1][1].label"
          ></input-label>
          <input-number
            class="calculate-alcohol-drinks-input"
            :input-number-attributes="alcoholInputs[1][1].attributes"
            @input="drinks400 = $event.target.value * 400"
          ></input-number>
          <span class="calculate-alcohol-input-unit">本</span>
        </div>
        <div class="calculate-alcohol-flex-unit3">
          <input-label
            class="calculate-alcohol-capacity-label"
            :label-text="alcoholInputs[1][2].label"
          ></input-label>
          <input-number
            class="calculate-alcohol-drinks-input"
            :input-number-attributes="alcoholInputs[1][2].attributes"
            @input="drinks500 = $event.target.value * 500"
          ></input-number>
          <span class="calculate-alcohol-input-unit">本</span>
        </div>
      </div>
    </div>
    <div class="calculate-alcohol-result-box">
      <icon
        class="calculate-alcohol-arrow-icon"
        :icon-text="iconTexts[1]"
      ></icon>
      <span class="calculate-alcohol-calculation-result">
        {{ sumPureAlcohol }}
      </span>
      <span class="calculate-alcohol-input-unit">g</span>
    </div>
    <div
      class="calculate-alcohol-supplement-button"
      @click="isActive = !isActive"
    >
      {{ calculationSupplementTexts[0] }}
    </div>
    <text-calculation-supplement
      class="calculate-alcohol-supplement-text"
      v-show="isActive"
      v-for="(calcSuppleText, index) in calculationSupplementTexts[1]"
      :key="index"
      :supplement-text="calcSuppleText"
    ></text-calculation-supplement>
    <button-calculation-record
      class="calculate-alcohol-calc-rec-button"
      :button-calc-rec-text="calcButton"
      @record="substituteRecordData"
    ></button-calculation-record>
    <button-twitter
      class="calculate-alcohol-tweet-button"
      :pure-alc="sumPureAlcohol"
    ></button-twitter>
  </div>
</template>

<script>
import ErrorMessage from "@/components/atoms/ErrorMessage";
import DayDatePicker from "@/components/atoms/DayDatePicker";
import InputSelect from "@/components/atoms/InputSelect";
import InputNumber from "@/components/atoms/InputNumber";
import InputLabel from "@/components/atoms/InputLabel";
import Icon from "@/components/atoms/Icon";
import TextCalculationSupplement from "@/components/atoms/TextCalculationSupplement";
import ButtonCalculationRecord from "@/components/atoms/ButtonCalculationRecord";
import ButtonTwitter from "@/components/atoms/ButtonTwitter";

export default {
  components: {
    ErrorMessage,
    DayDatePicker,
    InputSelect,
    InputNumber,
    InputLabel,
    Icon,
    TextCalculationSupplement,
    ButtonCalculationRecord,
    ButtonTwitter,
  },
  props: {
    calculationSupplementTexts: Array,
    errorMessages: Array,
    soursSelect: Array,
    lemonSours: Array,
    alcoholInputs: Array,
    iconTexts: Array,
    calcButton: String,
    todaySour: Object,
  },
  data() {
    return {
      soursSelectBox: [],
      sourName: this.soursSelect[1][0],
      sourAlcoholContent: 0,
      alcContent350: 0,
      alcContent400: 0,
      alcContent500: 0,
      drinks350: 0,
      drinks400: 0,
      drinks500: 0,
      result350: 0,
      result400: 0,
      result500: 0,
      isActive: false,
      recordData: {
        drinking_record: {
          user_id: "",
          lemon_sour_id: "",
          drinking_date: "",
          pure_alcohol_amount: "",
          drinking_amount: "",
        },
      },
    };
  },
  methods: {
    setAlcoholContent(sourName) {
      const selectedSour = this.lemonSours.find((ele) => ele.name == sourName);
      this.recordData.drinking_record.lemon_sour_id = selectedSour.id;
      const selectedSourAlc = selectedSour.alcohol_content;
      document.querySelectorAll(".calculate-alcohol-content-input")[0].value =
        selectedSourAlc;
      document.querySelectorAll(".calculate-alcohol-content-input")[1].value =
        selectedSourAlc;
      document.querySelectorAll(".calculate-alcohol-content-input")[2].value =
        selectedSourAlc;
      this.alcContent350 = selectedSourAlc;
      this.alcContent400 = selectedSourAlc;
      this.alcContent500 = selectedSourAlc;
    },
    setDrinkingDate(date) {
      this.recordData.drinking_record.drinking_date = date;
    },
    substituteRecordData() {
      this.recordData.drinking_record.drinking_amount =
        this.drinks350 + this.drinks400 + this.drinks500;
      this.recordData.drinking_record.pure_alcohol_amount = this.sumPureAlcohol;
      this.$emit("submitRecord", this.recordData);
    },
  },
  computed: {
    sumPureAlcohol() {
      return (
        parseFloat(this.result350) +
        parseFloat(this.result400) +
        parseFloat(this.result500)
      ).toFixed(1);
    },
  },
  watch: {
    alcContent350: function (newValue) {
      this.result350 = ((this.drinks350 * newValue) / 100) * 0.8;
    },
    alcContent400: function (newValue) {
      this.result400 = ((this.drinks400 * newValue) / 100) * 0.8;
    },
    alcContent500: function (newValue) {
      this.result500 = ((this.drinks500 * newValue) / 100) * 0.8;
    },
    drinks350: function (newValue) {
      this.result350 = ((newValue * this.alcContent350) / 100) * 0.8;
    },
    drinks400: function (newValue) {
      this.result400 = ((newValue * this.alcContent400) / 100) * 0.8;
    },
    drinks500: function (newValue) {
      this.result500 = ((newValue * this.alcContent500) / 100) * 0.8;
    },
  },
  created() {
    if (this.todaySour !== undefined) {
      this.sourName = this.todaySour.name
      this.sourAlcoholContent = this.todaySour.alcohol_content
      this.alcContent350 = this.todaySour.alcohol_content
      this.alcContent400 = this.todaySour.alcohol_content
      this.alcContent500 = this.todaySour.alcohol_content
    }
  },
};
</script>

<style scoped lang="scss">
.calculate-alcohol {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $font-color-bg-white;
  .calculate-alcohol-error-message {
    margin-bottom: 15px;
  }
  .calculate-alcohol-date-picker {
    margin-bottom: 15px;
  }
  .calculate-alcohol-sour-select {
    padding: 9px 0 9px 3px;
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
  .calculate-alcohol-formula-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    width: 300px;
    margin-bottom: 30px;
    .calculate-alcohol-flex-unit1-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 27%;
      height: 120px;
      .calculate-alcohol-flex-unit1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.6rem;
        .calculate-alcohol-content-input {
          padding: 9px 9px 9px 9px;
        }
      }
    }
    .calculate-alcohol-flex-unit2-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 105px;
      .calculate-alcohol-x-icon {
        font-size: 2rem;
      }
    }
    .calculate-alcohol-flex-unit3-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 42%;
      height: 120px;
      .calculate-alcohol-flex-unit3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.6rem;
        .calculate-alcohol-drinks-input {
          padding: 9px 9px 9px 9px;
        }
      }
    }
  }
  .calculate-alcohol-result-box {
    display: flex;
    align-items: center;
    font-size: 2.4rem;
    margin-bottom: 30px;
    .calculate-alcohol-arrow-icon {
      margin-right: 30px;
    }
    .calculate-alcohol-calculation-result {
      border-bottom: 4px dotted $light-green;
      padding-bottom: 3px;
      margin-right: 10px;
    }
  }
  .calculate-alcohol-supplement-button {
    margin-bottom: 10px;
    cursor: pointer;
    color: $third-dark-yellow;
    text-align: left;
    &:hover {
      opacity: 0.7;
    }
  }
  .calculate-alcohol-supplement-text {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
  .calculate-alcohol-calc-rec-button {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
  .calculate-alcohol-tweet-button {
    margin-bottom: 30px;
  }
}
</style>
