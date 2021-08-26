import { mount, createLocalVue } from "@vue/test-utils";
import DrinkingRecord from "@/components/pages/DrinkingRecord";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        [
          {
            drinking_date: "2021-08-17",
            total_pure_alcohol: 0,
            total_drinking: 0,
          },
        ],
        [
          {
            drinking_date: "2021-08-09",
            total_pure_alcohol: 14.2,
            total_drinking: 700,
          },
          {
            drinking_date: "2021-08-12",
            total_pure_alcohol: 19.6,
            total_drinking: 850,
          },
        ],
        [
          {
            drinking_date: "2021-08-06",
            total_pure_alcohol: 25.9,
            total_drinking: 900,
          },
          {
            drinking_date: "2021-08-11",
            total_pure_alcohol: 32.7,
            total_drinking: 1000,
          },
          {
            drinking_date: "2021-08-10",
            total_pure_alcohol: 39.9,
            total_drinking: 1350,
          },
        ],
        [
          {
            drinking_date: "2021-08-3",
            total_pure_alcohol: 44.4,
            total_drinking: 1500,
          },
          {
            drinking_date: "2021-08-16",
            total_pure_alcohol: 59.8,
            total_drinking: 2000,
          },
        ],
        ["発酵レモンサワー", "本絞り"],
      ],
    })
  ),
  delete: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        [
          {
            drinking_date: "2021-08-17",
            total_pure_alcohol: 0,
            total_drinking: 0,
          },
        ],
        [
          {
            drinking_date: "2021-08-09",
            total_pure_alcohol: 14.2,
            total_drinking: 700,
          },
          {
            drinking_date: "2021-08-12",
            total_pure_alcohol: 19.6,
            total_drinking: 850,
          },
        ],
        [
          {
            drinking_date: "2021-08-06",
            total_pure_alcohol: 25.9,
            total_drinking: 900,
          },
          {
            drinking_date: "2021-08-10",
            total_pure_alcohol: 39.9,
            total_drinking: 1350,
          },
        ],
        [
          {
            drinking_date: "2021-08-3",
            total_pure_alcohol: 44.4,
            total_drinking: 1500,
          },
          {
            drinking_date: "2021-08-16",
            total_pure_alcohol: 59.8,
            total_drinking: 2000,
          },
        ],
        ["発酵レモンサワー", "本絞り"],
      ],
    })
  ).mockImplementationOnce(() =>
    Promise.reject({
      response: {
        data: {
          error_message: "その日付の記録はないで",
        }
      }
    })
  ).mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        [
          {
            drinking_date: "2021-08-17",
            total_pure_alcohol: 0,
            total_drinking: 0,
          },
        ],
        [
          {
            drinking_date: "2021-08-09",
            total_pure_alcohol: 14.2,
            total_drinking: 700,
          },
          {
            drinking_date: "2021-08-12",
            total_pure_alcohol: 19.6,
            total_drinking: 850,
          },
        ],
        [
          {
            drinking_date: "2021-08-06",
            total_pure_alcohol: 25.9,
            total_drinking: 900,
          },
          {
            drinking_date: "2021-08-10",
            total_pure_alcohol: 39.9,
            total_drinking: 1350,
          },
        ],
        [
          {
            drinking_date: "2021-08-3",
            total_pure_alcohol: 44.4,
            total_drinking: 1500,
          },
          {
            drinking_date: "2021-08-16",
            total_pure_alcohol: 59.8,
            total_drinking: 2000,
          },
        ],
        ["発酵レモンサワー", "本絞り"],
      ],
    })
  ).mockImplementationOnce(() =>
    Promise.reject({
      response: {
        data: {
          error_message: "その日付の記録はないで",
        }
      }
    })
  )
}));

let wrapper;
let $mq;
let $router;
let $route;
let decryptHeadersMock;

beforeEach(() => {
  $router = { path: "" };
  $route = {
    name: "",
    params: {
      id: 1,
    },
  };
  decryptHeadersMock = jest.fn();
});

describe("(pc display) DrinkingRecord component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(DrinkingRecord, {
      localVue,
      propsData: {
        currentUser: {
          id: 1,
          name: "test",
          email: "test@test.com",
        },
      },
      methods: {
        decryptHeaders: decryptHeadersMock
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: [
        "font-awesome-icon",
        "v-calendar",
        "v-date-picker",
        "records-by-month"
      ],
    });
  });

  it("propsで渡されたユーザーの名前を、大見出しと「よく飲んでいるレモンサワー」の見出しに表示する", () => {
    wrapper.vm.$cookies.set("auth-header")
    wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
    wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
    wrapper.vm.authHeader["uid"] = "test@test.com";
    wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
    expect(wrapper.find(".the-heading").text()).toBe("testさんの飲酒記録");
    expect(wrapper.find(".records-sour-names-explanation").text()).toBe("testさんがよく飲んでいるレモンサワー");
  });

  it("初期描画時、取得してきたデータが各dataに入る", () => {
    expect(wrapper.vm.amountByDateZero).toHaveLength(1);
    expect(wrapper.vm.amountByDateLessThan20).toHaveLength(2);
    expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(3);
    expect(wrapper.vm.amountByDate40OrMore).toHaveLength(2);
    expect(wrapper.vm.countSourNames).toStrictEqual(["発酵レモンサワー", "本絞り"]);
  });

  describe("子コンポーネントからsubmitイベントがemitされるとき、", () => {
    it("ともにemitされた日付のデータが存在する場合、そのデータが削除される", async () => {
      expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(3);
      wrapper.find(".records-delete").vm.$emit("submit", "2021-08-11")
      await flushPromises();
      expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(2);
      expect(wrapper.find(".the-notice").text()).toBe("該当する記録を削除しました。");
    });

    it("ともにemitされた日付のデータが存在しない場合、エラーメッセージが表示される", async () => {
      wrapper.find(".records-delete").vm.$emit("submit", "2021-08-01")
      await flushPromises();
      expect(wrapper.find(".records-delete-error").text()).toBe("その日付の記録はないで");
    });
  })
});

describe("(sp display) DrinkingRecord component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(DrinkingRecord, {
      localVue,
      propsData: {
        currentUser: {
          id: 1,
          name: "test",
          email: "test@test.com",
        },
      },
      methods: {
        decryptHeaders: decryptHeadersMock
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: [
        "font-awesome-icon",
        "v-calendar",
        "v-date-picker",
        "records-by-month"
      ],
    });
  });

  it("propsで渡されたユーザーの名前を、大見出しと「よく飲んでいるレモンサワー」の見出しに表示する", () => {
    wrapper.vm.$cookies.set("auth-header")
    wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
    wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
    wrapper.vm.authHeader["uid"] = "test@test.com";
    wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
    expect(wrapper.find(".the-heading").text()).toBe("testさんの飲酒記録");
    expect(wrapper.find(".records-sour-names-explanation").text()).toBe("testさんがよく飲んでいるレモンサワー");
  });

  it("初期描画時、取得してきたデータが各dataに入る", () => {
    expect(wrapper.vm.amountByDateZero).toHaveLength(1);
    expect(wrapper.vm.amountByDateLessThan20).toHaveLength(2);
    expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(3);
    expect(wrapper.vm.amountByDate40OrMore).toHaveLength(2);
    expect(wrapper.vm.countSourNames).toStrictEqual(["発酵レモンサワー", "本絞り"]);
  });

  describe("子コンポーネントからsubmitイベントがemitされるとき、", () => {
    it("ともにemitされた日付のデータが存在する場合、そのデータが削除される", async () => {
      expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(3);
      wrapper.find(".records-delete").vm.$emit("submit", "2021-08-11")
      await flushPromises();
      expect(wrapper.vm.amountByDateFrom20To39).toHaveLength(2);
      expect(wrapper.find(".the-notice").text()).toBe("該当する記録を削除しました。");
    });

    it("ともにemitされた日付のデータが存在しない場合、エラーメッセージが表示される", async () => {
      wrapper.find(".records-delete").vm.$emit("submit", "2021-08-01")
      await flushPromises();
      expect(wrapper.find(".records-delete-error").text()).toBe("その日付の記録はないで");
    });
  })
});
