import { mount } from "@vue/test-utils";
import ModalUser from "@/components/molecules/ModalUser";

describe("ModalUser component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ModalUser, {
      propsData: {
        modalUserContents: [
          "ゆるキャン登録",
          [
            ["text", "しまりん"],
            ["email", "nadesiko@yuno.com"],
            ["password", "inuko"],
          ],
          "入部",
        ],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("modalUserContents[1]の要素の数（配列の数）だけ、input-textコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".input-text")).toHaveLength(3);
  });

  it("button-closeがクリックされると、modalイベントとmodalUserContents[0]をemitする", async () => {
    await wrapper.find(".button-close").trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toBe("ゆるキャン登録");
  });

  it("modalUserContents propsの[0]と[2]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".modal-title").exists()).toBeTruthy();
    expect(wrapper.find(".button-user-submit").exists()).toBeTruthy();
  });

  it("input-textに入力されるとuserDataが更新され、submitボタンを押すとsubmitUserイベントとそのuserDataがemitされる", async () => {
    const nameInput = wrapper.findAll("input").at(0);
    const emailInput = wrapper.findAll("input").at(1);
    const passwordInput = wrapper.findAll("input").at(2);
    await nameInput.setValue("大垣千明");
    await emailInput.setValue("sima@rin.com");
    await passwordInput.setValue("aoi@inuyama3");
    nameInput.vm.$emit("input", nameInput.element.value);
    emailInput.vm.$emit("input", emailInput.element.value);
    passwordInput.vm.$emit("input", passwordInput.element.value);
    await wrapper.find(".button-user-submit").trigger("click");
    await wrapper.find(".modal-user-form").trigger("submit");
    expect(wrapper.emitted().submitUser).toBeTruthy();
    expect(wrapper.emitted().submitUser[0][0]).toStrictEqual([
      "大垣千明",
      "sima@rin.com",
      "aoi@inuyama3",
    ]);
  });
});
