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
  const mockFn = jest.fn();
  it('should match the snapshot', () => {
    const component = (
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        onInGoingPocketChange={mockFn}
        onOutGoingPocketChange={mockFn}
        onFormChange={mockFn}
        onExchange={mockFn}
        reversePockets={mockFn}
        form={form}
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have CurrencyBox and CurrencyForm components', () => {
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        onInGoingPocketChange={mockFn}
        onOutGoingPocketChange={mockFn}
        reversePockets={mockFn}
        onFormChange={mockFn}
        form={form}
        onExchange={mockFn}
      />,
    );
    expect(component.find(CurrencyBox)).toHaveLength(2);
    expect(component.find(CurrencyForm)).toHaveLength(2);
  });
  it('should have disabled exchange button', () => {
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        onInGoingPocketChange={mockFn}
        reversePockets={mockFn}
        onFormChange={mockFn}
        onOutGoingPocketChange={mockFn}
        form={form}
        onExchange={mockFn}
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
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        onInGoingPocketChange={mockFn}
        reversePockets={mockFn}
        onFormChange={mockFn}
        onOutGoingPocketChange={mockFn}
        form={{inGoing: 23, outGoing: 12.23}}
        error="Exceeds limit"
        onExchange={mockFn}
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
    const component = mount(
      <Exchange
        inGoingPocket={inGoingPocket}
        outGoingPocket={outGoingPocket}
        onInGoingPocketChange={mockFn}
        onFormChange={mockFn}
        reversePockets={mockFn}
        onOutGoingPocketChange={mockFn}
        form={{inGoing: 23, outGoing: 12.23}}
        onExchange={mockFn}
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
