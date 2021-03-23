<template>
  <td-component
    :v-for="(colsIndex, idx) in colsIndexList"
    :rowIndex="rowIndex"
    :colsIndex="colsIndex"
    :key="idx"
  ></td-component>
</template>

<script>
import TdComponent from './TdComponent.vue';

export default {
  props: {
    rowIndex: Number,
    squareCount: Number,
  },
  components: {
    TdComponent,
  },
  data() {
    return {
      colsIndexList: [],
    };
  },
  methods: {
    // createTdComponent(rowNumber, rowCount) {
    //   this.rowNumber = rowNumber;
    //   this.rowCount = rowCount;
    // },
  },
  beforeCreate() {
    console.log('beforeCreate', this.colsIndexList);
  },
  created() {
    console.log('created', this.colsIndexList);
    // this.colsIndexList = new Array(this.squareCount).fill(0).map(v => v + 1);
  },
  mounted() {
    console.log('mounted', this.squareCount);
  },
};
</script>

<style></style>
