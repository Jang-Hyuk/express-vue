import Vue from 'vue';

import Vuex from 'vuex';

import _ from 'lodash';

export const ON_CHANGE_LEVEL = 'ON_CHANGE_LEVEL';
export const START_GAME = 'START_GAME';
export const CLEAR_GAME = 'CLEAR_GAME';
export const FAIL_GAME = 'FAIL_GAME';

// 깃발 꼽기
export const FLAG_CELL = 'FLAG_CELL';
// 퀘스쳔 꼽기
export const QUESTION_CELL = 'QUESTION_CELL';
// 셀 복구
export const NOMALIZE_CELL = 'NOMALIZE_CELL';

export const OPEN_CELL = 'OPEN_CELL';
export const OPEN_CELL_NORMAL = 'OPEN_CELL_NORMAL';
export const OPEN_CELL_MINE = 'OPEN_CELL_MINE';
export const OPEN_CELL_CHAIN = 'OPEN_CELL_CHAIN';
export const RCLICK_CELL = 'RCLICK_CELL';
export const FLAG_CELL_QUESTION = 'FLAG_CELL_QUESTION';
export const FLAG_CELL_MINE = 'FLAG_CELL_MINE';
export const FLAG_CELL_CLEAR = 'FLAG_CELL_CLEAR';
export const INCREMENT_TIME = 'INCREMENT_TIMER';

export const statusCell = {
  NORMAL: 0,
  NOMARL_QUESTION: -1,
  NOMARL_FLAG: -2,

  NORMAL_OPEN: -3,
  MINE_OPEN: -4,

  MINE_QUESTION: -5,
  MINE_FLAG: -6,
  MINE: -7,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameLevel: 2,
    time: 0,
    gameBoard: [],
    mineCount: '',
    flagCount: '',
    isHalted: false,
  },
  getters: {
    gameTimer(state) {},
  },
  mutations: {
    /**
     *  게임 진행 관련
     */
    //
    [CLEAR_GAME](state) {},
    [FAIL_GAME](state) {},
    /**
     * 깃발 꼽기
     */
    [FLAG_CELL](state, { rowIndex, colIndex, cellData }) {
      let nextCellStatus;

      switch (cellData) {
        case statusCell.NORMAL:
          nextCellStatus = statusCell.NOMARL_FLAG;
          break;
        case statusCell.MINE:
          nextCellStatus = statusCell.MINE_FLAG;
          break;
        default:
          break;
      }
      // 변화하는 값이 있을 경우 변경
      if (nextCellStatus !== undefined) {
        Vue.set(state.gameBoard[rowIndex], colIndex, nextCellStatus);
      }
    },
    /**
     * 물음표 꼽기
     */
    [QUESTION_CELL](state, { rowIndex, colIndex, cellData }) {
      let nextCellStatus;

      switch (cellData) {
        case statusCell.NOMARL_FLAG:
          nextCellStatus = statusCell.NOMARL_QUESTION;
          break;
        case statusCell.MINE_FLAG:
          nextCellStatus = statusCell.MINE_QUESTION;
          break;
        default:
          break;
      }
      // 변화하는 값이 있을 경우 변경
      if (nextCellStatus !== undefined) {
        Vue.set(state.gameBoard[rowIndex], colIndex, nextCellStatus);
      }
    },
    /**
     * 셀 복구
     */
    [NOMALIZE_CELL](state, { rowIndex, colIndex, cellData }) {
      let nextCellStatus;

      switch (cellData) {
        case statusCell.NOMARL_QUESTION:
          nextCellStatus = statusCell.NORMAL;
          break;
        case statusCell.MINE_QUESTION:
          nextCellStatus = statusCell.MINE;
          break;
        default:
          break;
      }
      // 변화하는 값이 있을 경우 변경
      if (nextCellStatus !== undefined) {
        Vue.set(state.gameBoard[rowIndex], colIndex, nextCellStatus);
      }
    },
    [OPEN_CELL]() {},
    // 난이도 조절
    [ON_CHANGE_LEVEL](state, { rowCount, colCount }) {
      state.isHalted = true;
      // 폭탄과 깃발 생성
      state.mineCount = parseInt(rowCount * rowCount * 0.2, 10);
      state.flagCount = state.mineCount;

      // 경과 시간 초기화
      state.time = 0;

      // 2차원 배열의 게임보드판 생성 및 초기 값 정의
      state.gameBoard = Array.from(Array(rowCount), () =>
        Array(colCount).fill(statusCell.NORMAL),
      );
    },
    [OPEN_CELL_CHAIN](state) {},
    // 폭탄 없는 셀 열 경우
    [OPEN_CELL_NORMAL](state, { rowIndex, colIndex }) {
      console.log('OPEN_CELL_NORMAL', rowIndex, colIndex);
      Vue.set(state.gameBoard[rowIndex], colIndex, statusCell.NORMAL_OPEN);
    },
    // 폭탄 셀 Open
    [OPEN_CELL_MINE](state, { rowIndex, colIndex }) {
      state.isHalted = true;

      Vue.set(state.gameBoard[rowIndex], colIndex, statusCell.MINE_OPEN);
    },
    [INCREMENT_TIME](state) {
      console.log('@@@@@@@@@@@@@@');
      state.time += 1;
    },
  },
  actions: {
    [START_GAME](context, { rowCount, colCount }) {
      console.log('START_GAME', rowCount, colCount);

      const { state, commit } = context;

      // 보드 게임 사이즈 변경
      commit(ON_CHANGE_LEVEL, { rowCount, colCount });

      // 폭탄 배치
      _(_.range(0, rowCount * colCount))
        .sampleSize(state.mineCount)
        .forEach(mineIndex => {
          const rowIndex = parseInt(mineIndex / rowCount, 10);
          const colIndex = mineIndex % colCount;
          Vue.set(state.gameBoard[rowIndex], colIndex, statusCell.MINE);
        });

      state.isHalted = false;
    },
  },
});
