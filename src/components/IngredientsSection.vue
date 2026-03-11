<script setup lang="ts">
import { toRefs, watchEffect, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import type { Food } from '@/types'

const props = defineProps({
  food: { type: Object as PropType<Food>, required: true }
})
const { food } = toRefs(props)
const { t } = useI18n()
const store = useFoodsStore()
const { addIngredient, deleteIngredient, totalIngredientWeight } = store

watchEffect(() => {
  const allUsed = food.value.ingredients.every(
    i => i.name.trim() !== '' || (i.weight !== null && i.weight !== 0)
  )
  if (allUsed) addIngredient(food.value.id)
})
</script>

<template>
  <div class="food-card__section food-card__section--ingredients">
    <div class="food-card__grid" style="grid-template-columns: 1fr 72px 24px">
      <!-- Header -->
      <div class="grid-row">
        <div class="grid-header">{{ t('ingredient') }}</div>
        <div class="grid-header" style="text-align: right">g</div>
        <div></div>
      </div>
      <!-- Ingredient rows -->
      <div class="grid-row" v-for="ingredient in food.ingredients" :key="ingredient.id">
        <div class="grid-cell">
          <input
            v-model="ingredient.name"
            type="text"
            :placeholder="t('ingredient')"
          />
        </div>
        <div class="grid-cell">
          <input
            v-model.number="ingredient.weight"
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
            @click="deleteIngredient(food.id, ingredient.id)"
          >✕</button>
        </div>
      </div>
      <!-- Total -->
      <div class="grid-total">
        <div class="grid-cell">{{ t('total') }}</div>
        <div class="grid-cell" style="text-align: right">{{ totalIngredientWeight(food) || '—' }}</div>
        <div></div>
      </div>
    </div>
  </div>
</template>
