<script setup lang="ts">
import { ref, toRefs, onMounted, onUnmounted, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFoodsStore } from '@/stores/foods';
import type { Food } from '@/types';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';

const props = defineProps({
  food: { type: Object as PropType<Food>,
    required: true },
  collapsed: { type: Boolean,
    required: true },
});
const { food, collapsed } = toRefs(props);
const emit = defineEmits<{ (e: 'toggle-collapse'): void }>();

const { t } = useI18n();
const store = useFoodsStore();
const { deleteFood } = store;

const menuOpen = ref(false);

function toggleMenu(event: Event): void {
  event.stopPropagation();
  menuOpen.value = !menuOpen.value;
}

function handleDelete(): void {
  menuOpen.value = false;
  deleteFood(food.value);
}

function handleOutsideClick(): void {
  menuOpen.value = false;
}

onMounted(() => document.addEventListener('click', handleOutsideClick));
onUnmounted(() => document.removeEventListener('click', handleOutsideClick));
</script>

<template>
  <div
    class="food-card__header"
    :class="{ collapsed: collapsed}"
  >
    <AppInput
      v-model="food.name"
      class="food-name-input"
      :placeholder="t('foodName')"
    />
    <AppButton
      tabindex="-1"
      @click="toggleMenu"
    >
      <span class="mdi mdi-dots-horizontal" />
    </AppButton>
    <div
      v-if="menuOpen"
      class="dots-menu"
    >
      <button
        class="dots-menu__item"
        @click="handleDelete"
      >
        {{ t('delete') }}
      </button>
    </div>
    <AppButton
      tabindex="-1"
      @click="emit('toggle-collapse')"
    >
      <span :class="collapsed ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'" />
    </AppButton>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.food-card__header {
  background: $color-white;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.625rem $card-padding-x;
  position: relative;
  border-radius: $radius $radius 0 0;

  &.collapsed {
    border-radius: $radius;
  }

  .food-name-input {
    flex: 1;
    min-width: 0;
    border: 1px solid transparent;
    border-radius: $radius;
    padding: 0.125rem 0.375rem;
    font: inherit;
    font-weight: 600;
    font-size: 0.9375rem;
    background: transparent;
    color: $color-text;

    &::placeholder {
      color: $color-placeholder;
      font-weight: 400;
    }

    &:hover {
      border-color: $color-border-hover;
    }

    &:focus {
      outline: none;
      border-color: $color-muted;
      background: #fafafa;
    }
  }

  .dots-menu {
    position: absolute;
    right: 2.75rem;
    top: calc(100% + 0.125rem);
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: $radius;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
    z-index: 100;
    overflow: hidden;
    min-width: 7.5rem;

    &__item {
      display: block;
      width: 100%;
      padding: $card-padding-y 0.875rem;
      border: none;
      background: transparent;
      font: inherit;
      font-size: $font-size-sm;
      text-align: left;
      cursor: pointer;
      color: $color-danger;

      &:hover {
        background: $color-danger-bg;
      }
    }
  }
}
</style>
