<template>
  <div class="page-user">
    <!-- DISPLAY PC -->
    <pc-user v-if="$mq === 'pc'">
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title @link="toPageView"></app-title>
          </template>
          <template v-slot:menus>
            <sidebar-menus-authenticated
              :menu-names="authenticatedSidebarMenus"
              :dropdown-functions="authenticatedUserFunctions"
              @link="toPageView"
              @submitUser="logout"
            ></sidebar-menus-authenticated>
          </template>
        </the-sidebar>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- USER-CONTAINER -->
      <template v-slot:user-container>
        <user-container></user-container>
      </template>
    </pc-user>
    <!-- DISPLAY SP -->
    <sp-user v-if="$mq === 'sp'">
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons-authenticated
              :header-icons="headerIcons"
              :dropdown-functions="authenticatedUserFunctions"
              @link="toPageView"
              @submitUser="logout"
            ></header-icons-authenticated>
          </template>
        </the-header>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- USER-CONTAINER -->
      <template v-slot:user-container>
        <user-container></user-container>
      </template>
      <!-- FOOTER -->
      <template v-slot:footer>
        <the-footer>
          <template v-slot:footer-icons>
            <footer-icons
              :footer-icons="footerIcons"
              @link="toPageView"
            ></footer-icons>
          </template>
        </the-footer>
      </template>
    </sp-user>
  </div>
</template>

<script>
// import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcUser from "@/components/templates/pc/User";
import SpUser from "@/components/templates/sp/User";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import UserContainer from "@/components/organisms/UserContainer";
import TheFooter from "@/components/organisms/TheFooter";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import FooterIcons from "@/components/molecules/FooterIcons";
import AppTitle from "@/components/atoms/AppTitle";
import TheNotice from "@/components/atoms/TheNotice";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcUser,
    SpUser,
    TheSidebar,
    TheHeader,
    UserContainer,
    TheFooter,
    SidebarMenusAuthenticated,
    HeaderIconsAuthenticated,
    FooterIcons,
    AppTitle,
    TheNotice,
  },
  data() {
    return {
      currentUser: {},
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.unauthenticatedSidebarMenus[0]:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.unauthenticatedSidebarMenus[1]:
        case this.footerIcons[1][0]:
          // 計算画面へ。実装後に追加
          break;
        case this.unauthenticatedSidebarMenus[2]:
        case this.footerIcons[2][0]:
          // カレンダーへ。実装後に追加
          break;
        case this.authenticatedUserFunctions[0]:
          break;
      }
    },
  },
  // created() {
  //   this.checkAuthenticated();
  // },
};
</script>

<style scoped lang="scss"></style>
