<template>
  <div class="user-edit">
    <form
      class="user-edit-form"
      @submit.prevent="$emit('submitUser', userData)"
    >
      <error-message
        class="user-edit-error-message"
        v-for="(errorMessage, index) in errorMessages"
        :key="`error-${index}`"
        :error-message-text="errorMessage"
      ></error-message>
      <input-text
        class="user-edit-input-text"
        ref="focusThis"
        v-for="(inputAttributesArray, index) in editContents[0]"
        :key="`input-${index}`"
        :input-attributes="inputAttributesArray"
        @input="substituteUserData"
      ></input-text>
      <button-user-submit
        class="user-edit-button-submit"
        :user-submit-text="editContents[1]"
      ></button-user-submit>
    </form>
    <div @click="$emit('modal', editContents[2])" class="user-edit-delete">
      {{ editContents[2] }}
    </div>
  </div>
</template>

<script>
import InputText from "@/components/atoms/InputText";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    InputText,
    ButtonUserSubmit,
    ErrorMessage,
  },
  props: {
    editContents: Array,
    errorMessages: Array,
  },
  data() {
    return {
      userData: {
        name: this.editContents[0][0][3],
        email: this.editContents[0][1][3],
        current_password: "",
        password: "",
      },
    };
  },
  methods: {
    substituteUserData($event) {
      if ($event.target.name == "name") {
        this.userData.name = $event.target.value;
      } else if ($event.target.name == "email") {
        this.userData.email = $event.target.value;
      } else if ($event.target.name == "current_password") {
        this.userData.current_password = $event.target.value;
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
.user-edit {
  color: $second-dark-yellow;
  width: 300px;
  .user-edit-form {
    display: flex;
    flex-direction: column;
    .user-edit-error-message {
      font-size: 1.3rem;
      text-align: left;
    }
    .user-edit-input-text {
      margin-top: 15px;
    }
    .user-edit-button-submit {
      margin-top: 15px;
    }
  }
  .user-edit-delete {
    margin-top: 30px;
    cursor: pointer;
    text-align: right;
  }
}
</style>
