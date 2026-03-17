import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Food, Ingredient, Portion } from '@/types';
import { ulid } from 'ulidx';

const uid = (): string => ulid();

export const useFoodsStore = defineStore('foods', () => {
  const openFoods = ref<Food[]>([]);
  const closedFoods = ref<Food[]>([]);

  const foods = computed<Food[]>(() => [
    ...openFoods.value,
    ...closedFoods.value,
  ]);

  function addFood(): void {
    openFoods.value.unshift({
      id: uid(),
      name: '',
      ingredients: [
        { id: uid(),
          name: '',
          weight: null },
      ],
      portions: [
        { id: uid(),
          name: '',
          weight: null },
        { id: uid(),
          name: '',
          weight: null },
      ],
    });
  }

  function duplicateFood(food: Food): void {
    openFoods.value.unshift({
      id: uid(),
      name: food.name,
      ingredients: food.ingredients.map(i => ({ ...i,
        id: uid() })),
      portions: food.portions.map(p => ({ ...p,
        id: uid() })),
    });
  }

  function deleteFood(food: Food): void {
    openFoods.value = openFoods.value.filter(f => f.id !== food.id);
    closedFoods.value = closedFoods.value.filter(f => f.id !== food.id);
  }

  function toggleCollapse(food: Food): void {
    const inClosed = closedFoods.value.findIndex(f => f.id === food.id);
    if (inClosed !== -1) {
      const [ f ] = closedFoods.value.splice(inClosed, 1);
      openFoods.value.push(f);
    } else {
      const inOpen = openFoods.value.findIndex(f => f.id === food.id);
      if (inOpen !== -1) {
        const [ f ] = openFoods.value.splice(inOpen, 1);
        closedFoods.value.unshift(f);
      }
    }
  }

  function isCollapsed(food: Food): boolean {
    return closedFoods.value.some(f => f.id === food.id);
  }

  function addIngredient(food: Food): void {
    food.ingredients.push({ id: uid(),
      name: '',
      weight: null });
  }

  function deleteIngredient(food: Food, ingredient: Ingredient): void {
    const idx = food.ingredients.findIndex(i => i.id === ingredient.id);
    if (idx !== -1) food.ingredients.splice(idx, 1);
  }

  function addPortion(food: Food): void {
    food.portions.push({ id: uid(),
      name: '',
      weight: null });
  }

  function deletePortion(food: Food, portion: Portion): void {
    const idx = food.portions.findIndex(p => p.id === portion.id);
    if (idx !== -1) food.portions.splice(idx, 1);
  }

  function totalIngredientWeight(food: Food): number {
    return food.ingredients.reduce((sum, i) => sum + (i.weight ?? 0), 0);
  }

  function totalPortionWeight(food: Food): number {
    return food.portions.reduce((sum, p) => sum + (p.weight ?? 0), 0);
  }

  function ingredientInPortion(ingredient: Ingredient, portion: Portion, food: Food): number | null {
    const total = totalPortionWeight(food);
    if (!total || !portion.weight || !ingredient.weight) return null;
    return ingredient.weight * (portion.weight / total);
  }

  return {
    foods,
    openFoods,
    closedFoods,
    addFood,
    duplicateFood,
    deleteFood,
    toggleCollapse,
    isCollapsed,
    addIngredient,
    deleteIngredient,
    addPortion,
    deletePortion,
    totalIngredientWeight,
    totalPortionWeight,
    ingredientInPortion,
  };
}, {
  persist: true,
});
