<template>
  <lemon-sour>
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
    <template v-slot:sour-container>
      <sour-container>
        <template v-slot:sour-display>
          <sour-display
            :sour-name="lemonSour.name"
            :sour-image="lemonSour.sour_image.url"
          ></sour-display>
        </template>
        <template v-slot:sour-flags>
          <sour-flags :flag-attributes="sourFlagsAttributes"></sour-flags>
        </template>
        <template v-slot:sour-attributes>
          <sour-attributes
            :table-attributes="sourTableAttributes"
          ></sour-attributes>
        </template>
        <template v-slot:sour-favorite>
          <sour-favorite></sour-favorite>
        </template>
      </sour-container>
    </template>
    <template v-slot:review-container>
      <review-container></review-container>
    </template>
    <template v-slot:footer v-if="$mq === 'sp'">
      <the-footer></the-footer>
    </template>
  </lemon-sour>
</template>

<script>
import axios from "axios";
import LemonSour from "@/components/templates/LemonSour";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import ReviewContainer from "@/components/organisms/ReviewContainer";
import TheFooter from "@/components/organisms/TheFooter";
import SidebarMenus from "@/components/molecules/SidebarMenus";
import SourDisplay from "@/components/molecules/SourDisplay";
import SourFlags from "@/components/molecules/SourFlags";
import SourAttributes from "@/components/molecules/SourAttributes";
import SourFavorite from "@/components/molecules/SourFavorite";
import AppTitle from "@/components/atoms/AppTitle";

export default {
  components: {
    LemonSour,
    TheSidebar,
    TheHeader,
    SourContainer,
    ReviewContainer,
    TheFooter,
    SidebarMenus,
    SourDisplay,
    SourFlags,
    SourAttributes,
    SourFavorite,
    AppTitle,
  },
  data() {
    return {
      sidebarMenus: [
        "市販レモンサワーデータベース",
        "アルコール摂取量計算",
        "摂取量記録カレンダー",
        "ユーザー情報",
      ],
      lemonSour: {},
      sourFlagsAttributes: [["糖類ゼロ"], ["甘味料ゼロ"]],
      sourTableAttributes: [
        ["メーカー"],
        ["アルコール度数 (%)"],
        ["純アルコール量 (g)"],
        ["カロリー (kcal)"],
        ["果汁 (%)"],
      ],
    };
  },
  created() {
    axios
      .get(`/api/v1/lemon_sours/${this.$route.params.id}`)
      .then((res) => {
        this.lemonSour = res.data;
        console.log(res);
        // 以下、レモンサワーの属性表示用に、取得した値をdataにpush
        this.sourFlagsAttributes[0].push(this.lemonSour.zero_sugar);
        this.sourFlagsAttributes[1].push(this.lemonSour.zero_sweetener);
        this.sourTableAttributes[0].push(this.lemonSour.manufacturer);
        this.sourTableAttributes[1].push(this.lemonSour.alcohol_content);
        this.sourTableAttributes[2].push(this.lemonSour.pure_alcohol);
        this.sourTableAttributes[3].push(this.lemonSour.calories);
        this.sourTableAttributes[4].push(this.lemonSour.fruit_juice);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss"></style>
