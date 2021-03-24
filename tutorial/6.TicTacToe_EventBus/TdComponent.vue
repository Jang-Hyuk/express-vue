<template>
  <td @click="onClickTd" :id="'td_' + rowIndex + '_' + cellIndex">
    {{ cellData }}
  </td>
</template>

<script>
import EventBus from './EventBus';

export default {
  props: {
    rowIndex: Number,
    cellData: String,
    cellIndex: Number,
  },
  data() {
    return {};
  },
  methods: {
    onClickTd() {
      console.log('onClickTd');
      return EventBus.$emit('selectTd', this.rowIndex, this.cellIndex);
      // 열로 같은 데이터인지
    },
  },
  created() {},
  mounted() {},
};
</script>

<style></style>
