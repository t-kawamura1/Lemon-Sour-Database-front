import { mount } from "@vue/test-utils";
import SourAttributeNote from "@/components/atoms/SourAttributeNote";

describe("SourAttributeNote component test", () => {
  it("sourAttributeNoteTextの値を表示する", () => {
    const wrapper = mount(SourAttributeNote, {
      propsData: {
        sourAttributeNoteText: "タウリン1000mg配合！",
      },
    });
    expect(wrapper.find(".sour-attribute-note").text()).toBe(
      "タウリン1000mg配合！"
    );
  });
});
