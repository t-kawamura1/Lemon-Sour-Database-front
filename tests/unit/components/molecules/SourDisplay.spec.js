import { mount } from "@vue/test-utils";
import SourDisplay from "@/components/molecules/SourDisplay";

describe("SourDisplay component test", () => {
  it("menuNamesの要素の数だけ、リストレンダリングする", () => {
    const wrapper = mount(SourDisplay, {
      propsData: {
        sourName: "ストロングゼロ",
        sourImage: "@/assets/test/ls_test_sample.png",
      },
    });
    expect(wrapper.find(".display-name").exists()).toBe(true);
    expect(wrapper.find(".display-image").exists()).toBe(true);
  });
});
