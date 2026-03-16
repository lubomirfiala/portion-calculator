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
.text-icon-btn {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: #52525b;
  border-radius: 6px;

  &:hover &__circle {
    background: #3f3f46;
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #27272a;
    color: #fff;
    border-radius: 50%;
    font-weight: 300;
    line-height: 1;
    flex-shrink: 0;
  }

  &--md {
    gap: 8px;
    font-size: 14px;
    padding: 4px 0;

    .text-icon-btn__circle {
      width: 28px;
      height: 28px;
      font-size: 18px;
    }
  }

  &--sm {
    gap: 6px;
    font-size: 13px;
    padding: 2px 8px;

    &:hover {
      background: #f4f4f5;
    }

    .text-icon-btn__circle {
      width: 22px;
      height: 22px;
      font-size: 14px;
    }
  }
}
</style>
