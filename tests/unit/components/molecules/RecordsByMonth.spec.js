import { mount, createLocalVue } from "@vue/test-utils";
import RecordsByMonth from "@/components/molecules/RecordsByMonth";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

let wrapper;
let decryptHeadersMock;

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          year_month: "2021-08",
          total_pure_alcohol: 123.4,
          total_drinking: 3000,
        },
        {
          year_month: "2021-09",
          total_pure_alcohol: 154.8,
          total_drinking: 5000,
        },
      ],
    })
  ),
}));

decryptHeadersMock = jest.fn();

describe("RecordsByMonth component test", () => {
  beforeEach(() => {
    wrapper = mount(RecordsByMonth, {
      localVue,
      methods: {
        decryptHeaders: decryptHeadersMock,
      },
    });
  });

  it("初期描画時、今日の日付の年月が表示される", () => {
    const today = new Date();
    const yearMonth =
      today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString();
    const tempDate = wrapper.vm.covertNumericDateToMonthWithZero(yearMonth);
    const japaneseDate = wrapper.vm.convertNumericDateToJapaneseDate(tempDate);
    expect(wrapper.find(".records-by-month-title").text()).toContain(
      japaneseDate
    );
  });

  describe("入力欄に入力された日付のデータが存在する場合、", () => {
    it("その年月の総純アルコール量・総飲酒量の記録が表示される", async () => {
      wrapper.find(".records-by-month-date-select").setValue("2021-09");
      await wrapper.find(".records-by-month-date-select").trigger("change");
      expect(wrapper.find(".records-by-month-pure-alcohol").text()).toContain(
        154.8
      );
      expect(
        wrapper.find(".records-by-month-drinking-amount").text()
      ).toContain(5000);
    });
  });

  describe("入力欄に入力された日付のデータが存在しない場合、", () => {
    it("総純アルコール量・総飲酒量には０が表示される", async () => {
      wrapper.find(".records-by-month-date-select").setValue("2021-10");
      await wrapper.find(".records-by-month-date-select").trigger("change");
      expect(wrapper.find(".records-by-month-pure-alcohol").text()).toBe(
        "純アルコール量 : 0.0 g"
      );
      expect(wrapper.find(".records-by-month-drinking-amount").text()).toBe(
        "飲酒量 : 0 ml"
      );
    });
  });
});
