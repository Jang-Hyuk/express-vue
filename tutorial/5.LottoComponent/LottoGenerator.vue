<template>
  <div>
    <div>당첨 숫자</div>
    <div>{{ winBalls }} {{ bonusBall }}</div>
    <div>
      결과창
      <lotto-ball
        v-for="(ball, idx) in winBalls"
        :key="idx"
        :ballNumber="ball"
      ></lotto-ball>
    </div>
    <div>
      보너스
      <lotto-ball v-if="bonusBall" :ballNumber="bonusBall"></lotto-ball>
    </div>
    <button v-if="redo" @click="retry">한번 더</button>
  </div>
</template>

<script>
import _ from 'lodash';

import LottoBall from './LottoBall.vue';

const timeouts = [];

function generateBalls() {
  const lottoBalls = _.chain(Array.from({ length: 45 }, (v, key) => key + 1))
    .sampleSize(7)
    .value();

  return {
    winBalls: lottoBalls.splice(0, lottoBalls.length - 1).sort(),
    bonusBall: lottoBalls[0],
  };
}

export default {
  components: {
    LottoBall,
  },
  data() {
    return {
      balls: [],
      redo: false,
      winNumber: generateBalls(),
      winBalls: [],
      bonusBall: null,
    };
  },
  methods: {
    retry() {
      this.winNumber = generateBalls();
      this.winBalls = [];
      this.bonusBall = null;
      this.redo = false;
      // this.showBall();
    },
    showBall() {
      this.winNumber.winBalls.forEach((ballNumber, index) => {
        timeouts[index] = setTimeout(() => {
          this.winBalls.push(ballNumber);
        }, 1000 * index);
      });

      timeouts[this.winNumber.length - 1] = setTimeout(() => {
        this.bonusBall = this.winNumber.bonusBall;
        this.redo = true;
      }, 1000 * this.winNumber.winBalls.length);
    },
  },
  watch: {
    // Watch 값에 따라서 showBall() 을 실행할 경우
    winBalls(value, oldValue) {
      // if (value.length === 0) {
      //   this.showBall();
      // }
    },
    redo(value, oldValue) {
      if (this.redo === false) {
        this.showBall();
      }
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
    this.showBall();
  },
  beforeDestroy() {
    timeouts.forEach(timeout => clearTimeout(timeout));
  },
};
</script>

<style></style>
