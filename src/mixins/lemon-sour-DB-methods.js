import axios from "axios";

export default {
  methods: {
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
    registrateUser(inputData) {
      axios
        .post("/api/v1/auth", inputData)
        .then((res) => {
          console.log(res);
          this.showUserRegistrationModal = false;
          this.registrationSuccess = "ユーザー登録が成功しました！";
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
            errorMessages.splice(1, 1, "メールアドレスは有効ではありません");
            this.userRegistrationErrors = errorMessages;
          } else {
            this.userRegistrationErrors = errorMessages;
          }
        });
    },
    login(data) {
      // サーバーサイド実装後に実装
      delete data.name;
    },
  },
};
