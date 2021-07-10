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

// この記述がないとTypeErrorが出る。下記公式参照。
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

let wrapper;
let $mq;

describe("(pc display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(LemonSoursIndex, {
      mocks: {
        $mq,
      },
      stubs: ["font-awesome-icon"],
    });
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
      await wrapper.find(".pc-search-button").trigger("click");
      await wrapper.find(".pc-selects-form").trigger("submit");
      expect(wrapper.find(".pc-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  it("子コンポーネントから検索用のデータを受け取った場合、noContentsErrorの内容が変わる", async () => {
    await flushPromises();
    wrapper.find(".pc-selects-set").vm.$emit("sortBy", "テストリー");
    await flushPromises();
    // 本来、このテストでは表示されるデータをexpectすべきだが、axiosのモックが返すresponseを
    // ユースケースに応じて変える方法が見つからなかったため、エラーメッセージの変化を捉えることで替えることにした
    expect(wrapper.find(".error-message").text()).toBe(
      "該当するデータがありません"
    );
  });
});

describe("(sp display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(LemonSoursIndex, {
      mocks: {
        $mq,
      },
      stubs: ["font-awesome-icon"],
    });
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
      await wrapper.find(".sp-search-button").trigger("click");
      await wrapper.find(".sp-selects-form").trigger("submit");
      expect(wrapper.find(".sp-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  it("子コンポーネントから検索用のデータを受け取った場合、noContentsErrorの内容が変わる", async () => {
    await flushPromises();
    wrapper.find(".sp-selects-set").vm.$emit("sortBy", "テストリー");
    await flushPromises();
    expect(wrapper.find(".error-message").text()).toBe(
      "該当するデータがありません"
    );
  });
});
