import { mount } from "@vue/test-utils";
import CalculateAlcohol from "@/components/molecules/CalculateAlcohol";
import flushPromises from "flush-promises";

describe("CalculateAlcohol component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CalculateAlcohol, {
      propsData: {
        calculationSupplementTexts: [
          "摂取アルコール量を計算できるで。",
          "純アルコール量で算定するで。クリックで表示",
          "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
          "適切な飲酒量： 1日当たり20g程度やで",
          ["やばい飲酒量：", "men 40g以上、 women 20g以上"],
        ],
        soursSelect: ["ー", ["サワー選択", "テスレモ", "テスサワ", "テスハイ"]],
        lemonSours: [
          { name: "テスレモ", alcohol_content: 5.5 },
          { name: "テスサワ", alcohol_content: 9 },
          { name: "テスハイ", alcohol_content: 7 },
        ],
        alcoholInputs: [
          ["度数", 0.5, 0.5, 13],
          [
            { label: "350ml", attributes: ["缶", 1, 0, 99] },
            { label: "400ml", attributes: ["缶", 1, 0, 99] },
            { label: "500ml", attributes: ["缶", 1, 0, 99] },
          ],
        ],
        iconTexts: ["times", "arrow-right"],
        calcButton: "結果を記録",
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("calculationSupplementTexts propsの各要素をレンダリングしている", () => {
    expect(wrapper.find(".calculate-alcohol-heading-explanation").text()).toBe(
      "摂取アルコール量を計算できるで。"
    );
    expect(wrapper.find(".calculate-alcohol-supplement-button").text()).toBe(
      "純アルコール量で算定するで。クリックで表示"
    );
    expect(wrapper.find(".calculate-alcohol-supplement-formula").text()).toBe(
      "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)"
    );
    expect(
      wrapper.find(".calculate-alcohol-supplement-appropriate").text()
    ).toBe("適切な飲酒量： 1日当たり20g程度やで");
    expect(wrapper.find(".calculate-alcohol-supplement-lisky").text()).toBe(
      "やばい飲酒量："
    );
    expect(wrapper.find(".calculate-alcohol-supplement-gender").text()).toBe(
      "men 40g以上、 women 20g以上"
    );
  });

  it("InputSelectコンポーネントにsoursSelect propsを渡している", () => {
    expect(wrapper.findAll("option")).toHaveLength(5);
    expect(wrapper.findAll("option").at(0).text()).toBe("ー");
    expect(wrapper.findAll("option").at(1).text()).toBe("サワー選択");
  });

  it("alcoholInputs propsを各子コンポーネントに渡している", () => {
    expect(
      wrapper.findAll(".calculate-alcohol-content-input").at(0).attributes().max
    ).toBe("13");
    expect(
      wrapper.findAll(".calculate-alcohol-capacity-label").at(0).text()
    ).toBe("350ml");
    expect(
      wrapper.findAll(".calculate-alcohol-drinks-input").at(0).attributes().max
    ).toBe("99");
  });

  it("iconTexts propsを各子コンポーネントに渡している", () => {
    console.log(wrapper.html());
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(0).attributes("icon")
    ).toBe("times");
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(3).attributes("icon")
    ).toBe("arrow-right");
  });

  it("calcButton propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".calculate-alcohol-calc-rec-button").text()).toBe(
      "結果を記録"
    );
  });

  it("入力欄に度数・本数を入力すると、純アルコール量の総量が表示される", async () => {
    const content350 = wrapper
      .findAll(".calculate-alcohol-content-input")
      .at(0);
    const content500 = wrapper
      .findAll(".calculate-alcohol-content-input")
      .at(2);
    const drinks350 = wrapper.findAll(".calculate-alcohol-drinks-input").at(0);
    const drinks500 = wrapper.findAll(".calculate-alcohol-drinks-input").at(2);
    await content350.setValue("7");
    await drinks350.setValue("1");
    await content500.setValue("4");
    await drinks500.setValue("2");
    wrapper.vm.alcContent350 = content350.element.value;
    wrapper.vm.alcContent500 = content500.element.value;
    wrapper.vm.drinks350 = drinks350.element.value * 350;
    wrapper.vm.drinks500 = drinks500.element.value * 500;
    await flushPromises();
    expect(wrapper.find(".calculate-alcohol-calculation-result").text()).toBe(
      "51.6"
    );
  });

  it("選択欄からレモンサワーをどれか選択すると、そのアルコール度数が入力欄にセットされる", async () => {
    const selects = wrapper.find(".calculate-alcohol-sour-select");
    await selects.findAll("option").at(2).setSelected();
    selects.vm.$emit("input", selects.element.value);
    await selects.trigger("input");
    wrapper.findAll(".calculate-alcohol-content-input").setValue("9");
    expect(wrapper.find("option:checked").element.value).toBe("テスレモ");
    expect(
      wrapper.findAll(".calculate-alcohol-content-input").at(0).element.value
    ).toBe("9");
  });
});
