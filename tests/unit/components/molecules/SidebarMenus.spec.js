import { mount } from "@vue/test-utils";
import SidebarMenus from "@/components/molecules/SidebarMenus";

describe("SidebarMenus component test", () => {
  let wrapper;
  wrapper = mount(SidebarMenus, {
    propsData: {
      menuNames: ["ホーム", "アプリの機能その１", "アプリの機能その２"],
    },
  });

  it("menuNamesの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".sidebar-menu")).toHaveLength(3);
  });

  it("どれか一つメニューをクリックすると、linkイベントとそのメニュー名がemitされる", async () => {
    await wrapper.findAll(".menu").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("ホーム");
  });
});
