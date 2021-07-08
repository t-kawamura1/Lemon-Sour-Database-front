import { mount } from "@vue/test-utils";
// spも表示内容は同じため、テストは省略
import SoursIndexItems from "@/components/molecules/pc/SoursIndexItems";

describe("SoursIndexItems component test", () => {
  describe("初期描画時、lemonSoursにデータが入っている場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(SoursIndexItems, {
        propsData: {
          lemonSours: [
            {
              id: 1,
              name: "テストサワー１",
              sour_image: "@/assets/test/ls_test_sample.png",
            },
            {
              id: 2,
              name: "テストサワー２",
              sour_image: "@/assets/test/ls_test_sample.png",
            },
          ],
          errorMessage: "データを取得中",
        },
      });
    });

    it("lemonSours内のオブジェクトの数だけ、sourName,sourImageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".pc-item-name")).toHaveLength(2);
      expect(wrapper.findAll(".pc-item-image")).toHaveLength(2);
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".error-message").text()).toBe("データを取得中");
    });

    it("どれか一つレモンサワーをクリックすると、linkイベントと、toLemonSourとそのレモンサワーのIDが入った配列がemitされる", async () => {
      await wrapper.findAll(".pc-index-item").at(0).trigger("click");
      expect(wrapper.emitted().link).toBeTruthy();
      expect(wrapper.emitted().link[0]).toStrictEqual([["toLemonSour", 1]]);
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
      expect(wrapper.findAll(".pc-index-item")).toHaveLength(0);
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".error-message").text()).toBe(
        "該当するテストデータがありません"
      );
    });
  });
});
