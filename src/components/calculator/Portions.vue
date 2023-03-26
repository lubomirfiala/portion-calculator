<template>
  <div>
    <div class="info-grid mb-2">
      <div>portion</div>
      <div>weight</div>
    </div>
    <div
        v-for="(row, key) in portions"
        :key="key"
        class="info-grid"
    >
      <div>
        portion #{{ key + 1 }}
      </div>
      <div>
        <v-text-field
            v-model.number="row.weight"
            variant="outlined"
            density="compact"
            type="number"
        />
      </div>
    </div>
    <div class="info-grid mb-2">
      <div>portions weight</div>
      <div>{{ portionsWeight }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    portions: {
      type: Array,
      required: true,
    },
    portionsWeight: {
      type: Array,
      required: true,
    }
  },
  computed: {
    freeRows() {
      for (const row of this.portions) {
        if (row.weight === null) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    freeRows() {
      if(this.freeRows === false) {
        // eslint-disable-next-line vue/no-mutating-props
        this.portions.push({ weight: null });
      }
    }
  },
};
</script>

<style>
.info-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  width: 100%;
}


</style>
