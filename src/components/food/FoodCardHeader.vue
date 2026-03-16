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
.food-card__header {
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  position: relative;
  border-radius: 10px 10px 0 0;

  &.collapsed {
    border-radius: 10px;
  }

  .food-name-input {
    flex: 1;
    min-width: 0;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 2px 6px;
    font: inherit;
    font-weight: 600;
    font-size: 15px;
    background: transparent;
    color: #18181b;

    &::placeholder {
      color: #b4b4b8;
      font-weight: 400;
    }

    &:hover {
      border-color: #d4d4d8;
    }

    &:focus {
      outline: none;
      border-color: #a1a1aa;
      background: #fafafa;
    }
  }

  .dots-menu {
    position: absolute;
    right: 44px;
    top: calc(100% + 2px);
    background: #fff;
    border: 1px solid #e2e2e6;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    z-index: 100;
    overflow: hidden;
    min-width: 120px;

    &__item {
      display: block;
      width: 100%;
      padding: 8px 14px;
      border: none;
      background: transparent;
      font: inherit;
      font-size: 13px;
      text-align: left;
      cursor: pointer;
      color: #dc2626;

      &:hover {
        background: #fef2f2;
      }
    }
  }
}
</style>
