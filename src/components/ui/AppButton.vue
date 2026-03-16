<script setup lang="ts">
import { toRefs, type PropType } from 'vue'

const props = defineProps({
  size: { type: String as PropType<'sm' | 'md'>, default: 'md' },
  variant: { type: String as PropType<'ghost' | 'icon'>, default: 'ghost' },
})
const { size, variant } = toRefs(props)
</script>

<template>
  <button class="app-btn" :class="`app-btn--${size} app-btn--${variant}`" v-bind="$attrs">
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
}

.app-btn--md {
  width: 28px;
  height: 28px;
  font-size: 18px;
}

.app-btn--sm {
  width: 20px;
  height: 20px;
  font-size: 14px;
}

.app-btn--ghost {
  color: #a1a1aa;

  &:hover {
    background: #f4f4f5;
    color: #52525b;
  }
}

.app-btn--icon {
  color: #c4c4c8;

  &:hover {
    color: #dc2626;
    background: #fef2f2;
  }
}
</style>
