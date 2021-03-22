<template>
  <div class="ball" :style="background">
    {{ ballNumber }}
  </div>
</template>

<script>
export default {
  name: 'LottoBall',
  props: {
    ballNumber: Number,
    key: Number,
  },
  computed: {
    background() {
      let background;
      if (this.ballNumber < 10) {
        background = 'red';
      } else if (this.ballNumber < 20) {
        background = 'orange';
      } else if (this.ballNumber < 30) {
        background = 'yellow';
      } else if (this.ballNumber < 40) {
        background = 'green';
      } else {
        background = 'blue';
      }
      return {
        background,
      };
    },
  },
  data() {
    return {
      selectedLotto: 0,
    };
  },
};
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50px;
}
</style>
