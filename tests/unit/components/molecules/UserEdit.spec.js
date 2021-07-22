import { mount } from "@vue/test-utils";
import UserEdit from "@/components/molecules/UserEdit";

describe("UserEdit component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UserEdit, {
      propsData: {
        editContents: [
          [
            ["text", "ユーザー名", "name", "ストロングおじさん"],
            ["email", "メールアドレス", "email", "strong@sour.com"],
            ["password", "現在のパスワード", "current_password"],
            ["password", "新しいパスワード(8文字以上)", "password"],
          ],
          "登録",
        ],
        errorMessages: ["だめだ", "セキュアじゃない", "やりなおせ"],
      },
    });
  });

  it("errorMessagesの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".error-message")).toHaveLength(3);
  });

  it("editContents[0]の要素の数（配列の数）だけ、input-textコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".input-text")).toHaveLength(4);
  });

  it("modalUserContents props[1]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".button-user-submit").exists()).toBeTruthy();
  });

  it("input-textに入力されるとuserDataが更新され、submitボタンを押すとsubmitUserイベントとそのuserDataがemitされる", async () => {
    const nameInput = wrapper.findAll("input").at(0);
    const emailInput = wrapper.findAll("input").at(1);
    const currentPasswordInput = wrapper.findAll("input").at(2);
    const passwordInput = wrapper.findAll("input").at(3);
    await nameInput.setValue("大垣千明");
    await emailInput.setValue("sima@rin.com");
    await currentPasswordInput.setValue("aoi@inuyama3");
    await passwordInput.setValue("newaoi@inuyama3");
    nameInput.vm.$emit("input", nameInput.element.value);
    emailInput.vm.$emit("input", emailInput.element.value);
    currentPasswordInput.vm.$emit("input", currentPasswordInput.element.value);
    passwordInput.vm.$emit("input", passwordInput.element.value);
    wrapper.vm.userData.name = nameInput.element.value;
    wrapper.vm.userData.email = emailInput.element.value;
    wrapper.vm.userData.current_password = currentPasswordInput.element.value;
    wrapper.vm.userData.password = passwordInput.element.value;
    await wrapper.find(".button-user-submit").trigger("click");
    await wrapper.find(".user-edit-form").trigger("submit");
    expect(wrapper.emitted().submitUser).toBeTruthy();
    expect(wrapper.emitted().submitUser[0][0]).toStrictEqual({
      name: "大垣千明",
      email: "sima@rin.com",
      current_password: "aoi@inuyama3",
      password: "newaoi@inuyama3",
    });
  });
});
