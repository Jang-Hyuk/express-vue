<template>
  <tr-component
    :v-for="(rowData, index) in tableData"
    :row-data="rowData"
    :row-index="index"
    :key="index"
  ></tr-component>
</template>

<script>
import TrComponent from './TrComponent.vue';

export default {
  props: {
    tableData: Array,
  },
  components: {
    TrComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
