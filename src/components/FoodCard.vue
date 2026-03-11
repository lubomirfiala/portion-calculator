<script setup lang="ts">
import { toRefs, type PropType } from 'vue'
import type { Food } from '@/types'
import FoodCardHeader from '@/components/FoodCardHeader.vue'
import IngredientsSection from '@/components/IngredientsSection.vue'
import PortionsSection from '@/components/PortionsSection.vue'

const props = defineProps({
  food: { type: Object as PropType<Food>, required: true }
})
const { food } = toRefs(props)
</script>

<template>
  <div class="food-card">
    <FoodCardHeader :food="food" />
    <div class="food-card__body">
      <IngredientsSection :food="food" />
      <div class="food-card__divider" />
      <PortionsSection :food="food" />
    </div>
  </div>
</template>
