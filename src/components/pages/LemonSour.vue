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
          <sour-display></sour-display>
        </template>
        <template v-slot:sour-attributes>
          <sour-attributes></sour-attributes>
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
import LemonSour from "@/components/templates/LemonSour";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import ReviewContainer from "@/components/organisms/ReviewContainer";
import TheFooter from "@/components/organisms/TheFooter";
import TheSidebar from "@/components/organisms/TheSidebar";
import SourDisplay from "@/components/molecules/SourDisplay";
import SourAttributes from "@/components/molecules/SourAttributes";
import SourFavorite from "@/components/molecules/SourFavorite";
import AppTitle from "@/components/atoms/AppTitle";
import SidebarMenus from "@/components/molecules/SidebarMenus";

export default {
  components: {
    LemonSour,
    TheHeader,
    SourContainer,
    ReviewContainer,
    TheFooter,
    TheSidebar,
    SourDisplay,
    SourAttributes,
    SourFavorite,
    AppTitle,
    SidebarMenus,
  },
  data() {
    return {
      sidebarMenus: [
        "市販レモンサワーデータベース",
        "アルコール摂取量計算",
        "摂取量記録カレンダー",
        "ユーザー情報",
      ],
    }
  }
};
</script>

<style scoped lang="scss"></style>
