<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ msg }}</div>
    <template v-show="results.length">
      <div>
        평균 시간 :
        {{ averResponse }}
        ms
      </div>
      <button @click="onReset">리셋</button>
    </template>
  </div>
</template>

<script>
let startTime = '';
let endTime = '';
let timeout = null;

export default {
  data() {
    return {
      msg: '클릭해서 시작하세요',
      state: 'waiting',
      results: [],
    };
  },
  computed: {
    averResponse() {
      return (
        this.results.reduce((total, c) => total + c, 0) / this.results.length ||
        0
      );
    },
  },
  methods: {
    onReset() {
      this.results = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.msg = '초록색이 되면 클릭';
        this.state = 'ready';

        timeout = setTimeout(() => {
          startTime = new Date();
          this.state = 'now';
          this.msg = '지금 클릭';
        }, Math.ceil(1000 + 2000 * Math.random()));
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.msg = '너무 성급하시군';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.msg = '클릭해서 시작하세요';
        this.results.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: white;
}

#screen.now {
  background-color: greenyellow;
}
</style>
