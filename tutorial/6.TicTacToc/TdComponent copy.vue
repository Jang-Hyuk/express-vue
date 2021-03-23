<template>
  <td>{{ choiceStatus }}</td>
</template>

<script>
export default {
  props: {
    rowsIndex: Number,
    colsIndex: Number,
  },
  data() {
    return {
      isUserChoice: null,
    };
  },
  computed: {
    id() {
      return `${this.rowsIndex + 1}_${this.colsIndex + 1}`;
    },
    choiceStatus() {
      return this.isUserChoice ? 'O' : 'X';
    },
  },
  methods: {
    onClickChoice(isUserClick = true) {
      this.isUserChoice = isUserClick;

      return this.isUserChoice;
    },
  },
  created() {
    console.log('created', this.rowsIndex);
  },
  mounted() {
    console.log('mounted', this.rowsIndex);
  },
};
</script>

<style></style>
