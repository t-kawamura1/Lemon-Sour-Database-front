import { mount } from "@vue/test-utils";
import ButtonZeroRecord from "@/components/atoms/ButtonZeroRecord";

describe("ButtonZeroRecord component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonZeroRecord, {
      propsData: {
        buttonZeroRecordText: "飲まなかった日を記録します",
      },
    });
  });

  it("buttonCalcRecText propsを表示する", () => {
    expect(wrapper.text()).toBe("飲まなかった日を記録します");
  });

  it("クリックすると、recordZeroイベントをemitする", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted().zeroRecord).toBeTruthy();
  });
});
