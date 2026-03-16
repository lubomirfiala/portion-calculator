<script setup lang="ts">
import { toRefs, computed, type PropType } from 'vue'
import logoBlue from '@/assets/img/logo_blue.svg'
import logoWhite from '@/assets/img/logo_white.svg'

const props = defineProps({
  color: { type: String as PropType<'blue' | 'white'>, default: 'blue' },
  withText: { type: Boolean, default: true },
})
const { color, withText } = toRefs(props)

const src = computed(() => color.value === 'white' ? logoWhite : logoBlue)
const textColor = computed(() => color.value === 'white' ? '#ffffff' : '#1868b2')
</script>

<template>
  <div class="app-logo">
    <img :src="src" class="app-logo__img" alt="Portion Calculator" />
    <span v-if="withText" class="app-logo__text" :style="{ color: textColor }">
      Portion<br />Calculator
    </span>
  </div>
</template>

<style lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-logo__img {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.app-logo__text {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.3px;
}
</style>
