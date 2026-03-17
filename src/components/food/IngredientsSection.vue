<script setup lang="ts">
import { toRefs, type PropType, watch } from 'vue';
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

watch(food, () => {
  const allUsed = food.value.ingredients.every(
    i => i.name.trim() !== '' && (i.weight !== null && i.weight !== 0),
  );
  if (allUsed) addIngredient(food.value);
}, { deep: true });
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
@use '@/assets/styles/general/variables' as *;

.ingredients-section {
  background: $color-white;
  padding: $gap $card-padding-x;
  border-radius: 0 0 $radius $radius;

  .ingredient-row {
    display: grid;
    grid-template-columns: 1fr 3.75rem auto 2rem;
    align-items: center;
    gap: 0.125rem;
    min-width: 0;

    &__unit {
      font-size: $font-size-sm;
      color: $color-muted;
    }

    .app-btn {
      visibility: visible;
    }
  }

  .ingredients-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
    padding-top: 0.375rem;
    border-top: 1px solid $color-border-light;

    &__label {
      font-size: $font-size-2xs;
      color: $color-muted;
      letter-spacing: 0.2px;
    }

    &__value {
      font-size: $font-size-sm;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: $color-text;
    }
  }
}
</style>
