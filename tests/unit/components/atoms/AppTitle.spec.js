import { mount } from "@vue/test-utils";
import AppTitle from "@/components/atoms/AppTitle";

describe("AppTitle component test", () => {
  it("アプリタイトルをクリックすると、linkイベントとtoHomeがemitされる", async () => {
    const wrapper = mount(AppTitle);
    await wrapper.find(".app-title").trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toBe("toHome");
  });
});
