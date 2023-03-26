<template>
  <div>
    <div class="info-grid mb-2">
      <div>food</div>
      <div>weight</div>
    </div>
    <div
        v-for="(row, key) in inputs"
        :key="key"
        class="info-grid"
    >
      <div>
        <v-text-field
            v-model="row.food"
            variant="outlined"
            density="compact"
            @change="onChange"
            @input="onChange"
        />
      </div>
      <div>
        <v-text-field
            v-model.number="row.weight"
            variant="outlined"
            density="compact"
            type="number"
            @change="onChange"
            @input="onChange"
        />
      </div>
    </div>
    <div class="info-grid mb-2">
      <div>input weight</div>
      <div>{{ inputWeight }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputs: {
      type: Array,
      required: true,
    },
    inputWeight: {
      type: Number,
      required: true,
    },
  },
  computed: {
    freeRows() {
      for (const row of this.inputs) {
        if (row.food === null && row.weight === null) {
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
        this.inputs.push({ food: null, weight: null });
      }
    }
  },
  methods: {
    onChange() {
      this.$emit('change');
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
