<script setup lang="ts">
import { ref, onMounted } from 'vue';
import logoWhite from '@/assets/img/logo_white.svg';

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
  }, 1500);
});
</script>

<template>
  <Transition name="splash-fade">
    <div
      v-if="visible"
      class="splash"
    >
      <img
        :src="logoWhite"
        class="splash__logo"
        alt="Portion Calculator"
      >
      <span class="splash__text">Portion Calculator</span>
    </div>
  </Transition>
</template>

<style lang="scss">
.splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  background: #1868b2;

  &__logo {
    width: 5rem;
    height: 5rem;
  }

  &__text {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.3px;
  }
}

.splash-fade-leave-active {
  transition: opacity 0.4s ease;
}

.splash-fade-leave-to {
  opacity: 0;
}
</style>
