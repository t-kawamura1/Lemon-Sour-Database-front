<template>
  <div class="page-lemon-sour">
    <!-- DISPLAY PC -->
    <pc-lemon-sour v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <modal-user-registration
              :modal-user-registration-contents="userRegistrationContents"
              v-show="showUserRegistrationModal"
              @modal="closeModal"
            ></modal-user-registration>
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
            <sidebar-menus
              :menu-names="sidebarMenus"
              :dropdown-functions="userFunctions"
              @link="toPageView"
              @modal="openModal"
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
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <modal-user-registration
              :modal-user-registration-contents="userRegistrationContents"
              v-show="showUserRegistrationModal"
              @modal="closeModal"
            ></modal-user-registration>
          </template>
        </the-modal>
      </template>
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons
              :header-icons="headerIcons"
              :dropdown-functions="userFunctions"
              @link="toPageView"
              @modal="openModal"
            ></header-icons>
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
import PcLemonSour from "@/components/templates/pc/LemonSour";
import SpLemonSour from "@/components/templates/sp/LemonSour";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import ReviewContainer from "@/components/organisms/ReviewContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUserRegistration from "@/components/molecules/ModalUserRegistration";
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
    TheModal,
    TheSidebar,
    TheHeader,
    SourContainer,
    ReviewContainer,
    TheFooter,
    ModalUserRegistration,
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
      showUserRegistrationModal: false,
      showUserLoginModal: false,
      userRegistrationContents: [
        "ユーザー登録",
        [
          ["text", "ユーザー名"],
          ["email", "メールアドレス"],
          ["password", "パスワード"],
        ],
        "登録",
      ],
      sidebarMenus: [
        { name: "市販レモンサワーデータベース" },
        { name: "アルコール摂取量計算" },
        { name: "摂取量記録カレンダー" },
        { name: "ユーザー登録・ログイン", dropdown: "enabled" },
      ],
      headerIcons: ["lemon", "address-card"],
      userFunctions: ["ユーザー登録", "ログイン"],
      showUserRegistration: false,
      showUserLogin: false,
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
      console.log(destination);
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          // ホームへ。実装後に追加
          break;
        case this.sidebarMenus[0]:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.sidebarMenus[1]:
        case this.footerIcons[1][0]:
          // 計算画面へ。実装後に追加
          break;
        case this.sidebarMenus[2]:
        case this.footerIcons[2][0]:
          // カレンダーへ。実装後に追加
          break;
        case this.sidebarMenus[3]:
        case this.headerIcons[1]:
          // ユーザー画面へ。実装後に追加
          break;
      }
    },
    openModal(type) {
      if (type == this.userFunctions[0]) {
        this.showUserRegistrationModal = true;
      } // else if (type == this.userFunctions[1]) {
      //   this.showUserLoginModal = true;
      // }
      // ログインモーダル作成後に実装
    },
    closeModal(type) {
      if (type == this.userRegistrationContents[0]) {
        this.showUserRegistrationModal = false;
      } // else if (type == this.userLoginContents[1]) {
      //   this.showUserLoginModal = false;
      // }
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
