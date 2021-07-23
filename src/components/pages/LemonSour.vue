<template>
  <div class="page-lemon-sour">
    <!-- DISPLAY PC -->
    <pc-lemon-sour v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <!-- v-showにすべきだが、focusの効くタイミングがv-if + beforeMountしかなかった。 -->
            <modal-user
              :modal-user-contents="userRegistrationContents"
              :error-messages="userModalErrors"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              :error-messages="userModalErrors"
              :error-messages-reset="userModalResetErrors"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
              @resetPassword="sendResetPasswordEmail"
            ></modal-user>
          </template>
        </the-modal>
      </template>
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title @link="toPageView"></app-title>
          </template>
          <template v-slot:menus>
            <sidebar-menus-authenticated
              v-if="isAuthenticated"
              :menu-names="authenticatedSidebarMenus"
              :dropdown-functions="authenticatedUserFunctions"
              @link="toPageView"
              @submitUser="logout"
            ></sidebar-menus-authenticated>
            <sidebar-menus-unauthenticated
              v-else
              :menu-names="unauthenticatedSidebarMenus"
              :dropdown-functions="unauthenticatedUserFunctions"
              @link="toPageView"
              @modal="openModal"
            ></sidebar-menus-unauthenticated>
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
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <modal-user
              :modal-user-contents="userRegistrationContents"
              :error-messages="userModalErrors"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              :error-messages="userModalErrors"
              :error-messages-reset="userModalResetErrors"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
              @resetPassword="sendResetPasswordEmail"
            ></modal-user>
          </template>
        </the-modal>
      </template>
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
            <header-icons-unauthenticated
              v-else
              :header-icons="headerIcons"
              :dropdown-functions="unauthenticatedUserFunctions"
              @link="toPageView"
              @modal="openModal"
            ></header-icons-unauthenticated>
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
            <footer-icons
              :footer-icons="footerIcons"
              @link="toPageView"
            ></footer-icons>
          </template>
        </the-footer>
      </template>
    </sp-lemon-sour>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcLemonSour from "@/components/templates/pc/LemonSour";
import SpLemonSour from "@/components/templates/sp/LemonSour";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import ReviewContainer from "@/components/organisms/ReviewContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import SidebarMenusUnauthenticated from "@/components/molecules/SidebarMenusUnauthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import HeaderIconsUnauthenticated from "@/components/molecules/HeaderIconsUnauthenticated";
import SourDisplay from "@/components/molecules/SourDisplay";
import SourFlags from "@/components/molecules/SourFlags";
import SourAttributes from "@/components/molecules/SourAttributes";
import SourFavorite from "@/components/molecules/SourFavorite";
import FooterIcons from "@/components/molecules/FooterIcons";
import AppTitle from "@/components/atoms/AppTitle";
import TheNotice from "@/components/atoms/TheNotice";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcLemonSour,
    SpLemonSour,
    TheModal,
    TheSidebar,
    TheHeader,
    SourContainer,
    ReviewContainer,
    TheFooter,
    ModalUser,
    SidebarMenusAuthenticated,
    SidebarMenusUnauthenticated,
    HeaderIconsAuthenticated,
    HeaderIconsUnauthenticated,
    SourDisplay,
    SourFlags,
    SourAttributes,
    SourFavorite,
    FooterIcons,
    AppTitle,
    TheNotice,
  },
  data() {
    return {
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
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.unauthenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.unauthenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          // 計算画面へ。実装後に追加
          break;
        case this.unauthenticatedSidebarMenus[2].name:
        case this.footerIcons[2][0]:
          // カレンダーへ。実装後に追加
          break;
        case this.authenticatedUserFunctions[0]:
          this.$router.push(`/users/${this.userId}`);
          break;
      }
    },
  },
  created() {
    axios
      .get(`/api/v1/lemon_sours/${this.$route.params.id}`)
      .then((res) => {
        this.lemonSour = res.data;
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
    this.checkAuthenticated();
  },
};
</script>

<style scoped lang="scss"></style>
