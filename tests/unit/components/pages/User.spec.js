import { mount, createLocalVue } from "@vue/test-utils";
import User from "@/components/pages/User";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

jest.mock("axios", () => ({
  put: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: {
            user_image: {
              url: "http:testes.com",
            },
          },
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            errors: {
              full_messages: ["現在のパスワード未入力エラー"],
            },
          },
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            errors: {
              full_messages: ["ユーザー名未入力", "メルアド未入力"],
            },
          },
        },
      })
    )
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() =>
      //ここからsp表示用
      Promise.resolve({
        data: {
          data: {
            user_image: {
              url: "http:testes.com",
            },
          },
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            errors: {
              full_messages: ["現在のパスワード未入力エラー"],
            },
          },
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            errors: {
              full_messages: ["ユーザー名未入力", "メルアド未入力"],
            },
          },
        },
      })
    )
    .mockImplementationOnce(() => Promise.resolve()),
  delete: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve()),
}));

let wrapper;
let $mq;
let $router;
let $route;
let userData;
let inputImage;
let decryptHeadersMock;
let routerPushMock;
let scrollIntoViewMock;

beforeEach(() => {
  routerPushMock = jest.fn();
  $router = { push: routerPushMock };
  $route = { name: "" };
  userData = {
    name: "テストユーザー",
    email: "test@sample.com",
    current_password: "",
    password: "",
  };
  inputImage = "image-file";
  decryptHeadersMock = jest.fn();
  scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
});

describe("(pc display) User component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(User, {
      localVue,
      methods: {
        decryptHeaders: decryptHeadersMock,
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
          user_image: {
            url: "/image/test.png",
          },
        },
      },
    });
  });

  it("画像の変更が受け付けられると、その画像と通知メッセージが表示される", async () => {
    wrapper.find(".user-image-edit").vm.$emit("submitUserImage", inputImage);
    await flushPromises();
    expect(wrapper.find(".user-image").find("img").attributes("src")).toBe(
      "http:testes.com"
    );
    expect(wrapper.find(".the-notice").text()).toBe(
      "画像の変更を受け付けました。"
    );
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("ユーザー名、メールアドレスが入力されていないとエラーが表示される", async () => {
    userData.name = userData.email = "";
    userData.current_password = "testpassword";
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.findAll(".user-edit-error-message")).toHaveLength(2);
    expect(wrapper.findAll(".user-edit-error-message").at(0).text()).toBe(
      "ユーザー名未入力"
    );
    expect(wrapper.findAll(".user-edit-error-message").at(1).text()).toBe(
      "メルアド未入力"
    );
  });

  it("現在のパスワードを入力すると、変更が受け付けられる", async () => {
    userData.current_password = "testpassword";
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更を受け付けました。");
  });

  it("「ユーザーアカウント削除」を押すとモーダルが現れ、削除ボタンを押すと、クッキーが削除されとともにページ遷移メソッドが実行される", async () => {
    wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
    wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
    wrapper.vm.authHeader["uid"] = "test@sample.com";
    wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
    expect(routerPushMock.mock.calls).toHaveLength(0);
    await wrapper.find(".user-edit-delete").trigger("click");
    expect(wrapper.find(".modal-delete-user").exists()).toBeTruthy();
    await wrapper.find(".modal-delete-user-form").trigger("submit");
    await flushPromises();
    expect(wrapper.vm.$cookies.isKey("auth-header")).toBeFalsy();
    expect(routerPushMock.mock.calls).toHaveLength(1);
  });
});

describe("(sp display) User component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(User, {
      localVue,
      methods: {
        decryptHeaders: decryptHeadersMock,
      },
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
          user_image: {
            url: "/image/test.png",
          },
        },
      },
    });
  });

  it("画像の変更が受け付けられると、その画像と通知メッセージが表示される", async () => {
    wrapper.find(".user-image-edit").vm.$emit("submitUserImage", inputImage);
    await flushPromises();
    expect(wrapper.find(".user-image").find("img").attributes("src")).toBe(
      "http:testes.com"
    );
    expect(wrapper.find(".the-notice").text()).toBe(
      "画像の変更を受け付けました。"
    );
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("ユーザー名、メールアドレスが入力されていないとエラーが表示される", async () => {
    userData.name = userData.email = "";
    userData.current_password = "testpassword";
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.findAll(".user-edit-error-message")).toHaveLength(2);
    expect(wrapper.findAll(".user-edit-error-message").at(0).text()).toBe(
      "ユーザー名未入力"
    );
    expect(wrapper.findAll(".user-edit-error-message").at(1).text()).toBe(
      "メルアド未入力"
    );
  });

  it("現在のパスワードを入力すると、変更が受け付けられる", async () => {
    userData.current_password = "testpassword";
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更を受け付けました。");
  });

  it("「ユーザーアカウント削除」を押すとモーダルが現れ、削除ボタンを押すと、クッキーが削除されとともにページ遷移メソッドが実行される", async () => {
    wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
    wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
    wrapper.vm.authHeader["uid"] = "test@sample.com";
    wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
    expect(routerPushMock.mock.calls).toHaveLength(0);
    await wrapper.find(".user-edit-delete").trigger("click");
    expect(wrapper.find(".modal-delete-user").exists()).toBeTruthy();
    await wrapper.find(".modal-delete-user-form").trigger("submit");
    await flushPromises();
    expect(wrapper.vm.$cookies.isKey("auth-header")).toBeFalsy();
    expect(routerPushMock.mock.calls).toHaveLength(1);
  });
});
