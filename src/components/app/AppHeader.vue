<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useFoodsStore } from '@/stores/foods';
import AppLogo from '@/components/ui/AppLogo.vue';
import TextIconButton from '@/components/ui/TextIconButton.vue';

const { t } = useI18n();
const store = useFoodsStore();

function handleAddFood(): void {
  store.addFood();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="app-header">
    <AppLogo />
    <TextIconButton
      :label="t('addFood')"
      size="md"
      @click="handleAddFood"
    />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: -$app-padding;
  padding: calc(#{$app-padding} + env(safe-area-inset-top)) $app-padding $app-padding;
  margin-bottom: 1rem;
  backdrop-filter: blur(0.5rem);
  -webkit-backdrop-filter: blur(0.5rem);
  background: rgba(234, 234, 236, 0.2);

  @media (max-width: 600px) {
    display: none;
  }
}
</style>
