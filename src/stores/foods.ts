import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Food, Ingredient, Portion } from '@/types'

const uid = () => crypto.randomUUID()

export const useFoodsStore = defineStore('foods', () => {
  const foods = ref<Food[]>([])

  function addFood() {
    foods.value.unshift({
      id: uid(),
      name: '',
      ingredients: [{ id: uid(), name: '', weight: null }],
      portions: [{ id: uid(), name: '', weight: null }]
    })
  }

  function deleteFood(foodId: string) {
    const idx = foods.value.findIndex(f => f.id === foodId)
    if (idx !== -1) foods.value.splice(idx, 1)
  }

  function addIngredient(foodId: string) {
    const food = foods.value.find(f => f.id === foodId)
    if (food) food.ingredients.push({ id: uid(), name: '', weight: null })
  }

  function deleteIngredient(foodId: string, ingredientId: string) {
    const food = foods.value.find(f => f.id === foodId)
    if (!food) return
    const idx = food.ingredients.findIndex(i => i.id === ingredientId)
    if (idx !== -1) food.ingredients.splice(idx, 1)
  }

  function addPortion(foodId: string) {
    const food = foods.value.find(f => f.id === foodId)
    if (food) food.portions.push({ id: uid(), name: '', weight: null })
  }

  function deletePortion(foodId: string, portionId: string) {
    const food = foods.value.find(f => f.id === foodId)
    if (!food) return
    const idx = food.portions.findIndex(p => p.id === portionId)
    if (idx !== -1) food.portions.splice(idx, 1)
  }

  function totalIngredientWeight(food: Food): number {
    return food.ingredients.reduce((sum, i) => sum + (i.weight ?? 0), 0)
  }

  function totalPortionWeight(food: Food): number {
    return food.portions.reduce((sum, p) => sum + (p.weight ?? 0), 0)
  }

  function ingredientInPortion(ingredient: Ingredient, portion: Portion, food: Food): number | null {
    const total = totalPortionWeight(food)
    if (!total || !portion.weight || !ingredient.weight) return null
    return ingredient.weight * (portion.weight / total)
  }

  return {
    foods,
    addFood,
    deleteFood,
    addIngredient,
    deleteIngredient,
    addPortion,
    deletePortion,
    totalIngredientWeight,
    totalPortionWeight,
    ingredientInPortion
  }
}, {
  persist: true
})
