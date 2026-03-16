<script setup lang="ts">
import { toRefs, type PropType } from 'vue';

const props = defineProps({
  label: { type: String,
    required: true },
  icon: { type: String,
    default: 'mdi-plus' },
  size: { type: String as PropType<'sm' | 'md'>,
    default: 'md' },
});
const { label, icon, size } = toRefs(props);
</script>

<template>
  <button
    class="text-icon-btn"
    :class="`text-icon-btn--${size}`"
    v-bind="$attrs"
  >
    {{ label }} <span class="text-icon-btn__circle"><span
      class="mdi"
      :class="icon"
    /></span>
  </button>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.text-icon-btn {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: $color-secondary;
  border-radius: $radius;

  &:hover &__circle {
    background: $color-text-subtle;
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-ui-dark;
    color: $color-white;
    border-radius: 50%;
    font-weight: 300;
    line-height: 1;
    flex-shrink: 0;
  }

  &--md {
    gap: $gap;
    font-size: $font-size-base;
    padding: 0.375rem 0;

    .text-icon-btn__circle {
      width: 2.25rem;
      height: 2.25rem;
      font-size: 1.25rem;
    }
  }

  &--sm {
    gap: $gap;
    font-size: $font-size-sm;
    padding: 0.25rem $gap;

    &:hover {
      background: $color-surface-hover;
    }

    .text-icon-btn__circle {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }
  }
}
</style>
