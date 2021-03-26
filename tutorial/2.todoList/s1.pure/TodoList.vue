<template>
  <div>
    <ul>
      <todo-element></todo-element>
    </ul>
  </div>
</template>

<script>
import TodoElement from './TodoElement.vue';

export default {
  components: {
    TodoElement,
  },
};
</script>

<style></style>
