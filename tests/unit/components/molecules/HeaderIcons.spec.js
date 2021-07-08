import { mount } from "@vue/test-utils";
import HeaderIcons from "@/components/molecules/HeaderIcons";

describe("HeaderIcons component test", () => {
  let wrapper;
  wrapper = mount(HeaderIcons, {
    propsData: {
      headerIcons: ["lemon", "address-card"],
    },
    stubs: ["font-awesome-icon"],
  });

  it("headerIconsの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".icon")).toHaveLength(2);
  });

  it("どれか一つアイコンをクリックすると、linkイベントとそのアイコン名がemitされる", async () => {
    await wrapper.findAll(".header-icon").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("lemon");
  });
});
