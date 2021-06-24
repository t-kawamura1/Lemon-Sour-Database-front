import { mount } from "@vue/test-utils";
import SourName from "@/components/atoms/SourName";

describe("SourName component test", () => {
  it("sourNameText propsを表示する", () => {
    const wrapper = mount(SourName, {
      propsData: {
        sourNameText: "test sour name",
      },
    });
    expect(wrapper.text()).toBe("test sour name");
  });
});
