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

  it("最初のアイコンをクリックすると、linkイベントとそのアイコン名がemitされる", async () => {
    console.log(wrapper.html());
    await wrapper.findAll(".icon").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("lemon");
  });

  it("2つ目のアイコンをクリックすると、dropdownイベントがemitされる", async () => {
    await wrapper.findAll(".icon").at(1).trigger("click");
    expect(wrapper.emitted().dropdown).toBeTruthy();
  });
});
