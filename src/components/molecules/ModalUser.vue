<template>
  <div class="modal-user">
    <overlay>
      <div class="modal-user-content">
        <button-close
          class="modal-user-button-close"
          @close="$emit('modal', modalUserContents[0])"
        ></button-close>
        <modal-title
          class="modal-user-title"
          :modal-title-text="modalUserContents[0]"
        ></modal-title>
        <form
          class="modal-user-form"
          @submit.prevent="$emit('submitUser', userData)"
        >
          <input-text
            class="modal-user-input-text"
            ref="focusThis"
            v-for="(inputAttributesArray, index) in modalUserContents[1]"
            :key="index"
            :input-attributes="inputAttributesArray"
            @input="substituteUserData"
          ></input-text>
          <button-user-submit
            class="modal-user-button-submit"
            :user-submit-text="modalUserContents[2]"
          ></button-user-submit>
        </form>
      </div>
    </overlay>
  </div>
</template>

<script>
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
    modalUserContents: Array,
  },
  data() {
    return {
      userData: {
        name: "" ,
        email: "" ,
        password: "" ,
      },
    };
  },
  methods: {
    substituteUserData($event) {
      if ($event.target.name == "name") {
        this.userData.name = $event.target.value;
      } else if ($event.target.name == "email") {
        this.userData.email = $event.target.value;
      } else if ($event.target.name == "password") {
        this.userData.password = $event.target.value;
      }
    },
  },
  // 親でv-ifにした上で、このタイミング + nextTickでしかfocusされなかった。
  beforeMount() {
    this.$nextTick(() => {
      this.$refs.focusThis[0].$el.focus();
    });
  },
};
</script>

<style scoped lang="scss">
.modal-user {
  .modal-user-content {
    color: $font-color-bg-yellow;
    background-color: white;
    width: 300px;
    height: 400px;
    z-index: 21;
    position: relative;
    padding: 30px;
    .modal-user-button-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .modal-user-title {
      margin-bottom: 30px;
    }
    .modal-user-form {
      display: flex;
      flex-flow: column;
      justify-content: center;
      .modal-user-input-text {
        margin-top: 6px;
      }
      .modal-user-button-submit {
        margin-top: 15px;
      }
    }
  }
}
</style>
