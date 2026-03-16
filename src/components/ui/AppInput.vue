<script setup lang="ts">
import { toRefs, type PropType } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: null },
  type: { type: String as PropType<'text' | 'number'>, default: 'text' },
  placeholder: { type: String, default: '' },
})
const { type } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

function onInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  if (type.value === 'number') {
    const n = parseFloat(val)
    emit('update:modelValue', isNaN(n) ? null : n)
  } else {
    emit('update:modelValue', val)
  }
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue ?? ''"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>
