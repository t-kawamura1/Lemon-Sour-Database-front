import { mount } from "@vue/test-utils";
import HeaderIcons from "@/components/molecules/HeaderIcons";

describe("HeaderIcons component test", () => {
  it("headerIconsの要素の数だけ、リストレンダリングする", () => {
    const wrapper = mount(HeaderIcons, {
      propsData: {
        headerIcons: ["lemon", "address-card"],
      },
      stubs: ["font-awesome-icon"],
    });
    expect(wrapper.findAll(".icon")).toHaveLength(2);
  });
});
