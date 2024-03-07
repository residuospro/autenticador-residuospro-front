<template>
  <div class="userInputContainer glass-effect userInput">
    <div class="text-center">
      <h1 class="text-v_dark_green">Finalizar cadastro</h1>
    </div>

    <form class="inputContainer" @submit.prevent="finalizeRegistration">
      <input
        :class="userExists ? 'userExists inputLogin input' : 'inputLogin input'"
        placeholder="Username:"
        type="text"
        @keyup="getUsername(($event.target as HTMLInputElement).value)"
        @blur="
          ($event.target as HTMLInputElement).value != '' && validateUsername()
        "
      />

      <input
        class="inputLogin input"
        placeholder="Senha:"
        type="password"
        id="pass1"
        @keyup="getPasswordOne(($event.target as HTMLInputElement).value)"
      />

      <button class="eyeIconOne" @click.prevent="showPassord('#pass1', $event)">
        <v-icon
          :icon="eyeIconOne ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
        />
      </button>

      <input
        class="inputLogin input"
        placeholder="Repetir senha:"
        type="password"
        id="pass2"
        @keyup="getPasswordTwo(($event.target as HTMLInputElement).value)"
      />

      <p :class="statusCode == 200 ? 'sucess' : 'error'">
        {{ apiResponse }}
      </p>

      <p v-if="userExists" class="error">
        Esse username já existe em nossa base
      </p>

      <button class="eyeIconTwo" @click.prevent="showPassord('#pass2', $event)">
        <v-icon
          :icon="eyeIconTwo ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
        />
      </button>

      <button
        :disabled="!showButton"
        :class="showButton ? 'submitBtn' : 'disabledBtn'"
        type="submit"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-undef */

import { PropType } from "vue";

defineProps({
  userExists: { type: Boolean, required: true },

  apiResponse: { type: String, required: true },

  statusCode: { type: Number, required: true },

  eyeIconOne: { type: Boolean, required: true },

  eyeIconTwo: { type: Boolean, required: true },

  showButton: { type: Boolean, required: true },

  getPasswordOne: {
    type: Function as PropType<(password: string) => void>,
    required: true,
  },

  getPasswordTwo: {
    type: Function as PropType<(password: string) => void>,
    required: true,
  },

  getUsername: {
    type: Function as PropType<(username: string) => void>,
    required: true,
  },

  showPassord: {
    type: Function as PropType<(id: string, event: Event) => void>,
    required: true,
  },

  finalizeRegistration: {
    type: Function as PropType<(event: Event) => void>,
    required: true,
  },

  validateUsername: {
    type: Function,
    required: true,
  },
});
</script>

<style>
.userInputContainer {
  width: 40%;
  height: 35rem;
  position: absolute;
  left: 8rem;
  border-radius: 0.5rem;
  margin-left: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20rem;
  margin-top: -4rem;
  position: relative;
  width: 100%;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(13.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.text-v_dark_blue {
  color: #1e92c8;
}

.text-v_dark_gray {
  color: #9d9797;
}

.text-center {
  text-align: center;
}

.sucess {
  color: #77ab59;
}

.error {
  color: #ff0f00;
}

.submitBtn {
  width: 100%;
  height: 4rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  color: #fff !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  background: #1e92c8;
}

.disabledBtn {
  width: 100%;
  height: 4rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  color: #fff;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  background: #9d9797;
}

.input {
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  border: 2px solid #ccc;
  outline-color: #ccc1;
  background: #f3f4f6bf;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.1);
}

.userExists {
  border: 2px solid #ff0f00;
  outline-color: #ff0f00 !important;
}

.eyeIconOne {
  position: absolute;
  top: 4.5rem;
  right: 0;
  height: 26%;
  width: 18%;
}

.eyeIconTwo {
  position: absolute;
  top: 9.8rem;
  right: 0;
  height: 22%;
  width: 18%;
}

.input::placeholder,
.input::-webkit-input-placeholder {
  color: #9d9797;
}

.input:-ms-input-placeholder {
  color: #9d9797;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input:focus {
  background: #fff;
  outline: 2px solid #1e92c8;
}

input {
  -moz-appearance: textfield;
}

@media (max-width: 1023px) {
  .userInput {
    width: calc(100% - 8rem);
    left: 1rem;
  }
  .glass-effect {
    backdrop-filter: blur(3px);
  }

  .hidden {
    display: none;
  }
}

@media (max-width: 767px) {
  .inputLogin {
    width: calc(100% - 0.2rem) !important;
  }
}

.containerSubtittle {
  background: #f8f8f8;
  border-radius: 0.5em;
  padding: 0.2em 0.5em;
}

.subtittle {
  font-size: 1rem;
}
</style>
