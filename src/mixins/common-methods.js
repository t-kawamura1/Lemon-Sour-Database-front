import axios from "axios";
import crypto from "crypto-js";

export default {
  methods: {
    openModal(type) {
      if (type == "ユーザー登録") {
        this.showUserRegistrationModal = true;
      } else if (type == "ログイン") {
        this.showUserLoginModal = true;
      }
    },
    closeModal(type) {
      if (type == "ユーザー登録") {
        this.showUserRegistrationModal = false;
      } else if (type == "ログイン") {
        this.showUserLoginModal = false;
      }
    },
    encryptHeaders(res) {
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
    },
    decryptHeaders() {
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
    },
    registrateUser(inputData) {
      axios
        .post("/api/v1/auth", inputData)
        .then((res) => {
          this.encryptHeaders(res);
          this.isAuthenticated = true;
          this.userId = res.data.data.id;
          this.showUserRegistrationModal = false;
          this.noticeMessage = "ユーザー登録が成功しました！";
          this.userModalErrors = [];
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
          this.encryptHeaders(res);
          this.showUserLoginModal = false;
          this.isAuthenticated = true;
          this.userId = res.data.data.id;
          this.noticeMessage = "ログインに成功しました！";
          this.userModalErrors = [];
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
      this.decryptHeaders();
      axios
        .delete("/api/v1/auth/sign_out", {
          headers: this.authHeader,
        })
        .then(() => {
          this.$cookies.remove("auth-header");
          this.userId = "";
          this.routingAfterLogout(this.$route.name);
        })
        .catch((err) => {
          console.log(err.response);
          // this.$router.push("/エラーページ");
        });
    },
    routingAfterLogout(routeName) {
      if (this.authRequiredRoutes.includes(routeName)) {
        this.$router.push("/");
      } else {
        this.isAuthenticated = false;
        this.noticeMessage = "ログアウトしました。";
        setTimeout(() => {
          this.noticeMessage = "";
        }, 5000);
      }
    },
    checkAuthenticated() {
      if (this.$cookies.isKey("auth-header")) {
        this.decryptHeaders();
        axios
          .get("/api/v1/auth/validate_token", {
            headers: this.authHeader,
          })
          .then((res) => {
            if (res.data.success == true) {
              this.isAuthenticated = true;
              this.userId = res.data.data.id;
              this.authHeader = { "access-token": "", client: "", uid: "" };
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        this.isAuthenticated = false;
      }
    },
  },
};
