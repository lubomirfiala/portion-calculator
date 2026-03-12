<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useFoodsStore } from '@/stores/foods'
import FoodCard from '@/components/FoodCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const { t } = useI18n()
const store = useFoodsStore()
const { foods } = storeToRefs(store)
</script>

<template>
  <div class="app-header">
    <h1>Portions</h1>
    <button class="btn btn--primary" @click="store.addFood()">{{ t('addFood') }}</button>
  </div>

  <EmptyState v-if="foods.length === 0" />

  <div v-else class="foods-list">
    <FoodCard v-for="food in foods" :key="food.id" :food="food" />
  </div>
</template>
