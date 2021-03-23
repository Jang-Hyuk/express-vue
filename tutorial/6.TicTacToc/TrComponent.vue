<template>
  <!-- <td-component
    :v-for="(cellData, index) in rowData"
    :cell-data="cellData"
    :cell-index="index"
    :row-index="rowIndex"
  ></td-component> -->
  <div></div>
</template>

<script>
// import TdComponent from './TdComponent.vue';

export default {
  props: {
    rowData: Array,
    rowIndex: Number,
  },
  // components: {
  //   TdComponent,
  // },
  data() {
    return {};
  },
  methods: {
    // createTdComponent(rowNumber, rowCount) {
    //   this.rowNumber = rowNumber;
    //   this.rowCount = rowCount;
    // },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
    // this.colsIndexList = new Array(this.squareCount).fill(0).map(v => v + 1);
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

<style></style>
