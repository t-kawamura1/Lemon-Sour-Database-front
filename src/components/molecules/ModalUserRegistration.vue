<template>
  <div class="modal-user-registration">
    <overlay>
      <div class="modal-user-registration-content">
        <button-close
          class="modal-user-registration-button-close"
          @close="$emit('modal', modalUserRegistrationContents[0])"
        ></button-close>
        <modal-title
          class="modal-user-registration-title"
          :modal-title-text="modalUserRegistrationContents[0]"
        ></modal-title>
        <form
          class="modal-user-registration-form"
          @submit.prevent="registrateUser"
        >
          <input-text
            class="modal-user-registration-input-text"
            v-for="(
              inputAttributesArray, index
            ) in modalUserRegistrationContents[1]"
            :key="index"
            :input-attributes="inputAttributesArray"
            @input="userData.push($event)"
          ></input-text>
          <button-user-submit
            class="modal-user-registration-button-submit"
            :user-submit-text="modalUserRegistrationContents[2]"
          ></button-user-submit>
        </form>
      </div>
    </overlay>
  </div>
</template>

<script>
// import axios from "axios";
import Overlay from "@/components/atoms/Overlay";
import ButtonClose from "@/components/atoms/ButtonClose";
import ModalTitle from "@/components/atoms/ModalTitle";
import InputText from "@/components/atoms/InputText";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";

export default {
  components: {
    Overlay,
    ButtonClose,
    ModalTitle,
    InputText,
    ButtonUserSubmit,
  },
  props: {
    modalUserRegistrationContents: Array,
  },
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    // pagesに担当させるとpagesごとに書かないといけないので、モーダルのsubmitはmoleculeで担当する。
    // ロジックはサーバーサイド実装後に書く。
    registrateUser() {
      console.log(this.userData);
    },
  },
};
</script>

<style scoped lang="scss">
.modal-user-registration {
  .modal-user-registration-content {
    color: $font-color-bg-yellow;
    background-color: white;
    width: 300px;
    height: 400px;
    z-index: 21;
    position: relative;
    padding: 30px;
    .modal-user-registration-button-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .modal-user-registration-title {
      margin-bottom: 30px;
    }
    .modal-user-registration-form {
      display: flex;
      flex-flow: column;
      justify-content: center;
      .modal-user-registration-input-text {
        margin-top: 6px;
      }
      .modal-user-registration-button-submit {
        margin-top: 15px;
      }
    }
  }
}
</style>
