import Vue from 'vue';
import HelloWorld from '../HelloWorld.vue';

test('BaseBall Component', () => {
  const cmp = new Vue(HelloWorld).$mount();

  expect(cmp.message).toBe('Vue!');
});
