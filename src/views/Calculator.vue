<template>
  <div>
    <Inputs
        :inputs="inputs"
        :input-weight="inputWeight"
    />
    <hr>
    <Portions
        :portions="portions"
        :portions-weight="portionsWeight"
    />
    <hr>
    <Results
     :results="results"
    />
  </div>
</template>

<script>
import Inputs from '@/components/calculator/Inputs.vue';
import Portions from '@/components/calculator/Portions.vue';
import Results from '@/components/calculator/Results.vue';

export default {
  components: {
    Results,
    Portions,
    Inputs,
  },
  data() {
    return {
      inputs: [],
      portions: [],
    };
  },
  computed: {
    results() {
      const data = [];
      for(const portion of this.portions) {
        if(portion.weight !== null) {
          const newFoods = [];
          const ratio = portion.weight / this.portionsWeight;
          for(const food of this.inputs) {
            if (food.weight !== null) {
              const newFood = {
                food: food.food,
                weight: Math.round(food.weight * ratio * 100) / 100 ,
              };
              newFoods.push(newFood);
            }
          }
          data.push(newFoods);
        }
      }
      return data;
    },
    ioRatio() {
      return this.inputWeight / this.portionsWeight;
    },
    inputWeight() {
      let weight = 0;
      for (const row of this.inputs) {
        if(row.weight) {
          weight += parseFloat(row.weight);
        }
      }
      return weight;
    },
    portionsWeight() {
      let weight = 0;
      for (const row of this.portions) {
        if(row.weight) {
          weight += parseFloat(row.weight);
        }
      }
      return weight;
    },
  },
  created() {
    this.resetInputs();
    this.resetPortions();
  },
  methods: {
    resetPortions() {
      this.portions = [
        {
          weight: null,
        }
      ];
    },
    resetInputs() {
      this.inputs = [
        {
          food: null,
          weight: null,
        },
        {
          food: null,
          weight: null,
        },
        {
          food: null,
          weight: null,
        },
      ];
    },
  },
};
</script>
