<script setup lang="ts">
import { toRefs, type PropType } from 'vue';

const props = defineProps({
  size: { type: String as PropType<'sm' | 'md'>,
    default: 'md' },
  variant: { type: String as PropType<'ghost' | 'icon'>,
    default: 'ghost' },
});
const { size, variant } = toRefs(props);
</script>

<template>
  <button
    class="app-btn"
    :class="`app-btn--${size} app-btn--${variant}`"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.app-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  line-height: 1;
  flex-shrink: 0;
  padding: 0;
  font: inherit;

  &--md {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 20px;
  }

  &--sm {
    width: 2rem;
    height: 2rem;
    font-size: 16px;
  }

  &--ghost {
    color: #a1a1aa;

    &:hover {
      background: #f4f4f5;
      color: #52525b;
    }
  }

  &--icon {
    color: #c4c4c8;

    &:hover {
      color: #dc2626;
      background: #fef2f2;
    }
  }
}
</style>
