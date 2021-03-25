<template>
  <table @click.capture="checkHalted">
    <tr
      v-for="(gameBoardRows, rowIndex) in $store.state.gameBoard"
      :key="rowIndex"
      :gameBoardRows="gameBoardRows"
    >
      <td
        v-for="(cellData, colIndex) in gameBoardRows"
        :key="colIndex"
        :cellData="cellData"
        :style="applyCellBg(cellData)"
        @click="onLeftClickCell({ rowIndex, colIndex, cellData })"
        @contextmenu.prevent="onRightClickCell({ rowIndex, colIndex, cellData })"
      >
        {{ cellDataToText(rowIndex, colIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex';

import {
  statusCell,
  FLAG_CELL,
  QUESTION_CELL,
  NOMALIZE_CELL,
  OPEN_CELL_NORMAL,
  OPEN_CELL_MINE,
  START_GAME,
} from './store';

export default {
  computed: {
    ...mapState(['isHalted']),
    cellDataToText() {
      return (rowIndex, colIndex) => {
        switch (this.$store.state.gameBoard[rowIndex][colIndex]) {
          case statusCell.NORMAL:
            return '';
          case statusCell.NOMARL_FLAG:
          case statusCell.MINE_FLAG:
            return '!';
          case statusCell.NOMARL_QUESTION:
          case statusCell.MINE_QUESTION:
            return '?';
          case statusCell.MINE:
            return 'X';
          case statusCell.MINE_OPEN:
            return '땡';
          default:
            return this.$store.state.gameBoard[rowIndex][colIndex] || '';
        }
      };
    },
    applyCellBg() {
      return cellData => {
        switch (cellData) {
          case statusCell.NORMAL:
          case statusCell.MINE:
            return 'background: #444';
          case statusCell.NORMAL_OPEN:
            return 'background: white';
          case statusCell.NOMARL_QUESTION:
          case statusCell.MINE_QUESTION:
            return 'background: yellow';
          case statusCell.NOMARL_FLAG:
          case statusCell.MINE_FLAG:
            return 'background: red';
          default:
            return 'background: #444';
        }
      };
    },
  },
  methods: {
    checkHalted(event) {
      // 게임이 중단될 경우 클릭 이벤트 전파 중단
      if (this.isHalted === true) {
        event.stopPropagation();
      }
    },
    onLeftClickCell(cellInfo) {
      // 게임이 중단된 상태라면 액션 불가
      if (this.isHalted === true) {
        return false;
      }

      const { cellData } = cellInfo;

      switch (cellData) {
        case statusCell.NORMAL:
        case statusCell.NOMARL_QUESTION:
        case statusCell.NOMARL_FLAG:
          return this.$store.commit(OPEN_CELL_NORMAL, cellInfo);
        case statusCell.MINE:
        case statusCell.MINE_QUESTION:
        case statusCell.MINE_FLAG:
          this.$store.commit(OPEN_CELL_MINE, cellInfo);
          return alert('땡! 게임 시작을 눌러주세요');
        default:
          return false;
      }
    },
    onRightClickCell(cellInfo) {
      // 게임이 중단된 상태라면 액션 불가
      if (this.isHalted === true) {
        return false;
      }

      const { cellData } = cellInfo;

      switch (cellData) {
        case statusCell.NORMAL:
        case statusCell.MINE:
          return this.$store.commit(FLAG_CELL, cellInfo);
        case statusCell.NOMARL_FLAG:
        case statusCell.MINE_FLAG:
          return this.$store.commit(QUESTION_CELL, cellInfo);
        case statusCell.NOMARL_QUESTION:
        case statusCell.MINE_QUESTION:
          return this.$store.commit(NOMALIZE_CELL, cellInfo);
        default:
          return false;
      }
    },
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
  background: #444;
}
</style>
