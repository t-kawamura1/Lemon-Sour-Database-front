<template>
  <div class="page-drinking-record">
    <!-- DISPLAY PC -->
    <pc-drinking-record v-if="$mq === 'pc'">
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title
              :sidebar-icon-text="sidebarIcon"
              @link="toPageView"
            ></app-title>
          </template>
          <template v-slot:menus>
            <sidebar-menus-authenticated
              :menu-names="authenticatedSidebarMenus"
              :dropdown-functions="authenticatedUserFunctions"
              :current-page="currentPageName"
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
      <!-- DRINKING-RECORD-CONTAINER -->
      <template v-slot:drinking-record-container>
        <drinking-record-container>
          <template v-slot:drinking-record-heading>
            <the-heading :heading-text="combineUserNameAndHeading"></the-heading>
          </template>
          <template v-slot:drinking-record->
          </template>
        </drinking-record-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank>
        <blank-side></blank-side>
      </template>
    </pc-drinking-record>
    <!-- DISPLAY SP -->
    <sp-drinking-record v-if="$mq === 'sp'">
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons-authenticated
              v-if="isAuthenticated"
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
      <!-- drinking-record-CONTAINER -->
      <template v-slot:drinking-record-container>
        <drinking-record-container>
          <template v-slot:drinking-record-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:drinking-record->
          </template>
        </drinking-record-container>
      </template>
      <!-- FOOTER -->
      <template v-slot:footer>
        <the-footer>
          <template v-slot:footer-icons>
            <footer-icons
              :footer-icons="footerIcons"
              :current-page="currentPageName"
              @link="toPageView"
            ></footer-icons>
          </template>
        </the-footer>
      </template>
    </sp-drinking-record>
  </div>
</template>

<script>
// import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcDrinkingRecord from "@/components/templates/pc/DrinkingRecord";
import SpDrinkingRecord from "@/components/templates/sp/DrinkingRecord";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import DrinkingRecordContainer from "@/components/organisms/DrinkingRecordContainer";
import TheFooter from "@/components/organisms/TheFooter";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";
import BlankSide from "@/components/atoms/BlankSide";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcDrinkingRecord,
    SpDrinkingRecord,
    TheSidebar,
    TheHeader,
    DrinkingRecordContainer,
    TheFooter,
    SidebarMenusAuthenticated,
    HeaderIconsAuthenticated,
    FooterIcons,
    AppTitle,
    TheNotice,
    TheHeading,
    BlankSide,
  },
  props: {
    currentUser: Object,
  },
  data() {
    return {
      heading: `${this.currentUser.name}さんの飲酒記録`,
      drinkingRecordErrors: [],
      lemonSoursData: [],
      drinkingRecordIcons: [],
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          this.$router.push("/calculation");
          break;
        case this.authenticatedSidebarMenus[2].name:
        case this.footerIcons[2][0]:
          break;
        case this.authenticatedUserFunctions[0]:
          break;
      }
    },
  },
  created() {
    // axios
    //   .get("/api/v1/lemon_sours")
    //   .then((res) => {
    //     for (let index = 0; index < res.data.length; index++) {
    //       this.soursSelectSet[1].push(res.data[index].name);
    //     }
    //     this.lemonSoursData = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    // this.checkAuthenticated();
    this.markCurrentPage();
  },
};
</script>
