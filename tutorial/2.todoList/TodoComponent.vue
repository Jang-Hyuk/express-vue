<template>
  <div>
    <todo-header> To Do It !! </todo-header>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './TodoHeader.vue';
import TodoInput from './TodoInput.vue';
import TodoList from './TodoList.vue';
import TodoFooter from './TodoFooter.vue';

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
};
</script>

<style></style>
