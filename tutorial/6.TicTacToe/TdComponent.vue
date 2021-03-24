<template>
  <td @click="onClickTd" :id="'td_' + rowIndex + '_' + cellIndex">
    {{ cellData }}
  </td>
</template>

<script>
import _ from 'lodash';

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
      if (this.cellData) return false;

      // Root, 즉 TicTacToc.vue 데이터에 접근 가능
      const rootData = this.$root.$data;

      // Root 보드 데이터 업데이트
      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.turn,
      );

      // console.log(_.zipWith(rootData.tableData, ...arg => _.concat(arg)));

      let win = false;

      const gameStorage = [];

      // 행으로 같은 데이터인지
      if (
        rootData.tableData[this.rowIndex][0] === rootData.turn &&
        rootData.tableData[this.rowIndex][1] === rootData.turn &&
        rootData.tableData[this.rowIndex][2] === rootData.turn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][this.cellIndex] === rootData.turn &&
        rootData.tableData[1][this.cellIndex] === rootData.turn &&
        rootData.tableData[2][this.cellIndex] === rootData.turn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][0] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][2] === rootData.turn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][2] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][0] === rootData.turn
      ) {
        win = true;
      }

      console.log('@@@@@@@', win);

      if (win) {
        // 이긴 경우: 3줄 달성
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      } else {
        // 무승부
        let all = true; // all이 true면 무승부라는 뜻
        rootData.tableData.forEach(row => {
          // 무승부 검사
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          // 무승부
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ];
        } else {
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
      }

      // 열로 같은 데이터인지
    },
  },
  created() {},
  mounted() {},
};
</script>

<style></style>
