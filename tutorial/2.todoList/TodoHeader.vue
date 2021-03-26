<template>
  <h3>
    {{ message }}
  </h3>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '할일 목록',
    },
  },
};
</script>

<style></style>
