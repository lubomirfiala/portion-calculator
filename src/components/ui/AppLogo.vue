<script setup lang="ts">
import { toRefs, computed, type PropType } from 'vue';
import logoBlue from '@/assets/img/logo_blue.svg';
import logoWhite from '@/assets/img/logo_white.svg';

const props = defineProps({
  color: { type: String as PropType<'blue' | 'white'>,
    default: 'blue' },
  withText: { type: Boolean,
    default: true },
  size: { type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md' },
});

const { color, withText, size } = toRefs(props);

const src = computed(() => color.value === 'white' ? logoWhite : logoBlue);
const textColor = computed(() => color.value === 'white' ? '#ffffff' : '#1868b2');
</script>

<template>
  <div
    class="app-logo"
    :class="`app-logo--${size}`"
  >
    <img
      :src="src"
      class="app-logo__img"
      alt="Portion Calculator"
    >
    <span
      v-if="withText"
      class="app-logo__text"
      :style="{ color: textColor }"
    >
      Portion<br>Calculator
    </span>
  </div>
</template>

<style lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;

  &__img {
    width: 2.75rem;
    height: 2.75rem;
    flex-shrink: 0;
  }

  &__text {
    font-size: 1.0625rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }

  &--sm {
    .app-logo__img {
      width: 2rem;
      height: 2rem;
    }

    .app-logo__text {
      font-size: 0.875rem;
    }
  }

  &--lg {
    .app-logo__img {
      width: 3.25rem;
      height: 3.25rem;
    }

    .app-logo__text {
      font-size: 1.375rem;
    }
  }
}
</style>
