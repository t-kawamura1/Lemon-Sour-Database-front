import { mount } from "@vue/test-utils";
import SidebarMenus from "@/components/molecules/SidebarMenus";

describe("SidebarMenus component test", () => {
  it("menuNamesの要素の数だけ、リストレンダリングする", () => {
    const wrapper = mount(SidebarMenus, {
      propsData: {
        menuNames: ["ホーム", "アプリの機能その１", "アプリの機能その２"],
      },
    });
    expect(wrapper.findAll(".sidebar-menu")).toHaveLength(3);
  });
});
