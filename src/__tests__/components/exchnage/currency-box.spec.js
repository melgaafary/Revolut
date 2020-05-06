import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import CurrencyBox from '../../../components/exchange/currency-box';

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
const pocket = availablePockets.USD;

describe('[Component] CurrencyBox', () => {
  const mockOnChange = jest.fn();
  it('should match the snapshot', () => {
    const component = (
      <CurrencyBox
        onCurrencyChange={mockOnChange}
        pocket={pocket}
        availablePockets={availablePockets}
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show 4 currencies when currency selection button is clicked', () => {
    const component = mount(
      <CurrencyBox
        onCurrencyChange={mockOnChange}
        pocket={pocket}
        availablePockets={availablePockets}
      />,
    );
    component.find('button').simulate('click');
    expect(component.find('button div span')).toHaveLength(4);
    expect(
      component
        .find('button div span')
        .first()
        .text(),
    ).toEqual('USD');
    expect(
      component
        .find('button div span')
        .last()
        .text(),
    ).toEqual('AUD');
  });
  it('should display the correct currency and balance', () => {
    const component = mount(
      <CurrencyBox
        onCurrencyChange={mockOnChange}
        pocket={pocket}
        availablePockets={availablePockets}
      />,
    );
    expect(
      component
        .find('span')
        .first()
        .text(),
    ).toEqual('USD');
    expect(
      component
        .find('span')
        .last()
        .text(),
    ).toEqual('Balance: 100.00 $');
  });
});
