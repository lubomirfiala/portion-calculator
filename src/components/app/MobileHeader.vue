<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppLogo from '@/components/ui/AppLogo.vue';

const isScrolled = ref(false);
const viewportOffsetTop = ref(0);

function onScroll(): void {
  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  isScrolled.value = window.scrollY >= 2 * remPx;
}

function onViewportChange(): void {
  viewportOffsetTop.value = window.visualViewport?.offsetTop ?? 0;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.visualViewport?.addEventListener('resize', onViewportChange);
  window.visualViewport?.addEventListener('scroll', onViewportChange);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.visualViewport?.removeEventListener('resize', onViewportChange);
  window.visualViewport?.removeEventListener('scroll', onViewportChange);
});
</script>

<template>
  <div
    class="mobile-header-fixed"
    :class="{ 'mobile-header-fixed--visible': isScrolled }"
    :style="{ transform: `translateY(${viewportOffsetTop}px)` }"
    aria-hidden="true"
  >
    <AppLogo
      size="sm"
      :with-text="false"
    />
  </div>

  <div class="mobile-header-relative">
    <AppLogo size="lg" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.mobile-header-fixed {
  display: none;

  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding-top: env(safe-area-inset-top);
    padding-bottom: 0.5rem;
    backdrop-filter: blur(0.75rem);
    -webkit-backdrop-filter: blur(0.75rem);
    background: rgba(234, 234, 236, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, visibility 0s linear 0.25s;
    pointer-events: none;
  }

  &--visible {
    @media (max-width: 600px) {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.25s ease, visibility 0s linear 0s;
      pointer-events: auto;
    }
  }
}

.mobile-header-relative {
  display: none;

  @media (max-width: 600px) {
    display: block;
    padding-top: calc(env(safe-area-inset-top) + 2rem);
    padding-bottom: 1.5rem;
    margin-inline: -$app-padding;
    padding-inline: $app-padding;
  }
}
</style>
