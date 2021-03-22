const watchApp = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: '질문을 하기 전에는 대답 불가',
  },
  watch: {
    // 질문이 변경될 때 마다 이 기능이 실행됩니다.
    // question1: function (newQuestion) {
    //   // this.answer = '입력을 기다리는 중...';

    // },
    question(newQuestion) {
      this.answer = '입력 대기 중';
      return confirm(this.question);
    },
  },
  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer() {},
  },
});
