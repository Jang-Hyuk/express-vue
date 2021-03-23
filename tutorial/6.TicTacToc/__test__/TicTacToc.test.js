import Vue from 'vue';

import { mount, shallowMount, Wrapper } from '@vue/test-utils';

import TdComponent from '../TdComponent.vue';
import TrComponent from '../TrComponent.vue';

describe('Td Component Jest', () => {
  /** @type {Wrapper<Vue>} */
  let wrapper;

  beforeEach(() => {});

  it('TicTacToc TD Test', () => {
    const data = {
      isUserClick: true,
    };
    wrapper = mount(TdComponent, {
      propsData: {
        rowsIndex: 2,
        colsIndex: 1,
      },
      data() {
        return data;
      },
    });
    // Props id를 TD id로 가져야 한다
    expect(wrapper.vm.id).toBe('3_2');

    expect(wrapper.vm.isUserChoice).toBeNull();
    // 클릭 메소드에 사용자 값(Boolean) 따라 :isUserChoice -> true로 변경
    jest.spyOn(wrapper.vm, 'onClickChoice');

    // wrapper.vm.onClickChoice
    wrapper.vm.onClickChoice(data.isUserClick);

    // toReturnWith [true]
    expect(wrapper.vm.onClickChoice).toReturnWith(data.isUserClick);

    // toReturnWith [true, false]
    wrapper.vm.onClickChoice(false);
    // 따라서 참
    expect(wrapper.vm.onClickChoice).toReturnWith(false);

    // :isUserChoice 값이 true 일 경우 'O', 아니라면 'X' 를 :choiceStatus 입력
    expect(wrapper.vm.choiceStatus).toBe('X');
  });

  it.only('TicTacToc TR Test', () => {
    const data = {
      id: '23',
      isUserClick: true,
    };

    /** ************
     *  Create
     * ************ */
    wrapper = shallowMount(TrComponent, {
      propsData: {
        rowIndex: 1,
        squareCount: 1,
      },
      components: {
        TdComponent,
      },
      data() {},
    });

    // props로 RowNumber를 넘기면 td-component 가 자동 생성되며 자식으로 갖고 있는다.
    // expect(wrapper.vm.$children).toHaveLength(3);

    // props로 RowNumber와 RowCount를 받을 수 있다

    // RowNumber와 RowCount를 TdComponent에 전달하면 RC만큼 컴포넌트가 생성되고 RN과 RC를 결합한 ID가 부여된다
    //
  });
});
