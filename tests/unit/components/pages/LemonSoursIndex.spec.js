import { mount } from "@vue/test-utils";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
import flushPromises from "flush-promises";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          name: "テストサワー",
          manufacturer: "テスポロ",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
        {
          name: "テストチューハイ",
          manufacturer: "テストリー",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
      ],
    })
  ),
}));

describe("LemonSoursIndex component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(LemonSoursIndex);
  });

  describe("初期描画時", () => {
    it("レモンサワーではなくエラーメッセージを表示する", () => {
      expect(wrapper.find(".error-message").text()).toBe("データを取得中");
    });

    it("レモンサワーのデータを全件取得して表示する", async () => {
      await flushPromises();
      expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
      expect(wrapper.findAll(".sour-name")).toHaveLength(2);
    });

    it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
      await flushPromises();
      await wrapper.find("button").trigger("click");
      await wrapper.find("form").trigger("submit");
      expect(wrapper.find(".selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  it("子コンポーネントから検索用のデータを受け取った場合、noContentsErrorの内容が変わる", async () => {
    await flushPromises();
    wrapper.find(".selects-set").vm.$emit("sortBy", "テストリー");
    await flushPromises();
    // 本来、このテストでは表示されるデータをexpectすべきだが、axiosのモックが返すresponseを
    // ユースケースに応じて変える方法が見つからなかったため、エラーメッセージの変化を捉えることで替えることにした
    expect(wrapper.find(".error-message").text()).toBe(
      "該当するデータがありません"
    );
  });
});
