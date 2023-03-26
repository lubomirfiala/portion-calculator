<template>
  <div class="grid">
    <div
        v-for="(portion, key) in results"
        :key="'portion-' + key"
        class="result"
    >
      <h2>Portion #{{ key + 1 }}</h2>
      <div
          v-for="(food, key) in portion"
          :key="'row-' + key"
          class="info-grid"
      >
        <div>{{ food.food }}</div>
        <div>{{ food.weight }} g</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fill,minmax(20rem,1fr));
  .result {
    .info-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr auto;
    }
  }
}
</style>
