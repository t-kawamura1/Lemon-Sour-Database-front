import { mount, createLocalVue } from "@vue/test-utils";
import AgeConfirmation from "@/components/pages/AgeConfirmation";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);
localVue.prototype.$encryptKey = process.env.VUE_APP_CRYPTO_KEY;

let wrapper;
let $mq;
let $router;
let routerPushMock;
let historyBackMock;

routerPushMock = jest.fn();

$router = {
  push: routerPushMock,
};

describe("(pc display) AgeConfirmation component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(AgeConfirmation, {
      localVue,
      mocks: {
        $mq,
        $router,
      },
      stubs: ["font-awesome-icon"],
    });
  });
  describe("子コンポーネントからcheckイベントと回答データがemitされるとき、", () => {
    it("回答ボタンの１個目のテキストと回答データが一等しければ、クッキーがセットされ、$router.pushが実行される", async () => {
      expect(routerPushMock.mock.calls).toHaveLength(0);
      wrapper.find(".age-confirmation").vm.$emit("check", "はい")
      expect(wrapper.vm.$cookies.isKey("age-confirmation")).toBeTruthy();
      expect(routerPushMock.mock.calls).toHaveLength(1);
    });

    it("上記以外の場合、history.backが実行される", () => {
      historyBackMock = jest.spyOn(window.history, "back");
      expect(historyBackMock.mock.calls).toHaveLength(0);
      wrapper.find(".age-confirmation").vm.$emit("check", "いいえ")
      expect(historyBackMock.mock.calls).toHaveLength(1);
    });
  });
});

describe("(sp display) AgeConfirmation component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(AgeConfirmation, {
      localVue,
      mocks: {
        $mq,
        $router,
      },
      stubs: ["font-awesome-icon"],
    });
  });
  describe("子コンポーネントからcheckイベントと回答データがemitされるとき、", () => {
    it("回答ボタンの１個目のテキストと回答データが一等しければ、クッキーがセットされ、$router.pushが実行される", async () => {
      jest.clearAllMocks();
      expect(routerPushMock.mock.calls).toHaveLength(0);
      wrapper.find(".age-confirmation").vm.$emit("check", "はい")
      expect(wrapper.vm.$cookies.isKey("age-confirmation")).toBeTruthy();
      expect(routerPushMock.mock.calls).toHaveLength(1);
    });

    it("上記以外の場合、history.backが実行される", () => {
      historyBackMock = jest.spyOn(window.history, "back");
      expect(historyBackMock.mock.calls).toHaveLength(0);
      wrapper.find(".age-confirmation").vm.$emit("check", "いいえ")
      expect(historyBackMock.mock.calls).toHaveLength(1);
    });
  });
});
