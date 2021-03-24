<template>
  <div>
    <tr-component
      v-for="(rowData, index) in tableData"
      :key="index"
      :row-data="rowData"
      :row-index="index"
    ></tr-component>
  </div>
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
  mounted() {},
};
</script>

<style></style>
