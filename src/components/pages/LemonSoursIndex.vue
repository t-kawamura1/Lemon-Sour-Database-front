<template>
  <div class="page-lemon-sours-index">
    <!-- DISPLAY PC-->
    <pc-lemon-sours-index v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <!-- v-showにすべきだが、focusの効くタイミングがv-if + beforeMountしかなかった。 -->
            <modal-user
              :modal-user-contents="userRegistrationContents"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
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
            <sidebar-menus
              :menu-names="sidebarMenus"
              :dropdown-functions="userFunctions"
              @link="toPageView"
              @modal="openModal"
            ></sidebar-menus>
          </template>
        </the-sidebar>
      </template>
      <!-- SOURS-INDEX-CONTAINER -->
      <template v-slot:pc-sours-index-container>
        <pc-sours-index-container>
          <template v-slot:pc-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:pc-selects-set>
            <pc-selects-set
              :selects-types="sortTypes"
              :selects-manufacturers="manufacturers"
              :selects-ingredients="ingredients"
              :selects-orders="sortOrders"
              :error-messages="sortErrors"
              @sortBy="searchBy"
            ></pc-selects-set>
          </template>
          <template v-slot:pc-sours-index-items>
            <pc-sours-index-items
              :lemon-sours="lemonSours"
              :error-message="noContentsError"
              @link="toPageView"
            ></pc-sours-index-items>
          </template>
        </pc-sours-index-container>
      </template>
    </pc-lemon-sours-index>
    <!-- DISPLAY SP -->
    <sp-lemon-sours-index v-if="$mq === 'sp'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <modal-user
              :modal-user-contents="userRegistrationContents"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
            ></modal-user>
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
      <!-- SOURS-INDEX-CONTAINER -->
      <template v-slot:sp-sours-index-container>
        <sp-sours-index-container>
          <template v-slot:sp-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:sp-selects-set>
            <sp-selects-set
              :selects-types="sortTypes"
              :selects-manufacturers="manufacturers"
              :selects-ingredients="ingredients"
              :selects-orders="sortOrders"
              :error-messages="sortErrors"
              @sortBy="searchBy"
            ></sp-selects-set>
          </template>
          <template v-slot:sp-sours-index-items>
            <sp-sours-index-items
              :lemon-sours="lemonSours"
              :error-message="noContentsError"
              @link="toPageView"
            ></sp-sours-index-items>
          </template>
        </sp-sours-index-container>
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
    </sp-lemon-sours-index>
  </div>
</template>

<script>
import axios from "axios";
import PcLemonSoursIndex from "@/components/templates/pc/LemonSoursIndex";
import SpLemonSoursIndex from "@/components/templates/sp/LemonSoursIndex";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import PcSoursIndexContainer from "@/components/organisms/pc/SoursIndexContainer";
import SpSoursIndexContainer from "@/components/organisms/sp/SoursIndexContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import SidebarMenus from "@/components/molecules/SidebarMenus";
import HeaderIcons from "@/components/molecules/HeaderIcons";
import PcSelectsSet from "@/components/molecules/pc/SelectsSet";
import SpSelectsSet from "@/components/molecules/sp/SelectsSet";
import PcSoursIndexItems from "@/components/molecules/pc/SoursIndexItems";
import SpSoursIndexItems from "@/components/molecules/sp/SoursIndexItems";
import FooterIcons from "@/components/molecules/FooterIcons";
import AppTitle from "@/components/atoms/AppTitle";
import TheHeading from "@/components/atoms/TheHeading";

export default {
  components: {
    PcLemonSoursIndex,
    SpLemonSoursIndex,
    TheModal,
    TheSidebar,
    TheHeader,
    PcSoursIndexContainer,
    SpSoursIndexContainer,
    TheFooter,
    ModalUser,
    SidebarMenus,
    HeaderIcons,
    PcSelectsSet,
    SpSelectsSet,
    PcSoursIndexItems,
    SpSoursIndexItems,
    FooterIcons,
    AppTitle,
    TheHeading,
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
      userLoginContents: [
        "ユーザーログイン",
        [
          ["email", "メールアドレス"],
          ["password", "パスワード"],
        ],
        "ログイン",
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
      ingredients: ["すべて", "糖類ゼロ", "甘味料ゼロ"],
      sortOrders: [
        "新着順",
        "度数の高い順",
        "度数の低い順",
        "カロリーの高い順",
        "カロリーの低い順",
        "果汁の多い順",
        "果汁の少ない順",
      ],
      sortErrors: [],
      // 初期描画時。データ更新時にメッセージを変える
      noContentsError: "データを取得中",
      footerIcons: [
        ["database", "LSDB"],
        ["calculator", "アルコール量計算"],
        ["calendar-alt", "摂取量記録"],
      ],
      lemonSours: [],
    };
  },
  methods: {
    toPageView(destination) {
      if (typeof destination === "object" && destination[0] == "toLemonSour") {
        this.$router.push(`/lemon_sours/${destination[1]}`);
      }
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          // ホームへ。実装後に追加
          break;
        case this.sidebarMenus[0]:
        case this.footerIcons[0][0]:
          // 同一ページへのリンクのため処理は書かない。
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
    registrateUser(userData) {
      // サーバーサイド実装後に実装
      // フォームバリデーション、ボタン押下後の空処理書くこと
      console.log(userData);
    },
    login(userData) {
      // サーバーサイド実装後に実装
      // フォームバリデーション、ボタン押下後の空処理書くこと
      console.log(userData);
    },
    openModal(type) {
      if (type == this.userFunctions[0]) {
        this.showUserRegistrationModal = true;
      } else if (type == this.userFunctions[1]) {
        this.showUserLoginModal = true;
      }
    },
    closeModal(type) {
      if (type == this.userRegistrationContents[0]) {
        this.showUserRegistrationModal = false;
      } else if (type == this.userLoginContents[0]) {
        this.showUserLoginModal = false;
      }
    },
    searchBy(values) {
      // values == ["", "", ""]はtrueにならない。__ob__: Observerが配列の末尾にあるため。
      // 解決策がわからないため、冗長に条件を書く。
      if (values[0] == "" && values[1] == "" && values[2] == "") {
        this.sortErrors = ["少なくとも１つ選択して検索してください"];
      } else {
        this.sortErrors = [];
        axios
          .get("/api/v1/lemon_sours/search_by", {
            params: {
              manufacturer: values[0],
              ingredient: values[1],
              order: values[2],
            },
          })
          .then((res) => {
            this.lemonSours = res.data;
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.noContentsError = "該当するデータがありません";
      }
    },
  },
  created() {
    axios
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
