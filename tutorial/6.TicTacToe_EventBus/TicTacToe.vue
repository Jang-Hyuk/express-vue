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
      <table-component :table-data="tableData"></table-component>
    </form>
  </div>
</template>

<script>
import TableComponent from './TableComponent.vue';

import EventBus from './EventBus';

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

    onClickTd(rowIndex, cellIndex) {
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      let win = false;

      // 행으로 같은 데이터인지
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }

      if (win) {
        // 이긴 경우: 3줄 달성
        this.winner = this.turn;
        this.turn = 'O';
        this.tableData = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      } else {
        // 무승부
        let all = true; // all이 true면 무승부라는 뜻
        this.tableData.forEach(row => {
          // 무승부 검사
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          // 무승부
          this.winner = '';
          this.turn = 'O';
          this.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ];
        } else {
          this.turn = this.turn === 'O' ? 'X' : 'O';
        }
      }
    },
  },
  created() {
    console.log('TicTacToe created');

    EventBus.$on('selectTd', this.onClickTd);

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
