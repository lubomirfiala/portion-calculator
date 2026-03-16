<script setup lang="ts">
import { toRefs, watchEffect, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import type { Food } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'

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
  if (allUsed) addIngredient(food.value)
})
</script>

<template>
  <div class="ingredients-section">
    <div
      class="ingredient-row"
      v-for="ingredient in food.ingredients"
      :key="ingredient.id"
    >
      <AppInput
        v-model="ingredient.name"
        :placeholder="t('ingredient')"
      />
      <AppInput
        v-model="ingredient.weight"
        type="number"
        inputmode="decimal"
        min="0"
        placeholder="weight"
      />
      <span class="ingredient-row__unit">g</span>
      <AppButton
        size="sm"
        variant="icon"
        tabindex="-1"
        @click="deleteIngredient(food, ingredient)"
      ><span class="mdi mdi-close" /></AppButton>
    </div>
    <div class="ingredients-total" v-if="totalIngredientWeight(food) > 0">
      <span class="ingredients-total__label">{{ t('total') }}</span>
      <span class="ingredients-total__value">{{ totalIngredientWeight(food) }} g</span>
    </div>
  </div>
</template>

<style lang="scss">
.ingredients-section {
  background: #ffffff;
  padding: 8px 12px 10px;
}

.ingredient-row {
  display: grid;
  grid-template-columns: 1fr 56px 18px 20px;
  align-items: center;
  gap: 2px;
  min-width: 0;

  .app-btn {
    visibility: hidden;
  }

  &:hover .app-btn {
    visibility: visible;
  }
}

.ingredient-row__unit {
  font-size: 13px;
  color: #a1a1aa;
}

.ingredients-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 4px;
  padding-top: 6px;
  border-top: 1px solid #e8e8ea;
}

.ingredients-total__label {
  font-size: 10px;
  color: #a1a1aa;
  letter-spacing: 0.2px;
}

.ingredients-total__value {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #18181b;
}
</style>
