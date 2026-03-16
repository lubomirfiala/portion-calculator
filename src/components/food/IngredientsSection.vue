<script setup lang="ts">
import { toRefs, watchEffect, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFoodsStore } from '@/stores/foods';
import type { Food } from '@/types';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';

const props = defineProps({
  food: { type: Object as PropType<Food>,
    required: true },
});
const { food } = toRefs(props);
const { t } = useI18n();
const store = useFoodsStore();
const { addIngredient, deleteIngredient, totalIngredientWeight } = store;

watchEffect(() => {
  const allUsed = food.value.ingredients.every(
    i => i.name.trim() !== '' || (i.weight !== null && i.weight !== 0),
  );
  if (allUsed) addIngredient(food.value);
});
</script>

<template>
  <div class="ingredients-section">
    <div
      v-for="ingredient in food.ingredients"
      :key="ingredient.id"
      class="ingredient-row"
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
      >
        <span class="mdi mdi-close" />
      </AppButton>
    </div>
    <div
      v-if="totalIngredientWeight(food) > 0"
      class="ingredients-total"
    >
      <span class="ingredients-total__label">{{ t('total') }}</span>
      <span class="ingredients-total__value">{{ totalIngredientWeight(food) }} g</span>
    </div>
  </div>
</template>

<style lang="scss">
.ingredients-section {
  background: #ffffff;
  padding: 8px 12px 10px;
  border-radius: 0 0 10px 10px;

  .ingredient-row {
    display: grid;
    grid-template-columns: 1fr 60px auto 2rem;
    align-items: center;
    gap: 2px;
    min-width: 0;

    &__unit {
      font-size: 13px;
      color: #a1a1aa;
    }

    .app-btn {
      visibility: visible;
    }
  }

  .ingredients-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    padding-top: 6px;
    border-top: 1px solid #e8e8ea;

    &__label {
      font-size: 10px;
      color: #a1a1aa;
      letter-spacing: 0.2px;
    }

    &__value {
      font-size: 13px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: #18181b;
    }
  }
}
</style>
