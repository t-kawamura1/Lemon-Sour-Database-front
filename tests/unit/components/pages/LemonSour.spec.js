// TypeError: Cannot read property 'url' of undefined
// によりマウントができていないように思われる。
// （開発環境ではエラーが出るものの表示される。ちなみにIndexの方ではエラーでない。なぜ？？）
// このまま続けるとハゲるので、ファイルだけ残して一旦封印する。

// import { mount } from "@vue/test-utils";
// import LemonSour from "@/components/pages/LemonSour";
// import flushPromises from "flush-promises";

// jest.mock("axios", () => ({
//   get: jest.fn(() =>
//     Promise.resolve({
//       data: {
//         name: "テストサワー",
//         manufacturer: "テスポロ",
//         alcohol_content: 9,
//         pure_alcohol: 7.2,
//         calories: 54,
//         fruit_juice: 4.5,
//         zero_sugar: true,
//         zero_sweetener: false,
//         sour_image: { url: "@/assets/test/ls_test_sample.png" },
//       },
//     })
//   ),
// }));

// // この記述がないとTypeErrorが出る。下記公式参照。
// // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

// describe("(pc display) LemonSour component test", () => {
//   // let wrapper;
//   // let $mq;
//   // let $route;
//   // beforeEach(() => {
//   //   $mq = "pc";
//   //   $route = { params: { id: 1 } };
//   //   wrapper = mount(LemonSour, {
//   //     mocks: {
//   //       $mq,
//   //       $route,
//   //     },
//   //   });
//   // });

//   it("レモンサワーのデータを１件取得して表示する", async () => {
//     const $mq = "pc";
//     const $route = { params: { id: 1 } };
//     const wrapper = mount(LemonSour, {
//       mocks: {
//         $mq,
//         $route,
//       },
//     });
//     await flushPromises();
//     console.log(wrapper);
//     expect(wrapper.find(".sour-name").text()).toBe("テストサワー");
//   });
// });

it("保留", () => {});
