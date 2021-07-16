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
          this.showUserRegistrationModal = false;
          this.noticeMessage = "ユーザー登録が成功しました！";
          this.userModalErrors = "";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          const errorMessages = err.response.data.errors.full_messages.reverse();
          const unsecureMessage = "メールアドレスが既に登録されています";
          if (errorMessages.includes(unsecureMessage)) {
            const filteredMessages = errorMessages.filter((errMsg) => {
              return errMsg !== unsecureMessage;
            });
            filteredMessages.splice(1, 0, "メールアドレスは有効ではありません");
            this.userModalErrors = filteredMessages;
          } else {
            this.userModalErrors = errorMessages;
          }
        });
    },
    login(inputData) {
      delete inputData.name;
      axios
        .post("/api/v1/auth/sign_in", inputData)
        .then((res) => {
          console.log(res.headers)
          this.authHeader["access-token"] = res.headers["access-token"];
          this.authHeader["client"] = res.headers["client"];
          this.authHeader["uid"] = res.headers["uid"];
          this.$cookies.set("auth-header", this.authHeader);
          console.log(this.$cookies.get("auth-header"));
          this.showUserLoginModal = false;
          this.isAuthenticated = true;
          this.noticeMessage = "ログインに成功しました！";
          this.userModalErrors = "";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userModalErrors = err.response.data.errors;
        });
    },
    logout() {
      axios
        .delete("/api/v1/auth/sign_out", {headers: this.$cookies.get("auth-header")})
        .then((res) => {
          console.log(res)
          this.$cookies.remove("auth-header");
          this.isAuthenticated = false;
          this.noticeMessage = "ログアウトしました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    whetherAuthenticated() {
      if (this.$cookies.isKey("auth-header")) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
  },
};
