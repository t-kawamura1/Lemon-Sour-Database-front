<template>
  <div class="modal-delete-user">
    <overlay>
      <div class="modal-delete-user-content">
        <button-close
          class="modal-delete-user-button-close"
          @close="$emit('modal', modalDeleteUserContents[0])"
        ></button-close>
        <modal-title
          class="modal-delete-user-title"
          :modal-title-text="modalDeleteUserContents[0]"
        ></modal-title>
        <div class="modal-delete-user-message">
          {{ modalDeleteUserContents[1] }}
        </div>
        <button-user-submit
          class="modal-delete-user-button-submit"
          :user-submit-text="modalDeleteUserContents[2]"
          @click="$emit('submitUser')"
        ></button-user-submit>
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
    modalDeleteUserContents: Array,
  },
};
</script>

<style scoped lang="scss">
.modal-delete-user {
  .modal-delete-user-content {
    color: $font-color-bg-yellow;
    background-color: white;
    width: 300px;
    height: 200px;
    z-index: 21;
    position: relative;
    padding: 30px;
    .modal-delete-user-button-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .modal-delete-user-title {
      margin-bottom: 30px;
    }
    .modal-delete-user-message {
      margin-bottom: 30px;
    }
  }
}
</style>
