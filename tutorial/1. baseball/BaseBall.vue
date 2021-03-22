<template>
  <div>
    <form action="" @submit.prevent="onSubmit">
      <h4>야구 게임을 {{ startMent }} {{ goals }}</h4>
      <input type="number" v-model="userInput" />
      <button type="submit">제출</button>
      <div>
        시도 횟수 : {{ tryCount }}, 필터 테스트 {{ tryCount | capitalize }}
        <ol>
          <li v-for="(answer, idx) in answers" :key="idx">
            {{ answer }}
          </li>
        </ol>
      </div>

      <div id="example-1">
        <input type="button" value="Toggle render" @click="show = !show" />
        <transition name="slide-fade">
          <p v-if="show">hello</p>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';

const generateGoals = () => {
  return _.chain(Array.from({ length: 9 }, (v, idx) => idx + 1))
    .sampleSize(4)
    .value();
};

export default {
  data() {
    return {
      startMent: '시작하지',
      goals: generateGoals(),
      tryCount: 0,
      userInput: '',
      answers: [],
      show: true,
    };
  },
  methods: {
    onSubmit() {
      const result = {
        s: 0,
        b: 0,
        o: 0,
      };

      this.tryCount += 1;

      // 계산
      this.userInput.split('').forEach((v, index) => {
        const nInput = Number(v);
        if (this.goals[index] === nInput) {
          result.s += 1;
        } else if (this.goals.includes(nInput)) {
          result.b += 1;
        } else {
          result.o += 1;
        }
      });

      // 정답일 경우
      if (result.s === this.goals.length) {
        alert('정답입니다.');

        this.tryCount = 0;
        this.answers = [];
        this.goals = generateGoals();
      } else {
        this.answers.push(result);
      }

      this.userInput = '';
    },
  },
  filters: {
    capitalize(tCount) {
      return tCount * 10;
    },
  },
};
</script>

<style>
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  color: red;
  font-size: 30px;
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  color: blue;
  font-size: 30px;
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
