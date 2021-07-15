import { mount } from "@vue/test-utils";
import HeaderIcons from "@/components/molecules/HeaderIcons";

describe("HeaderIcons component test", () => {
  let wrapper;
  wrapper = mount(HeaderIcons, {
    propsData: {
      headerIcons: ["lemon", "address-card"],
      dropdownFunctions: ["テスト登録", "テストログイン"],
    },
    stubs: ["font-awesome-icon"],
  });

  it("headerIconsの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".icon")).toHaveLength(2);
  });

  it("dropdownFunctionsの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".list-dropdown")).toHaveLength(2);
  });

  it("最初のアイコンをクリックすると、linkイベントとそのアイコン名がemitされる", async () => {
    await wrapper.findAll(".icon").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("lemon");
  });

  it("2つ目のアイコンをクリックすると、isActiveがtrueになる", async () => {
    await wrapper.findAll(".header-icon2").trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("ドロップダウンリストをクリックすると、modalイベントとその機能名がemitされる", async () => {
    await wrapper.findAll(".header-icon-dropdown-list").at(0).trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toStrictEqual("テスト登録");
  });
});
