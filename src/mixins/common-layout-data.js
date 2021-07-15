export default {
  data() {
    return {
      showUserRegistrationModal: false,
      showUserLoginModal: false,
      userRegistrationContents: [
        "ユーザー登録",
        [
          ["text", "ユーザー名", "name"],
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
        ],
        "登録",
      ],
      registrationSuccess: "なんで？",
      userRegistrationErrors: [],
      userLoginContents: [
        "ユーザーログイン",
        [
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
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
      footerIcons: [
        ["database", "LSDB"],
        ["calculator", "アルコール量計算"],
        ["calendar-alt", "摂取量記録"],
      ],
    };
  },
};
