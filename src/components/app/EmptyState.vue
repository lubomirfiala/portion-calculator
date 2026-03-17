<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits<{ (e: 'add-food'): void }>();
</script>

<template>
  <div class="empty-state">
    <p class="empty-state__description">
      {{ t('appDescription') }}
    </p>
    <p class="empty-state__hint">
      {{ t('noFoods') }}
    </p>
    <button
      class="empty-state__add"
      @click="emit('add-food')"
    >
      <span class="mdi mdi-plus" />
      {{ t('addFood') }}
    </button>
    <p class="empty-state__bugs">
      {{ t('reportBugs') }}
      <a
        class="empty-state__github"
        href="https://github.com/lubomirfiala/portion-calculator"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="mdi mdi-github" />
        GitHub
      </a>
    </p>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  text-align: center;

  &__description {
    font-size: $font-size-base;
    color: $color-text-subtle;
    max-width: 22rem;
    line-height: 1.5;
  }

  &__hint {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__add {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.75rem;
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: $radius;
    background: $color-brand;
    color: $color-white;
    font: inherit;
    font-size: $font-size-base;
    cursor: pointer;

    &:hover {
      background: darken($color-brand, 8%);
    }
  }

  &__bugs {
    font-size: $font-size-sm;
    color: $color-text-muted;
    display: flex;
    align-items: center;
    padding-top: 7rem;
    gap: 0.375rem;
  }

  &__github {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: $font-size-sm;
    color: $color-brand;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
