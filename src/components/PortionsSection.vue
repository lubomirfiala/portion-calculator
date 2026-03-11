<script setup lang="ts">
import { toRefs, computed, watchEffect, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import type { Food } from '@/types'

const props = defineProps({
  food: { type: Object as PropType<Food>, required: true }
})
const { food } = toRefs(props)
const { t } = useI18n()
const store = useFoodsStore()
const { addPortion, deletePortion, totalPortionWeight, ingredientInPortion } = store

const visibleIngredients = computed(() =>
  food.value.ingredients.filter(i => i.name.trim() !== '' || (i.weight !== null && i.weight !== 0))
)

watchEffect(() => {
  const allUsed = food.value.portions.every(
    p => p.name.trim() !== '' || (p.weight !== null && p.weight !== 0)
  )
  if (allUsed) addPortion(food.value.id)
})

function fmt(value: number | null): string {
  if (value === null) return '—'
  return value.toFixed(1)
}
</script>

<template>
  <div class="food-card__section food-card__section--portions">
    <!-- Portion items -->
    <div class="portions-grid">
    <div class="portion-item" v-for="portion in food.portions" :key="portion.id">
      <div class="portion-item__row">
        <div class="grid-cell">
          <input
            v-model="portion.name"
            type="text"
            :placeholder="t('portion')"
          />
        </div>
        <div class="grid-cell">
          <input
            v-model.number="portion.weight"
            type="number"
            inputmode="decimal"
            min="0"
            placeholder="0"
            class="input-weight"
          />
        </div>
        <div class="grid-cell">
          <button
            class="btn btn--icon"
            tabindex="-1"
            @click="deletePortion(food.id, portion.id)"
          >✕</button>
        </div>
      </div>
      <div class="portion-item__ingredients" v-if="visibleIngredients.length > 0 && portion.weight !== null && portion.weight !== 0">
        <div
          class="portion-ingredient-row"
          v-for="ingredient in visibleIngredients"
          :key="ingredient.id"
        >
          <span class="portion-ingredient-name">{{ ingredient.name }}</span>
          <span
            class="result-value"
            :class="{ 'result-value--null': ingredientInPortion(ingredient, portion, food) === null }"
          >{{ fmt(ingredientInPortion(ingredient, portion, food)) }}</span>
        </div>
      </div>
    </div>
    </div>
    <!-- Total -->
    <div class="portions-total">
      <span>{{ t('total') }}</span>
      <span>{{ totalPortionWeight(food) || '—' }}</span>
    </div>
  </div>
</template>
