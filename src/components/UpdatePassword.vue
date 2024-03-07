<template>
  <div class="userInputContainer glass-effect userInput">
    <div class="userInputWrapper">
      <div class="text-center">
        <h1 class="text-v_dark_green">Redefinir senha</h1>
      </div>

      <form
        class="inputContainer"
        @submit.prevent="updatePassword(confirmPassword)"
      >
        <input
          class="inputLogin input"
          placeholder="Senha:"
          type="password"
          id="pass1"
          @keyup="(event: KeyboardEvent) => password = (event.target as HTMLInputElement).value"
        />

        <button
          class="eyeIconOne"
          @click.prevent="showPassord('#pass1', $event)"
        >
          <v-icon
            :icon="eyeIconOne ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          />
        </button>

        <input
          class="inputLogin input"
          placeholder="Repetir senha:"
          type="password"
          id="pass2"
          @keyup="(event: KeyboardEvent) => confirmPassword = (event.target as HTMLInputElement).value"
        />

        <p :class="statusCode == 200 ? 'sucess' : 'error'">
          {{ apiResponse }}
        </p>

        <button
          class="eyeIconTwo"
          @click.prevent="showPassord('#pass2', $event)"
        >
          <v-icon
            :icon="eyeIconTwo ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          />
        </button>

        <button
          :disabled="!validadePassword(password, confirmPassword)"
          :class="
            validadePassword(password, confirmPassword)
              ? 'submitBtn'
              : 'disabledBtn'
          "
          type="submit"
        >
          Salvar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */

import { PropType, ref } from "vue";
let password = ref("");
let confirmPassword = ref("");

defineProps({
  apiResponse: { type: String, required: true },

  statusCode: { type: Number, required: true },

  eyeIconOne: { type: Boolean, required: true },

  validadePassword: {
    type: Function as PropType<
      (password: string, confirmPassword: string) => boolean
    >,
    required: true,
  },

  eyeIconTwo: { type: Boolean, required: true },

  showPassord: {
    type: Function as PropType<(id: string, event: Event) => void>,
    required: true,
  },

  updatePassword: {
    type: Function as PropType<(confirmPassword: string) => void>,
    required: true,
  },
});
</script>

<style scoped>
.userInputWrapper {
  width: 100%;
  height: 18.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15rem;
  margin-top: -4rem;
  position: relative;
  width: 100%;
}

.eyeIconOne {
  position: absolute;
  top: 0.3rem;
  right: 0;
  height: 26%;
  width: 18%;
}

.eyeIconTwo {
  position: absolute;
  top: 5.2rem;
  right: 0;
  height: 22%;
  width: 18%;
}
</style>
