<template>
  <div class="loadingContainer">
    <div class="modalContainer">
      <div class="spinnerContainer">
        <VueSpinnerFade size="60" color="#fff" />

        <h1 class="message">{{ message }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { VueSpinnerFade } from "vue3-spinners";

let message = ref("Aguarde, estamos reunindo suas informações");

setTimeout(() => {
  message.value = "Validando as informações...";
}, 10000);

setTimeout(() => {
  message.value = "Estamos preparando tudo...";
}, 20000);

setTimeout(() => {
  message.value = "Só mais um momento, estamos quase lá!";
}, 30000);
</script>

<style scoped>
.loadingContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  position: fixed;
  top: 0;
}

.modalContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.spinnerContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.message {
  margin-top: 0.75rem;
  font-size: 1.5rem;
  color: #fff;
}

@media (max-width: 769px) {
  .spinnerContainer {
    text-align: center;
  }

  .message {
    font-size: 0.8rem;
  }
}
</style>
