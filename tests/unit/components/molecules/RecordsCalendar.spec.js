import { mount } from "@vue/test-utils";
import RecordsCalendar from "@/components/molecules/RecordsCalendar";

describe("RecordsCalendar component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RecordsCalendar, {
      propsData: {
        recordsZero: [
          {
            drinking_date: "2021-08-08",
            total_pure_alcohol: 0,
            total_drinking: 0,
          },
          {
            drinking_date: "2021-08-14",
            total_pure_alcohol: 0,
            total_drinking: 0,
          },
        ],
        recordsLessThanTwenty: [
          {
            drinking_date: "2021-08-09",
            total_pure_alcohol: 14.2,
            total_drinking: 700,
          },
          {
            drinking_date: "2021-08-12",
            total_pure_alcohol: 19.6,
            total_drinking: 850,
          },
        ],
        recordsFromTwentyToThirtyNine: [
          {
            drinking_date: "2021-08-06",
            total_pure_alcohol: 25.9,
            total_drinking: 900,
          },
          {
            drinking_date: "2021-08-11",
            total_pure_alcohol: 32.7,
            total_drinking: 1000,
          },
        ],
        recordsFortyOrMore: [
          {
            drinking_date: "2021-08-3",
            total_pure_alcohol: 44.4,
            total_drinking: 1500,
          },
          {
            drinking_date: "2021-08-16",
            total_pure_alcohol: 59.8,
            total_drinking: 2000,
          },
        ],
        recordsDateAndSour: [
          { drinking_date: "2021-08-11", name: "テスサワ" },
          { drinking_date: "2021-08-16", name: "テスサワストロング" },
        ],
        colorsAndTexts: [
          ["cec-zero", "聖人君主！"],
          ["cec-safety", "オールグリーン！"],
          ["cec-warning", "警告！"],
          ["cec-dangerous", "危険！"],
        ],
      },
      stubs: ["v-calendar"],
    });
  });

  it("colorsAndTexts propsの要素の数だけ、リストレンダリングし、各テキストを表示する", () => {
    expect(wrapper.findAll(".records-calendar-explanation")).toHaveLength(4);
    expect(wrapper.findAll(".records-calendar-explanation").at(0).text()).toBe(
      "聖人君主！"
    );
    expect(wrapper.findAll(".records-calendar-explanation").at(1).text()).toBe(
      "オールグリーン！"
    );
    expect(wrapper.findAll(".records-calendar-explanation").at(2).text()).toBe(
      "警告！"
    );
    expect(wrapper.findAll(".records-calendar-explanation").at(3).text()).toBe(
      "危険！"
    );
  });
});
