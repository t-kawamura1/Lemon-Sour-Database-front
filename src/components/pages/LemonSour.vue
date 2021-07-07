<template>
  <div class="page-lemon-sour">
    <!-- DISPLAY PC -->
    <pc-lemon-sour v-if="$mq === 'pc'">
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title></app-title>
          </template>
          <template v-slot:menus>
            <sidebar-menus
              :menu-names="sidebarMenus"
              @link="toPageView"
            ></sidebar-menus>
          </template>
        </the-sidebar>
      </template>
      <!-- SOUR-CONTAINER -->
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
    </pc-lemon-sour>
    <!-- DISPLAY SP -->
    <sp-lemon-sour v-if="$mq === 'sp'">
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons :header-icons="headerIcons"></header-icons>
          </template>
        </the-header>
      </template>
      <!-- SOUR-CONTAINER -->
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
      <!-- FOOTER -->
      <template v-slot:footer>
        <the-footer>
          <template v-slot:footer-icons>
            <footer-icons :footer-icons="footerIcons"></footer-icons>
          </template>
        </the-footer>
      </template>
    </sp-lemon-sour>
  </div>
</template>

<script>
import axios from "axios";
import PcLemonSour from "@/components/templates/pc/LemonSour";
import SpLemonSour from "@/components/templates/sp/LemonSour";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import ReviewContainer from "@/components/organisms/ReviewContainer";
import TheFooter from "@/components/organisms/TheFooter";
import SidebarMenus from "@/components/molecules/SidebarMenus";
import HeaderIcons from "@/components/molecules/HeaderIcons";
import SourDisplay from "@/components/molecules/SourDisplay";
import SourFlags from "@/components/molecules/SourFlags";
import SourAttributes from "@/components/molecules/SourAttributes";
import SourFavorite from "@/components/molecules/SourFavorite";
import FooterIcons from "@/components/molecules/FooterIcons";
import AppTitle from "@/components/atoms/AppTitle";

export default {
  components: {
    PcLemonSour,
    SpLemonSour,
    TheSidebar,
    TheHeader,
    SourContainer,
    ReviewContainer,
    TheFooter,
    SidebarMenus,
    HeaderIcons,
    SourDisplay,
    SourFlags,
    SourAttributes,
    SourFavorite,
    FooterIcons,
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
      headerIcons: ["lemon", "address-card"],
      lemonSour: {},
      sourFlagsAttributes: [["糖類ゼロ"], ["甘味料ゼロ"]],
      sourTableAttributes: [
        ["メーカー"],
        ["アルコール度数 (%)"],
        ["純アルコール量 (g)"],
        ["カロリー (kcal)"],
        ["果汁 (%)"],
      ],
      footerIcons: [
        ["database", "LSDB"],
        ["calculator", "アルコール量計算"],
        ["calendar-alt", "摂取量記録"],
      ],
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case this.sidebarMenus[0]:
          this.$router.push("/lemon_sours");
          break;
        case this.sidebarMenus[1]:
          // 実装後に追加
          break;
        case this.sidebarMenus[2]:
          // 実装後に追加
          break;
        case this.sidebarMenus[3]:
          // 実装後に追加
          break;
      }
    },
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
