<template>
  <div class="logoContainer">
    <Vue3Lottie :animationData="animation" :width="400" class="hidden" />

    <h1 class="title hidden">Meu cadastro seguro</h1>
  </div>
</template>

<script setup lang="ts">
import animation from "@/assets/animation.json";
</script>

<style scoped>
.logoContainer {
  background: linear-gradient(to bottom, #1e92c8, #5dc4e4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 50rem;
  width: 65%;
  padding-left: 15rem;
}

.title {
  color: #fff;
  position: absolute;
  bottom: 8rem;
}

@media (max-width: 1023px) {
  .hidden {
    display: none;
  }
}
</style>
