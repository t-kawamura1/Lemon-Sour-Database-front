import { mount } from "@vue/test-utils";
import TextCalculationMain from "@/components/atoms/TextCalculationMain";

describe("TextCalculationMain component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextCalculationMain, {
      propsData: {
        mainText: "飲酒量を記録できます",
      },
    });
  });

  it("MainText propsが表示される", () => {
    expect(wrapper.find(".text-calculation-main").text()).toBe(
      "飲酒量を記録できます"
    );
  });
});
