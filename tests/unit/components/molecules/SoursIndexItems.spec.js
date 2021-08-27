import { mount } from "@vue/test-utils";
// spも表示内容は同じため、テストは省略
import PcSoursIndexItems from "@/components/molecules/pc/SoursIndexItems";
import SpSoursIndexItems from "@/components/molecules/sp/SoursIndexItems";

describe("PcSoursIndexItems component test", () => {
  describe("初期描画時、lemonSoursにデータが入っている場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(PcSoursIndexItems, {
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
          loading: false,
          errorMessage: null,
        },
        stubs: ["vue-loaders"],
      });
    });

    it("lemonSours内のオブジェクトの数だけ、sourName,sourImageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".pc-sours-index-items-item-name")).toHaveLength(
        2
      );
      expect(wrapper.findAll(".pc-sours-index-items-item-image")).toHaveLength(
        2
      );
    });

    it("エラーメッセージを表示しない", () => {
      expect(wrapper.find(".pc-sours-index-items-error").text()).toBe("");
    });

    it("どれか一つレモンサワーをクリックすると、linkイベントと、toLemonSourとそのレモンサワーのIDが入った配列がemitされる", async () => {
      await wrapper
        .findAll(".pc-sours-index-items-item")
        .at(0)
        .trigger("click");
      expect(wrapper.emitted().link).toBeTruthy();
      expect(wrapper.emitted().link[0]).toStrictEqual([["toLemonSour", 1]]);
    });
  });

  describe("lemonSoursにデータが入っていない状態に変わった場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(PcSoursIndexItems, {
        propsData: {
          lemonSours: [],
          loading: false,
          errorMessage: "該当するテストデータがありません",
        },
        stubs: ["vue-loaders"],
      });
    });

    it("一つもレモンサワーを表示しない", () => {
      expect(wrapper.findAll(".pc-sours-index-items-item-name")).toHaveLength(
        0
      );
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".pc-sours-index-items-error").text()).toBe(
        "該当するテストデータがありません"
      );
    });
  });
});

describe("SpSoursIndexItems component test", () => {
  describe("初期描画時、lemonSoursにデータが入っている場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(SpSoursIndexItems, {
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
          loading: false,
          errorMessage: null,
        },
        stubs: ["vue-loaders"],
      });
    });

    it("lemonSours内のオブジェクトの数だけ、sourName,sourImageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".sp-sours-index-items-item-name")).toHaveLength(
        2
      );
      expect(wrapper.findAll(".sp-sours-index-items-item-image")).toHaveLength(
        2
      );
    });

    it("エラーメッセージを表示しない", () => {
      expect(wrapper.find(".sp-sours-index-items-error").text()).toBe("");
    });

    it("どれか一つレモンサワーをクリックすると、linkイベントと、toLemonSourとそのレモンサワーのIDが入った配列がemitされる", async () => {
      await wrapper
        .findAll(".sp-sours-index-items-item")
        .at(0)
        .trigger("click");
      expect(wrapper.emitted().link).toBeTruthy();
      expect(wrapper.emitted().link[0]).toStrictEqual([["toLemonSour", 1]]);
    });
  });

  describe("lemonSoursにデータが入っていない状態に変わった場合", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(SpSoursIndexItems, {
        propsData: {
          lemonSours: [],
          loading: false,
          errorMessage: "該当するテストデータがありません",
        },
        stubs: ["vue-loaders"],
      });
    });

    it("一つもレモンサワーを表示しない", () => {
      expect(wrapper.findAll(".sp-sours-index-items-item-name")).toHaveLength(
        0
      );
    });

    it("errorMessage propsを渡し、表示する", () => {
      expect(wrapper.find(".sp-sours-index-items-error").text()).toBe(
        "該当するテストデータがありません"
      );
    });
  });
});
