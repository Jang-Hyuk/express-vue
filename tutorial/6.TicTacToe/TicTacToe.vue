<template>
  <div>
    <form action="" @submit.prevent="onClickGameSizeChange">
      <input
        type="number"
        v-model="gameSize"
        placeholder="생성하고자 하는 사각형 갯수를 입력하세요"
      />
      <button type="submit">변경</button>
      <div>{{ turn }} 님의 턴입니다</div>
      <table-component
        v-on:update="onClickTdCellChoice"
        :table-data="tableData"
      ></table-component>
    </form>
  </div>
</template>

<script>
import TableComponent from './TableComponent.vue';

const DEFAULT_BOARD_SIZE = 3;

const errorFlag = {
  RANGE_ERROR: 'RANGE_ERROR',
  TYPE_ERRPR: 'TYPE_ERROR',
};

export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      gameSize: DEFAULT_BOARD_SIZE,
      tableData: this.onClickGameSizeChange(),
      turn: 'O',
      winner: null,
    };
  },
  methods: {
    onClickGameSizeChange() {
      console.log('onClickGameSizeChange', this.gameSize);

      const gameSize = Number(this.gameSize) || DEFAULT_BOARD_SIZE;
      // 유효값 체크
      if (gameSize % 2 === 0) {
        return errorFlag.TYPE_ERRPR;
      }
      if (gameSize < 3 || gameSize > 7) {
        return errorFlag.RANGE_ERROR;
      }
      // 보드 크기 변경
      this.tableData = Array.from(Array(gameSize), () =>
        Array(gameSize).fill(''),
      );

      return this.tableData;
    },
    // TdComponent Click Event
    onClickTdCellChoice() {
      return this.turn;
    },
  },
  created() {
    //
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
