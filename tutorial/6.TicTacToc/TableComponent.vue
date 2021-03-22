<template>
  <tr-component></tr-component>
</template>

<script>
import TrComponent from './TrComponent.vue';

export default {
  components: {
    TrComponent,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
