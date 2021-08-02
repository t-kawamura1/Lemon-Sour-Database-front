import { mount } from "@vue/test-utils";
import ButtonCalculationRecord from "@/components/atoms/ButtonCalculationRecord";

describe("ButtonCalculationRecord component test", () => {
  it("buttonCalcRecText propsを表示する", () => {
    const wrapper = mount(ButtonCalculationRecord, {
      propsData: {
        buttonCalcRecText: "結果を記録します",
      },
    });
    expect(wrapper.text()).toBe("結果を記録します");
  });
});
