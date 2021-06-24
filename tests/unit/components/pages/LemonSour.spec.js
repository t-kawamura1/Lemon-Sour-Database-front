// import { shallowMount } from "@vue/test-utils";
// import LemonSour from "@/components/pages/LemonSour";
// import axios from "axios";

// const localVue = createLocalVue()
// localVue.prototype.$axios = axios;

// jest.mock("axios");

describe("LemonSour component test", () => {
  it("axiosでAPIから１件のレモンサワーのデータが取得できる", () => {
    // const wrapper = shallowMount(LemonSour, { sync: false });
    // const lemonSour = [
    //   { name: "テストサワー" },
    //   { manufacturer: "テスト酒造"},
    //   { alcohol_content: 9 },
    //   { pure_alcohol: 7.2 },
    //   { calories: 54 },
    //   { fruit_juice: 4.5 },
    //   { zero_sugar: true },
    //   { zero_sweetener: true },
    // ];
    // const response = { data: lemonSour };
    // axios.get.mockImplementation((url) => {
    //   return Promise.resolve(response)
    // });
    // expect(axios.get).toHaveBeenCalledWith(`/api/v1/lemon_sours/${this.$route.params.id}`)
  });
});
