<template>
  <div class="calculate-alcohol">
    <p class="calculate-alcohol-heading-explanation">
      {{ calculationSupplementText[0] }}
    </p>
    <error-message></error-message>
    <input-select
      class="calculate-alcohol-sour-select"
      :sort-type="selectType"
      :sort-values="registeredSours"
    ></input-select>
    <div class="calculate-alcohol-formula-box">
      <div class="calculate-alcohol-flex-unit1-box">
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            @input="alcContent350 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            @input="alcContent400 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
        <div class="calculate-alcohol-flex-unit1">
          <input-number
            class="calculate-alcohol-content-input"
            :input-number-attributes="alcoholInputs[0]"
            @input="alcContent500 = $event.target.value"
          ></input-number>
          <span class="calculate-alcohol-input-unit">%</span>
        </div>
      </div>
      <icon class="calculate-alcohol-x-icon" :icon-text="iconTexts[0]"></icon>
      <div class="calculate-alcohol-flex-unit2-box">
        <div class="calculate-alcohol-flex-unit2">
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
        <div class="calculate-alcohol-flex-unit2">
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
        <div class="calculate-alcohol-flex-unit2">
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
      <icon class="calculate-alcohol-arrow-icon" :icon-text="iconTexts[1]"></icon>
      <span class="calculate-alcohol-calculation-result">{{ sumPureAlcohol }}</span>
      <span class="calculate-alcohol-input-unit">g</span>
    </div>

    <div class="calculate-alcohol-supplement-button" @click="isActive = !isActive">
      {{ calculationSupplementText[1] }}
    </div>
    <div class="calculate-alcohol-supplement-box" v-show="isActive">
      <p class="calculate-alcohol-supplement-formula">
        {{ calculationSupplementText[2] }}
      </p>
      <p class="calculate-alcohol-supplement-appropriate">
        {{ calculationSupplementText[3] }}
      </p>
      <p class="calculate-alcohol-supplement-lisky">
        {{ calculationSupplementText[4][0] }}
      </p>
      <p class="calculate-alcohol-supplement-gender">
        {{ calculationSupplementText[4][1] }}
      </p>
    </div>
    <button-calculation-record
      class="calculate-alcohol-calc-rec-button"
      :button-calc-rec-text="calcButtons[0]"
    ></button-calculation-record>
  </div>
</template>

<script>
import ErrorMessage from "@/components/atoms/ErrorMessage";
import InputSelect from "@/components/atoms/InputSelect";
import InputNumber from "@/components/atoms/InputNumber";
import InputLabel from "@/components/atoms/InputLabel";
import Icon from "@/components/atoms/Icon";
import ButtonCalculationRecord from "@/components/atoms/ButtonCalculationRecord";

export default {
  components: {
    ErrorMessage,
    InputSelect,
    InputNumber,
    InputLabel,
    Icon,
    ButtonCalculationRecord,
  },
  props: {
    calculationSupplementText: Array,
    selectType: String,
    registeredSours: Array,
    alcoholInputs: Array,
    iconTexts: Array,
    calcButtons: Array,
  },
  data() {
    return {
      calculationResult: 0,
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
    }
  },
  computed: {
    sumPureAlcohol() {
      return (parseFloat(this.result350) + parseFloat(this.result400) + parseFloat(this.result500)).toFixed(1)
    }
  },
  watch: {
    alcContent350: function(newValue) {
      this.result350 = this.drinks350 * newValue / 100 * 0.8
    },
    alcContent400: function(newValue) {
      this.result400 = this.drinks400 * newValue / 100 * 0.8
    },
    alcContent500: function(newValue) {
      this.result500 = this.drinks500 * newValue / 100 * 0.8
    },
    drinks350: function(newValue) {
      this.result350 = newValue * this.alcContent350 / 100 * 0.8
    },
    drinks400: function(newValue) {
      this.result400 = newValue * this.alcContent400 / 100 * 0.8
    },
    drinks500: function(newValue) {
      this.result500 = newValue * this.alcContent500 / 100 * 0.8
    },
  },
};
</script>

<style scoped lang="scss">
.calculate-alcohol {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $font-color-bg-white;
  .calculate-alcohol-heading-explanation {
    margin-bottom: 30px;
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
          padding: 9px 0 9px 9px;
        }
      }
    }
    .calculate-alcohol-x-icon {
      font-size: 2.4rem;
    }
    .calculate-alcohol-flex-unit2-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 42%;
      height: 120px;
      .calculate-alcohol-flex-unit2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.6rem;
        .calculate-alcohol-drinks-input {
          padding: 9px 0 9px 9px;
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
    margin-bottom: 20px;
    cursor: pointer;
    color: $third-dark-yellow;
    &:hover {
      opacity: 0.7;
    }

  }
  .calculate-alcohol-supplement-box {
    height: 100px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .button-calculation-record {
    margin-top: 45px;
    font-size: 1.6rem;
  }
}
</style>
