<template>
  <lemon-sours-index>
    <template v-slot:sidebar v-if="$mq === 'pc'">
      <the-sidebar>
        <template v-slot:title>
          <app-title></app-title>
        </template>
        <template v-slot:menus>
          <sidebar-menus :menu-names="sidebarMenus"></sidebar-menus>
        </template>
      </the-sidebar>
    </template>
    <template v-slot:header v-if="$mq === 'sp'">
      <the-header></the-header>
    </template>
    <template v-slot:sours-index-container>
      <sours-index-container>
        <template v-slot:heading>
          <the-heading :heading-text="heading"></the-heading>
        </template>
        <template v-slot:selects-set>
          <selects-set
            :selects-types="sortTypes"
            :selects-manufacturers="manufacturers"
            :selects-ingredients="ingredients"
            :selects-orders="sortOrders"
            @sortBy="searchBy"
          ></selects-set>
        </template>
        <template v-slot:sours-index-items>
          <sours-index-items :lemon-sours="lemonSours"></sours-index-items>
        </template>
      </sours-index-container>
    </template>
    <template v-slot:footer v-if="$mq === 'sp'">
      <the-footer></the-footer>
    </template>
  </lemon-sours-index>
</template>

<script>
import LemonSoursIndex from "@/components/templates/LemonSoursIndex";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SoursIndexContainer from "@/components/organisms/SoursIndexContainer";
import TheFooter from "@/components/organisms/TheFooter";
import SidebarMenus from "@/components/molecules/SidebarMenus";
import SelectsSet from "@/components/molecules/SelectsSet";
import SoursIndexItems from "@/components/molecules/SoursIndexItems";
import AppTitle from "@/components/atoms/AppTitle";
import TheHeading from "@/components/atoms/TheHeading";

export default {
  components: {
    LemonSoursIndex,
    TheSidebar,
    TheHeader,
    SoursIndexContainer,
    TheFooter,
    SidebarMenus,
    SelectsSet,
    SoursIndexItems,
    AppTitle,
    TheHeading,
  },
  data() {
    return {
      sidebarMenus: [
        "市販レモンサワーデータベース",
        "アルコール摂取量計算",
        "摂取量記録カレンダー",
        "ユーザー情報",
      ],
      heading: "市販レモンサワーデータベース",
      sortTypes: ["メーカー", "成分", "並び順"],
      manufacturers: [
        "すべて",
        "アサヒ",
        "キリン",
        "コカ・コーラ",
        "サッポロ",
        "サントリー",
        "宝酒造",
      ],
      ingredients: ["ー", "糖類ゼロ", "甘味料ゼロ"],
      sortOrders: [
        "新着順",
        "度数の高い順",
        "度数の低い順",
        "カロリーの高い順",
        "カロリーの低い順",
        "果汁の多い順",
        "果汁の少ない順",
      ],
      lemonSours: [],
    };
  },
  methods: {
    searchBy(values) {
      // if (values === []) {

      // }
      this.$axios
        .get("/api/v1/lemon_sours/search_by", {
          params: {
            manufacturer: values[0],
            ingredient: values[1],
            order: values[2],
          },
        })
        .then((res) => {
          this.lemonSours = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.$axios
      .get("/api/v1/lemon_sours")
      .then((res) => {
        this.lemonSours = res.data;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss"></style>
