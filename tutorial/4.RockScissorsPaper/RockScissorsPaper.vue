<template>
  <div>
    <div id="computer" :style="computedStyle"></div>
    <div>
      <button @click="onClickBtn('바위')">바위</button>
      <button @click="onClickBtn('가위')">가위</button>
      <button @click="onClickBtn('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>결과 {{ score }}</div>
  </div>
</template>

<script>
import _ from 'lodash';

let interval = null;

const rspCoord = {
  바위: '0',
  가위: '-142px',
  보: '-280px',
};

const scores = {
  바위: -1,
  가위: 0,
  보: 1,
};

const compuptedChoice = () =>
  _.chain(rspCoord)
    .toPairs()
    .sample()
    .get(0)
    .value();

export default {
  data() {
    return {
      imageCoord: rspCoord.바위,
      result: [],
      score: 0,
    };
  },
  computed: {
    computedStyle() {
      return {
        background: `url('https://en.pimg.jp/023/182/267/1/23182267.jpg') ${this.imageCoord} 0`,
      };
    },
  },
  methods: {
    onClickBtn(choice) {
      clearInterval(interval);
      // this.imageCoord = rspCoord[choice];
      const userScore = scores[choice];
      const cpuChoice = compuptedChoice();
      const diff = userScore - scores[cpuChoice];

      this.imageCoord = rspCoord[cpuChoice];

      if (diff === 0) {
        this.result = '비겼습니다.';
      } else if ([-1, 2].includes(diff)) {
        this.result = '이겼습니다.';
        this.score += 1;
      } else {
        this.score -= 1;
        this.result = '졌습니다.';
      }
      setTimeout(() => {
        this.change();
      }, 1000);
    },
    change() {
      interval = setInterval(() => {
        if (this.imageCoord === rspCoord.바위) {
          this.imageCoord = rspCoord.가위;
        } else if (this.imageCoord === rspCoord.가위) {
          this.imageCoord = rspCoord.보;
        } else if (this.imageCoord === rspCoord.보) {
          this.imageCoord = rspCoord.가위;
        }
      }, 100);
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');

    this.change();
  },
  beforeUpdate() {
    // console.log('beforeUpdate');
  },
  updated() {
    // console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    clearInterval(interval);
  },
  destroyed() {
    console.log('destroyed');
  },
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
