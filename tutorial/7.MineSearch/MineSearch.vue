<template>
  <div>
    <div>
      <select v-model="gameLevel" @change="onChangeGameLevel">
        <option
          v-for="(config, idx) in gameConfigList"
          :key="idx"
          :value="config.level"
          >{{ config.name }}</option
        >
      </select>
      <button id="gameStartBtn" @click="START_GAME(gameConfigList[gameLevel - 1])">
        게임 시작
      </button>
      남은 깃발: {{ flagCount }} 경과 시간: {{ time }}
    </div>
    <hr />
    <mine-board> </mine-board>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import store from './store';

import { ON_CHANGE_LEVEL } from './mutationStorage';

import MineBoard from './MineBoard.vue';

const START_GAME = 'START_GAME';
const INCREMENT_TIME = 'INCREMENT_TIMER';

export default {
  store,
  components: {
    MineBoard,
  },
  data() {
    return {
      timer: null,
      gameLevel: 1,
      selectedIndex: '',
      gameConfigList: [
        {
          level: 1,
          name: '초급',
          rowCount: 5,
          colCount: 5,
        },
        {
          level: 2,
          name: '중급',
          rowCount: 10,
          colCount: 10,
        },
        {
          level: 3,
          name: '고급',
          rowCount: 15,
          colCount: 15,
        },
      ],
    };
  },
  computed: {
    ...mapState(['isHalted']),

    // 생성된 깃발 갯수를 가져옴 (초기값은 생성된 폭탄수와 같다)
    flagCount() {
      return this.$store.state.flagCount;
    },
    // 게임이 시작된 후 경과 시간
    time() {
      return this.$store.state.time;
    },
    gameBoard() {
      return this.$store.state.gameBoard;
    },
  },
  watch: {
    isHalted() {
      if (this.isHalted === true) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.$store.commit(INCREMENT_TIME);
        }, 1000);
      }
    },
  },
  methods: {
    ...mapActions([START_GAME]),
    onChangeGameLevel() {
      const { rowCount, colCount } = this.gameConfigList.find(
        config => config.level === this.gameLevel,
      );

      this.$store.commit(ON_CHANGE_LEVEL, { rowCount, colCount });
    },
    startMineGame() {},
  },
  created() {
    this.onChangeGameLevel();
  },
  mounted() {
    // 돔 클릭 이벤트 실행
    document.querySelector('#gameStartBtn').dispatchEvent(new Event('click'));
  },
};
</script>

<style></style>
