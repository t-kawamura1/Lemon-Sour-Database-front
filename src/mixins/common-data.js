export default {
  data() {
    return {
      showUserRegistrationModal: false,
      showUserLoginModal: false,
      noticeMessage: "",
      userModalErrors: [],
      userRegistrationContents: [
        "ユーザー登録",
        [
          ["text", "ユーザー名", "name"],
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
        ],
        "登録",
      ],
      userLoginContents: [
        "ログイン",
        [
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
        ],
        "ログイン",
      ],
      authenticatedUserFunctions: ["プロフィール編集", "ログアウト"],
      unauthenticatedUserFunctions: ["ユーザー登録", "ログイン"],
      authHeader: {
        "access-token": "",
        client: "",
        uid: "",
      },
      authRequiredRoutes: ["calendar", "user"],
      isAuthenticated: false,
      userId: "",
      authenticatedSidebarMenus: [
        { name: "市販レモンサワーデータベース" },
        { name: "アルコール摂取量計算" },
        { name: "摂取量記録カレンダー" },
        { name: "ユーザー情報", dropdown: "enabled" },
      ],
      unauthenticatedSidebarMenus: [
        { name: "市販レモンサワーデータベース" },
        { name: "アルコール摂取量計算" },
        { name: "摂取量記録カレンダー" },
        { name: "ユーザー登録・ログイン", dropdown: "enabled" },
      ],
      headerIcons: ["lemon", "address-card"],
      footerIcons: [
        ["database", "LSDB"],
        ["calculator", "アルコール量計算"],
        ["calendar-alt", "摂取量記録"],
      ],
    };
  },
};
