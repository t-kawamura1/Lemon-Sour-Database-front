<template>
  <div class="modal-record-confirmation">
    <overlay>
      <div class="modal-record-confirmation-content">
        <button-close
          class="modal-record-confirmation-button-close"
          @close="$emit('modal', modalRecordConfirmationContents[0])"
        ></button-close>
        <modal-title
          class="modal-record-confirmation-title"
          :modal-title-text="modalRecordConfirmationContents[0]"
        ></modal-title>
        <div class="modal-record-confirmation-message">
          {{ modalRecordConfirmationContents[1] }}
        </div>
        <form
          class="modal-record-confirmation-form"
          @submit.prevent="$emit('submitUser')"
        >
          <button-user-submit
            class="modal-record-confirmation-button-submit"
            :user-submit-text="modalRecordConfirmationContents[2]"
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
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";

export default {
  components: {
    Overlay,
    ButtonClose,
    ModalTitle,
    ButtonUserSubmit,
  },
  props: {
    modalRecordConfirmationContents: Array,
  },
};
</script>

<style scoped lang="scss">
.modal-record-confirmation {
  .modal-record-confirmation-content {
    color: $second-dark-yellow;
    background-color: white;
    width: 300px;
    z-index: $z-modal;
    position: relative;
    padding: 45px 0;
    .modal-record-confirmation-button-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .modal-record-confirmation-title {
      margin-bottom: 30px;
    }
    .modal-record-confirmation-message {
      margin-bottom: 30px;
    }
  }
}
</style>
