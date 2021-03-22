import Vue from 'vue';

import BaseBall from '../BaseBall.vue';

function getRenderedText(Component, propsData) {
  const Constructor = Vue.extend(Component);

  /** @type {Vue} */
  const vm = new Constructor({
    propsData,
  }).$mount();

  return vm.$el.textContent;
}

describe('단위 테스트', () => {
  it('renders correctly with different props', done => {
    expect(
      getRenderedText(BaseBall, {
        startMent: '차오른다',
      }),
    ).eq('차오른다');
  });
});
