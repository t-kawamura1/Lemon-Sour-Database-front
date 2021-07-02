import { mount } from "@vue/test-utils";
import SoursIndexItems from "@/components/molecules/SoursIndexItems";

describe("SoursIndexItems component test", () => {
  describe("初期描画時、lemonSoursにデータが入っている場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(SoursIndexItems, {
        propsData: {
          lemonSours: [
            {
              name: "テストサワー１",
              sour_image: "@/assets/test/ls_test_sample.png",
            },
            {
              name: "テストサワー２",
              sour_image: "@/assets/test/ls_test_sample.png",
            },
          ],
          errorMessage: "データを取得中",
        },
      });
    });

    it("lemonSours内のオブジェクトの数だけ、sourName,sourImageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".item-name")).toHaveLength(2);
      expect(wrapper.findAll(".item-image")).toHaveLength(2);
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".error-message").text()).toBe("データを取得中");
    });
  });

  describe("lemonSoursにデータが入っていない状態に変わった場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(SoursIndexItems, {
        propsData: {
          lemonSours: [],
          errorMessage: "該当するテストデータがありません",
        },
      });
    });

    it("一つもレモンサワーを表示しない", () => {
      expect(wrapper.findAll(".index-item")).toHaveLength(0);
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".error-message").text()).toBe(
        "該当するテストデータがありません"
      );
    });
  });
});
