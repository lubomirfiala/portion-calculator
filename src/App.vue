<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import FoodCard from '@/components/food/FoodCard.vue'
import EmptyState from '@/components/app/EmptyState.vue'
import TextIconButton from '@/components/ui/TextIconButton.vue'
import AppLogo from '@/components/ui/AppLogo.vue'

const { t } = useI18n()
const store = useFoodsStore()
const { foods, openFoods, closedFoods } = storeToRefs(store)
</script>

<template>
  <div class="app-header">
    <AppLogo />
    <TextIconButton :label="t('addFood')" size="md" @click="store.addFood()" />
  </div>

  <EmptyState v-if="foods.length === 0" />

  <template v-else>
    <div class="foods-list">
      <FoodCard v-for="food in openFoods" :key="food.id" :food="food" />
    </div>
    <div v-if="closedFoods.length > 0" class="foods-section-header">{{ t('collapsed') }}</div>
    <div class="foods-list">
      <FoodCard v-for="food in closedFoods" :key="food.id" :food="food" />
    </div>
  </template>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 4px;
}

.foods-section-header {
  font-size: 12px;
  font-weight: 500;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 4px 0;
}
</style>
