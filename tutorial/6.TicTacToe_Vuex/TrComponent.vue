<template>
  <div>
    <td-component
      v-for="(cellData, index) in rowData"
      :row-index="rowIndex"
      :cell-data="cellData"
      :cell-index="index"
      :key="index"
    ></td-component>
  </div>
</template>

<script>
import TdComponent from './TdComponent.vue';

export default {
  props: {
    rowData: Array,
    rowIndex: Number,
  },
  components: {
    TdComponent,
  },
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {},
  created() {},
  mounted() {},
};
</script>

<style></style>
