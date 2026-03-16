<script setup lang="ts">
import { toRefs, computed, type PropType } from 'vue';
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
const { addPortion, deletePortion, ingredientInPortion } = store;

const visibleIngredients = computed(() =>
  food.value.ingredients.filter(i => i.name.trim() !== '' || (i.weight !== null && i.weight !== 0)),
);

function fmt(value: number | null): string {
  if (value === null) return '—';
  const n = Math.round(value * 10) / 10;
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}
</script>

<template>
  <div class="portions-section">
    <div class="portions-grid">
      <div
        v-for="portion in food.portions"
        :key="portion.id"
        class="portion-card"
      >
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
          >
            <span class="mdi mdi-close" />
          </AppButton>
        </div>
        <div
          v-if="visibleIngredients.length > 0 && portion.weight !== null && portion.weight !== 0"
          class="portion-card__ingredients"
        >
          <div
            v-for="ingredient in visibleIngredients"
            :key="ingredient.id"
            class="portion-ingredient-row"
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
      <button
        class="add-portion-btn"
        @click="addPortion(food)"
      >
        {{ t('addPortion') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.portions-section {
  padding-top: $gap * .5;
  border-top: 1px solid $color-border-light;

  .portions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $gap * .5;
    margin-bottom: $gap;

    .portion-card {
      background: $color-white;
      border-radius: $radius;
      overflow: hidden;

      &__header {
        display: grid;
        grid-template-columns: 1fr 2.75rem auto 2rem;
        align-items: center;
        gap: 1px;
        padding: 0.1875rem 0.3125rem;
      }

      &__delete {
        visibility: visible;
        color: $color-icon-dim;
        font-size: $font-size-sm;
      }

      &__unit {
        font-size: $font-size-sm;
        color: $color-muted;
      }

      &__ingredients {
        padding: 0.125rem $gap 0.375rem;

        .portion-ingredient-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 1px 0;
          gap: 0.25rem;
          min-width: 0;

          .portion-ingredient-name {
            font-size: $font-size-xs;
            color: $color-text-muted;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-width: 0;
            flex: 1;
          }

          .portion-ingredient-value {
            font-size: $font-size-xs;
            font-variant-numeric: tabular-nums;
            color: $color-text-subtle;
            white-space: nowrap;
            flex-shrink: 0;

            &--null {
              color: $color-border-hover;
            }
          }
        }
      }
    }
  }

  .add-portion-row {
    display: flex;
    justify-content: center;

    .add-portion-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font: inherit;
      font-size: $font-size-sm;
      color: $color-muted;
      padding: 0.25rem $gap;
      border-radius: $radius;

      &:hover {
        color: $color-secondary;
        background: $color-surface-hover;
      }
    }
  }
}
</style>
