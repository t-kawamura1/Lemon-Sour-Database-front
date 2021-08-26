import { mount, createLocalVue } from "@vue/test-utils";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

jest.mock("axios", () => ({
  // 1回目
  get: jest
    .fn()
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 2回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 3回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 4回目(検索の成功結果)
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 5回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 6回目(検索の失敗結果)
    )
    .mockImplementationOnce(
      () =>
        Promise.reject({
          response: {
            data: {
              error_message: "そんなデータあらへん",
            },
          },
        })
      // 7回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 8回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 9回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 10回目(検索成功)
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 11回目
    )
    .mockImplementationOnce(
      () =>
        Promise.resolve({
          data: [
            {
              name: "テストサワー",
              manufacturer: "サッポロ",
              sour_image: { url: "@/assets/test/ls_test_sample1.png" },
            },
            {
              name: "テストチューハイ",
              manufacturer: "サントリー",
              sour_image: { url: "@/assets/test/ls_test_sample2.png" },
            },
          ],
        })
      // 12回目(検索失敗)
    )
    .mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            error_message: "そんなデータあらへん",
          },
        },
      })
    ),
}));

// 以下がないとテスト全体が落ちる。
const localVue = createLocalVue();
localVue.use(VueCookies);

let wrapper;
let $route;
let $mq;

$route = { name: "" };

describe("(pc display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(LemonSoursIndex, {
      localVue,
      mocks: {
        $route,
        $mq,
      },
      stubs: ["font-awesome-icon", "vue-loaders"],
    });
  });

  describe("初期描画時", () => {
    it("レモンサワーのデータを全件取得して表示する", async () => {
      expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
      expect(wrapper.findAll(".sour-name")).toHaveLength(2);
    });

    it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
      await wrapper.find(".pc-search-button").trigger("click");
      await wrapper.find(".pc-selects-form").trigger("submit");
      expect(wrapper.find(".pc-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });
  describe("レモンサワーのデータを検索するとき、", () => {
    it("データが存在するとき、該当するレモンサワーのデータが返ってくる", async () => {
      wrapper.find(".pc-input-select").findAll("option").at(7).setSelected();
      await wrapper.find(".pc-selects-form").trigger("submit");
      await flushPromises();
      expect(wrapper.findAll(".pc-sours-index-items-item")).toHaveLength(1);
      expect(wrapper.find(".sour-name-line").text()).toBe("テストチューハイ");
      expect(wrapper.find(".sour-image").attributes("src")).toBe(
        "@/assets/test/ls_test_sample2.png"
      );
    });

    it("データが存在しないとき、エラーメッセージが返ってくる", async () => {
      wrapper.find(".pc-input-select").findAll("option").at(2).setSelected();
      await wrapper.find(".pc-selects-form").trigger("submit");
      await flushPromises();
      expect(wrapper.findAll(".pc-sours-index-items-item")).toHaveLength(0);
      expect(wrapper.find(".pc-sours-index-items-error").text()).toBe(
        "そんなデータあらへん"
      );
    });
  });
});

describe("(sp display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(LemonSoursIndex, {
      localVue,
      mocks: {
        $route,
        $mq,
      },
      stubs: ["font-awesome-icon", "vue-loaders"],
    });
  });

  describe("初期描画時", () => {
    it("レモンサワーのデータを全件取得して表示する", async () => {
      expect(wrapper.findAll(".sour-name")).toHaveLength(2);
      expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
    });

    it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
      await wrapper.find(".sp-search-button").trigger("click");
      await wrapper.find(".sp-selects-form").trigger("submit");
      expect(wrapper.find(".sp-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  describe("レモンサワーのデータを検索するとき、", () => {
    it("存在するデータについて検索するとき、該当するレモンサワーのデータが返ってくる", async () => {
      wrapper.find(".sp-input-select").findAll("option").at(7).setSelected();
      await wrapper.find(".sp-selects-form").trigger("submit");
      await flushPromises();
      expect(wrapper.findAll(".sp-sours-index-items-item")).toHaveLength(1);
      expect(wrapper.find(".sour-name-line").text()).toBe("テストチューハイ");
      expect(wrapper.find(".sour-image").attributes("src")).toBe(
        "@/assets/test/ls_test_sample2.png"
      );
    });

    it("データが存在しないとき、エラーメッセージが返ってくる", async () => {
      wrapper.find(".sp-input-select").findAll("option").at(2).setSelected();
      await wrapper.find(".sp-selects-form").trigger("submit");
      await flushPromises();
      expect(wrapper.findAll(".sp-sours-index-items-item")).toHaveLength(0);
      expect(wrapper.find(".sp-sours-index-items-error").text()).toBe(
        "そんなデータあらへん"
      );
    });
  });
});
