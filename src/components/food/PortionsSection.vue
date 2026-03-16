<script setup lang="ts">
import { toRefs, computed, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import type { Food } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import TextIconButton from '@/components/ui/TextIconButton.vue'

const props = defineProps({
  food: { type: Object as PropType<Food>, required: true }
})
const { food } = toRefs(props)
const { t } = useI18n()
const store = useFoodsStore()
const { addPortion, deletePortion, ingredientInPortion } = store

const visibleIngredients = computed(() =>
  food.value.ingredients.filter(i => i.name.trim() !== '' || (i.weight !== null && i.weight !== 0))
)

function fmt(value: number | null): string {
  if (value === null) return '—'
  const n = Math.round(value * 10) / 10
  return n % 1 === 0 ? String(n) : n.toFixed(1)
}
</script>

<template>
  <div class="portions-section">
    <div class="portions-grid">
      <div class="portion-card" v-for="portion in food.portions" :key="portion.id">
        <div class="portion-card__header">
          <AppInput
            v-model="portion.name"
            :placeholder="t('portion')"
          />
          <AppInput
            v-model="portion.weight"
            type="number"
            inputmode="decimal"
            min="0"
            placeholder="0"
          />
          <span class="portion-card__unit">g</span>
          <AppButton
            size="sm"
            variant="icon"
            tabindex="-1"
            class="portion-card__delete"
            @click="deletePortion(food, portion)"
          ><span class="mdi mdi-close" /></AppButton>
        </div>
        <div
          class="portion-card__ingredients"
          v-if="visibleIngredients.length > 0 && portion.weight !== null && portion.weight !== 0"
        >
          <div
            class="portion-ingredient-row"
            v-for="ingredient in visibleIngredients"
            :key="ingredient.id"
          >
            <span class="portion-ingredient-name">{{ ingredient.name }}</span>
            <span
              class="portion-ingredient-value"
              :class="{ 'portion-ingredient-value--null': ingredientInPortion(ingredient, portion, food) === null }"
            >{{ fmt(ingredientInPortion(ingredient, portion, food)) }} g</span>
          </div>
        </div>
      </div>
    </div>
    <div class="add-portion-row">
      <TextIconButton :label="t('addPortion')" size="sm" @click="addPortion(food)" />
    </div>
  </div>
</template>

<style lang="scss">
.portions-section {
  padding-top: 5px;
  border-top: 1px solid #e8e8ea;

  .portions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    margin-bottom: 8px;

    .portion-card {
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }

  }
}



.portion-card__header {
  display: grid;
  grid-template-columns: 1fr 36px 14px 16px;
  align-items: center;
  gap: 1px;
  padding: 3px 5px;
}

.portion-card__delete {
  visibility: visible;
  color: #71717a;
  font-size: 13px;
}

.portion-card__unit {
  font-size: 13px;
  color: #a1a1aa;
}

.portion-card__ingredients {
  padding: 2px 8px 6px;
}

.portion-ingredient-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1px 0;
  gap: 4px;
  min-width: 0;
}

.portion-ingredient-name {
  font-size: 11px;
  color: #8a8a8e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}

.portion-ingredient-value {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: #3f3f46;
  white-space: nowrap;
  flex-shrink: 0;

  &--null {
    color: #d4d4d8;
  }
}

.add-portion-row {
  display: flex;
  justify-content: center;
}
</style>
