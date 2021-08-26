import { mount, createLocalVue } from "@vue/test-utils";
import UserPasswordReset from "@/components/pages/UserPasswordReset";
import flushPromises from "flush-promises";
import { parse } from "querystring";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(parse);
localVue.use(VueCookies);

jest.mock("axios", () => ({
  put: jest.fn().mockImplementationOnce(() =>
    Promise.resolve()
  ).mockImplementationOnce(() =>
    Promise.reject({
      response: {
        data: {
          errors: {
            full_messages: ["パスワード未入力", "8文字以上で", "不一致"]
          }
        }
      }
    })
  ).mockImplementationOnce(() =>
    Promise.resolve()
  ).mockImplementationOnce(() =>
    Promise.reject({
      response: {
        data: {
          errors: {
            full_messages: ["パスワード未入力", "8文字以上で", "不一致"]
          }
        }
      }
    })
  )
}));

let wrapper;
let $mq;
let userData;
let encryptHeadersMock;

beforeEach(() => {
  userData = {
    password: "password",
    password_confirmation: "password",
  };
  encryptHeadersMock = jest.fn();
});

describe("(pc display) UserPasswordReset component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(UserPasswordReset, {
      methods: {
        encryptHeaders: encryptHeadersMock
      },
      mocks: {
        $mq,
      },
    });
  });

  it("パスワードとパスワード確認を入力すると、リセットが受け付けられる", async () => {
    wrapper.find(".password-reset").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("パスワードがリセットされました。5秒後にホームへ移動します。");
  });

  it("パスワード、パスワード確認が入力されていないとエラーが表示される", async () => {
    userData.password = userData.password_confirmation = "";
    wrapper.find(".password-reset").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.findAll(".password-reset-error-message")).toHaveLength(3);
    expect(wrapper.findAll(".password-reset-error-message").at(0).text()).toBe(
      "パスワード未入力"
    );
    expect(wrapper.findAll(".password-reset-error-message").at(1).text()).toBe(
      "8文字以上で"
    );
    expect(wrapper.findAll(".password-reset-error-message").at(2).text()).toBe(
      "不一致"
    );
  });
});

describe("(sp display) UserPasswordReset component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(UserPasswordReset, {
      methods: {
        encryptHeaders: encryptHeadersMock
      },
      mocks: {
        $mq,
      },
    });
  });

  it("パスワードとパスワード確認を入力すると、リセットが受け付けられる", async () => {
    wrapper.find(".password-reset").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("パスワードがリセットされました。5秒後にホームへ移動します。");
  });

  it("パスワード、パスワード確認が入力されていないとエラーが表示される", async () => {
    userData.password = userData.password_confirmation = "";
    wrapper.find(".password-reset").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.findAll(".password-reset-error-message")).toHaveLength(3);
    expect(wrapper.findAll(".password-reset-error-message").at(0).text()).toBe(
      "パスワード未入力"
    );
    expect(wrapper.findAll(".password-reset-error-message").at(1).text()).toBe(
      "8文字以上で"
    );
    expect(wrapper.findAll(".password-reset-error-message").at(2).text()).toBe(
      "不一致"
    );
  });
});