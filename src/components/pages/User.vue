<template>
  <div class="page-user">
    <!-- DISPLAY PC -->
    <pc-user v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-delete>
            <modal-delete-user
              :modal-delete-user-contents="userDeleteContents"
              v-if="showUserDeleteModal"
              @modal="closeModal"
              @submitUser="deleteUser"
            ></modal-delete-user>
          </template>
        </the-modal>
      </template>
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title
              :sidebar-icon-text="sidebarIcon"
              :current-page="currentPageName"
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
      <!-- USER-CONTAINER -->
      <template v-slot:user-container>
        <user-container>
          <template v-slot:user-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:user-edit>
            <user-edit
              :edit-contents="userEditContents"
              :error-messages="userEditErrors"
              @submitUser="editUser"
              @modal="openModal"
            ></user-edit>
          </template>
        </user-container>
      </template>
    </pc-user>
    <!-- DISPLAY SP -->
    <sp-user v-if="$mq === 'sp'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-delete>
            <modal-delete-user
              :modal-delete-user-contents="userDeleteContents"
              v-if="showUserDeleteModal"
              @modal="closeModal"
              @submitUser="deleteUser"
            ></modal-delete-user>
          </template>
        </the-modal>
      </template>
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
        <user-container>
          <template v-slot:user-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:user-edit>
            <user-edit
              :edit-contents="userEditContents"
              :error-messages="userEditErrors"
              @submitUser="editUser"
              @modal="openModal"
            ></user-edit>
          </template>
        </user-container>
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
    </sp-user>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcUser from "@/components/templates/pc/User";
import SpUser from "@/components/templates/sp/User";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import UserContainer from "@/components/organisms/UserContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalDeleteUser from "@/components/molecules/ModalDeleteUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import UserEdit from "@/components/molecules/UserEdit.vue";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcUser,
    SpUser,
    TheModal,
    TheSidebar,
    TheHeader,
    UserContainer,
    TheFooter,
    ModalDeleteUser,
    SidebarMenusAuthenticated,
    HeaderIconsAuthenticated,
    UserEdit,
    FooterIcons,
    AppTitle,
    TheNotice,
    TheHeading,
  },
  props: {
    currentUser: Object,
  },
  data() {
    return {
      heading: "プロフィール編集",
      userEditErrors: [],
      userEditContents: [
        [
          ["text", "ユーザー名", "name", this.currentUser.name],
          ["email", "メールアドレス", "email", this.currentUser.email],
          ["password", "現在のパスワード", "current_password"],
          ["password", "新しいパスワード(8文字以上)", "password"],
        ],
        "登録",
        "ユーザーアカウント削除",
      ],
      userDeleteContents: [
        "ユーザーアカウント削除",
        "本当に削除しますか？",
        "削除する",
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
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.unauthenticatedSidebarMenus[1].name:
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          // 計算画面へ。実装後に追加
          break;
        case this.unauthenticatedSidebarMenus[2].name:
        case this.authenticatedSidebarMenus[2].name:
        case this.footerIcons[2][0]:
          // カレンダーへ。実装後に追加
          break;
        case this.authenticatedUserFunctions[0]:
          break;
      }
    },
    editUser(inputData) {
      this.decryptHeaders();
      axios
        .put("/api/v1/auth", inputData, {
          headers: this.authHeader,
        })
        .then(() => {
          this.userEditErrors = [];
          this.authHeader = { "access-token": "", client: "", uid: "" };
          this.noticeMessage = "変更を受け付けました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userEditErrors = err.response.data.errors.full_messages;
        });
    },
    deleteUser() {
      this.decryptHeaders();
      axios
        .delete("/api/v1/auth", {
          headers: this.authHeader,
        })
        .then(() => {
          this.$cookies.remove("auth-header");
          this.userId = "";
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.markCurrentPage();
  },
};
</script>
