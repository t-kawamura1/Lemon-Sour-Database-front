import { mount, createLocalVue } from "@vue/test-utils";
import CalculateAlcohol from "@/components/molecules/CalculateAlcohol";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

describe("CalculateAlcohol component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CalculateAlcohol, {
      localVue,
      propsData: {
        calculationSupplementTexts: [
          "純アルコール量で算定するで。クリックで表示",
          [
            "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
            "適切な飲酒量： 1日当たり20g程度やで",
            "やばい飲酒量：",
            "men 40g以上、 women 20g以上",
          ],
        ],
        errorMessages: ["日付は必要", "今のとこないけども一つエラー"],
        soursSelect: ["ー", ["サワー選択", "テスレモ", "テスサワ", "テスハイ"]],
        lemonSours: [
          { name: "テスレモ", alcohol_content: 5.5 },
          { name: "テスサワ", alcohol_content: 9 },
          { name: "テスハイ", alcohol_content: 7 },
        ],
        alcoholInputs: {
          alcContent: ["度数", 0.5, 0.5, 99],
          amountSelect: {
            sortType: "ー",
            sortValues: ["容量", 350, 400, 500, 334, 633, 135, 250],
            initValue: "容量",
          },
          drinkingCounts: ["", 1, 1, 99],
        },
        iconTexts: ["times", "plus-circle", "minus-circle", "arrow-right"],
        recordButtons: ["結果を記録", "飲まなかった日や"],
        todaySour: undefined,
      },
      data() {
        return {
          authHeader: {
            "access-token": "",
            client: "",
            uid: "",
          },
        };
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
  });

  describe("ログインの有無を問わないテスト", () => {
    it("calculationSupplementTexts[0]を表示している", () => {
      expect(wrapper.find(".calculate-alcohol-supplement-button").text()).toBe(
        "純アルコール量で算定するで。クリックで表示"
      );
    });

    it("calculationSupplementTexts[1]の要素の数だけ,レンダリングする", () => {
      expect(
        wrapper.findAll(".calculate-alcohol-supplement-text")
      ).toHaveLength(4);
    });

    it("errorMessagesの要素の数だけ、子コンポーネントをリストレンダリングする", () => {
      expect(
        wrapper.findAll(".calculate-alcohol-record-error-messages")
      ).toHaveLength(2);
    });

    it("InputSelectコンポーネントにsoursSelect propsを渡している", () => {
      const options = wrapper
        .find(".calculate-alcohol-sour-select")
        .findAll("option");
      expect(options).toHaveLength(5);
      expect(options.at(0).text()).toBe("ー");
      expect(options.at(1).text()).toBe("サワー選択");
    });

    it("alcoholInputs propsを各子コンポーネントに渡している", () => {
      expect(
        wrapper
          .find(".calculate-alcohol-formula-alcohol-content-input")
          .attributes().max
      ).toBe("99");
      expect(
        wrapper
          .find(".calculate-alcohol-formula-amount-input")
          .findAll("option")
          .at(1)
          .text()
      ).toBe("容量");
      expect(
        wrapper.find(".calculate-alcohol-formula-counts-input").attributes().max
      ).toBe("99");
    });

    it("iconTexts propsを各子コンポーネントに渡している", () => {
      expect(wrapper.findAll("font-awesome-icon-stub")).toHaveLength(6);
      expect(
        wrapper.findAll("font-awesome-icon-stub").at(0).attributes("icon")
      ).toBe("times");
      expect(
        wrapper.findAll("font-awesome-icon-stub").at(2).attributes("icon")
      ).toBe("plus-circle");
      expect(
        wrapper.findAll("font-awesome-icon-stub").at(3).attributes("icon")
      ).toBe("minus-circle");
      expect(
        wrapper.findAll("font-awesome-icon-stub").at(4).attributes("icon")
      ).toBe("arrow-right");
    });

    it("recordButtons propsを子コンポーネントに渡している", () => {
      expect(wrapper.find(".calculate-alcohol-calc-record-button").text()).toBe(
        "結果を記録"
      );
      expect(wrapper.find(".calculate-alcohol-zero-record-button").text()).toBe(
        "飲まなかった日や"
      );
    });

    it("子コンポーネントからinputイベントと日付を受け取ると、その日付がdataにセットされ、passDateイベントとその日付がemitされる", () => {
      wrapper
        .find(".calculate-alcohol-date-picker")
        .vm.$emit("input", "2021-05-30");
      expect(wrapper.vm.recordData.drinking_record.drinking_date).toBe(
        "2021-05-30"
      );
      expect(wrapper.emitted().passDate).toBeTruthy();
      expect(wrapper.emitted().passDate[1][0]).toBe("2021-05-30");
    });

    describe("計算式の増減について、", () => {
      it("計算式追加ボタンを押すと、計算式が一つ追加され、計算式削除ボタンを押すと、計算式が一つ減る", async () => {
        expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(1);
        await wrapper.find(".calculate-alcohol-formula-plus").trigger("click");
        expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(2);
        await wrapper.find(".calculate-alcohol-formula-minus").trigger("click");
        expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(1);
      });

      it("計算式が1つのときに計算式削除ボタンを押すと、計算式は削除されず、エラーメッセージが表示される", async () => {
        await wrapper.find(".calculate-alcohol-formula-minus").trigger("click");
        expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(1);
        expect(
          wrapper
            .find(".calculate-alcohol-formula-plus-minus-error-message")
            .text()
        ).toBe("これ以上減らせません");
      });

      it("計算式が10個のときに計算式追加ボタンを押すと、計算式は追加されず、エラーメッセージが表示される", async () => {
        wrapper.vm.formulaCounts = 10;
        await wrapper.find(".calculate-alcohol-formula-plus").trigger("click");
        expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(10);
        expect(
          wrapper
            .find(".calculate-alcohol-formula-plus-minus-error-message")
            .text()
        ).toBe("これ以上増やせません");
      });
    });

    describe("計算式の入力欄について、", () => {
      it("入力欄に度数、容量、本数を入力すると、純アルコール量の送料が計算されて表示される", async () => {
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
        await wrapper
          .find(".calculate-alcohol-formula-counts-input")
          .setValue(1);
        await wrapper
          .find(".calculate-alcohol-formula-counts-input")
          .trigger("change");
        expect(
          wrapper.find(".calculate-alcohol-calculation-result").text()
        ).toBe("14.0");
        await wrapper.find(".calculate-alcohol-formula-plus").trigger("click");
        await wrapper
          .findAll(".calculate-alcohol-formula-alcohol-content-input")
          .at(1)
          .setValue(5);
        await wrapper
          .findAll(".calculate-alcohol-formula-alcohol-content-input")
          .at(1)
          .trigger("change");
        await wrapper
          .findAll(".calculate-alcohol-formula-amount-input")
          .at(1)
          .findAll("option")
          .at(2)
          .setSelected();
        await wrapper
          .findAll(".calculate-alcohol-formula-counts-input")
          .at(1)
          .setValue(1);
        await wrapper
          .findAll(".calculate-alcohol-formula-counts-input")
          .at(1)
          .trigger("change");
        expect(
          wrapper.find(".calculate-alcohol-calculation-result").text()
        ).toBe("28.0");
      });

      it("選択欄からレモンサワーをどれか選択すると、そのアルコール度数が入力欄にセットされる", async () => {
        const selects = wrapper.find(".calculate-alcohol-sour-select");
        await selects.findAll("option").at(2).setSelected();
        selects.vm.$emit("input", selects.element.value);
        await selects.trigger("input");
        wrapper
          .find(".calculate-alcohol-formula-alcohol-content-input")
          .setValue("9");
        expect(wrapper.find("option:checked").element.value).toBe("テスレモ");
        expect(
          wrapper.find(".calculate-alcohol-formula-alcohol-content-input")
            .element.value
        ).toBe("9");
      });
    });

    describe("todaySour propsがundefinedの場合、", () => {
      it("dataのsourNameには、soursSelect[1][0]が入っている", () => {
        expect(wrapper.vm.sourName).toBe("サワー選択");
      });

      it("input-numberコンポーネントに、dataのsourAlcoholContentの初期値を渡している", () => {
        expect(
          wrapper.find(".calculate-alcohol-formula-alcohol-content-input")
            .element.value
        ).toBe("");
      });
    });

    describe("todaySour propsがundefined以外の場合、", () => {
      beforeEach(() => {
        wrapper = mount(CalculateAlcohol, {
          propsData: {
            calculationSupplementTexts: [
              "純アルコール量で算定するで。クリックで表示",
              [
                "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
                "適切な飲酒量： 1日当たり20g程度やで",
                "やばい飲酒量：",
                "men 40g以上、 women 20g以上",
              ],
            ],
            errorMessages: ["日付は必要", "今のとこないけども一つエラー"],
            soursSelect: [
              "ー",
              ["サワー選択", "テスレモ", "テスサワ", "テスハイ"],
            ],
            lemonSours: [
              { name: "テスレモ", alcohol_content: 5.5 },
              { name: "テスサワ", alcohol_content: 9 },
              { name: "テスハイ", alcohol_content: 7 },
            ],
            alcoholInputs: {
              alcContent: ["度数", 0.5, 0.5, 99],
              amountSelect: {
                sortType: "ー",
                sortValues: ["容量", 350, 400, 500, 334, 633, 135, 250],
                initValue: "容量",
              },
              drinkingCounts: ["", 1, 0, 99],
            },
            iconTexts: ["times", "plus-circle", "minus-circle", "arrow-right"],
            recordButtons: ["結果を記録", "飲まなかった日"],
            todaySour: { name: "テスチュー", alcohol_content: 8 },
          },
          stubs: ["font-awesome-icon", "v-date-picker"],
        });
      });

      it("dataのsourNameには、todaySourのnameの値が入っている", async () => {
        expect(wrapper.vm.sourName).toBe("テスチュー");
      });

      it("dataのsourAlcoholContentには、todaySourのalcohol_contentの値が入っている", async () => {
        expect(wrapper.vm.alcContentForDisplay).toBe(8);
      });
    });
  });

  describe("ログイン済みの場合、", () => {
    describe("結果の記録ボタンを押したとき、", () => {
      describe("計算式に入力漏れがある場合、", () => {
        it("アルコール度数が入力されていないと、エラーメッセージが表示される", async () => {
          wrapper.vm.$cookies.set("auth-header");
          wrapper.vm.authHeader["access-token"] = "arfacacaejmut";
          wrapper.vm.authHeader["client"] = "lhvjrna;uefb";
          wrapper.vm.authHeader["uid"] = "test@test.com";
          wrapper.vm.$cookies.set("auth-header", wrapper.vm.authHeader);
          await wrapper
            .find(".calculate-alcohol-formula-amount-input")
            .findAll("option")
            .at(2)
            .setSelected();
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .setValue(1);
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .trigger("change");
          await wrapper
            .find(".calculate-alcohol-calc-record-button")
            .trigger("click");
          expect(
            wrapper
              .find(".calculate-alcohol-formula-input-error-message")
              .text()
          ).toBe("計算式に入力されていない項目があります");
        });

        it("容量が入力されていないと、エラーメッセージが表示される", async () => {
          await wrapper
            .find(".calculate-alcohol-formula-alcohol-content-input")
            .setValue(5);
          await wrapper
            .find(".calculate-alcohol-formula-alcohol-content-input")
            .trigger("change");
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .setValue(1);
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .trigger("change");
          await wrapper
            .find(".calculate-alcohol-calc-record-button")
            .trigger("click");
          expect(
            wrapper
              .find(".calculate-alcohol-formula-input-error-message")
              .text()
          ).toBe("計算式に入力されていない項目があります");
        });

        it("本数が入力されていないと、エラーメッセージが表示される", async () => {
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
          await wrapper
            .find(".calculate-alcohol-calc-record-button")
            .trigger("click");
          expect(
            wrapper
              .find(".calculate-alcohol-formula-input-error-message")
              .text()
          ).toBe("計算式に入力されていない項目があります");
        });
      });

      describe("計算式がすべて入力されている場合、", () => {
        beforeEach(async () => {
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
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .setValue(0);
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .trigger("change");
        });

        it("計算結果に0があると、エラーメッセージが表示される", async () => {
          await wrapper
            .find(".calculate-alcohol-calc-record-button")
            .trigger("click");
          expect(
            wrapper
              .find(".calculate-alcohol-formula-input-error-message")
              .text()
          ).toBe("いずれかの計算式の結果が0になっています");
        });

        it("計算結果に0がなければ、純アルコール量と飲酒量がデータに入り、submitRecordイベントとそれらのデータがemitされる", async () => {
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .setValue(1);
          await wrapper
            .find(".calculate-alcohol-formula-counts-input")
            .trigger("change");
          await wrapper
            .find(".calculate-alcohol-calc-record-button")
            .trigger("click");
          expect(wrapper.emitted().submitRecord).toBeTruthy();
          expect(
            wrapper.emitted().submitRecord[0][0].drinking_record.drinking_amount
          ).toBe(350);
          expect(
            wrapper.emitted().submitRecord[0][0].drinking_record
              .pure_alcohol_amount
          ).toBe("14.0");
        });
      });
    });

    it("飲まなかった日を記録ボタンを押すと、modalイベントと特定の文字列がemitされる", async () => {
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      expect(wrapper.emitted().modal).toBeTruthy();
      expect(wrapper.emitted().modal[0][0]).toBe("記録の確認");
    });
  });

  describe("ログインしていない場合、", () => {
    it("結果記録ボタンを押すと、noticeAuthイベントがemitされる", async () => {
      wrapper.vm.$cookies.remove("auth-header");
      await wrapper
        .find(".calculate-alcohol-calc-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.emitted().noticeAuth).toBeTruthy();
    });

    it("飲まなかった日を記録ボタンを押すと、", async () => {
      await wrapper
        .find(".calculate-alcohol-zero-record-button")
        .trigger("click");
      await flushPromises();
      expect(wrapper.emitted().noticeAuth).toBeTruthy();
    });
  });
});
