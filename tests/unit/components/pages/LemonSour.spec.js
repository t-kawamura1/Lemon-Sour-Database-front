import { mount, createLocalVue } from "@vue/test-utils";
import LemonSour from "@/components/pages/LemonSour";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        name: "テストサワー",
        manufacturer: "テスポロ",
        alcohol_content: 9,
        pure_alcohol: 7.2,
        calories: 54,
        fruit_juice: 4.5,
        zero_sugar: true,
        zero_sweetener: false,
        sour_image: { url: "@/assets/test/ls_test_sample.png" },
      },
    })
  ),
}));

const localVue = createLocalVue();
localVue.use(VueCookies);

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

describe("(pc display) LemonSour component test", () => {
  let wrapper;
  let $mq;
  let $route;
  beforeEach(() => {
    $mq = "pc";
    $route = {
      params: { id: 1 },
      name: "",
    };
    wrapper = mount(LemonSour, {
      localVue,
      mocks: {
        $mq,
        $route,
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("レモンサワーのデータを１件取得して表示する", async () => {
    await flushPromises();
    expect(wrapper.find(".sour-name").text()).toBe("テストサワー");
    expect(wrapper.find(".sour-image")).toBeTruthy();
    expect(wrapper.findAll(".zero-flag")).toHaveLength(1);
    expect(wrapper.find(".zero-flag").text()).toBe("糖類ゼロ");
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(5);
  });
});

describe("(sp display) LemonSour component test", () => {
  let wrapper;
  let $mq;
  let $route;
  beforeEach(() => {
    $mq = "sp";
    $route = {
      params: { id: 1 },
      name: "",
    };
    wrapper = mount(LemonSour, {
      localVue,
      mocks: {
        $mq,
        $route,
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("レモンサワーのデータを１件取得して表示する", async () => {
    await flushPromises();
    expect(wrapper.find(".sour-name").text()).toBe("テストサワー");
    expect(wrapper.find(".sour-image")).toBeTruthy();
    expect(wrapper.findAll(".zero-flag")).toHaveLength(1);
    expect(wrapper.find(".zero-flag").text()).toBe("糖類ゼロ");
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(5);
  });
});
