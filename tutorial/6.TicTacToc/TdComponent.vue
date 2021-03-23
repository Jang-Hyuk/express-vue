<template>
  <td>{{ cellData }}</td>
</template>

<script>
export default {
  props: {
    cellData: Number,
    cellIndex: Number,
    rowIndex: Number,
  },
  data() {
    return {
      isUserChoice: null,
    };
  },

  methods: {
    onClickTd() {
      console.log(this.$root.$data);
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

<style></style>
