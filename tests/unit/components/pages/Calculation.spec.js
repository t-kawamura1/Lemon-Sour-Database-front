import { mount, createLocalVue } from "@vue/test-utils";
import Calculation from "@/components/pages/Calculation";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

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
  post: jest.fn(() =>
    Promise.reject({
      response: {
        data: ["日付入ってへんで"],
      },
    })
  ),
}));

let wrapper;
let $mq;
let $router;
let $route;
let recordData;
let decryptHeadersMock;

beforeEach(() => {
  $router = { path: "" };
  $route = { name: "" };
  recordData = {
    drinking_record: {
      user_id: "",
      lemon_sour_id: "",
      drinking_date: "",
      pure_alcohol_amount: "",
      drinking_amount: "",
    },
  };
  decryptHeadersMock = jest.fn();
});

describe("(pc display) Calculation component test", () => {
  beforeEach(async () => {
    $mq = "pc";
    wrapper = mount(Calculation, {
      localVue,
      data() {
        return {
          userId: 1,
        };
      },
      methods: {
        decryptHeaders: decryptHeadersMock,
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
    await wrapper
      .find(".calculate-alcohol-formula-alcohol-content-input")
      .setValue(5);
    await wrapper
      .find(".calculate-alcohol-formula-alcohol-content-input")
      .trigger("change");
    await wrapper
      .find(".calculate-alcohol-formula-amount-input")
      .findAll("option")
      .at(2)
      .setSelected();
    await wrapper.find(".calculate-alcohol-formula-counts-input").setValue(1);
    await wrapper
      .find(".calculate-alcohol-formula-counts-input")
      .trigger("change");
  });

  it("子コンポーネントからpassDateイベントを受け取ると、データのその値が入る", () => {
    wrapper.find(".calculate-alcohol").vm.$emit("passDate", "2021-05-30");
    expect(wrapper.vm.drinkingDate).toBe("2021-05-30");
  });

  describe("ログイン済みユーザーの場合", () => {
    it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
      wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
      wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
      wrapper.vm.authHeader["uid"] = "test@test.com";
      wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
      wrapper.find(".day-date-picker-input").setValue("");
      await wrapper
        .find(".calculate-alcohol-calc-record-button")
        .trigger("click");
      wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
      await flushPromises();
      expect(
        wrapper.find(".calculate-alcohol-record-error-messages").text()
      ).toBe("日付入ってへんで");
    });

    it("飲まなかった日記録ボタンを押すと、確認モーダルが開き、記録ボタンを押すと通知メッセージが表示される", async () => {
      const recordDrinkingMock = jest.fn().mockImplementationOnce(() => {
        wrapper.vm.noticeMessage = "記録が作成されたで";
      });
      wrapper.setMethods({ recordDrinking: recordDrinkingMock });
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".modal-title").text()).toBe("記録の確認");
      await wrapper.find(".button-zero-record").trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe("記録が作成されたで");
    });
  });

  describe("ログインしていないユーザーの場合", () => {
    it("結果記録ボタンを押すと、通知メッセージが表示される", async () => {
      wrapper.vm.$cookies.remove("auth-header");
      await wrapper
        .find(".calculate-alcohol-calc-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe(
        "結果を記録するには、ユーザー登録・ログインが必要です。"
      );
    });

    it("飲まなかった日を記録ボタンを押すと、通知メッセージが表示される", async () => {
      wrapper.vm.$cookies.remove("auth-header");
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe(
        "結果を記録するには、ユーザー登録・ログインが必要です。"
      );
    });
  });
});

describe("(sp display) Calculation component test", () => {
  beforeEach(async () => {
    $mq = "sp";
    wrapper = mount(Calculation, {
      localVue,
      data() {
        return {
          userId: 1,
        };
      },
      methods: {
        decryptHeaders: decryptHeadersMock,
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
    await wrapper
      .find(".calculate-alcohol-formula-alcohol-content-input")
      .setValue(5);
    await wrapper
      .find(".calculate-alcohol-formula-alcohol-content-input")
      .trigger("change");
    await wrapper
      .find(".calculate-alcohol-formula-amount-input")
      .findAll("option")
      .at(2)
      .setSelected();
    await wrapper.find(".calculate-alcohol-formula-counts-input").setValue(1);
    await wrapper
      .find(".calculate-alcohol-formula-counts-input")
      .trigger("change");
  });

  describe("ログイン済みユーザーの場合", () => {
    it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
      wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
      wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
      wrapper.vm.authHeader["uid"] = "test@test.com";
      wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
      wrapper.find(".day-date-picker-input").setValue("");
      await wrapper
        .find(".calculate-alcohol-calc-record-button")
        .trigger("click");
      wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
      await flushPromises();
      expect(
        wrapper.find(".calculate-alcohol-record-error-messages").text()
      ).toBe("日付入ってへんで");
    });

    it("飲まなかった日記録ボタンを押すと、確認モーダルが開き、記録ボタンを押すと通知メッセージが表示される", async () => {
      const recordDrinkingMock = jest.fn().mockImplementationOnce(() => {
        wrapper.vm.noticeMessage = "記録が作成されたで";
      });
      wrapper.setMethods({ recordDrinking: recordDrinkingMock });
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".modal-title").text()).toBe("記録の確認");
      await wrapper.find(".button-zero-record").trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe("記録が作成されたで");
    });
  });

  describe("ログインしていないユーザーの場合", () => {
    it("結果記録ボタンを押すと、通知メッセージが表示される", async () => {
      wrapper.vm.$cookies.remove("auth-header");
      await wrapper
        .find(".calculate-alcohol-calc-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe(
        "結果を記録するには、ユーザー登録・ログインが必要です。"
      );
    });

    it("飲まなかった日を記録ボタンを押すと、通知メッセージが表示される", async () => {
      wrapper.vm.$cookies.remove("auth-header");
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe(
        "結果を記録するには、ユーザー登録・ログインが必要です。"
      );
    });
  });
});
