<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useFoodsStore } from '@/stores/foods';
import FoodCard from '@/components/food/FoodCard.vue';
import EmptyState from '@/components/app/EmptyState.vue';
import AppHeader from '@/components/app/AppHeader.vue';
import MobileHeader from '@/components/app/MobileHeader.vue';

const { t } = useI18n();
const store = useFoodsStore();
const { foods, openFoods, closedFoods } = storeToRefs(store);
</script>

<template>
  <AppHeader />
  <MobileHeader />

  <button
    class="fab"
    @click="store.addFood()"
  >
    <span class="mdi mdi-plus" />
  </button>

  <EmptyState v-if="foods.length === 0" />

  <template v-else>
    <div class="foods-list foods-list--open">
      <FoodCard
        v-for="food in openFoods"
        :key="food.id"
        :food="food"
      />
    </div>
    <div
      v-if="closedFoods.length > 0"
      class="foods-section-header"
    >
      {{ t('collapsed') }}
    </div>
    <div class="foods-list">
      <FoodCard
        v-for="food in closedFoods"
        :key="food.id"
        :food="food"
      />
    </div>
  </template>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

.fab {
  display: none;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: calc(env(-apple-system-corner-radius, 3.5rem) - 1.75rem);
    right: calc(env(-apple-system-corner-radius, 3.5rem) - 1.75rem);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: none;
    background: $color-brand;
    color: $color-white;
    font-size: 1.75rem;
    cursor: pointer;
    z-index: 20;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);

    &:hover {
      background: darken($color-brand, 8%);
    }
  }
}

.foods-section-header {
  font-size: 0.75rem;
  font-weight: 500;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1.875rem 0.25rem 1rem;
}
</style>
