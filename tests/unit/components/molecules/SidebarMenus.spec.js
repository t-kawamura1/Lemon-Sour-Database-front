import { mount } from "@vue/test-utils";
import SidebarMenus from "@/components/molecules/SidebarMenus";

describe("SidebarMenus component test", () => {
  let wrapper;
  wrapper = mount(SidebarMenus, {
    propsData: {
      menuNames: [
        { name: "ホーム" },
        { name: "アプリの機能その１" },
        { name: "アプリの機能その２" },
        { name: "ユーザー", dropdown: "enabled" },
      ],
      dropdownFunctions: ["テスト登録", "テストログイン"],
    },
  });

  it("menuNamesの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".sidebar-menu")).toHaveLength(4);
  });

  it("ユーザー以外のどれか一つメニューをクリックすると、linkイベントとそのメニュー名がemitされる", async () => {
    await wrapper.findAll(".menu-without-dropdown").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("ホーム");
  });

  it("ユーザーメニューをクリックすると、isActiveがtrueになる", async () => {
    await wrapper.find(".menu-with-dropdown").trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("ドロップダウンリストをクリックすると、modalイベントとその機能名がemitされる", async () => {
    await wrapper.findAll(".menu-dropdown-list").at(0).trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toStrictEqual("テスト登録");
  });
});
