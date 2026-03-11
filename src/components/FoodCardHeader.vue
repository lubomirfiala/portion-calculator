<script setup lang="ts">
import { toRefs, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import type { Food } from '@/types'

const props = defineProps({
  food: { type: Object as PropType<Food>, required: true }
})
const { food } = toRefs(props)
const { t } = useI18n()
const store = useFoodsStore()
const { deleteFood } = store
</script>

<template>
  <div class="food-card__header">
    <input
      v-model="food.name"
      class="input-name--food"
      type="text"
      :placeholder="t('foodName')"
    />
    <button class="btn btn--danger" tabindex="-1" @click="deleteFood(food.id)">✕</button>
  </div>
</template>
