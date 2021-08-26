import { mount } from "@vue/test-utils";
import ModalRecordConfirmation from "@/components/molecules/ModalRecordConfirmation";

describe("ModalRecordConfirmation component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ModalRecordConfirmation, {
      propsData: {
        modalRecordConfirmationContents: [
          "記録確認や",
          "ゼロで記録するけどええな？",
          "いいで",
        ],
        drinkingDate: "2021-8-23",
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("button-closeがクリックされると、modalイベントとmodalRecordConfirmationContents[0]をemitする", async () => {
    await wrapper.find(".button-close").trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toBe("記録確認や");
  });

  it("modalRecordConfirmationContents propsの[0]と[2]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".modal-title").text()).toBe("記録確認や");
    expect(wrapper.find(".button-zero-record").text()).toBe("いいで");
  });

  it("modalRecordConfirmationContents propsの[1]を表示している", () => {
    expect(wrapper.find(".modal-record-confirmation-message").text()).toBe(
      "ゼロで記録するけどええな？"
    );
  });

  describe("記録ボタンを押すと、", () => {
    beforeEach(async () => {
      await wrapper
        .find(".modal-record-confirmation-button-zero-record")
        .trigger("click");
    });
    it("submitZeroRecordイベントとrecordData(の中にはpropsで受け取った日付が入っている)がemitされる", async () => {
      expect(wrapper.emitted().submitZeroRecord).toBeTruthy();
      expect(
        wrapper.emitted().submitZeroRecord[0][0].drinking_record.drinking_date
      ).toBe("2021-8-23");
    });

    it("modalイベントとmodalRecordConfirmationContents[0]がemitされる", async () => {
      expect(wrapper.emitted().modal).toBeTruthy();
      expect(wrapper.emitted().modal[0][0]).toBe("記録確認や");
    });
  });
});
