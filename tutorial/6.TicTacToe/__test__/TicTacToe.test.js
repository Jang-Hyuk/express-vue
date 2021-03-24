import Vue from 'vue';

import { mount, shallowMount, Wrapper } from '@vue/test-utils';

import TicTacToc from '../TicTacToe.vue';
import TableComponent from '../TableComponent.vue';
import TrComponent from '../TrComponent.vue';
import TdComponent from '../TdComponent.vue';

describe('TicTacToc Component Jest', () => {
  /** @type {Wrapper<Vue>} */
  let wrapper;

  const errorFlag = {
    RANGE_ERROR: 'RANGE_ERROR',
    TYPE_ERRPR: 'TYPE_ERROR',
  };

  beforeEach(() => {});

  it.only('TicTacToc Vue', () => {
    wrapper = shallowMount(TicTacToc, {
      components: {
        TableComponent,
      },
      data() {
        return {};
      },
    });
    // 사용자의 input:'TicTacToc Size'를  입력받아 2차원 배열 데이터를 생성해야 한다. (초기값: 3)

    // TEST: 기본 사이즈는 3
    expect(wrapper.vm.gameSize).toBe(3);

    // 틱택톡 보드는 3 * 3으로 초기값이 설정되어 있어야 한다.
    expect(wrapper.vm.gameBoard).toHaveLength(3);

    expect(wrapper.vm.gameBoard[2]).toHaveLength(3);

    // TEST: 사용자가 'TicTacToc Size' 입력한 정사각형 수는 1이상 7이하 홀수로 구성되야 한다.
    // FIXME: 알람창을 체크할 수 있는지 확인
    // 틱택톡 사이즈를 4로 하였을 경우 알람창을 띄우고 적용되지 않는다.
    expect(wrapper.vm.onClickGameSizeChange(4)).toBe(errorFlag.TYPE_ERRPR);
    // 틱택톡 사이즈를 9로 하였을 경우 범위 초과가 나타나야 한다.
    expect(wrapper.vm.onClickGameSizeChange(9)).toBe(errorFlag.RANGE_ERROR);

    // TODO: 사용자가 변경을 눌렀을 경우 게임 기록은 초기화된다.

    // 사용자가 변경 버턴을 눌렀을 경우 자동으로 'TicTacToc Size'에 focus 된다
    const spy = jest.spyOn();

    expect(wrapper.find('input'));
    wrapper.find('button').trigger('click');

    // 승리 조건 알고리즘에 따라 승리자를 판별 할 수 있어야 한다.

    // 사용자와 컴퓨터간의 게임 순서를 관리할 수 있어야 한다.
  });

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

  it('TicTacToc TR Test', () => {
    const data = {
      id: '23',
      isUserClick: true,
    };

    /** ************
     *  Create
     * ************ */
    wrapper = mount(TrComponent, {
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
