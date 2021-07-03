import { mount } from "@vue/test-utils";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
import flushPromises from "flush-promises";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          name: "テストサワー",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
        {
          name: "テストチューハイ",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
      ],
    })
  ),
}));

describe("LemonSoursIndex component test", () => {
  it("axiosでAPIからレモンサワーのデータが取得できる", async () => {
    const wrapper = mount(LemonSoursIndex);
    await flushPromises();
    expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
    expect(wrapper.findAll(".sour-name")).toHaveLength(2);
  });
});
