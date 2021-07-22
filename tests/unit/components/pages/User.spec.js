import { mount } from "@vue/test-utils";
import User from "@/components/pages/User";
import flushPromises from "flush-promises";

let wrapper;
let $mq;

describe("(pc display) User component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(User, {
      mocks: {
        $mq,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
        },
      },
    });
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const userData = {
      name: "テストユーザー",
      email: "tes@sample.com",
      current_password: "",
      password: "",
    };
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ userEditErrors: ["現在のパスワード未入力エラー"] });
      });
    // ことごとく上手く行かないので、やむなく人為的にモックメソッドを呼び出した。
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const userData = {
      name: "テストユーザー",
      email: "tes@sample.com",
      current_password: "testpassword",
      password: "testpassword",
    };
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "変更受付" });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更受付");
  });
});

describe("(sp display) User component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(User, {
      mocks: {
        $mq,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
        },
      },
    });
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const userData = {
      name: "テストユーザー",
      email: "tes@sample.com",
      current_password: "",
      password: "",
    };
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ userEditErrors: ["現在のパスワード未入力エラー"] });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const userData = {
      name: "テストユーザー",
      email: "tes@sample.com",
      current_password: "testpassword",
      password: "testpassword",
    };
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "変更受付" });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更受付");
  });
});
