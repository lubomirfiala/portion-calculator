<script setup lang="ts">
import { computed, toRefs, type PropType } from 'vue';
import type { Food } from '@/types';
import { useFoodsStore } from '@/stores/foods';
import FoodCardHeader from '@/components/food/FoodCardHeader.vue';
import IngredientsSection from '@/components/food/IngredientsSection.vue';
import PortionsSection from '@/components/food/PortionsSection.vue';

const props = defineProps({
  food: { type: Object as PropType<Food>,
    required: true },
});
const { food } = toRefs(props);

const store = useFoodsStore();
const { isCollapsed, toggleCollapse } = store;

const collapsed = computed(() => isCollapsed(food.value));
</script>

<template>
  <div class="food-card">
    <FoodCardHeader
      :food="food"
      :collapsed="collapsed"
      @toggle-collapse="toggleCollapse(food)"
    />
    <div
      v-if="!collapsed"
      class="food-card__body"
    >
      <IngredientsSection :food="food" />
      <PortionsSection :food="food" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/general/variables' as *;

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.food-card {
  border-radius: $radius;
  overflow: visible;
  animation: slide-down 0.25s ease;

  &__body {
    border-top: 1px solid $color-border-light;
    display: flex;
    flex-direction: column;
  }
}
</style>
