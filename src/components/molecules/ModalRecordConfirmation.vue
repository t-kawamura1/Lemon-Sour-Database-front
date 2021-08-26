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
        <button-zero-record
          class="modal-record-confirmation-button-zero-record"
          :button-zero-record-text="modalRecordConfirmationContents[2]"
          @zeroRecord="emitModalAndData"
        ></button-zero-record>
      </div>
    </overlay>
  </div>
</template>

<script>
import Overlay from "@/components/atoms/Overlay";
import ButtonClose from "@/components/atoms/ButtonClose";
import ModalTitle from "@/components/atoms/ModalTitle";
import ButtonZeroRecord from "@/components/atoms/ButtonZeroRecord";

export default {
  components: {
    Overlay,
    ButtonClose,
    ModalTitle,
    ButtonZeroRecord,
  },
  props: {
    modalRecordConfirmationContents: Array,
    drinkingDate: String,
  },
  data() {
    return {
      recordData: {
        drinking_record: {
          user_id: "",
          lemon_sour_id: "",
          drinking_date: this.drinkingDate,
          pure_alcohol_amount: 0,
          drinking_amount: 0,
        },
      },
    };
  },
  methods: {
    emitModalAndData() {
      this.$emit("submitZeroRecord", this.recordData);
      this.$emit("modal", this.modalRecordConfirmationContents[0]);
    },
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
    padding: 36px 24px;
    border-radius: 3%;
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
      text-align: left;
      line-height: 23px;
    }
  }
}
</style>
