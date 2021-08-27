import { mount } from "@vue/test-utils";
import SourAttributes from "@/components/molecules/SourAttributes";

describe("SourAttributes component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SourAttributes, {
      propsData: {
        tableAttributes: [
          ["度数", 7],
          ["カロリー", 45],
        ],
        sourAttributeNotes: ["150mlあたり", "200mlあたり"],
      },
    });
  });

  it("tableAttributes内の配列の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(2);
  });

  it("sourAttributeNotesの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".sour-attribute-note")).toHaveLength(2);
  });
});
