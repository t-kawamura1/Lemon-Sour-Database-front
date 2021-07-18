import axios from "axios";
import crypto from "crypto-js";

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
          const errorMessages =
            err.response.data.errors.full_messages.reverse();
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
          const encryptedAccessToken = crypto.AES.encrypt(
            res.headers["access-token"],
            this.$encryptKey
          ).toString();
          const encryptedClient = crypto.AES.encrypt(
            res.headers["client"],
            this.$encryptKey
          ).toString();
          const encryptedUid = crypto.AES.encrypt(
            res.headers["uid"],
            this.$encryptKey
          ).toString();
          this.authHeader["access-token"] = encryptedAccessToken;
          this.authHeader["client"] = encryptedClient;
          this.authHeader["uid"] = encryptedUid;
          this.$cookies.set("auth-header", this.authHeader);
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
          this.userModalErrors.push(err.response.data.errors);
        });
    },
    logout() {
      const decryptedAccessToken = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["access-token"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedClient = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["client"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedUid = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["uid"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      this.authHeader["access-token"] = decryptedAccessToken;
      this.authHeader["client"] = decryptedClient;
      this.authHeader["uid"] = decryptedUid;
      axios
        .delete("/api/v1/auth/sign_out", {
          headers: this.authHeader,
        })
        .then((res) => {
          console.log(res);
          this.$cookies.remove("auth-header");
          this.isAuthenticated = false;
          this.noticeMessage = "ログアウトしました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userModalErrors.push(err.response.data.errors);
        });
    },
    whetherAuthenticated() {
      if (this.$cookies.isKey("auth-header")) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
};
