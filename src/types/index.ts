export interface Ingredient {
  id: string
  name: string
  weight: number | null
}

export interface Portion {
  id: string
  name: string
  weight: number | null
}

export interface Food {
  id: string
  name: string
  ingredients: Ingredient[]
  portions: Portion[]
}
