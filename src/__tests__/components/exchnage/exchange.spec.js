import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Exchange from '../../../components/exchange';
import CurrencyBox from '../../../components/exchange/currency-box';
import CurrencyForm from '../../../components/exchange/currency-form';

const availablePockets = {
  USD: {
    id: 'USD',
    balance: 100,
  },
  GBP: {
    id: 'GBP',
    balance: 210,
  },
  CAD: {
    id: 'CAD',
    balance: 2,
  },
  AUD: {
    id: 'AUD',
    balance: 200,
  },
};
const form = {
  inGoing: '',
  outGoing: '',
};
const inGoingPocket = availablePockets.USD;
const outGoingPocket = availablePockets.CAD;
describe('[Component] Exchange', () => {
  it('should match the snapshot', () => {
    const component = (
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        form={form}
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have CurrencyBox and CurrencyForm components', () => {
    const mockOnChange = jest.fn();
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        form={form}
        onFormChange={mockOnChange}
      />,
    );
    expect(component.find(CurrencyBox)).toHaveLength(2);
    expect(component.find(CurrencyForm)).toHaveLength(2);
  });
  it('should have disabled exchange button', () => {
    const mockOnChange = jest.fn();
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        form={form}
        onFormChange={mockOnChange}
      />,
    );
    expect(
      component
        .find('button')
        .last()
        .props().disabled,
    ).toEqual(true);
  });
  it('should have disabled exchange button because limit is exceeded', () => {
    const mockOnChange = jest.fn();
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        form={{inGoing: 23, outGoing: 12.23}}
        error="Exceeds limit"
        onFormChange={mockOnChange}
      />,
    );
    expect(
      component
        .find('button')
        .last()
        .props().disabled,
    ).toBeTruthy();
  });
  it('should exchange button be enabled', () => {
    const mockOnChange = jest.fn();
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        form={{inGoing: 23, outGoing: 12.23}}
        onFormChange={mockOnChange}
      />,
    );
    expect(
      component
        .find('button')
        .last()
        .props().disabled,
    ).toEqual(false);
  });
});
