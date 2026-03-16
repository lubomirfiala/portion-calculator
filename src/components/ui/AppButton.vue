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
@use '@/assets/styles/general/variables' as *;

.app-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: $radius;
  line-height: 1;
  flex-shrink: 0;
  padding: 0;
  font: inherit;

  &--md {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.25rem;
  }

  &--sm {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  &--ghost {
    color: $color-muted;

    &:hover {
      background: $color-surface-hover;
      color: $color-secondary;
    }
  }

  &--icon {
    color: $color-icon;

    &:hover {
      color: $color-danger;
      background: $color-danger-bg;
    }
  }
}
</style>
