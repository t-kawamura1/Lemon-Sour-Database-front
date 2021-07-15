import axios from "axios";

export default {
  methods: {
    openModal(type) {
      switch (type) {
        case "ユーザー登録":
          this.showUserRegistrationModal = true;
          break;
        case "ログイン":
          this.showUserLoginModal = true;
          break;
        case "ログアウト":
          this.showUserLogoutModal = true;
          break;
      }
    },
    closeModal(type) {
      switch (type) {
        case "ユーザー登録":
          this.showUserRegistrationModal = false;
          break;
        case "ユーザーログイン":
          this.showUserLoginModal = false;
          break;
        case "ユーザーログアウト":
          this.showUserLogoutModal = false;
          break;
      }
    },
    registrateUser(inputData) {
      axios
        .post("/api/v1/auth", inputData)
        .then((res) => {
          console.log(res.headers);
          // const authHeaders = res.headers;
          // this.$cookies.set("auth-headers", authHeaders);
          // console.log(this.$cookies.get("auth-headers"));
          this.showUserRegistrationModal = false;
          this.registrationSuccess = "ユーザー登録が成功しました！";
          this.userRegistrationErrors = "";
          setTimeout(() => {
            this.registrationSuccess = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          const errorMessages =
            err.response.data.errors.full_messages.reverse();
          const unsecureMessage = "メールアドレスが既に登録されています";
          if (errorMessages.includes(unsecureMessage)) {
            const filteredMessages = errorMessages.filter((errMsg) => {
              return errMsg !== unsecureMessage;
            });
            filteredMessages.splice(1, 0, "メールアドレスは有効ではありません");
            this.userRegistrationErrors = filteredMessages;
          } else {
            this.userRegistrationErrors = errorMessages;
          }
        });
    },
    login(inputData) {
      delete inputData.name;
    },
    logout() {},
  },
};
